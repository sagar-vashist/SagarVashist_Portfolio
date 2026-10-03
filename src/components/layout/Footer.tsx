"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useLenis } from "@/hooks/useLenis";

export function Footer() {
  const { scrollTo } = useLenis();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[var(--line)] bg-[var(--bg)] pt-16 pb-12 overflow-hidden">
      <div className="site-container flex flex-col gap-12 md:gap-16">
        {/* Giant Outlined Wordmark */}
        <div
          className="w-full select-none overflow-hidden group cursor-default"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1360 160"
            className="w-full h-auto max-h-[140px] overflow-visible"
            fill="none"
          >
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              className="font-display font-black text-[120px] md:text-[145px] tracking-tight fill-transparent stroke-[var(--line-strong)] stroke-[1.5px] group-hover:stroke-[var(--accent)] transition-all duration-500"
              style={{
                strokeDasharray: "1200",
                strokeDashoffset: "0",
              }}
            >
              SAGAR VASHIST
            </text>
          </svg>
        </div>

        {/* Footer Meta Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-[var(--line)] text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 font-mono text-xs text-[var(--text-muted)]">
            <span>© {currentYear} Sagar Vashist</span>
            <span className="hidden sm:inline-block text-[var(--text-dim)]">•</span>
            <span>Built with Next.js & Tailwind CSS</span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Back to Top Button */}
            <button
              type="button"
              onClick={() => scrollTo("#index")}
              aria-label="Back to top"
              className="flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent)] transition-colors cursor-pointer text-xs font-mono uppercase tracking-wider"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5 text-[var(--accent)]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
