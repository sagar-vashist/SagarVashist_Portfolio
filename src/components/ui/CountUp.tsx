"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CountUp({
  end,
  duration = 1200,
  prefix = "",
  suffix = "",
  className = "",
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useInView<HTMLSpanElement>({
    threshold: 0.3,
    triggerOnce: true,
  });
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (prefersReduced) {
      setCount(end);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease-out cubic curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, end, duration, prefersReduced]);

  const displayCount = end < 10 ? `0${count}` : `${count}`;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayCount}
      {suffix}
    </span>
  );
}
