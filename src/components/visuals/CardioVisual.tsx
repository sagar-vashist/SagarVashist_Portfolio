"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Activity, Heart, ShieldCheck } from "lucide-react";

export function CardioVisual() {
  const prefersReduced = useReducedMotion();
  const [bpm, setBpm] = useState(74);
  const [scanOffset, setScanOffset] = useState(0);
  const [pulseScale, setPulseScale] = useState(1);
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

    // ECG sweep & subtle BPM drift simulation
    const interval = setInterval(() => {
      if (isVisible && !document.hidden) {
        setScanOffset((prev) => (prev + 3) % 400);
        // Realistic subtle heart rate variability
        setBpm((prev) => {
          const delta = (Math.random() - 0.48) * 1.5;
          return Math.min(78, Math.max(71, Math.round((prev + delta) * 10) / 10));
        });
      }
    }, 40);

    // Heart beat throb timer (every ~820ms for ~73 BPM)
    const heartBeatInterval = setInterval(() => {
      if (isVisible && !document.hidden) {
        setPulseScale(1.25);
        setTimeout(() => setPulseScale(1), 160);
      }
    }, 810);

    return () => {
      clearInterval(interval);
      clearInterval(heartBeatInterval);
      observer.disconnect();
    };
  }, [prefersReduced]);

  // Dual Lead ECG (Lead II) + PPG Waveforms Path
  // Pattern: Isoelectric baseline, P wave, PR segment, Q drop, scaled R spike, S drop, ST segment, T wave
  const ecgPath =
    "M 0 54 L 25 54 Q 32 48 40 54 L 50 54 L 55 58 L 62 30 L 70 66 L 75 54 L 90 54 Q 102 44 115 54 L 140 54 " +
    "L 165 54 Q 172 48 180 54 L 190 54 L 195 58 L 202 30 L 210 66 L 215 54 L 230 54 Q 242 44 255 54 L 280 54 " +
    "L 305 54 Q 312 48 320 54 L 330 54 L 335 58 L 342 30 L 350 66 L 355 54 L 370 54 Q 382 44 395 54 L 400 54";

  // Optical PPG photoplethysmogram wave: systolic peak, dicrotic notch, diastolic runoff
  const ppgPath =
    "M 0 100 Q 15 100 28 72 Q 38 90 44 86 Q 58 100 80 100 " +
    "Q 95 100 108 72 Q 118 90 124 86 Q 138 100 160 100 " +
    "Q 175 100 188 72 Q 198 90 204 86 Q 218 100 240 100 " +
    "Q 255 100 268 72 Q 278 90 284 86 Q 298 100 320 100 " +
    "Q 335 100 348 72 Q 358 90 364 86 Q 378 100 400 100";

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative w-full h-full min-h-[260px] md:min-h-[340px] rounded-2xl bg-[var(--bg)]/80 border border-[var(--line)] p-5 md:p-6 flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Background medical oscilloscope glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(92,242,196,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] signal-dot" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-[var(--accent)]" />
            <span>PHYSIOLOGICAL MONITOR // MULTI-SENSOR</span>
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-[var(--accent)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span>LIVE • 250 HZ</span>
        </div>
      </div>

      {/* Center Waveform & Vital Metrics */}
      <div className="relative w-full my-auto py-2 z-10 flex flex-col gap-3">
        {/* Real-time Oscilloscope Grid & Dual Traces */}
        <div className="relative w-full h-28 sm:h-32 rounded-xl bg-[var(--bg-elev)]/50 border border-[var(--line)] overflow-hidden">
          {/* Subtle Oscilloscope Grid Background */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--line-strong) 1px, transparent 1px), linear-gradient(to bottom, var(--line-strong) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* SVG Waveform Traces */}
          <svg
            viewBox="0 0 400 120"
            className="w-full h-full preserve-3d overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Lead II ECG Trace (Mint Accent) */}
            <path
              d={ecgPath}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_6px_var(--accent)]"
            />

            {/* PPG Optical Pulse Wave (Subtle Teal/Dimmer) */}
            <path
              d={ppgPath}
              fill="none"
              stroke="rgba(92, 242, 196, 0.45)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="3 3"
            />

            {/* Moving Scan / Sweep Head Indicator */}
            {!prefersReduced && (
              <>
                <line
                  x1={scanOffset}
                  y1="0"
                  x2={scanOffset}
                  y2="120"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  opacity="0.8"
                  className="drop-shadow-[0_0_8px_var(--accent)]"
                />
                <circle
                  cx={scanOffset}
                  cy="54"
                  r="3.5"
                  fill="var(--accent)"
                  className="drop-shadow-[0_0_8px_var(--accent)]"
                />
              </>
            )}
          </svg>

          {/* Channel Legend Floating in Corner */}
          <div className="absolute top-2 left-3 flex items-center gap-3 font-mono text-[9px] uppercase tracking-wider">
            <span className="flex items-center gap-1 text-[var(--accent)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              CH1: LEAD-II ECG
            </span>
            <span className="flex items-center gap-1 text-[var(--text-muted)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/50" />
              CH2: OPTICAL PPG
            </span>
          </div>
        </div>

        {/* Real-Time Bio-Metrics Dashboard Cards */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {/* Card 1: Heart Rate */}
          <div className="rounded-lg bg-[var(--surface)]/70 border border-[var(--line)] p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[var(--text-muted)]">
              <span className="font-mono text-[9px] uppercase tracking-wider">HEART RATE</span>
              <Heart
                className="w-3 h-3 text-[var(--accent)] transition-transform duration-150"
                style={{ transform: `scale(${prefersReduced ? 1 : pulseScale})` }}
              />
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-mono text-base md:text-lg font-bold text-[var(--text)]">
                {bpm}
              </span>
              <span className="font-mono text-[9px] text-[var(--accent)]">BPM</span>
            </div>
          </div>

          {/* Card 2: SpO2 Blood Oxygen */}
          <div className="rounded-lg bg-[var(--surface)]/70 border border-[var(--line)] p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[var(--text-muted)]">
              <span className="font-mono text-[9px] uppercase tracking-wider">SPO2 PULSE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-mono text-base md:text-lg font-bold text-[var(--text)]">
                98.8
              </span>
              <span className="font-mono text-[9px] text-[var(--accent)]">%</span>
            </div>
          </div>

          {/* Card 3: AI Risk Classification */}
          <div className="rounded-lg bg-[var(--surface)]/70 border border-[var(--line)] p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[var(--text-muted)]">
              <span className="font-mono text-[9px] uppercase tracking-wider">AI RISK</span>
              <ShieldCheck className="w-3 h-3 text-[var(--accent)]" />
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-mono text-xs md:text-sm font-bold text-[var(--accent)]">
                LOW (0.04)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry & XAI Status */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--line)] z-10 font-mono text-[9px] uppercase tracking-wider">
        <span className="text-[var(--text-dim)]">
          SENSOR PIPELINE: ADS1292R + MAX30102
        </span>
        <span className="text-[var(--accent)] font-semibold">
          XAI: SHAP ATTRIBUTION NORMAL
        </span>
      </div>
    </div>
  );
}
