"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "left" | "top" | "bottom" | "right";
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = "left",
  className = "",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    left: "right-full mr-3 top-1/2 -translate-y-1/2",
    right: "left-full ml-3 top-1/2 -translate-y-1/2",
    top: "bottom-full mb-3 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-3 left-1/2 -translate-x-1/2",
  };

  return (
    <div
      className={cn("relative inline-flex items-center", className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={cn(
            "pointer-events-none absolute z-50 whitespace-nowrap px-2.5 py-1 rounded-md",
            "bg-[var(--surface)] text-[var(--text)] border border-[var(--line-strong)]",
            "font-mono text-[10px] uppercase tracking-widest shadow-lg",
            positionStyles[position]
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
