// src/store/mockData.ts
import type { CaseStudy } from "@/modules/portfolio/caseStudy";

export const initialCaseStudies: CaseStudy[] = [
  {
    id: "cs-alx-project-nexus",
    slug: "alx-project-nexus",
    title: "ALX Project Nexus",
    tagline: "Monorepo / Capstone aggregator for ALX milestones",
    role: "Student / Integrator",
    url: "",
    summary:
      "Aggregator scaffold for ALX projects — manages builds, samples and deployment flows across course projects.",
    tools: ["Node.js", "Monorepo", "Scripts"],
    features: ["Build orchestration", "Project manifests"],
    pdfUrl: "/uploads/alx-project-nexus_case_study.pdf",
    createdAt: "2025-09-02"
  },
  {
    id: "cs-alx-intermediate-frontend",
    slug: "alx-intermediate-frontend",
    title: "ALX Intermediate Frontend",
    tagline: "Component patterns and intermediate React projects",
    role: "Frontend Developer / Student",
    url: "",
    summary:
      "Mid-level frontend exercises focusing on component architecture, state management and responsive UI.",
    tools: ["React", "Tailwind CSS", "Vite"],
    features: ["Reusable components", "Responsive design"],
    pdfUrl: "/uploads/alx-intermediate-frontend_case_study.pdf",
    createdAt: "2025-09-02"
  },
  {
    id: "cs-onlinestore-ecommerce-platform",
    slug: "online-store-ecommerce-platform",
    title: "ONLINESTORE — E-commerce Platform",
    tagline: "Client-side e-commerce platform (catalog, cart, checkout)",
    role: "Fullstack Frontend Developer",
    url: "https://onlinestore-e-commerce-platform.vercel.app",
    summary:
      "Storefront built with Next.js and Redux, featuring product catalog, cart, and checkout flows using mock APIs.",
    tools: ["Next.js", "Redux Toolkit", "TypeScript", "Tailwind CSS"],
    features: ["Product catalog", "Cart & checkout", "Mock API layer"],
    pdfUrl: "/uploads/online-store-ecommerce-platform_case_study.pdf",
    createdAt: "2025-09-02"
  },
  {
    id: "cs-iglo-tours-travel-webapp",
    slug: "iglo-tours-travel-webapp",
    title: "IgloTours Travel Webapp",
    tagline: "Destination showcase & booking flow",
    role: "Frontend Developer",
    url: "https://www.iglotours.com",
    summary:
      "Travel webapp with destination pages, booking forms and image-driven storytelling for immersive UX.",
    tools: ["React", "Tailwind CSS", "Vite"],
    features: ["Destination pages", "Inquiry/booking forms"],
    pdfUrl: "/uploads/iglo-tours-travel-webapp_case_study.pdf",
    createdAt: "2025-09-02"
  },
  {
    id: "cs-alx-listing-app-deployed",
    slug: "alx-listing-app-deployed",
    title: "ALX Listing App (Deployed)",
    tagline: "Production-preview of listing platform",
    role: "Frontend Developer / Maintainer",
    url: "",
    summary:
      "Deployed variant of a listing app showing listings, filters and detail pages with a focus on performance.",
    tools: ["Next.js", "Vercel", "Tailwind CSS"],
    features: ["Deployed preview", "Performance tuning"],
    pdfUrl: "/uploads/alx-listing-app-deployed_case_study.pdf",
    createdAt: "2025-09-02"
  },
  {
    id: "cs-alx-listing-app-04",
    slug: "alx-listing-app-04",
    title: "ALX Listing App — Iteration 04",
    tagline: "Feature iteration and component evolution",
    role: "Frontend Developer",
    url: "",
    summary:
      "Fourth milestone of the listing app with refined UX and data handling improvements.",
    tools: ["React", "Tailwind CSS"],
    features: ["Iterative improvements", "UX refinements"],
    pdfUrl: "/uploads/alx-listing-app-04_case_study.pdf",
    createdAt: "2025-09-02"
  },
  {
    id: "cs-prodev-mobile-app",
    slug: "prodev-mobile-app",
    title: "ProDev Mobile App",
    tagline: "Mobile-first prototype for ProDev program",
    role: "Mobile Developer",
    url: "",
    summary:
      "Mobile app prototype demonstrating mobile UX patterns and local persistence for ProDev program tasks.",
    tools: ["React Native / PWA", "LocalStorage"],
    features: ["Mobile UI", "Offline-first UX"],
    pdfUrl: "/uploads/prodev-mobile-app_case_study.pdf",
    createdAt: "2025-09-02"
  },
  {
    id: "cs-prodev-mobile-setup",
    slug: "prodev-mobile-setup",
    title: "ProDev Mobile Setup",
    tagline: "Mobile dev toolchain and boilerplate",
    role: "Developer / Maintainer",
    url: "",
    summary:
      "Boilerplate and setup scripts for mobile development used in ProDev workshops.",
    tools: ["Expo / React Native", "Scripts"],
    features: ["Dev setup", "Tooling"],
    pdfUrl: "/uploads/prodev-mobile-setup_case_study.pdf",
    createdAt: "2025-09-02"
  },
  {
    id: "cs-alx-pwa-0x01",
    slug: "alx-pwa-0x01",
    title: "ALX PWA 0x01",
    tagline: "Progressive Web App fundamentals",
    role: "PWA Developer",
    url: "",
    summary:
      "PWA fundamentals: manifest, service worker, caching strategies and offline experience tests.",
    tools: ["Service Worker", "Workbox", "Lighthouse"],
    features: ["Offline caching", "Installable web app"],
    pdfUrl: "/uploads/alx-pwa-0x01_case_study.pdf",
    createdAt: "2025-09-02"
  },
  {
    id: "cs-alx-graphql-0x03",
    slug: "alx-graphql-0x03",
    title: "ALX GraphQL 0x03",
    tagline: "Advanced GraphQL patterns and server-side resolvers",
    role: "API Engineer",
    url: "",
    summary:
      "Advanced GraphQL schemas and resolver logic with sample clients and mutation examples.",
    tools: ["Node.js", "GraphQL", "Apollo"],
    features: ["Schema design", "Resolvers & Mutations"],
    pdfUrl: "/uploads/alx-graphql-0x03_case_study.pdf",
    createdAt: "2025-09-02"
  },
  {
    id: "cs-alx-listing-app-03",
    slug: "alx-listing-app-03",
    title: "ALX Listing App — Iteration 03",
    tagline: "Third milestone of listing platform",
    role: "Frontend Developer",
    url: "",
    summary:
      "Third iteration focusing on listing detail UX and performance improvements.",
    tools: ["React", "Tailwind CSS"],
    features: ["Detail pages", "Filter UX"],
    pdfUrl: "/uploads/alx-listing-app-03_case_study.pdf",
    createdAt: "2025-09-02"
  },
  {
    id: "cs-alx-graphql-0x02",
    slug: "alx-graphql-0x02",
    title: "ALX GraphQL 0x02",
    tagline: "GraphQL intermediate examples",
    role: "API Engineer",
    url: "",
    summary:
      "GraphQL examples: queries, subscriptions and client usage examples.",
    tools: ["GraphQL", "Apollo Client"],
    features: ["Queries & Subscriptions", "Client examples"],
    pdfUrl: "/uploads/alx-graphql-0x02_case_study.pdf",
    createdAt: "2025-09-02"
  },
  {
    id: "cs-alx-graphql-0x01",
    slug: "alx-graphql-0x01",
    title: "ALX GraphQL 0x01",
    tagline: "GraphQL basics",
    role: "API Developer",
    url: "",
    summary:
      "Introductory GraphQL schemas and playground examples to teach query basics.",
    tools: ["GraphQL", "GraphiQL"],
    features: ["Basic schemas", "Playground examples"],
    pdfUrl: "/uploads/alx-graphql-0x01_case_study.pdf",
    createdAt: "2025-09-02"
  },
  {
    id: "cs-alx-graphql-0x00",
    slug: "alx-graphql-0x00",
    title: "ALX GraphQL 0x00",
    tagline: "GraphQL intro and setup",
    role: "Student",
    url: "",
    summary: "Getting started with GraphQL toolchain and local testing.",
    tools: ["GraphQL", "Playground"],
    features: ["Local testing", "Intro examples"],
    pdfUrl: "/uploads/alx-graphql-0x00_case_study.pdf",
    createdAt: "2025-09-02"
  },
  {
    id: "cs-alx-project-0x14",
    slug: "alx-project-0x14",
    title: "ALX Project 0x14",
    tagline: "Advanced ALX milestone project",
    role: "Student",
    url: "",
    summary: "Advanced milestone — check README for scope and artifacts to highlight.",
    tools: ["Depends on project"],
    features: ["Milestone deliverables"],
    pdfUrl: "/uploads/alx-project-0x14_case_study.pdf",
    createdAt: "2025-09-02"
  },
  {
    id: "cs-alx-project-0x05-setup",
    slug: "alx-project-0x05-setup",
    title: "ALX Project 0x05 Setup",
    tagline: "Project 0x05 starter scaffolding",
    role: "Student",
    url: "",
    summary: "Starter code and instructions for ALX Project 0x05.",
    tools: ["Scaffolding"],
    features: ["Starter templates"],
    pdfUrl: "/uploads/alx-project-0x05-setup_case_study.pdf",
    createdAt: "2025-09-02"
  },
  {
    id: "cs-alx-project-0x04-setup",
    slug: "alx-project-0x04-setup",
    title: "ALX Project 0x04 Setup",
    tagline: "Project 0x04 starter scaffolding",
    role: "Student",
    url: "",
    summary: "Starter code and instructions for ALX Project 0x04.",
    tools: ["Scaffolding"],
    features: ["Starter templates"],
    pdfUrl: "/uploads/alx-project-0x04-setup_case_study.pdf",
    createdAt: "2025-09-02"
  },
  {
    id: "cs-alx-listing-app-detail",
    slug: "alx-listing-app-detail",
    title: "ALX Listing App — Detail Pages",
    tagline: "Detailed product/listing views and UX polish",
    role: "Frontend Developer",
    url: "",
    summary:
      "Focus on listing detail UX, metadata, and deep-linking for SEO and shareability.",
    tools: ["React", "SEO"],
    features: ["Detail UX", "Metadata"],
    pdfUrl: "/uploads/alx-listing-app-detail_case_study.pdf",
    createdAt: "2025-09-02"
  },
  {
    id: "cs-my-success-story",
    slug: "my-success-story",
    title: "My Success Story",
    tagline: "Personal narrative & reflections",
    role: "Author",
    url: "",
    summary:
      "Personal narrative documenting the learning journey and professional milestones.",
    tools: ["Writing"],
    features: ["Narrative"],
    pdfUrl: "/uploads/my-success-story_case_study.pdf",
    createdAt: "2025-09-02"
  },
  {
    id: "cs-alx-project-0x00-setup",
    slug: "alx-project-0x00-setup",
    title: "ALX Project 0x00 Setup",
    tagline: "Bootcamp starter scaffolding",
    role: "Student",
    url: "",
    summary: "Initial starter code for the ALX learning path.",
    tools: ["Scaffolding"],
    features: ["Quickstart"],
    pdfUrl: "/uploads/alx-project-0x00-setup_case_study.pdf",
    createdAt: "2025-09-02"
  },
  {
    id: "cs-alx-project-0x01-setup",
    slug: "alx-project-0x01-setup",
    title: "ALX Project 0x01 Setup",
    tagline: "Project 0x01 scaffolding",
    role: "Student",
    url: "",
    summary: "Starter files and guidance for the first ALX milestone.",
    tools: ["Scaffolding"],
    features: ["Starter templates"],
    pdfUrl: "/uploads/alx-project-0x01-setup_case_study.pdf",
    createdAt: "2025-09-02"
  },
  {
    id: "cs-alx-project-0x03-setup",
    slug: "alx-project-0x03-setup",
    title: "ALX Project 0x03 Setup",
    tagline: "Project 0x03 scaffolding",
    role: "Student",
    url: "",
    summary: "Starter files for ALX project 0x03.",
    tools: ["Scaffolding"],
    features: ["Starter templates"],
    pdfUrl: "/uploads/alx-project-0x03-setup_case_study.pdf",
    createdAt: "2025-09-02"
  },
  {
    id: "cs-alx-project-0x02-setup",
    slug: "alx-project-0x02-setup",
    title: "ALX Project 0x02 Setup",
    tagline: "Project 0x02 scaffolding",
    role: "Student",
    url: "",
    summary: "Starter files for ALX project 0x02.",
    tools: ["Scaffolding"],
    features: ["Starter templates"],
    pdfUrl: "/uploads/alx-project-0x02-setup_case_study.pdf",
    createdAt: "2025-09-02"
  },
  {
    id: "cs-frontend-javascript",
    slug: "frontend-javascript",
    title: "Frontend JavaScript",
    tagline: "Core JavaScript projects & exercises",
    role: "Frontend Developer",
    url: "",
    summary:
      "Collection of JavaScript exercises and small apps demonstrating DOM, event handling, and ES6 patterns.",
    tools: ["JavaScript", "DOM", "ES6"],
    features: ["Small apps", "Algorithms"],
    pdfUrl: "/uploads/frontend-javascript_case_study.pdf",
    createdAt: "2025-09-02"
  },

  // === Beyond Success certificate (NEW) ===
  {
    id: "cs-beyond-success-2025",
    slug: "beyond-success-leadership-maxwell",
    title:
      "Beyond Success — Leadership Certificate (John C. Maxwell / EQUIP)",
    tagline: "Leadership & personal growth program",
    role: "Participant",
    url: "",
    summary:
      "Completed the Beyond Success leadership program by John C. Maxwell (EQUIP). Applied practical facilitation, goal-setting and mentoring frameworks to lead peer CPD and TA workshops, improving engagement and coordination.",
    tools: ["Leadership", "Mentoring", "Communication", "Workshop facilitation"],
    features: [
      "High-res certificate (proof)",
      "TA workshop slides & attendance log (evidence)",
      "Short reflection describing application"
    ],
    pdfUrl:
      "/uploads/BeyondSuccess_CaseStudy_AimeSergeUKOBIZABA.pdf",
    createdAt: "2025-09-02"
  }
];

export default initialCaseStudies;

