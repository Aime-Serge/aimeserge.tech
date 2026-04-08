"use server";

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  category: "Security" | "Cloud" | "AI";
  createdAt: string;
  readTime: string;
}

const mockBlogs: Blog[] = [
  {
    id: "blog-1",
    title: "Hardening Next.js Applications: A Zero-Trust Approach",
    excerpt: "Exploring the implementation of strict CSP, Subresource Integrity, and Server-Side validation in modern React frameworks.",
    category: "Security",
    createdAt: "2024-03-15",
    readTime: "8 min read"
  },
  {
    id: "blog-2",
    title: "Orchestrating AI Agents with Vercel Edge Functions",
    excerpt: "How to deploy high-concurrency LLM pipelines using streaming responses and regional isolation for minimal latency.",
    category: "Cloud",
    createdAt: "2024-02-28",
    readTime: "6 min read"
  }
];

export async function getBlogs() {
  return mockBlogs;
}
