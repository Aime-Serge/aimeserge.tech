import { Download, ExternalLink, FileText, CheckCircle, GraduationCap, Briefcase } from "lucide-react";

export const metadata = {
  title: "Resume | Aime Serge UKOBIZABA",
  description: "Software Engineering, Google Cloud, and AI specialization of Aime Serge.",
};

const skillMatrix = [
  { name: "Backend Engineering", tools: "Node.js, Python (Django/DRF), REST APIs", level: 95 },
  { name: "Cloud & DevOps", tools: "Google Cloud Platform, Vercel, CI/CD", level: 88 },
  { name: "Cybersecurity", tools: "IAM, API Hardening, Zero-Trust", level: 82 },
  { name: "Frontend Development", tools: "React, Next.js, Tailwind CSS", level: 90 },
  { name: "AI & ML", tools: "Vertex AI, LLM Prompting, MLOps", level: 85 }
];

export default function ResumePage() {
  return (
    <div className="container mx-auto px-6 py-12 lg:py-20">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between mb-16">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Professional <span className="text-cyan-500">Blueprint</span>
          </h1>
          <p className="mt-4 text-slate-400 text-lg">ALX Alumni | Google Cloud Certified | AI Researcher</p>
        </div>
        <a 
          href="/uploads/AimeSergeUkobizabaResume.pdf" 
          download
          className="flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white transition hover:bg-cyan-700"
        >
          <Download className="h-5 w-5" />
          Download PDF CV
        </a>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
        <div className="space-y-16">
          {/* Experience */}
          <section>
            <h2 className="mb-10 flex items-center gap-3 text-2xl font-bold text-white uppercase tracking-wider font-mono">
              <Briefcase className="h-6 w-6 text-cyan-500" />
              Technical Experience
            </h2>
            <div className="space-y-12 border-l border-slate-800 ml-3 pl-8">
              <div className="relative">
                <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-slate-950 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                <h3 className="text-xl font-bold text-white">Software Engineer</h3>
                <p className="text-cyan-500 font-mono text-sm">ALX Rwanda / Freelance | 2023 - Present</p>
                <ul className="mt-4 space-y-2 text-slate-400 text-sm leading-relaxed list-disc ml-4">
                   <li>Building secure and scalable backend systems and APIs for startups.</li>
                   <li>Developing full-stack applications with Next.js and Tailwind CSS.</li>
                   <li>Integrating AI agents and intelligent systems into production workflows.</li>
                   <li>Transitioning to a Linux-based (Ubuntu) production environment for advanced SDLC management.</li>
                </ul>
              </div>

              <div className="relative">
                <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-slate-950 bg-slate-700" />
                <h3 className="text-xl font-bold text-white">Technical Researcher</h3>
                <p className="text-slate-500 font-mono text-sm">Independent Projects | 2022 - 2023</p>
                <p className="mt-3 text-slate-400 text-sm">Focused on IoT solutions for urban mobility (Flex Transport Model) and AI ethics/transparency in African digital sectors.</p>
              </div>
            </div>
          </section>

          {/* Education & Certs */}
          <section>
            <h2 className="mb-10 flex items-center gap-3 text-2xl font-bold text-white uppercase tracking-wider font-mono">
              <GraduationCap className="h-6 w-6 text-emerald-500" />
              Education & Certifications
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
                <h4 className="font-bold text-white text-sm">ALX Software Engineering</h4>
                <p className="text-xs text-emerald-500 font-mono mt-1">Professional Development | 2024</p>
                <p className="text-xs text-slate-500 mt-2">Specialized in ProDev Frontend and AI Starter Kit.</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
                <h4 className="font-bold text-white text-sm">University of Rwanda</h4>
                <p className="text-xs text-emerald-500 font-mono mt-1">BSc Computer Science | In Progress</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-emerald-500/5 p-5 border-emerald-500/20 col-span-full">
                <h4 className="font-bold text-white text-sm mb-3">Google Cloud Certified Badges (22+)</h4>
                <div className="flex flex-wrap gap-2">
                  {["Vertex AI", "Generative AI Agents", "MLOps", "Model Armor", "Gemini SDLC"].map(tag => (
                    <span key={tag} className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20 font-mono">
                      {tag}
                    </span>
                  ))}
                  <span className="text-[10px] text-slate-500 italic">+17 more modules</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-sm sticky top-24">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white border-b border-slate-800 pb-2">Skill Matrix</h3>
            <div className="space-y-6">
              {skillMatrix.map(skill => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">{skill.name}</span>
                    <span className="text-cyan-500">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-800">
                    <div 
                      className="h-full rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.4)] transition-all duration-1000" 
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono">{skill.tools}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 rounded-xl bg-cyan-500/5 border border-cyan-500/20 p-4">
               <p className="text-[10px] font-mono text-cyan-500 leading-relaxed uppercase">
                 System Architecture focused on inclusive, secure, and available technologies.
               </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
