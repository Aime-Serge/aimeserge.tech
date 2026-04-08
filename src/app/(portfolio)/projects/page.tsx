import { getProjects } from "@/actions/portfolio-actions";
import Link from "next/link";
import { ExternalLink, FileText, ChevronRight } from "lucide-react";
import { cn } from "@/lib/security/headers";

export const metadata = {
  title: "Projects | Aime Serge",
  description: "Explore my engineering projects in Cloud, Security, and Full-Stack Development.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="container mx-auto px-6 py-12 lg:py-20">
      <div className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Engineered <span className="text-cyan-500">Solutions</span>
        </h1>
        <p className="mt-4 max-w-2xl text-slate-400 text-lg">
          A collection of case studies, prototypes, and production applications built with a focus on scalability and security.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-900/60"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono font-medium uppercase tracking-widest text-cyan-500/70">
                {project.createdAt}
              </span>
              <div className="flex gap-2">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-400"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                {project.pdfUrl && (
                  <a
                    href={project.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-emerald-400"
                  >
                    <FileText className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-slate-400 line-clamp-2">
              {project.tagline}
            </p>

            {/* Tools/Stack */}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tools.slice(0, 3).map((tool) => (
                <span
                  key={tool}
                  className="rounded-md bg-slate-800/50 px-2 py-1 text-[10px] font-mono text-slate-300 border border-slate-700/50"
                >
                  {tool}
                </span>
              ))}
              {project.tools.length > 3 && (
                <span className="text-[10px] font-mono text-slate-500 flex items-center">
                  +{project.tools.length - 3} more
                </span>
              )}
            </div>

            <div className="mt-auto pt-8">
              <Link
                href={`/projects/${project.slug}`}
                className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-white hover:text-cyan-400 transition-colors"
              >
                View Case Study
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            
            {/* Decorative Glow */}
            <div className="absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 opacity-0 blur-xl transition duration-500 group-hover:opacity-40" />
          </div>
        ))}
      </div>
    </div>
  );
}
