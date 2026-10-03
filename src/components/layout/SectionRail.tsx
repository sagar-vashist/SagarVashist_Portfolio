"use client";

import React from "react";
import { useActiveSection, SECTION_IDS } from "@/hooks/useActiveSection";
import { useLenis } from "@/hooks/useLenis";
import { Tooltip } from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";

const SECTION_LABELS: Record<string, string> = {
  index: "00 — Hero",
  about: "01 — About",
  work: "02 — Work",
  stack: "03 — Stack",
  experience: "04 — Experience",
  learning: "05 — Learning",
  contact: "06 — Contact",
};

export function SectionRail() {
  const activeSection = useActiveSection();
  const { scrollTo } = useLenis();

  return (
    <nav
      aria-label="Section navigation rail"
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4 py-4 px-2 rounded-full bg-[var(--surface)]/80 backdrop-blur-md border border-[var(--line)] shadow-xl"
    >
      {SECTION_IDS.map((id, index) => {
        const isActive = activeSection === id;
        const monoIndex = `0${index}`;

        return (
          <Tooltip key={id} content={SECTION_LABELS[id]} position="left">
            <button
              type="button"
              onClick={() => scrollTo(`#${id}`)}
              aria-label={`Jump to section ${SECTION_LABELS[id]}`}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "group relative flex items-center justify-center w-6 h-6 rounded-full cursor-pointer transition-all duration-300",
                "focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
              )}
            >
              {/* Dot */}
              <span
                className={cn(
                  "rounded-full transition-all duration-300",
                  isActive
                    ? "w-2.5 h-2.5 bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]"
                    : "w-1.5 h-1.5 bg-[var(--text-dim)] group-hover:bg-[var(--text-muted)] group-hover:scale-125"
                )}
              />
              <span className="sr-only">{monoIndex}</span>
            </button>
          </Tooltip>
        );
      })}
    </nav>
  );
}
