"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/security/headers";

const navItems = [
  { name: "Projects", href: "/projects" },
  { name: "Research", href: "/research" },
  { name: "Blog", href: "/blog" },
  { name: "Resume", href: "/resume" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/50 bg-slate-950/70 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600/20 text-cyan-500 transition-colors group-hover:bg-cyan-600 group-hover:text-white">
            <Shield className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white font-mono">
            AIME<span className="text-cyan-500">_</span>SERGE
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-cyan-400",
                pathname === item.href ? "text-cyan-400" : "text-slate-400"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/terminal"
            className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-1.5 text-xs font-mono text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            <Terminal className="h-3.5 w-3.5" />
            Terminal_Access
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-400 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-6 py-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "block text-sm font-medium",
                pathname === item.href ? "text-cyan-400" : "text-slate-400"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/terminal"
            className="flex items-center gap-2 text-sm font-mono text-cyan-500"
          >
            <Terminal className="h-4 w-4" />
            Terminal_Access
          </Link>
        </div>
      )}
    </header>
  );
}
