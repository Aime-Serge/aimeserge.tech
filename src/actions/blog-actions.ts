"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { unstable_cache } from 'next/cache';
import { type Broadcast, fallbackBroadcasts } from "@/types/blog";

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
      } catch (e) {
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
      } catch (e) {
        return fallbackBroadcasts.find(b => b.id === id) || null;
      }
    },
    [`broadcast-${id}`],
    { tags: [`broadcast-${id}`], revalidate: 60 }
  )();
}
