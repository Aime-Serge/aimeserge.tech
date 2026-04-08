import { getProjectBySlug } from "@/actions/portfolio-actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, FileText, CheckCircle2 } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-12 lg:py-20">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-cyan-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </Link>

      <div className="grid gap-12 lg:grid-cols-[1fr_350px]">
        {/* Main Content */}
        <article>
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <p className="mt-4 text-xl text-cyan-500/90 font-mono">
              {project.tagline}
            </p>
          </div>

          <div className="space-y-10 text-slate-300">
            <section>
              <h2 className="mb-4 text-2xl font-bold text-white uppercase tracking-wider font-mono">Mission Analysis</h2>
              <div className="leading-relaxed text-lg text-slate-400 whitespace-pre-wrap">
                {project.description}
              </div>
            </section>

            <section>
              <h2 className="mb-6 text-2xl font-bold text-white">Key Features</h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">Project Role</h2>
              <p className="text-slate-400 bg-slate-900/50 border border-slate-800 rounded-lg p-4 inline-block">
                {project.role}
              </p>
            </section>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-sm">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-md bg-slate-800 px-3 py-1 text-xs font-mono text-cyan-400 border border-slate-700"
                >
                  {tool}
                </span>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-cyan-700"
                >
                  Live Preview
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {project.pdfUrl && (
                <a
                  href={project.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-700"
                >
                  Case Study PDF
                  <FileText className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-emerald-500/5 p-6">
            <p className="text-xs font-mono text-emerald-500/70">
              TIMESTAMP: {project.createdAt}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              This project was validated through production deployment and peer review.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
