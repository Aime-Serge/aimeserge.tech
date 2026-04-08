import { FileText, Download, Microscope } from "lucide-react";

// Mock research data directly in the component for now 
// since it was stored in localStorage in the old version.
const researchPapers = [
  {
    id: "res-001",
    title: "Zero-Trust Architecture in Edge Computing Environments",
    abstract: "An analysis of implementing NIST 800-207 standards within decentralized edge nodes to mitigate lateral movement in IoT networks.",
    createdAt: "2024-11-12",
    pdfUrl: "/uploads/research-edge-security.pdf"
  },
  {
    id: "res-002",
    title: "Scalable RAG Pipelines for Private Data Engineering",
    abstract: "Evaluating vector database performance and chunking strategies for enterprise-grade Retrieval Augmented Generation without data leakage.",
    createdAt: "2024-08-20",
    pdfUrl: "/uploads/research-ai-rag.pdf"
  }
];

export const metadata = {
  title: "Research | Aime Serge",
  description: "Academic and technical research papers on Cybersecurity, Cloud, and AI.",
};

export default function ResearchPage() {
  return (
    <div className="container mx-auto px-6 py-12 lg:py-20">
      <div className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Technical <span className="text-emerald-500">Research</span>
        </h1>
        <p className="mt-4 max-w-2xl text-slate-400 text-lg">
          Exploring the intersections of cloud infrastructure, proactive security, and autonomous intelligence.
        </p>
      </div>

      <div className="space-y-6">
        {researchPapers.map((paper) => (
          <div
            key={paper.id}
            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-8 transition-all hover:border-emerald-500/50"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400">
                  <Microscope className="h-3 w-3" />
                  PUBLISHED: {paper.createdAt}
                </div>
                <h2 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {paper.title}
                </h2>
                <p className="max-w-3xl text-slate-400 leading-relaxed">
                  {paper.abstract}
                </p>
              </div>

              <div className="flex flex-shrink-0 gap-3">
                <a
                  href={paper.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-slate-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-700"
                >
                  <FileText className="h-4 w-4" />
                  View PDF
                </a>
                <a
                  href={paper.pdfUrl}
                  download
                  className="flex items-center justify-center rounded-xl border border-slate-700 p-3 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                >
                  <Download className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Background Glow Effect */}
            <div className="absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl transition-opacity group-hover:opacity-100" />
          </div>
        ))}
      </div>

      {/* Placeholder for more papers */}
      <div className="mt-12 rounded-2xl border border-dashed border-slate-800 p-12 text-center">
        <p className="text-slate-500 font-mono text-sm">
          [!] ADDITIONAL RESEARCH ARTIFACTS ARE BEING INDEXED...
        </p>
      </div>
    </div>
  );
}
