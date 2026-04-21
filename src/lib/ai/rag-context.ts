import { createServerSupabaseClient } from "@/lib/supabase/server";
import { openai } from "@ai-sdk/openai";
import { embed } from "ai";

interface KnowledgeChunk {
  content: string;
}

export async function getContext(query: string) {
  const supabase = createServerSupabaseClient();
  
  try {
    // 1. Generate embedding for the user query
    const { embedding } = await embed({
      model: openai.embedding("text-embedding-3-small"),
      value: query,
    });

    // 2. Search Supabase for similar content
    const { data: chunks, error } = await supabase.rpc("match_knowledge", {
      query_embedding: embedding,
      match_threshold: 0.5,
      match_count: 3,
    });

    if (error || !chunks) {
      console.error("Context fetch error:", error);
      return "";
    }

    return (chunks as KnowledgeChunk[]).map((chunk) => chunk.content).join("\n\n");
  } catch (e) {
    console.error("RAG Context retrieval failed:", e);
    return "";
  }
}
