export interface SkillGroup {
  index: string;
  name: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    index: "01",
    name: "Languages",
    skills: ["C++", "Python", "JavaScript", "TypeScript"],
  },
  {
    index: "02",
    name: "Frameworks & Libraries",
    skills: ["Next.js", "React.js", "Node.js", "Express.js"],
  },
  {
    index: "03",
    name: "Styling / UI",
    skills: ["HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "Material UI"],
  },
  {
    index: "04",
    name: "Databases & Backend",
    skills: ["MongoDB", "MySQL", "PostgreSQL", "Supabase"],
  },
  {
    index: "05",
    name: "Tools & Platforms",
    skills: ["Git", "GitHub", "REST APIs", "OpenAPI Specification", "Vercel"],
  },
];

// Flat list of technologies strictly from the resume for marquee ticker & SEO schema
export const allTechSkills: string[] = [
  "Next.js",
  "React.js",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "Express.js",
  "Supabase",
  "Python",
  "C++",
  "JavaScript",
  "Tailwind CSS",
  "Prisma ORM",
  "MongoDB",
  "MySQL",
  "REST APIs",
  "Git",
  "GitHub",
  "Vercel",
  "OpenAPI Specification",
  "Material UI",
  "Bootstrap",
  "HTML5",
  "CSS3",
];
