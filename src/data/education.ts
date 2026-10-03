export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
}

export const educationList: EducationItem[] = [
  {
    degree:
      "Bachelor of Technology (B.Tech), Electronics & Communication Engineering",
    institution:
      "Bhagwan Parshuram Institute of Technology (GGSIPU)",
    location: "Delhi, India",
    period: "2023 – 2027",
  },
  {
    degree: "Higher Secondary Schooling (CBSE)",
    institution: "Mother Divine Public School",
    location: "Delhi, India",
    period: "2022",
  },
];
