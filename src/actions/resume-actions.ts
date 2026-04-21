"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { unstable_cache } from 'next/cache';
import { getAssetUrl } from "@/utils/storage";
import { type Certificate, fallbackCertificates } from "@/types/resume";
import { revalidatePath } from "next/cache";

/**
 * Secure Resume Asset Management
 */
export async function uploadResume(file: File) {
  const supabase = createServerSupabaseClient();
  
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `CV_Aime_Serge_${Date.now()}.pdf`;

    const { data, error } = await supabase.storage
      .from('resumes')
      .upload(fileName, buffer, {
        contentType: 'application/pdf',
        upsert: true
      });

    if (error) throw error;

    // Log the event
    const { data: { publicUrl } } = supabase.storage.from('resumes').getPublicUrl(data.path);
    
    // Update a record in a 'profile' table or similar to track current version
    await supabase.from('security_logs').insert({
      event_type: 'RESUME_UPDATE',
      user_email: process.env.ADMIN_EMAIL,
      metadata: { file_path: data.path, url: publicUrl }
    });

    revalidatePath('/resume');
    return { success: true, url: publicUrl };
  } catch (err) {
    console.error("Resume Upload Error:", err);
    return { success: false, error: "Handshake failed during asset transmission." };
  }
}

export async function getLatestResume() {
  const supabase = createServerSupabaseClient();
  try {
    const { data, error } = await supabase.storage
      .from('resumes')
      .list('', { limit: 1, sortBy: { column: 'created_at', order: 'desc' } });

    if (error || !data || data.length === 0) return null;

    const { data: { publicUrl } } = supabase.storage
      .from('resumes')
      .getPublicUrl(data[0].name);

    return publicUrl;
  } catch {
    return null;
  }
}

export async function getCertificates(): Promise<Certificate[]> {
  return unstable_cache(
    async () => {
      const supabase = createServerSupabaseClient();
      try {
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('issue_date', { ascending: false });

        if (error || !data || data.length === 0) return fallbackCertificates;

        return data.map((c) => ({
          id: c.id,
          name: c.name,
          provider: c.provider,
          issueDate: c.issue_date,
          expiryDate: c.expiry_date,
          verifyUrl: c.verify_url,
          pdfUrl: getAssetUrl(c.pdf_url),
          description: c.description,
        }));
      } catch {
        return fallbackCertificates;
      }
    },
    ['certificates-list'],
    { tags: ['certificates'], revalidate: 3600 }
  )();
}
