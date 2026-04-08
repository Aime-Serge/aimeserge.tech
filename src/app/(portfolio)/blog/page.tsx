import { getBlogs } from "@/actions/blog-actions";
import Link from "next/link";
import { BookOpen, Clock, Tag, ArrowRight } from "lucide-react";
import { cn } from "@/lib/security/headers";

export const metadata = {
  title: "Blog | Security & Cloud Insights",
  description: "Technical deep-dives into modern web security, cloud-native architecture, and AI-driven systems.",
};

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="container mx-auto px-6 py-12 lg:py-20">
      <div className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Technical <span className="text-cyan-500">Insights</span>
        </h1>
        <p className="mt-4 max-w-2xl text-slate-400 text-lg">
          Discussions on production-ready patterns, threat modeling, and scaling autonomous systems.
        </p>
      </div>

      <div className="grid gap-8">
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/30 p-8 transition-all hover:border-cyan-500/50"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
                    blog.category === "Security" ? "bg-red-500/10 text-red-400" : 
                    blog.category === "Cloud" ? "bg-cyan-500/10 text-cyan-400" : 
                    "bg-emerald-500/10 text-emerald-400"
                  )}>
                    {blog.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    {blog.readTime}
                  </span>
                  <span className="text-slate-600">|</span>
                  <span className="text-slate-500 uppercase">{blog.createdAt}</span>
                </div>

                <h2 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors md:text-3xl">
                  {blog.title}
                </h2>
                
                <p className="max-w-4xl text-slate-400 leading-relaxed text-lg">
                  {blog.excerpt}
                </p>
              </div>

              <Link
                href={`/blog/${blog.id}`}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-all group-hover:bg-cyan-600 group-hover:text-white"
              >
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Subtle background glow */}
            <div className="absolute -left-20 -top-20 -z-10 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />
          </article>
        ))}
      </div>

      <div className="mt-20 border-t border-slate-800 pt-12 text-center">
        <div className="mx-auto max-w-xl space-y-4 rounded-2xl bg-slate-900/50 p-8 border border-slate-800">
          <BookOpen className="mx-auto h-8 w-8 text-cyan-500 opacity-50" />
          <h3 className="text-xl font-bold text-white">Subscribe to System Logs</h3>
          <p className="text-slate-400 text-sm">Receive deep technical deep-dives on security and cloud infrastructure directly to your inbox.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="operator@system.node" 
              className="flex-1 rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            <button className="rounded-xl bg-cyan-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-cyan-700">
              JOIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
