import { createServerSupabaseClient } from "@/lib/supabase/server";
import { openai } from "@ai-sdk/openai";
import { embed } from "ai";

export interface KnowledgeMetadata {
  type?: string;
  slug?: string;
  title?: string;
  [key: string]: unknown;
}

export interface KnowledgeMatch {
  content: string;
  metadata?: KnowledgeMetadata | null;
}

export const vectorStore = {
  async search(query: string, limit: number = 3): Promise<KnowledgeMatch[]> {
    const supabase = createServerSupabaseClient();
    
    try {
      const { embedding } = await embed({
        model: openai.embedding("text-embedding-3-small"),
        value: query,
      });

      const { data: chunks, error } = await supabase.rpc("match_knowledge", {
        query_embedding: embedding,
        match_threshold: 0.5,
        match_count: limit,
      });

      if (error) throw error;
      return (chunks ?? []) as KnowledgeMatch[];
    } catch (e) {
      console.error("Vector search failed:", e);
      return [];
    }
  },

  async upsert(id: string, content: string, metadata: KnowledgeMetadata) {
    const supabase = createServerSupabaseClient();
    
    try {
      const { embedding } = await embed({
        model: openai.embedding("text-embedding-3-small"),
        value: content,
      });

      const { error } = await supabase
        .from('knowledge')
        .upsert({
          id,
          content,
          embedding,
          metadata
        });

      if (error) throw error;
      return { success: true };
    } catch (e) {
      console.error("Vector upsert failed:", e);
      return { success: false, error: e };
    }
  }
};
