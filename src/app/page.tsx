import Link from "next/link";
import { Terminal, Shield, Cloud, Cpu, ArrowRight, CheckCircle2, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            {/* Cyber Status Badge */}
            <div className="mb-8 flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-mono text-cyan-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
              </span>
              SOFTWARE_ENGINEER :: ALX_ALUMNI :: GOOGLE_CLOUD_CERTIFIED
            </div>

            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl leading-[1.1]">
              Building <span className="text-cyan-500">Secure</span>, <span className="text-emerald-500">Scalable</span> & AI-Powered Infrastructure
            </h1>

            <p className="mt-8 max-w-2xl text-lg text-slate-400">
              I help startups design and build high-performance backend systems, secure APIs, and cloud-ready applications 
              that scale with real-world users and complex logistics.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link
                href="/projects"
                className="group flex items-center gap-2 rounded-xl bg-cyan-600 px-8 py-4 font-bold text-white transition hover:bg-cyan-700 hover:shadow-[0_0_20px_rgba(8,145,178,0.4)]"
              >
                View My Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/terminal"
                className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-8 py-4 font-mono font-medium text-slate-300 backdrop-blur-sm transition hover:bg-slate-800"
              >
                <Terminal className="h-4 w-4 text-cyan-500" />
                Init_Terminal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Me / Mission Section */}
      <section className="container mx-auto px-6 py-24 border-y border-slate-800/50">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Systems Architect & AI Researcher</h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              Hello! 👋 I’m <span className="text-white font-medium">Aime Serge UKOBIZABA</span>. I develop modern backend systems, APIs, and full-stack systems designed for performance and maintainability.
            </p>
            <p className="text-slate-400 leading-relaxed text-lg">
              My work centers on the intersection of <span className="text-cyan-400">Secure Cloud Architecture</span>, <span className="text-emerald-400">AI Deployment</span>, and solving national-scale problems like Rwanda&apos;s urban transport logistics.
            </p>
            
            <div className="grid gap-4 sm:grid-cols-2 mt-8">
              {[
                "Secure by design",
                "Scalable under load",
                "Reliable & Maintainable",
                "Built with business logic"
              ].map(point => (
                <div key={point} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm font-mono">{point}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
             {/* Engineering Approach Box */}
             <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-6">Engineering Approach</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Shield className="h-6 w-6 text-cyan-500 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold">Security-First</h4>
                      <p className="text-sm text-slate-500">Encryption at rest and in transit, with hardened IAM protocols.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Cloud className="h-6 w-6 text-emerald-500 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold">Cloud-Native Scale</h4>
                      <p className="text-sm text-slate-500">Serverless & containerized architectures for global availability.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Cpu className="h-6 w-6 text-purple-500 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold">AI Integration</h4>
                      <p className="text-sm text-slate-500">Leveraging RAG and LLMs to automate complex human workflows.</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-6 py-24 w-full">
        <h2 className="text-center text-2xl font-mono text-cyan-500 mb-12 uppercase tracking-widest">How I Can Help You</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Scalable Backend Systems", desc: "Building high-throughput engines using Node.js and Django." },
            { title: "Secure API Design", desc: "Hardened REST/GraphQL interfaces with full validation layers." },
            { title: "Cloud Architecture", desc: "Expert deployment on Google Cloud and AWS Edge networks." },
            { title: "AI-Powered Solutions", desc: "Implementing intelligent agents and RAG-based systems." },
            { title: "Mobile & Full-Stack", desc: "Inclusive, mobile-first applications with modern React/Next.js." },
            { title: "System Optimization", desc: "Refining legacy code for performance and business growth." }
          ].map(service => (
            <div key={service.title} className="rounded-xl border border-slate-800 bg-slate-900/20 p-6 transition hover:bg-slate-900/40 hover:border-slate-700">
              <h4 className="text-white font-bold mb-2">{service.title}</h4>
              <p className="text-sm text-slate-400">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
