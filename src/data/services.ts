export interface Service {
  id: string;
  index: string;
  title: string;
  description: string;
  tags: string[];
}

export const services: Service[] = [
  {
    id: "full-stack-web-development",
    index: "01",
    title: "Full-Stack Web Development",
    description:
      "Complete web application development from frontend to backend with modern technologies like Next.js, React, Node.js, and PostgreSQL.",
    tags: [
      "RESPONSIVE DESIGN",
      "API DEVELOPMENT",
      "DATABASE INTEGRATION",
      "AUTHENTICATION SYSTEMS",
    ],
  },
  {
    id: "ui-ux-implementation",
    index: "02",
    title: "UI/UX Implementation",
    description:
      "Transforming designs into pixel-perfect, interactive user interfaces with smooth animations, modern typography, and optimal user experience.",
    tags: [
      "RESPONSIVE LAYOUTS",
      "INTERACTIVE COMPONENTS",
      "PERFORMANCE OPTIMIZATION",
      "CROSS-BROWSER COMPATIBILITY",
    ],
  },
  {
    id: "backend-custom-api-development",
    index: "03",
    title: "Backend & Custom API Development",
    description:
      "Building robust, scalable REST APIs and server architectures with clean endpoint documentation, structured database schemas, and dependable error handling.",
    tags: [
      "RESTFUL APIS",
      "DATABASE ARCHITECTURE",
      "DATA VALIDATION",
      "ERROR HANDLING",
      "API DOCUMENTATION",
    ],
  },
  {
    id: "authentication-security-systems",
    index: "04",
    title: "Authentication & Security Systems",
    description:
      "Implementing secure user registration, session management, password hashing, and granular Role-Based Access Control (RBAC) to safeguard protected routes and user data.",
    tags: [
      "SESSION SECURITY",
      "ROLE-BASED ACCESS CONTROL (RBAC)",
      "PASSWORD ENCRYPTION",
      "RATE LIMITING",
    ],
  },
  {
    id: "performance-optimization-code-refactoring",
    index: "05",
    title: "Performance Optimization & Code Refactoring",
    description:
      "Auditing and fine-tuning web applications for high Lighthouse scores, sub-second page loads, fluid 60fps animations, and converting codebases to clean TypeScript.",
    tags: [
      "PERFORMANCE OPTIMIZATION",
      "CORE WEB VITALS",
      "TYPESCRIPT REFACTORING",
      "BUNDLE OPTIMIZATION",
    ],
  },
];
