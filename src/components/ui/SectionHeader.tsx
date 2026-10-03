import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: string;
  subLabel?: string;
  className?: string;
}

export function SectionHeader({
  index,
  label,
  title,
  subLabel,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      {/* Top Hairline & Index Row */}
      <div className="flex items-center gap-4 py-3 hairline border-b border-[var(--line)]">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)] font-semibold">
          {index}
        </span>
        <span className="h-1 w-1 rounded-full bg-[var(--text-dim)]" />
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
          {label}
        </span>
        {subLabel && (
          <>
            <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-dim)]">
              {subLabel}
            </span>
          </>
        )}
      </div>

      {/* Main Display Title */}
      <div className="mt-6 md:mt-8">
        <h2 className="font-display text-[clamp(2rem,4.5vw+0.5rem,4.75rem)] font-bold tracking-[-0.03em] leading-[0.98] text-[var(--text)]">
          {title}
        </h2>
      </div>
    </div>
  );
}
