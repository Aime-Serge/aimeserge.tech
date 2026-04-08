import { Github, Linkedin, Twitter, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 text-white font-bold font-mono">
              <ShieldCheck className="h-5 w-5 text-cyan-500" />
              AIME SERGE <span className="text-slate-600 mx-2">|</span> 
              <span className="text-xs text-slate-500 uppercase tracking-widest">SECURE_NODE_01</span>
            </div>
            <p className="mt-2 text-sm text-slate-500">
              © {new Date().getFullYear()} Engineered with Next.js 15 & Zero-Trust principles.
            </p>
          </div>

          <div className="flex gap-4">
            <a href="#" className="rounded-full bg-slate-900 p-2.5 text-slate-400 transition hover:bg-slate-800 hover:text-white">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="rounded-full bg-slate-900 p-2.5 text-slate-400 transition hover:bg-slate-800 hover:text-white">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="rounded-full bg-slate-900 p-2.5 text-slate-400 transition hover:bg-slate-800 hover:text-white">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center md:text-left">
          <span className="text-[10px] font-mono text-slate-700 uppercase tracking-[0.2em]">
            SYSTEM_INTEGRITY_VERIFIED_BY_GEMINI_AI
          </span>
        </div>
      </div>
    </footer>
  );
}
