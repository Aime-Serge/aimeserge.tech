"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { unstable_cache } from 'next/cache';
import { getAssetUrl } from "@/utils/storage";
import { type Certificate, fallbackCertificates } from "@/types/resume";

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
      } catch (e) {
        return fallbackCertificates;
      }
    },
    ['certificates-list'],
    { tags: ['certificates'], revalidate: 3600 }
  )();
}
