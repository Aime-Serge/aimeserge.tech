import { FileText, Download, Microscope, Eye, ExternalLink } from "lucide-react";
import SecurityAudit from "@/components/features/SecurityAudit";
import { getResearch } from "@/actions/research-actions";

export const metadata = {
  title: "Technical Research | Aime Serge",
  description: "Exploring the intersections of cloud infrastructure, proactive security, and autonomous intelligence.",
};

export default async function ResearchPage() {
  const researchPapers = await getResearch();

  return (
    <div className="container mx-auto px-6 py-12 lg:py-20">
      <div className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Technical <span className="text-emerald-500">Research</span>
        </h1>
        <p className="mt-4 max-w-2xl text-slate-400 text-lg">
          Exploring the intersections of cloud infrastructure, proactive security, and autonomous intelligence through data-driven analysis.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
        {/* Left Column: Research Feed */}
        <div className="space-y-8">
          {researchPapers.map((paper) => (
            <article
              key={paper.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-8 transition-all hover:border-emerald-500/50"
            >
              <div className="flex flex-col gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400">
                      <Microscope className="h-3 w-3" />
                      PUBLISHED: {paper.createdAt}
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500 uppercase">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" /> {paper.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="h-3 w-3" /> {paper.downloads} downloads
                      </span>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {paper.title}
                  </h2>
                  <p className="max-w-3xl text-slate-400 leading-relaxed">
                    {paper.abstract}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {paper.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono text-emerald-500/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-shrink-0 gap-3">
                  <a
                    href={paper.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-slate-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-700"
                  >
                    <FileText className="h-4 w-4" />
                    Read Report
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
            </article>
          ))}

          {researchPapers.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center">
              <p className="text-slate-500 font-mono text-sm">
                [!] ADDITIONAL RESEARCH ARTIFACTS ARE BEING INDEXED...
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Sidebar */}
        <aside className="space-y-8">
          <SecurityAudit />
          
          <div className="rounded-2xl border border-slate-800 bg-emerald-500/5 p-6 backdrop-blur-sm">
             <h4 className="text-sm font-bold text-emerald-500 uppercase tracking-widest font-mono mb-6 border-b border-emerald-500/20 pb-2">Research Clusters</h4>
             <ul className="space-y-4">
                {[
                  { name: "Distributed Zero-Trust", count: 12 },
                  { name: "Vertex AI Safety", count: 8 },
                  { name: "Cloud Native Hardening", count: 15 },
                  { name: "RAG Optimization", count: 5 }
                ].map(cluster => (
                  <li key={cluster.name} className="flex items-center justify-between text-xs group cursor-pointer">
                    <div className="flex items-center gap-2 text-slate-400 group-hover:text-emerald-400 transition-colors">
                      <span className="h-1 w-1 bg-emerald-500 rounded-full" />
                      {cluster.name}
                    </div>
                    <span className="font-mono text-slate-600 group-hover:text-emerald-500">({cluster.count})</span>
                  </li>
                ))}
             </ul>
             <button className="w-full mt-8 rounded-xl border border-emerald-500/30 bg-emerald-500/5 py-3 text-[10px] font-bold text-emerald-500 uppercase tracking-widest hover:bg-emerald-500/10 transition-all">
                Request Full Archive
             </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
