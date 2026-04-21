"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { unstable_cache } from 'next/cache';
import { type Broadcast, fallbackBroadcasts } from "@/types/blog";
import { openai } from "@ai-sdk/openai";
import { embed } from "ai";

/**
 * Syncs a broadcast to the AI Knowledge Base (pgvector)
 * This allows the Digital Twin to answer questions about specific blog posts.
 */
export async function syncBroadcastToKnowledge(broadcast: Broadcast) {
  const supabase = createServerSupabaseClient();
  
  try {
    // 1. Create a dense technical chunk
    const contentToEmbed = `Topic: ${broadcast.title}\nCategory: ${broadcast.category}\nContent: ${broadcast.excerpt}\nFull Detail: ${broadcast.content}`;

    // 2. Generate embedding
    const { embedding } = await embed({
      model: openai.embedding("text-embedding-3-small"),
      value: contentToEmbed,
    });

    // 3. Upsert into knowledge table
    const { error } = await supabase
      .from('knowledge')
      .upsert({
        id: broadcast.id, // Keep IDs synced
        content: contentToEmbed,
        embedding: embedding,
        metadata: {
          type: 'broadcast',
          slug: broadcast.id,
          title: broadcast.title
        }
      });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Knowledge Sync Error:", error);
    return { success: false, error };
  }
}

export async function getBroadcasts(): Promise<Broadcast[]> {
  return unstable_cache(
    async () => {
      const supabase = createServerSupabaseClient();
      
      try {
        const { data, error } = await supabase
          .from('broadcasts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error || !data || data.length === 0) {
          return fallbackBroadcasts;
        }

        return data.map((b) => ({
          id: b.id,
          title: b.title,
          content: b.content,
          excerpt: b.excerpt,
          category: b.category,
          tags: b.tags || [],
          createdAt: b.created_at,
          readTime: b.read_time,
          images: b.images || [],
          videoUrl: b.video_url,
          engagement: {
            views: b.views || 0,
            shares: b.shares || 0
          }
        }));
      } catch {
        return fallbackBroadcasts;
      }
    },
    ['broadcasts-feed'],
    { tags: ['broadcasts'], revalidate: 60 }
  )();
}

export async function getBroadcastById(id: string): Promise<Broadcast | null> {
  return unstable_cache(
    async () => {
      const supabase = createServerSupabaseClient();
      try {
        const { data, error } = await supabase
          .from('broadcasts')
          .select('*')
          .eq('id', id)
          .single();

        if (error || !data) return fallbackBroadcasts.find(b => b.id === id) || null;

        return {
          id: data.id,
          title: data.title,
          content: data.content,
          excerpt: data.excerpt,
          category: data.category,
          tags: data.tags || [],
          createdAt: data.created_at,
          readTime: data.read_time,
          images: data.images || [],
          videoUrl: data.video_url,
          engagement: {
            views: data.views || 0,
            shares: data.shares || 0
          }
        };
      } catch {
        return fallbackBroadcasts.find(b => b.id === id) || null;
      }
    },
    [`broadcast-${id}`],
    { tags: [`broadcast-${id}`], revalidate: 60 }
  )();
}
