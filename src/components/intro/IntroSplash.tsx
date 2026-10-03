"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function IntroSplash() {
  const [shouldShow, setShouldShow] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setIsDone(true);
      return;
    }

    try {
      const hasSeen = sessionStorage.getItem("sv_intro_seen");
      if (hasSeen) {
        setIsDone(true);
        return;
      }

      setShouldShow(true);
      sessionStorage.setItem("sv_intro_seen", "true");

      const timer = setTimeout(() => {
        setIsDone(true);
      }, 1200);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsDone(true);
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("keydown", handleKeyDown);
      };
    } catch {
      setIsDone(true);
    }
  }, [prefersReduced]);

  if (!shouldShow || isDone) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          opacity: 0,
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        }}
        className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[var(--bg)] select-none ${
          isDone ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="font-display text-7xl md:text-8xl font-black tracking-[-0.04em] text-[var(--accent)]">
            SV
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)] mt-2">
            SAGAR VASHIST
          </span>
        </motion.div>

        {/* Skippable cue */}
        <button
          onClick={() => setIsDone(true)}
          className="absolute bottom-8 font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors cursor-pointer"
        >
          SKIP [ESC]
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
