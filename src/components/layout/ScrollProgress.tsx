"use client";

import React from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ScrollProgress() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  if (prefersReduced) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[90] pointer-events-none bg-transparent"
    >
      <motion.div
        className="h-full w-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)] origin-left will-change-transform"
        style={{ scaleX }}
      />
    </div>
  );
}
