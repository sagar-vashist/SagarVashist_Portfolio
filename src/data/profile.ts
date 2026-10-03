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
  };
  facts: {
    label: string;
    value: string;
  }[];
}

export const profile: Profile = {
  name: "Sagar Vashist",
  role: "Full-Stack Developer",
  headline: "Building full-stack products, end to end.",
  subHeadline:
    "Next.js, React, Node.js, TypeScript and PostgreSQL — with authentication, role-based access control and cloud deployment built in.",
  location: "Delhi, India",
  educationShort: "B.Tech ECE '27",
  availability: "OPEN TO OPPORTUNITIES",
  email: "sagarvashist02@gmail.com",
  phone: "+91 8595407590",
  photo: "", // Optional profile image path; displays generative monogram card when empty
  links: {
    github: "https://github.com/sagar-vashist",
    linkedin: "https://linkedin.com/in/sagar-vashist",
    website: "https://sagarvashist.dev",
    resume: "/Sagar_Vashist_Resume.pdf",
  },
  summary: {
    paragraph1:
      "I'm a full-stack developer and B.Tech Electronics & Communication Engineering student working in JavaScript, TypeScript, Python and C++. I build production web applications with Next.js, React, Node.js, Express.js, PostgreSQL and REST API design.",
    paragraph2:
      "My work centers on shipping complete platforms — authentication, role-based access control, databases and cloud deployment — and I'm building depth in AI and machine learning alongside it.",
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
