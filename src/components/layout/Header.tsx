"use client";

import React, { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { MenuOverlay } from "./MenuOverlay";
import { useLenis } from "@/hooks/useLenis";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const { scrollTo } = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll-down, show on scroll-up
      if (currentScrollY > 120 && currentScrollY > lastScrollY.current + 6) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY.current - 6) {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBrandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo(0);
    if (window.location.hash) {
      window.history.pushState(null, "", window.location.pathname);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isHidden && !isMenuOpen ? "-translate-y-full" : "translate-y-0",
          isScrolled
            ? "bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--line)] py-3.5 shadow-sm"
            : "bg-transparent py-5 md:py-6"
        )}
      >
        <div className="site-container flex items-center justify-between">
          {/* Brand Wordmark & Role */}
          <a
            href="#index"
            onClick={handleBrandClick}
            aria-label="Sagar Vashist — return to top"
            className="flex flex-col group cursor-pointer focus-visible:outline-none"
          >
            <span className="font-display text-lg md:text-xl font-bold tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
              Sagar Vashist
            </span>
            <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)] -mt-0.5">
              FULL-STACK DEVELOPER
            </span>
          </a>

          {/* Right Controls: Theme Toggle, Menu Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Menu Trigger Button */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(true);
              }}
              aria-label="Open primary navigation menu"
              aria-expanded={isMenuOpen}
              className="touch-manipulation select-none group flex items-center gap-2 px-4 py-2 min-h-[44px] min-w-[44px] rounded-full border border-[var(--line-strong)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--text)] transition-colors duration-200 cursor-pointer active:scale-95"
            >
              <span className="font-mono text-xs uppercase tracking-[0.14em] font-semibold group-hover:text-[var(--accent)] transition-colors">
                MENU
              </span>
              <span className="flex flex-col gap-1 w-3.5" aria-hidden="true">
                <span className="h-[1.5px] w-full bg-[var(--accent)]" />
                <span className="h-[1.5px] w-2/3 bg-[var(--accent)] ml-auto" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Overlay */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        triggerRef={menuButtonRef}
      />
    </>
  );
}
