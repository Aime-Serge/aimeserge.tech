import React, { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { addResearch} from "@/store/slices/researchSlice";
// Extend Research interface to include tags property
declare module "@/store/slices/researchSlice" {
  interface Research {
    tags?: string[];
  }
}

interface ResearchPageProps {
  isAdmin?: boolean; // Admin prop
}

export default function ResearchPage({ isAdmin = false }: ResearchPageProps) {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s: RootState) => s.research.items);

  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Extract unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    items.forEach((item) => (item as { tags?: string[] }).tags?.forEach((t: string) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [items]);

  // Filtered & searched items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesTag = activeTag ? (item as { tags?: string[] }).tags?.includes(activeTag) : true;
      const matchesSearch =
        searchTerm.length > 0
          ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.abstract.toLowerCase().includes(searchTerm.toLowerCase())
          : true;
      return matchesTag && matchesSearch;
    });
  }, [items, activeTag, searchTerm]);

  // Featured item: first item
  const featuredItem = filteredItems[0] || null;
  const otherItems = filteredItems.slice(1);

  // Admin-only seed function
  function seedResearch() {
    const id = `res-${Date.now()}`;
    dispatch(
      addResearch({
        id,
        title: "TAP II — Technology-assisted Pedagogy (TA Reflections)",
        abstract:
          "Short abstract describing TA training outcomes and tech-driven CPD sessions. Suitable to show as research entry.",
        pdfUrl: "/uploads/BeyondSuccess_CaseStudy_AimeSergeUKOBIZABA.pdf",
        createdAt: new Date().toISOString(),
      })
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900">Research & Projects</h1>
        <p className="mt-3 text-gray-600 text-lg">
          Explore our cutting-edge computer science research and tech-driven projects.
        </p>
      </div>

      {/* Admin Seed Button */}
      {isAdmin && (
        <div className="flex justify-center mb-6">
          <button
            onClick={seedResearch}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            Seed Sample Research
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search research..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-lg px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          disabled={items.length === 0} // disabled if no research yet
        />
      </div>

      {/* Tags Filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            className={`px-4 py-1 rounded-full border font-medium ${
              activeTag === null
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent"
                : "bg-white text-gray-700 border-gray-300"
            } transition duration-200`}
            onClick={() => setActiveTag(null)}
            disabled={items.length === 0}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`px-4 py-1 rounded-full border font-medium ${
                activeTag === tag
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent"
                  : "bg-white text-gray-700 border-gray-300"
              } transition duration-200`}
              onClick={() => setActiveTag(tag)}
              disabled={items.length === 0}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Featured Card or Placeholder */}
      <div className="mb-12 relative overflow-hidden rounded-2xl shadow-2xl transform transition-transform hover:scale-105 duration-300 bg-white p-8 flex flex-col justify-center items-center">
        {featuredItem ? (
          <div className="relative">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{featuredItem.title}</h2>
            {(featuredItem as { tags?: string[] }).tags && (
              <div className="flex flex-wrap gap-2 mb-4">
                {(featuredItem as { tags?: string[] }).tags!.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p className="text-gray-700 mb-6">{featuredItem.abstract}</p>
            {featuredItem.pdfUrl && (
              <a
                href={featuredItem.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center text-blue-600 font-medium text-sm hover:underline"
              >
                <svg
                  className="w-4 h-4 mr-1 animate-pulse"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 7H7v6h6V7z" />
                  <path
                    fillRule="evenodd"
                    d="M5 3h10v14H5V3zm12-2H3a2 2 0 00-2 2v16a2 2 0 002 2h14a2 2 0 002-2V3a2 2 0 00-2-2z"
                    clipRule="evenodd"
                  />
                </svg>
                View PDF
              </a>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center w-full text-center">
            <div className="h-40 w-full bg-gray-100 rounded-xl animate-pulse mb-4"></div>
            <div className="h-6 w-3/4 bg-gray-200 rounded-full animate-pulse mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded-full animate-pulse mb-6"></div>
            <div className="h-10 w-48 bg-gray-300 rounded-full animate-pulse mb-4"></div>
            <p className="text-gray-500 text-sm">No research uploaded yet.</p>
          </div>
        )}
      </div>

      {/* Grid of Research Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {otherItems.length > 0
          ? otherItems.map((r, index) => (
              <div
                key={r.id}
                className={`bg-white rounded-xl shadow-md p-6 flex flex-col justify-between transform transition-all duration-500 opacity-100 hover:scale-105 hover:shadow-xl animate-fadeIn`}
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{r.title}</h3>
                {(r as { tags?: string[] }).tags && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(r as { tags?: string[] }).tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-gray-600 text-sm line-clamp-5 mb-4">{r.abstract}</p>
                <div className="mt-auto flex flex-col space-y-2">
                  <span className="text-gray-400 text-xs">
                    Published: {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                  {r.pdfUrl && (
                    <a
                      href={r.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center text-blue-600 font-medium text-sm hover:underline"
                    >
                      <svg
                        className="w-4 h-4 mr-1 animate-pulse"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 7H7v6h6V7z" />
                        <path
                          fillRule="evenodd"
                          d="M5 3h10v14H5V3zm12-2H3a2 2 0 00-2 2v16a2 2 0 002 2h14a2 2 0 002-2V3a2 2 0 00-2-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      View PDF
                    </a>
                  )}
                </div>
              </div>
            ))
          : Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between transform transition-all duration-500 opacity-100 hover:scale-105 hover:shadow-xl animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
              >
                <div className="h-5 w-3/4 bg-gray-200 rounded-full animate-pulse mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded-full animate-pulse mb-4"></div>
                <div className="h-20 bg-gray-100 rounded-xl animate-pulse mb-4"></div>
                <div className="h-6 w-20 bg-gray-300 rounded-full animate-pulse mt-auto"></div>
              </div>
            ))}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          opacity: 0;
          transform: translateY(24px);
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}
