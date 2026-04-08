"use client";

import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 via-white to-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
            Hi, I’m <span className="text-blue-600">Aime Serge UKOBIZABA</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 leading-relaxed mb-10">
            A passionate software engineer committed to leveraging{" "}
            <span className="font-medium text-gray-800">technology and innovation</span>{" "}
            to tackle global challenges like <strong>climate change </strong>, while building scalable 
            solutions in <strong>EduTech</strong>, <strong>HealthTech</strong>, <strong>AgriTech</strong>, <strong>Cyber-Security Prottypes</strong>. I do build and explore <span className="font-medium text-gray-800">Web, PWA, Apps and Mobile  Development</span>,{" "}
            <span className="font-medium text-gray-800">Research</span>, and{" "}
            <span className="font-medium text-gray-800">AI-driven projects and IT Security Explores</span>.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/projects"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium shadow-lg hover:shadow-xl hover:bg-blue-700 transition"
            >
              Latest Projects
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-green-300 text-gray-800 font-medium hover:bg-gray-200 shadow transition"
            >
              Contact Me
            </Link>
            <Link
              href="/resume"
              className="px-6 py-3 rounded-xl bg-gray-200 text-gray-800 font-medium hover:bg-gray-200 shadow transition"
            >
            Resume/CV
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="w-full h-64 bg-gradient-to-tr from-blue-200 to-blue-400 rounded-2xl shadow-lg" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Me</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              I’m a computer scientist with strong academic resilience and 
              hands-on experience in software engineering. My journey reflects 
              persistence and growth: overcoming challenges to excel in STEM 
              studies, lead innovative projects, and contribute to my community.
            </p>
            <p className="text-gray-600 leading-relaxed">
              I’m especially passionate about applying computer science to{" "}
              <span className="font-medium text-gray-800">climate change solutions</span> 
              and real-world impact — aligning innovation with purpose.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-left">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">SoloForge</h3>
              <p className="text-gray-600 text-sm mb-3">
                Built a modern web application with Next.js, TypeScript, and Tailwind 
                to master autonomous project development workflows.
              </p>
              <Link href="/projects" className="text-blue-600 text-sm font-medium hover:underline">
                Learn more →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-left">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">Reactify TS</h3>
              <p className="text-gray-600 text-sm mb-3">
                Advanced React project exploring TypeScript, custom layouts, error 
                handling, and 404 pages for professional web apps.
              </p>
              <Link href="/projects" className="text-blue-600 text-sm font-medium hover:underline">
                Learn more →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-left">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">StateCraft</h3>
              <p className="text-gray-600 text-sm mb-3">
                Implemented state management using useState, Context API, and Redux 
                to design scalable React applications.
              </p>
              <Link href="/projects" className="text-blue-600 text-sm font-medium hover:underline">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Technical Skills</h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-10">
          A snapshot of the tools and technologies I work with to build scalable, 
          modern applications and contribute to impactful research.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Redux",
            "Node.js",
            "Express",
            "Javacript",
            "React Native",
            "CSS3/CSS",
            "HTML5",
            "SQL and MangoDB databases",
            "Java",
            "C/C++",
            "Visual Basic/VB.net",
            "SWift",
            "Python",
            "Data Analysis",
            "AI & Machine Learning",
            "Git/GitHub Technoligies",
            "REST APIs and Graphql",
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

      {/* Quick Navigation CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Explore My Portfolio</h2>
          <p className="max-w-2xl mx-auto mb-10 text-blue-100">
            Quick access to key sections of my work — designed for admissions 
            teams, collaborators, and mentors.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/resume"
              className="px-6 py-3 bg-white text-blue-700 rounded-xl font-medium shadow hover:bg-gray-100 transition"
            >
              Resume & Skills
            </Link>
            <Link
              href="/projects"
              className="px-6 py-3 bg-white text-blue-700 rounded-xl font-medium shadow hover:bg-gray-100 transition"
            >
              Projects
            </Link>
            <Link
              href="/research"
              className="px-6 py-3 bg-white text-blue-700 rounded-xl font-medium shadow hover:bg-gray-100 transition"
            >
              Research
            </Link>
            <Link
              href="/research"
              className="px-6 py-3 bg-white text-blue-700 rounded-xl font-medium shadow hover:bg-gray-100 transition"
            >
              Blogs
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-blue-700 rounded-xl font-medium shadow hover:bg-gray-100 transition"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
