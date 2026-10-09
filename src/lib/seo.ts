import { profile } from "@/data/profile";
import { allTechSkills } from "@/data/skills";

export const siteConfig = {
  name: "Sagar Vashist",
  role: "Full-Stack Developer",
  title: "Sagar Vashist — Full-Stack Developer | Next.js, React, Node.js",
  description:
    "Portfolio of Sagar Vashist, a full-stack developer and B.Tech ECE student in Delhi building production web apps with Next.js, React, Node.js, TypeScript and PostgreSQL.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sagarvashist.vercel.app",
  ogImage: "/opengraph-image",
  availability: profile.availability,
};

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: siteConfig.url,
    email: profile.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Delhi",
      addressCountry: "IN",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Bhagwan Parshuram Institute of Technology (GGSIPU)",
      },
      {
        "@type": "EducationalOrganization",
        name: "Mother Divine Public School",
      },
    ],
    sameAs: [profile.links.github, profile.links.linkedin],
    knowsAbout: allTechSkills,
  };
}
