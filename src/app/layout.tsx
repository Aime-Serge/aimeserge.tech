import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Geist } from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/lib/security/headers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientWrapper from "@/components/layout/ClientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aime Serge | Cyber-Cloud Engineer & AI Architect",
  description: "Advanced Full-Stack Portfolio focused on Cybersecurity, Cloud Infrastructure, and AI-Powered Solutions.",
  metadataBase: new URL('https://aimeserge.dev'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-slate-950 font-sans antialiased selection:bg-cyan-500/30",
          geistSans.variable,
          jetbrainsMono.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          {/* Background Grid Decoration */}
          <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
          
          <Header />
          <main className="flex-1">
            <ClientWrapper>
              {children}
            </ClientWrapper>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
