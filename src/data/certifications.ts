export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  badge: string; // Identifier or icon token
}

export const certifications: CertificationItem[] = [
  {
    title: "Google × Kaggle Intensive Vibe-Coding Course",
    issuer: "Google × Kaggle",
    date: "Jul 2026",
    badge: "kaggle",
  },
  {
    title: "Yuva AI for All",
    issuer: "NIELIT",
    date: "Jun 2026",
    badge: "nielit",
  },
  {
    title: "Machine Learning Using Python",
    issuer: "Simplilearn",
    date: "May 2026",
    badge: "simplilearn",
  },
  {
    title: "Introduction to Generative AI Studio",
    issuer: "Google Cloud",
    date: "Jul 2025",
    badge: "gcp",
  },
];
