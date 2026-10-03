import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sagar Vashist — Full-Stack Developer",
    short_name: "Sagar Vashist",
    description:
      "Personal portfolio of Sagar Vashist, Full-Stack Developer building modern web applications with Next.js, React, Node.js, and TypeScript.",
    start_url: "/",
    display: "standalone",
    background_color: "#060708",
    theme_color: "#060708",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
