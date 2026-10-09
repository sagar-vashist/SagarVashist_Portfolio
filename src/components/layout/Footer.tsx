"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";

export function Footer() {
  const { scrollTo } = useLenis();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[var(--line)] bg-[var(--bg)] pt-16 pb-12 overflow-hidden">
      <div className="site-container flex flex-col gap-10 md:gap-14">
        {/* Bhagavad Gita Inspirational Slogan */}
        <div className="w-full text-center flex flex-col items-center justify-center gap-3 py-2">
          <blockquote className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-white text-lg sm:text-xl md:text-2xl font-medium tracking-tight leading-relaxed text-center">
              <span className="block">
                “You are what you believe in. You become that which you believe
              </span>
              <span className="block">
                you can become”
              </span>
            </p>
          </blockquote>
          <cite className="font-mono text-xs sm:text-sm text-[var(--text-muted)] not-italic flex items-center justify-center gap-2.5 tracking-wider">
            <span className="w-5 sm:w-8 h-px bg-[var(--line-strong)]" />
            <span>― Bhagavad Gita</span>
            <span className="w-5 sm:w-8 h-px bg-[var(--line-strong)]" />
          </cite>
        </div>

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
          <p className="font-mono text-xs text-[var(--text-muted)]">
            Developed by{" "}
            <span className="text-white font-semibold tracking-wide">
              Sagar Vashist
            </span>{" "}
            © {currentYear}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {/* Back to Top Button */}
            <button
              type="button"
              onClick={() => scrollTo(0)}
              aria-label="Back to top"
              className="flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent)] transition-colors cursor-pointer text-xs font-mono uppercase tracking-wider"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 text-[var(--accent)]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
