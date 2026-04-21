"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { unstable_cache } from 'next/cache';
import { getAssetUrl } from "@/utils/storage";
import { type ResearchPaper, fallbackResearch } from "@/types/research";
import { openai } from "@ai-sdk/openai";
import { embed } from "ai";

/**
 * Syncs a research artifact to the AI Knowledge Base (pgvector)
 * Enables the Digital Twin to discuss research findings.
 */
export async function syncResearchToKnowledge(paper: ResearchPaper) {
  const supabase = createServerSupabaseClient();
  
  try {
    const contentToEmbed = `Research Topic: ${paper.title}\nAbstract: ${paper.abstract}\nTags: ${paper.tags.join(', ')}`;

    const { embedding } = await embed({
      model: openai.embedding("text-embedding-3-small"),
      value: contentToEmbed,
    });

    const { error } = await supabase
      .from('knowledge')
      .upsert({
        id: paper.id,
        content: contentToEmbed,
        embedding: embedding,
        metadata: {
          type: 'research',
          slug: paper.slug,
          title: paper.title
        }
      });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Research Sync Error:", error);
    return { success: false, error };
  }
}

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
      } catch {
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

export async function getPaperBySlug(slug: string): Promise<ResearchPaper | null> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('research')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    abstract: data.abstract,
    pdfUrl: getAssetUrl(data.pdf_url),
    tags: data.tags || [],
    views: data.views || 0,
    downloads: data.downloads || 0,
    createdAt: new Date(data.created_at).toISOString().split('T')[0],
  };
}
