"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function KanbanVisual() {
  const prefersReduced = useReducedMotion();
  const [activeCol, setActiveCol] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced) return;

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const interval = setInterval(() => {
      if (isVisible && !document.hidden) {
        setActiveCol((prev) => (prev % 3) + 1);
      }
    }, 2800);

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [prefersReduced]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative w-full h-full min-h-[260px] md:min-h-[340px] rounded-2xl bg-[var(--bg)]/80 border border-[var(--line)] p-5 md:p-6 flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Background architectural grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(92,242,196,0.06)_0%,transparent_60%)] pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] signal-dot" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
            WORKFLOW ENGINE
          </span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[var(--line-strong)]" />
          <span className="w-2 h-2 rounded-full bg-[var(--line-strong)]" />
        </div>
      </div>

      {/* Three Columns */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 my-auto py-2">
        {/* Column 1 */}
        <div className="flex flex-col gap-2.5 p-2 rounded-xl bg-[var(--surface)]/60 border border-[var(--line)]">
          <div className="h-2 w-12 rounded bg-[var(--line-strong)] mb-1" />
          <div
            className={`p-2.5 rounded-lg border transition-all duration-700 ${
              activeCol === 1
                ? "border-[var(--accent)] bg-[var(--accent)]/10 shadow-[0_0_15px_rgba(92,242,196,0.15)]"
                : "border-[var(--line)] bg-[var(--bg-elev)]"
            }`}
          >
            <div className="h-1.5 w-full rounded bg-[var(--line-strong)] mb-1.5" />
            <div className="h-1.5 w-2/3 rounded bg-[var(--line)]" />
          </div>
          <div className="p-2.5 rounded-lg border border-[var(--line)] bg-[var(--bg-elev)] opacity-60">
            <div className="h-1.5 w-3/4 rounded bg-[var(--line-strong)]" />
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-2.5 p-2 rounded-xl bg-[var(--surface)]/60 border border-[var(--line)]">
          <div className="h-2 w-16 rounded bg-[var(--line-strong)] mb-1" />
          <div
            className={`p-2.5 rounded-lg border transition-all duration-700 ${
              activeCol === 2
                ? "border-[var(--accent)] bg-[var(--accent)]/10 shadow-[0_0_15px_rgba(92,242,196,0.15)]"
                : "border-[var(--line)] bg-[var(--bg-elev)]"
            }`}
          >
            <div className="h-1.5 w-4/5 rounded bg-[var(--line-strong)] mb-1.5" />
            <div className="h-1.5 w-1/2 rounded bg-[var(--line)]" />
          </div>
          <div className="p-2.5 rounded-lg border border-[var(--line)] bg-[var(--bg-elev)] opacity-60">
            <div className="h-1.5 w-full rounded bg-[var(--line-strong)]" />
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-2.5 p-2 rounded-xl bg-[var(--surface)]/60 border border-[var(--line)]">
          <div className="h-2 w-10 rounded bg-[var(--line-strong)] mb-1" />
          <div
            className={`p-2.5 rounded-lg border transition-all duration-700 ${
              activeCol === 3
                ? "border-[var(--accent)] bg-[var(--accent)]/10 shadow-[0_0_15px_rgba(92,242,196,0.15)]"
                : "border-[var(--line)] bg-[var(--bg-elev)]"
            }`}
          >
            <div className="h-1.5 w-3/4 rounded bg-[var(--line-strong)] mb-1.5" />
            <div className="h-1.5 w-1/3 rounded bg-[var(--line)]" />
          </div>
          <div className="p-2.5 rounded-lg border border-[var(--line)] bg-[var(--bg-elev)] opacity-60">
            <div className="h-1.5 w-4/5 rounded bg-[var(--line-strong)]" />
          </div>
        </div>
      </div>

      {/* Footer State */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--line)]">
        <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-dim)]">
          STATE: RBAC / PIPELINE
        </span>
        <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--accent)]">
          STAGE 0{activeCol} ACTIVE
        </span>
      </div>
    </div>
  );
}
