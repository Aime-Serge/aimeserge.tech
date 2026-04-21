export interface Broadcast {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  createdAt: string;
  readTime: string;
  images?: string[];
  videoUrl?: string;
  engagement?: {
    views: number;
    shares: number;
  };
}

export const fallbackBroadcasts: Broadcast[] = [];

