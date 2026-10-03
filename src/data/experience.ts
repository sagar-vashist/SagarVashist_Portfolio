export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  skills: string[];
}

export const experiences: ExperienceItem[] = [
  {
    role: "Software Development Intern",
    company: "Probey Services (P) Limited",
    location: "Noida, India",
    period: "Jun 2026 – Jul 2026",
    bullets: [
      "Contributed to OpsForge, an all-in-one software operations management platform, building features for project workflows, task management, issue tracking and team collaboration for startups and growing teams.",
      "Built responsive application features with Next.js, React, TypeScript, Supabase and PostgreSQL, with hands-on work in database integration, validation, debugging and Git/GitHub-based version control.",
    ],
    skills: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Git"],
  },
  {
    role: "Summer Intern",
    company: "Brainwave Matrix Solutions",
    location: "Noida, India",
    period: "Apr 2025 – May 2025",
    bullets: [
      "Developed and optimized C++ applications using object-oriented programming and data structures, improving code efficiency, scalability and maintainability.",
      "Debugged, tested and enhanced software modules with problem-solving and clean-coding practices to keep application performance reliable.",
      "Collaborated in an Agile environment using Git for version control, contributing to team-based software delivery.",
    ],
    skills: ["C++", "OOP", "Data Structures", "Git", "Agile"],
  },
];
