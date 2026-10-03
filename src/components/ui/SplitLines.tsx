"use client";

import React from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SplitLinesProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}

export function SplitLines({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
}: SplitLinesProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div className={className}>
        {lines.map((line, i) => (
          <div key={i} className={lineClassName}>
            {line}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      {lines.map((line, index) => (
        <div key={index} className="overflow-hidden">
          <motion.div
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.75,
              delay: delay + index * 0.07, // 70ms stagger
              ease: [0.16, 1, 0.3, 1],
            }}
            className={lineClassName}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
