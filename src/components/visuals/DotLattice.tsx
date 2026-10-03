"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsTouch } from "@/hooks/useIsTouch";

export function DotLattice() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();
  const isTouch = useIsTouch();

  useEffect(() => {
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let isDocumentVisible = !document.hidden;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    const handleResize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let time = 0;
    const spacing = isTouch ? 36 : 28;

    const render = () => {
      if (isVisible && isDocumentVisible) {
        time += 0.015;

        // Smooth mouse dampening
        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;

        ctx.clearRect(0, 0, width, height);

        const cols = Math.ceil(width / spacing) + 1;
        const rows = Math.ceil(height / spacing) + 1;

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const baseX = i * spacing;
            const baseY = j * spacing;

            let offsetX = 0;
            let offsetY = 0;
            let radius = 1.2;
            let alpha = 0.16;
            let isAccent = false;

            // Autonomous gentle wave
            const wave = Math.sin(time + (baseX + baseY) * 0.005) * 2;
            offsetY += wave;

            // Mouse interaction (displacement & brighten)
            if (mouse.active) {
              const dx = mouse.x - baseX;
              const dy = mouse.y - baseY;
              const dist = Math.hypot(dx, dy);
              const maxDist = 120;

              if (dist < maxDist) {
                const force = (1 - dist / maxDist) * 16;
                const angle = Math.atan2(dy, dx);
                offsetX -= Math.cos(angle) * force;
                offsetY -= Math.sin(angle) * force;
                radius = 1.2 + (1 - dist / maxDist) * 1.8;
                alpha = 0.2 + (1 - dist / maxDist) * 0.65;
                isAccent = true;
              }
            } else if (isTouch) {
              // Wave ripple for touch devices
              const touchWave = Math.sin(time * 1.5 + (baseX * 0.01 + baseY * 0.01));
              alpha = 0.12 + Math.max(0, touchWave) * 0.15;
            }

            ctx.beginPath();
            ctx.arc(baseX + offsetX, baseY + offsetY, radius, 0, Math.PI * 2);

            if (isAccent) {
              ctx.fillStyle = `rgba(92, 242, 196, ${alpha})`;
            } else {
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            }
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
    };
  }, [prefersReduced, isTouch]);

  if (prefersReduced) {
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(92,242,196,0.15)_0%,transparent_70%)]"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="block w-full h-full opacity-60" />
    </div>
  );
}
