"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { SignJWT } from "jose";
import { cookies, headers } from "next/headers";

/**
 * Secure Admin Mutation Layer
 * All functions perform session validation before execution.
 */

export async function recordSecurityEvent(
  event_type: string, 
  user_email: string | null | undefined, 
  severity: 'INFO' | 'WARN' | 'CRITICAL' = 'INFO',
  metadata: object = {}
) {
  const supabase = createServerSupabaseClient();
  const headerList = await headers();
  
  const ip = headerList.get('x-forwarded-for') || 'unknown';
  const ua = headerList.get('user-agent') || 'unknown';

  await supabase.from('security_logs').insert({
    event_type,
    user_email,
    ip_address: ip,
    user_agent: ua,
    severity,
    metadata
  });
}

export async function loginAdmin(email: string, passcode: string) {
  try {
    const supabase = createServerSupabaseClient();
    
    // 1. Verify with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: passcode,
    });

    if (error || !data.user) {
      await recordSecurityEvent('LOGIN_FAILURE', email, 'WARN', { error: error?.message });
      throw new Error(error?.message || "Auth failed");
    }

    // 2. Security Check: Ensure email matches ADMIN_EMAIL
    if (data.user.email !== process.env.ADMIN_EMAIL) {
      await recordSecurityEvent('UNAUTHORIZED_ACCESS_ATTEMPT', data.user.email, 'CRITICAL');
      throw new Error("Access Denied: Identity not recognized as Node Operator.");
    }

    // 3. Generate Secure JWT for Middleware (Zero-Trust)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ 
      email: data.user.email,
      role: 'authenticated' 
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(secret);

    // 4. Set Secure Cookie
    const cookieStore = await cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7200,
      path: '/',
    });

    await recordSecurityEvent('LOGIN_SUCCESS', data.user.email, 'INFO');

    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown auth error" };
  }
}

async function validateAdminSession() {
  const supabase = createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
    throw new Error("Unauthorized Access: Admin privileges required.");
  }
  return supabase;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}

export async function upsertContent(table: string, payload: object, path: string) {
  try {
    const supabase = await validateAdminSession();
    
    const { data, error } = await supabase
      .from(table)
      .upsert(payload)
      .select()
      .single();

    if (error) throw error;

    await recordSecurityEvent('CONTENT_UPSERT', process.env.ADMIN_EMAIL!, 'INFO', { table, id: data.id });

    revalidatePath(path); // Instant ISR update
    return { success: true, data };
  } catch (err: unknown) {
    const message = getErrorMessage(err);
    console.error(`Admin Error [${table}]:`, message);
    return { success: false, error: message };
  }
}


export async function uploadArtifact(file: File, path: string) {
  try {
    const supabase = await validateAdminSession();

    // Convert file to buffer for Supabase
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { data, error } = await supabase.storage
      .from('artifacts')
      .upload(`${path}/${Date.now()}-${file.name}`, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (error) throw error;

    // Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from('artifacts')
      .getPublicUrl(data.path);

    return { success: true, url: publicUrl };
  } catch (err: unknown) {
    const message = getErrorMessage(err);
    console.error("Storage Error:", message);
    return { success: false, error: message };
  }
}

export async function deleteContent(table: string, id: string, path: string) {
  try {
    const supabase = await validateAdminSession();
    
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) throw error;

    revalidatePath(path);
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: getErrorMessage(err) };
  }
}

export async function getAdminAnalytics() {
  try {
    const supabase = await validateAdminSession();
    
    // Aggregate stats from multiple tables
    const [projects, contacts, research] = await Promise.all([
      supabase.from('projects').select('views, likes'),
      supabase.from('contacts').select('id', { count: 'exact' }),
      supabase.from('research').select('views, downloads')
    ]);

    return {
      totalViews: projects.data?.reduce((acc, p) => acc + (p.views || 0), 0) || 0,
      totalInquiries: contacts.count || 0,
      researchImpact: research.data?.reduce((acc, r) => acc + (r.downloads || 0), 0) || 0
    };
  } catch {
    return { totalViews: 0, totalInquiries: 0, researchImpact: 0 };
  }
}

export async function getSecurityLogs() {
  try {
    const supabase = await validateAdminSession();
    const { data, error } = await supabase
      .from('security_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;
    return { success: true, data };
  } catch (err: unknown) {
    return { success: false, error: getErrorMessage(err) };
  }
}
