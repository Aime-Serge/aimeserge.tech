import Link from "next/link";
import React from "react";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { motion } from "framer-motion";
import { easeOut } from "popmotion"; // ✅ added import

export default function ProjectsPage() {
  const caseStudies = useAppSelector((s: RootState) => s.caseStudies.items);
  const projects = useAppSelector((s: RootState) => s.projects.items);

  // ✅ Fixed Animation variants
  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut }, // typed easing
    },
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 min-h-screen">
      <main className="container mx-auto px-6 py-16">
        {/* Page Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-center text-gray-800 mb-20 tracking-tight">
          Projects & Case Studies
        </h1>

        {/* Featured Case Studies */}
        <section id="case-studies" className="mb-24 relative">2
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 border-b-4 border-gradient-to-r from-blue-400 to-purple-500 pb-2">
            Featured Case Studies
          </h2>

          {caseStudies.length === 0 ? (
            <div className="p-12 bg-white rounded-3xl shadow-xl text-center text-gray-500 text-lg">
              No case studies yet.
            </div>
          ) : (
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((cs) => (
                <motion.div
                  key={cs.id}
                  variants={cardVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <Link
                    href={`/projects/${cs.slug}`}
                    className="bg-white rounded-3xl shadow-xl p-8 border hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-800 mb-3">{cs.title}</h3>
                      <p className="text-gray-600 text-sm mb-5 line-clamp-3">
                        {cs.tagline || cs.summary}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 mt-auto flex justify-between">
                      <span className="italic">{cs.role}</span>
                      <span>{new Date(cs.createdAt).toLocaleDateString()}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Decorative Divider */}
        <div className="w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 my-16 rounded-full"></div>

        {/* Other Projects */}
        <section id="projects">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 border-b-4 border-gradient-to-r from-green-400 to-teal-500 pb-2">
            Other Projects
          </h2>

          {projects.length === 0 ? (
            <div className="p-12 bg-white rounded-3xl shadow-xl text-center text-gray-500 text-lg">
              No projects yet.
            </div>
          ) : (
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <motion.div
                  key={p.id}
                  variants={cardVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="bg-white rounded-3xl shadow-xl p-8 border hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-800 mb-3">{p.title}</h3>
                      <p className="text-gray-600 text-sm mb-5 line-clamp-3">{p.description}</p>
                    </div>
                    <div className="mt-auto flex justify-between items-center text-xs text-gray-500">
                      <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 text-sm font-medium hover:underline"
                        >
                          Live demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
  