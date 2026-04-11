"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { unstable_cache } from 'next/cache';
import { getAssetUrl } from "@/utils/storage";
import { type ResearchPaper, fallbackResearch } from "@/types/research";

export async function getResearch(): Promise<ResearchPaper[]> {
  return unstable_cache(
    async () => {
      const supabase = createServerSupabaseClient();
      try {
        const { data, error } = await supabase
          .from('research')
          .select('*')
          .order('created_at', { ascending: false });

        if (error || !data || data.length === 0) return fallbackResearch;

        return data.map((r) => ({
          id: r.id,
          slug: r.slug,
          title: r.title,
          abstract: r.abstract,
          pdfUrl: getAssetUrl(r.pdf_url),
          tags: r.tags || [],
          views: r.views || 0,
          downloads: r.downloads || 0,
          createdAt: new Date(r.created_at).toISOString().split('T')[0],
        }));
      } catch (e) {
        return fallbackResearch;
      }
    },
    ['research-list'],
    { tags: ['research'], revalidate: 3600 }
  )();
}

export async function incrementDownloadCount(id: string) {
  const supabase = createServerSupabaseClient();
  const { error } = await supabase.rpc('increment_downloads', { row_id: id });
  if (error) console.error("Failed to increment downloads:", error);
}
