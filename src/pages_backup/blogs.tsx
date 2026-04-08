import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { Blog} from "@/types/blog"; // Import interfaces from src/types
import {SocialBlog } from "@/types/socialblog"; // Import interfaces from src/types
// Category / Source badge colors
const CATEGORY_COLORS: Record<string, string> = {
  "Tech Project": "bg-blue-100 text-blue-800",
  Research: "bg-green-100 text-green-800",
  "Admissions Essay": "bg-purple-100 text-purple-800",
  LinkedIn: "bg-gray-100 text-gray-800",
  Twitter: "bg-gray-100 text-gray-800",
};

// Estimate reading time (200 words per minute)
function estimateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export default function BlogsPage() {
  const internalBlogs = useAppSelector((s: RootState) => s.blogs.items as Blog[]);
  const sortedInternalBlogs = [...internalBlogs].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const [socialBlogs, setSocialBlogs] = useState<SocialBlog[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Fetch LinkedIn and Twitter posts
  useEffect(() => {
    async function fetchSocialBlogs() {
      try {
        const [linkedinRes, twitterRes] = await Promise.all([
          fetch("/api/social/linkedin"),
          fetch("/api/social/twitter"),
        ]);

        const [linkedinData, twitterData] = await Promise.all([
          linkedinRes.json(),
          twitterRes.json(),
        ]);

        interface LinkedInPost {
          id: string;
          title?: string;
          content: string;
          author?: string;
          createdAt: string;
          updatedAt: string;
          url: string;
        }
        
        interface TwitterPost {
          id: string;
          title?: string;
          content: string;
          author?: string;
          createdAt: string;
          updatedAt: string;
          url: string;
        }
        
        const posts: SocialBlog[] = [
          ...linkedinData.map((p: LinkedInPost) => ({
            id: `linkedin-${p.id}`,
            title: p.title || "LinkedIn Post",
            content: p.content,
            author: p.author || "LinkedIn",
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
            tags: ["LinkedIn"],
            source: "LinkedIn",
            url: p.url,
          })),
          ...twitterData.map((p: TwitterPost) => ({
            id: `twitter-${p.id}`,
            title: p.title || "Tweet",
            content: p.content,
            author: p.author || "Twitter",
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
            tags: ["Twitter"],
            source: "Twitter",
            url: p.url,
          })),
        ];

        posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setSocialBlogs(posts);
      } catch (error) {
        console.error("Error fetching social posts:", error);
      }
    }
    fetchSocialBlogs();
  }, []);

  // Combine internal and social posts
  type Post = (import("@/types/blog").Blog | import("@/types/socialblog").SocialBlog) & { type: string; url?: string };
  const allPosts: Post[] = [
    ...sortedInternalBlogs.map((b) => ({ ...b, type: b.tags?.[0] || "Other", url: undefined })),
    ...socialBlogs.map((b) => ({ ...b, type: b.source, url: b.url })),
  ];

  // Apply active filter
  const filteredPosts = activeFilter
    ? allPosts.filter((b) => b.type === activeFilter)
    : allPosts;

  // Render a single card
  const renderCard = (
    id: string,
    title: string,
    content: string,
    createdAt: string,
    categoryOrSource?: string,
    url?: string
  ) => {
    const readingTime = estimateReadingTime(content);

    return (
      <article
        key={id}
        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col justify-between"
      >
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
          {categoryOrSource && (
            <span
              className={`text-xs font-medium mb-2 inline-block px-2 py-1 rounded ${CATEGORY_COLORS[categoryOrSource]}`}
            >
              {categoryOrSource}
            </span>
          )}
          <p
            className="text-gray-700 text-sm line-clamp-4"
            title={content} // tooltip shows full content
          >
            {content}
          </p>
        </div>
        <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
          <span>
            {new Date(createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span>{readingTime}</span>
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
              {categoryOrSource}
            </a>
          )}
        </div>
      </article>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Portfolio & Social Updates</h1>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {["Tech Project", "Research", "Admissions Essay", "LinkedIn", "Twitter"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(activeFilter === cat ? null : cat)}
            className={`px-3 py-1 rounded-full border ${
              activeFilter === cat
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            } text-sm transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts grid */}
      {filteredPosts.length === 0 ? (
        <div className="p-8 bg-gray-50 rounded-lg shadow text-center text-gray-600">
          No posts found for this category.
        </div>
      ) : (
        <div>
          {filteredPosts.map((b: Post) =>
            renderCard(b.id, b.title, b.content, b.createdAt, b.type, b.url)
          )}
        </div>
      )}
    </div>
  );
}
