"use client";

import { useEffect, useState } from "react";

export const SECTION_IDS = [
  "index",
  "about",
  "work",
  "stack",
  "experience",
  "learning",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export function useActiveSection(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>("index");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const id = SECTION_IDS[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return activeSection;
}
