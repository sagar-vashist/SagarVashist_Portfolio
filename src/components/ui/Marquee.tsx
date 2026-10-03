import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
}

export function Marquee({ items, className = "" }: MarqueeProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden py-4 border-y border-[var(--line)] bg-[var(--bg-elev)]/50 select-none",
        className
      )}
      aria-label="Technologies and competencies ticker"
    >
      {/* Edge gradient masks */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-r from-[var(--bg)] to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-l from-[var(--bg)] to-transparent"
        aria-hidden="true"
      />

      <div className="flex w-max animate-marquee items-center gap-8 md:gap-12">
        {/* Track 1 */}
        <div className="flex items-center gap-8 md:gap-12 shrink-0">
          {items.map((tech, idx) => (
            <div key={`track1-${idx}`} className="flex items-center gap-6">
              <span className="font-mono text-xs md:text-sm uppercase tracking-[0.18em] text-[var(--text-muted)] font-medium hover:text-[var(--accent)] transition-colors">
                {tech}
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/40 shrink-0"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        {/* Track 2 (Duplicate for seamless continuous loop) */}
        <div className="flex items-center gap-8 md:gap-12 shrink-0" aria-hidden="true">
          {items.map((tech, idx) => (
            <div key={`track2-${idx}`} className="flex items-center gap-6">
              <span className="font-mono text-xs md:text-sm uppercase tracking-[0.18em] text-[var(--text-muted)] font-medium hover:text-[var(--accent)] transition-colors">
                {tech}
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/40 shrink-0"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
