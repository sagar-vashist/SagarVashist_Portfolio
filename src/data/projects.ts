export interface Project {
  slug: string;
  index: string;
  category: string;
  title: string;
  descriptor: string;
  bullets: string[];
  tech: string[];
  liveUrl: string; // Empty string: button gracefully hides
  githubUrl: string; // Empty string: button gracefully hides
  image: string; // Empty string: displays generative visual instead
  visual: "kanban" | "map" | "waveform";
}

// TODO: add liveUrl / githubUrl per project — buttons auto-appear when set
export const projects: Project[] = [
  {
    slug: "opsforge",
    index: "01",
    category: "Operations Platform",
    title: "OpsForge — Project & Software Operations Management Platform",
    descriptor:
      "All-in-one software operations and project workflow platform for startups and growing teams.",
    bullets: [
      "Developed a full-stack platform with 10+ functional areas using Next.js, React, TypeScript, Supabase, and PostgreSQL.",
      "Implemented authentication, RBAC, project and task management, Kanban workflows, issue tracking, notifications, and analytics.",
      "Deployed a responsive, production-ready UI on Vercel with end-to-end database integration.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
    liveUrl: "",
    githubUrl: "",
    image: "",
    visual: "kanban",
  },
  {
    slug: "wanderlust",
    index: "02",
    category: "Full-Stack Web App",
    title: "Wanderlust — Full-Stack Property Listing Platform",
    descriptor:
      "Full-stack property listing ecosystem with map-based geocoding, session security, and review management.",
    bullets: [
      "Developed and deployed a full-stack web application using Node.js, Express.js, PostgreSQL, and Prisma ORM.",
      "Implemented Passport.js authentication, bcrypt password security, session management, Role-Based Access Control (RBAC), and protected CRUD operations for property listings and user reviews.",
      "Integrated Cloudinary for image management, Geoapify for geocoding, and MapLibre GL for interactive maps.",
      "Implemented Helmet security headers, rate limiting, and input validation before deploying the platform on Vercel.",
    ],
    tech: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma ORM",
      "Passport.js",
      "bcrypt",
      "Cloudinary",
      "Geoapify",
      "MapLibre GL",
      "Helmet",
      "Vercel",
    ],
    liveUrl: "",
    githubUrl: "",
    image: "",
    visual: "map",
  },
  {
    slug: "prepwise-ai",
    index: "03",
    category: "AI / ML Analytics",
    title: "PrepWise AI — Intelligent Interview Analysis Platform",
    descriptor:
      "AI-powered interview performance evaluation system with speech recognition and vision tracking.",
    bullets: [
      "Developed an AI-powered interview analysis platform using speech recognition and real-time analytics to evaluate interview performance and generate personalized feedback.",
      "Automates key parts of interview assessment to reduce manual evaluation effort, adding AI/ML-based confidence analysis, eye-contact detection, and real-time performance insights.",
    ],
    tech: [
      "Speech recognition",
      "Real-time analytics",
      "AI/ML confidence analysis",
      "Eye-contact detection",
    ],
    liveUrl: "",
    githubUrl: "",
    image: "",
    visual: "waveform",
  },
];
