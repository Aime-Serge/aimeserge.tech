"use client";

import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link?: string;
}

export default function ResumePage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const res = await fetch("/api/certificates");
        if (res.ok) {
          const data = await res.json();
          setCertificates(data);
        }
      } catch (error) {
        console.error("Failed to fetch certificates:", error);
      }
    }
    fetchCertificates();
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">Resume</h1>
          <p className="max-w-2xl mx-auto text-blue-100 text-lg mb-8">
            Explore my background, skills, projects, and achievements — designed
            for admissions teams, collaborators, and recruiters.
          </p>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-white text-blue-700 font-medium shadow hover:bg-gray-100 transition"
          >
            Download PDF
          </a>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 space-y-20">
        {/* Contact Card */}
        <section>
          <div className="bg-white shadow rounded-2xl p-6 md:p-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Aime Serge UKOBIZABA
            </h2>
            <p className="text-gray-600 mb-4">
              Aspiring Software Engineer | Web Development | Research |
              AI-driven Projects
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <a href="mailto:aimeserge@example.com" className="hover:underline">
                aimeserge@example.com
              </a>
              <span>|</span>
              <span>Kigali, Rwanda</span>
              <span>|</span>
              <a href="https://github.com/aimeserge" className="hover:underline">
                GitHub
              </a>
              <span>|</span>
              <a
                href="https://linkedin.com/in/aimeserge"
                className="hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Professional Summary */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Passionate computer scientist with resilience in STEM and strong
            academic background. Experienced in{" "}
            <span className="font-medium text-gray-900">
              web development, research, and AI-driven projects
            </span>
            . Skilled at overcoming challenges, driving innovation, and
            contributing to impactful solutions — especially in tackling{" "}
            <span className="font-medium text-gray-900">climate change</span>.
          </p>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Education</h2>
          <div className="bg-gray-50 p-6 rounded-xl shadow text-gray-700">
            <h3 className="text-xl font-semibold text-blue-700 mb-1">
              Software Engineering (Undergraduate Applicant)
            </h3>
            <p className="mb-1">Arizona State University (ASU)</p>
            <p className="text-sm text-gray-500">
              Strong academic performance in STEM with proven resilience and
              growth.
            </p>
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "SoloForge",
                desc: "Built a modern web application with Next.js, TypeScript, and Tailwind to master autonomous workflows.",
              },
              {
                title: "Reactify TS",
                desc: "Advanced React project exploring TypeScript, custom layouts, error handling, and 404 pages.",
              },
              {
                title: "StateCraft",
                desc: "Implemented state management using useState, Context API, and Redux for scalable React apps.",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-left"
              >
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  {p.title}
                </h3>
                <p className="text-gray-600 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Tailwind CSS",
              "Redux",
              "Node.js",
              "Python",
              "Data Analysis",
              "AI & Machine Learning",
              "Git/GitHub",
              "REST APIs",
              "Problem Solving",
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium shadow hover:bg-blue-100 transition"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Research & Highlights */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Research & Highlights
          </h2>
          <div className="space-y-6">
            <div className="p-6 bg-gray-50 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                Newborn Tracking System
              </h3>
              <p className="text-gray-600">
                Built a collective data system for long-term newborn tracking in
                ministries, handling ambiguous data with scalable design.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                TAP Program (IEE Rwanda x Mastercard Foundation)
              </h3>
              <p className="text-gray-600">
                Contributed by demonstrating persistence, collaboration, and
                problem-solving skills in community-driven STEM projects.
              </p>
            </div>
          </div>
        </section>

        {/* Certificates & Rewards */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Rewards & Certificates
          </h2>
          {certificates.length === 0 ? (
            <p className="text-gray-500">
              No certificates uploaded yet. Please check back later.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-semibold text-blue-700 mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">
                    Issued by {cert.issuer}
                  </p>
                  <p className="text-gray-500 text-xs mb-2">{cert.date}</p>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm hover:underline"
                    >
                      View Certificate →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </MainLayout>
  );
}
