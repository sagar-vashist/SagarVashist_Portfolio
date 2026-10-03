"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function MapVisual() {
  const prefersReduced = useReducedMotion();
  const [pulsePhase, setPulsePhase] = useState(0);
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
        setPulsePhase((prev) => (prev + 1) % 3);
      }
    }, 2200);

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
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] signal-dot" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
            GEO-COORDINATES / MAPLIBRE
          </span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--accent)]">
          28.6139° N, 77.2090° E
        </span>
      </div>

      {/* SVG Map Grid & Contour Field */}
      <div className="relative w-full h-44 my-auto flex items-center justify-center">
        <svg
          viewBox="0 0 400 200"
          className="w-full h-full stroke-[var(--line-strong)] fill-none overflow-visible"
        >
          {/* Topographical Contour Curves */}
          <path
            d="M 20,40 Q 100,10 200,45 T 380,30"
            stroke="var(--line)"
            strokeWidth="1"
          />
          <path
            d="M 10,90 Q 90,50 180,95 T 390,75"
            stroke="var(--line)"
            strokeWidth="1"
          />
          <path
            d="M 20,140 Q 110,120 220,150 T 380,125"
            stroke="var(--line)"
            strokeWidth="1"
          />
          <path
            d="M 30,180 Q 130,165 240,185 T 370,170"
            stroke="var(--line)"
            strokeWidth="1"
          />

          {/* Faint Route Line */}
          <path
            d="M 80,130 C 140,70 190,140 260,80 S 330,110 350,70"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="opacity-70"
          />

          {/* Location Pin 1 */}
          <g transform="translate(80, 130)">
            <circle
              r={pulsePhase === 0 ? "12" : "6"}
              fill="rgba(92,242,196,0.15)"
              className="transition-all duration-700"
            />
            <circle r="4" fill="var(--accent)" />
          </g>

          {/* Location Pin 2 */}
          <g transform="translate(260, 80)">
            <circle
              r={pulsePhase === 1 ? "12" : "6"}
              fill="rgba(92,242,196,0.15)"
              className="transition-all duration-700"
            />
            <circle r="4" fill="var(--accent)" />
          </g>

          {/* Location Pin 3 */}
          <g transform="translate(350, 70)">
            <circle
              r={pulsePhase === 2 ? "12" : "6"}
              fill="rgba(92,242,196,0.15)"
              className="transition-all duration-700"
            />
            <circle r="4" fill="var(--accent)" />
          </g>
        </svg>
      </div>

      {/* Bottom Status */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--line)] z-10">
        <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-dim)]">
          GEOCODING CACHE: ACTIVE
        </span>
        <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)]">
          TILES: VECTOR
        </span>
      </div>
    </div>
  );
}
