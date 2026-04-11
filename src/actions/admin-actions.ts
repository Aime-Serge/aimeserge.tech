"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * Secure Admin Mutation Layer
 * All functions perform session validation before execution.
 */

async function validateAdminSession() {
  const supabase = createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
    throw new Error("Unauthorized Access: Admin privileges required.");
  }
  return supabase;
}

export async function upsertContent(table: string, payload: any, path: string) {
  try {
    const supabase = await validateAdminSession();
    
    const { data, error } = await supabase
      .from(table)
      .upsert(payload)
      .select()
      .single();

    if (error) throw error;

    revalidatePath(path); // Instant ISR update
    return { success: true, data };
  } catch (err: any) {
    console.error(`Admin Error [${table}]:`, err.message);
    return { success: false, error: err.message };
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
  } catch (err: any) {
    console.error("Storage Error:", err.message);
    return { success: false, error: err.message };
  }
}

export async function deleteContent(table: string, id: string, path: string) {
...

  try {
    const supabase = await validateAdminSession();
    
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) throw error;

    revalidatePath(path);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
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
  } catch (err) {
    return { totalViews: 0, totalInquiries: 0, researchImpact: 0 };
  }
}
