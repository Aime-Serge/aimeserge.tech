"use client";

import { useEffect, useState } from "react";
import { Shield, CheckCircle2, AlertCircle, Lock, Globe, Server, Terminal } from "lucide-react";

interface SecurityStatus {
  header: string;
  status: "secure" | "warning" | "loading";
  value: string;
  description: string;
  technicalInfo?: string;
}

export default function SecurityAudit() {
  const [isScanning, setIsScanning] = useState(true);
  const [audit, setAudit] = useState<SecurityStatus[]>([
    { header: "Content-Security-Policy", status: "loading", value: "-", description: "Mitigates XSS and data injection attacks." },
    { header: "Strict-Transport-Security", status: "loading", value: "-", description: "Forces secure HTTPS connections." },
    { header: "X-Frame-Options", status: "loading", value: "-", description: "Prevents clickjacking attacks." },
    { header: "X-Content-Type-Options", status: "loading", value: "-", description: "Prevents MIME-type sniffing." },
    { header: "Referrer-Policy", status: "loading", value: "-", description: "Controls how much referrer info is shared." },
  ]);

  useEffect(() => {
    // Simulated deep system scan
    const timer = setTimeout(() => {
      setAudit([
        { 
          header: "Content-Security-Policy", 
          status: "secure", 
          value: "Active", 
          description: "Mitigates XSS and data injection attacks.",
          technicalInfo: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; upgrade-insecure-requests;"
        },
        { 
          header: "Strict-Transport-Security", 
          status: "secure", 
          value: "max-age=31536000", 
          description: "Forces secure HTTPS connections.",
          technicalInfo: "IncludeSubdomains; Preload; Verified on HSTS list."
        },
        { 
          header: "X-Frame-Options", 
          status: "secure", 
          value: "DENY", 
          description: "Prevents clickjacking attacks.",
          technicalInfo: "Denies all frame embedding to prevent click-fraud."
        },
        { 
          header: "X-Content-Type-Options", 
          status: "secure", 
          value: "nosniff", 
          description: "Prevents MIME-type sniffing.",
          technicalInfo: "Blocks requests if destination type is not correct."
        },
        { 
          header: "Referrer-Policy", 
          status: "secure", 
          value: "strict-origin", 
          description: "Controls how much referrer info is shared.",
          technicalInfo: "Only sends referrer info for same-origin requests."
        },
      ]);
      setIsScanning(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-md">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
            {isScanning ? <Terminal className="h-5 w-5 animate-pulse" /> : <Shield className="h-5 w-5" />}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono">Cyber-Posture Audit</h3>
            <p className="text-[10px] text-cyan-500/70 font-mono">
              {isScanning ? "INITIATING_SYSTEM_SCAN..." : "SYSTEM_STATE :: HARDENED"}
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-mono text-emerald-400">
          <Lock className="h-3 w-3" />
          SSL_VERIFIED :: TLS_1.3
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {audit.map((item) => (
          <div key={item.header} className="group flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-950/40 p-4 transition hover:bg-slate-900/60 hover:border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-300 font-mono">{item.header}</span>
              {item.status === "secure" ? (
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" />
                  VERIFIED
                </span>
              ) : item.status === "loading" ? (
                <span className="flex items-center gap-2">
                   <div className="h-1 w-12 overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full w-full animate-progress-indefinite bg-cyan-500" />
                   </div>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-amber-400">
                  <AlertCircle className="h-3 w-3" />
                  WARNING
                </span>
              )}
            </div>
            
            <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
            
            {!isScanning && (
              <div className="mt-2 hidden group-hover:block animate-in fade-in slide-in-from-top-1 duration-300">
                <div className="rounded-lg bg-slate-900/80 p-2 border border-slate-800">
                  <p className="text-[9px] font-mono text-cyan-500 break-all leading-tight">
                    {item.technicalInfo}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 border-t border-slate-800 pt-6">
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
          <Globe className="h-3 w-3" />
          HSTS: PRELOADED
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
          <Server className="h-3 w-3" />
          WAF: CLOUDFLARE_EDGE
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-500/60">
          <Shield className="h-3 w-3" />
          ZERO-TRUST: ACTIVE
        </div>
      </div>
    </div>
  );
}
