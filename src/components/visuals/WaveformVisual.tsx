"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function WaveformVisual() {
  const prefersReduced = useReducedMotion();
  const [reticlePos, setReticlePos] = useState({ x: 50, y: 50 });
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

    let angle = 0;
    const interval = setInterval(() => {
      if (isVisible && !document.hidden) {
        angle += 0.35;
        // Lissajous-style gentle drift for eye-tracking reticle
        const x = 50 + Math.sin(angle) * 22;
        const y = 50 + Math.cos(angle * 1.5) * 18;
        setReticlePos({ x, y });
      }
    }, 100);

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [prefersReduced]);

  const waveformBars = [
    30, 45, 60, 85, 40, 70, 95, 60, 80, 50, 65, 90, 75, 45, 30, 55, 80, 100, 70, 40, 60, 85, 50, 35
  ];

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative w-full h-full min-h-[260px] md:min-h-[340px] rounded-2xl bg-[var(--bg)]/80 border border-[var(--line)] p-5 md:p-6 flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] signal-dot" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
            GAZE & AUDIO TELEMETRY
          </span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--accent)]">
          CONFIDENCE: 98.4%
        </span>
      </div>

      {/* Center Reticle and Waveform */}
      <div className="relative w-full h-44 my-auto flex flex-col items-center justify-center">
        {/* Tracking Reticle (Eye-Contact Detection Nod) */}
        <div
          className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none"
          style={{
            left: `${reticlePos.x}%`,
            top: `${reticlePos.y}%`,
          }}
        >
          <div className="w-full h-full rounded-full border border-[var(--accent)]/50 relative">
            <span className="absolute top-1/2 left-0 w-2 h-[1px] bg-[var(--accent)] -translate-y-1/2" />
            <span className="absolute top-1/2 right-0 w-2 h-[1px] bg-[var(--accent)] -translate-y-1/2" />
            <span className="absolute top-0 left-1/2 w-[1px] h-2 bg-[var(--accent)] -translate-x-1/2" />
            <span className="absolute bottom-0 left-1/2 w-[1px] h-2 bg-[var(--accent)] -translate-x-1/2" />
            <span className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          </div>
        </div>

        {/* Live Audio Waveform Bars */}
        <div className="flex items-center justify-center gap-1.5 w-full h-24 px-4 opacity-75">
          {waveformBars.map((height, i) => (
            <div
              key={i}
              className="w-1.5 bg-gradient-to-t from-[var(--line-strong)] via-[var(--accent)]/70 to-[var(--accent)] rounded-full transition-all duration-300"
              style={{
                height: `${prefersReduced ? height * 0.7 : height}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom Status */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--line)] z-10">
        <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-dim)]">
          PITCH / LATENCY: 24MS
        </span>
        <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)]">
          SPEECH RECOGNITION: ACTIVE
        </span>
      </div>
    </div>
  );
}
