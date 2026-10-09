export interface Profile {
  name: string;
  role: string;
  headline: string;
  subHeadline: string;
  location: string;
  educationShort: string;
  availability: string;
  email: string;
  phone: string; // Anti-scrape: revealed client-side on click
  photo: string; // Empty string: displays monogram "SV" instead
  links: {
    github: string;
    linkedin: string;
    website: string;
    resume: string;
  };
  summary: {
    paragraph1: string;
    paragraph2: string;
    paragraph3?: string;
  };
  facts: {
    label: string;
    value: string;
  }[];
}

export const profile: Profile = {
  name: "Sagar Vashist",
  role: "Full-Stack Developer",
  headline: "I build products that live between code, scale & intelligence.",
  subHeadline:
    "I build scalable web applications, AI-powered products and real-time systems with modern JavaScript, TypeScript and cloud tooling.",
  location: "Delhi, India",
  educationShort: "B.Tech '27",
  availability: "OPEN TO OPPORTUNITIES",
  email: "sagarvashist02@gmail.com",
  phone: "+91 8595407590",
  photo: "", // Optional profile image path; displays generative monogram card when empty
  links: {
    github: "https://github.com/sagar-vashist",
    linkedin: "https://www.linkedin.com/in/sagar-vashist-50841a244",
    website: "https://sagarvashist.dev",
    resume: "/Sagar_Vashist_Resume.pdf",
  },
  summary: {
    paragraph1:
      "I turn real problems into reliable software solutions, building full-stack products that work well from the database to the interface. Currently sharpening my DSA fundamentals and stepping into AI/ML.",
    paragraph2:
      "My day-to-day stack is JavaScript, TypeScript, Python and C++, with Next.js, React, Node.js, Express.js and PostgreSQL powering the applications I build. I focus on shipping complete platforms: secure authentication, role-based access control, well-structured databases, clean REST APIs and cloud deployment.",
    paragraph3:
      "I enjoy owning the whole journey of a product: understanding the problem, designing the solution, then building, deploying and refining it. I'm drawn to software engineering, backend systems and AI-powered applications, and I'm always looking for challenging projects where I can learn fast and build something that makes a real difference.",
  },
  facts: [
    { label: "BASED IN", value: "Delhi, India" },
    {
      label: "EDUCATION",
      value: "B.Tech, Electronics & Communication Engineering (2023–2027)",
    },
    {
      label: "INSTITUTE",
      value: "Bhagwan Parshuram Institute of Technology (GGSIPU)",
    },
    {
      label: "MOST RECENT ROLE",
      value:
        "Software Development Intern, Probey Services (P) Limited (Jun–Jul 2026)",
    },
  ],
};
