import { Mail, MessageSquare, Shield, Globe } from "lucide-react";

export const metadata = {
  title: "Contact | Aime Serge",
  description: "Get in touch for cybersecurity consulting or cloud engineering projects.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 py-12 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Secure <span className="text-cyan-500">Communication</span>
          </h1>
          <p className="mt-4 text-slate-400 text-lg leading-relaxed">
            Whether you’re interested in a <span className="text-white">Cybersecurity Audit</span>, 
            <span className="text-white">Cloud Infrastructure Design</span>, or 
            <span className="text-white">AI Automation</span>, I’m available for collaborative projects.
          </p>

          <div className="mt-12 space-y-6">
            <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-600/10 text-cyan-500">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-mono text-slate-500 uppercase tracking-wider">Primary Endpoint</p>
                <p className="text-lg font-bold text-white">aime@example.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-500">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-mono text-slate-500 uppercase tracking-wider">PGP Public Key</p>
                <p className="text-xs font-mono text-slate-400">0x7F4A...B9C2 (Available on request)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Placeholder */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-8 backdrop-blur-sm">
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-mono text-slate-400">SENDER_NAME</label>
              <input 
                type="text" 
                className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500" 
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-mono text-slate-400">SENDER_EMAIL</label>
              <input 
                type="email" 
                className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500" 
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-mono text-slate-400">MESSAGE_PAYLOAD</label>
              <textarea 
                rows={4}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500" 
                placeholder="Describe your project or inquiry..."
              />
            </div>
            <button 
              type="button"
              className="w-full rounded-xl bg-cyan-600 py-4 font-bold text-white transition hover:bg-cyan-700 hover:shadow-[0_0_20px_rgba(8,145,178,0.3)]"
            >
              Transmit Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
