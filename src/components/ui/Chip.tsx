import React from "react";
import { cn } from "@/lib/utils";

interface ChipProps {
  label: string;
  className?: string;
  icon?: React.ReactNode;
}

export function Chip({ label, className, icon }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider",
        "bg-[var(--bg-elev)] border border-[var(--line)] text-[var(--text-muted)]",
        "transition-all duration-200 select-none",
        "hover:border-[var(--line-strong)] hover:text-[var(--text)] hover:-translate-y-0.5",
        className
      )}
    >
      {icon && <span className="opacity-75">{icon}</span>}
      <span>{label}</span>
    </span>
  );
}
