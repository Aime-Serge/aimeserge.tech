export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  tagline?: string;
  role?: string;
  url?: string;
  summary: string;
  tools: string[];
  features: string[];
  pdfUrl: string;
  createdAt: string;
}
