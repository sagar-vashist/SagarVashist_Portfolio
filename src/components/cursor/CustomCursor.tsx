"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsTouch } from "@/hooks/useIsTouch";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "link" | "project" | "text">("default");
  const [isVisible, setIsVisible] = useState(false);
  const prefersReduced = useReducedMotion();
  const isTouch = useIsTouch();

  useEffect(() => {
    setMounted(true);
  }, []);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring for the 36px ring
  const ringX = useSpring(mouseX, { damping: 28, stiffness: 350 });
  const ringY = useSpring(mouseY, { damping: 28, stiffness: 350 });

  useEffect(() => {
    // Only enable for fine pointers (mouse), not touch or reduced motion
    if (isTouch || prefersReduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectCard = target.closest("[data-cursor='project']");
      if (projectCard) {
        setCursorState("project");
        return;
      }

      const isClickable = target.closest("a, button, [role='button'], input[type='submit']");
      if (isClickable) {
        setCursorState("link");
        return;
      }

      const isText = target.closest("input, textarea, p, h1, h2, h3, h4, span");
      if (isText && !target.closest("button, a")) {
        setCursorState("text");
        return;
      }

      setCursorState("default");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isTouch, prefersReduced, isVisible, mouseX, mouseY]);

  if (!mounted || isTouch || prefersReduced || !isVisible) {
    return null;
  }

  const ringVariants = {
    default: {
      width: 36,
      height: 36,
      backgroundColor: "transparent",
      borderColor: "var(--accent)",
      borderWidth: 1.5,
      opacity: 0.7,
    },
    link: {
      width: 54,
      height: 54,
      backgroundColor: "rgba(92, 242, 196, 0.12)",
      borderColor: "var(--accent)",
      borderWidth: 1.5,
      opacity: 1,
    },
    project: {
      width: 72,
      height: 72,
      backgroundColor: "var(--accent)",
      borderColor: "var(--accent)",
      borderWidth: 0,
      opacity: 1,
    },
    text: {
      width: 18,
      height: 18,
      backgroundColor: "transparent",
      borderColor: "var(--text-muted)",
      borderWidth: 1,
      opacity: 0.5,
    },
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden select-none">
      {/* 10px Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[var(--accent)] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[102]"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: cursorState === "project" ? 0 : 1,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* 36px Spring-Trailing Ring / Project Disc */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[101]"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={cursorState}
        variants={ringVariants}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {cursorState === "project" && (
          <span className="font-mono text-[10px] font-bold text-[#060708] tracking-widest uppercase">
            VIEW
          </span>
        )}
      </motion.div>
    </div>
  );
}
