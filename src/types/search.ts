export type SearchResultType = "project" | "research" | "blog";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  snippet: string;
  href: string;
  tags: string[];
  score: number;
}

