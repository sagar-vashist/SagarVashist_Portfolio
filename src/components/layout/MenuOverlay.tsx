"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsTouch } from "@/hooks/useIsTouch";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const MENU_ITEMS = [
  { id: "index", label: "Index", num: "00" },
  { id: "about", label: "About", num: "01" },
  { id: "work", label: "Work", num: "02" },
  { id: "services", label: "Services", num: "03" },
  { id: "stack", label: "Stack", num: "04" },
  { id: "experience", label: "Experience", num: "05" },
  { id: "learning", label: "Learning", num: "06" },
  { id: "contact", label: "Contact", num: "07" },
];

export function MenuOverlay({ isOpen, onClose, triggerRef }: MenuOverlayProps) {
  const { scrollTo } = useLenis();
  const prefersReduced = useReducedMotion();
  const isTouch = useIsTouch();
  const isMobile = isTouch || (typeof window !== "undefined" && window.innerWidth < 768);
  const [canClose, setCanClose] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Prevent instant touch-through dismissal on mobile opening
  useEffect(() => {
    if (!isOpen) {
      setCanClose(false);
      return;
    }

    const timer = setTimeout(() => {
      setCanClose(true);
    }, 250);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Focus trap and ESC key handling
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button on open only for desktop keyboard navigation
    if (!isMobile) {
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        triggerRef.current?.focus();
        return;
      }

      if (e.key === "Tab" && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl?.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl?.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, triggerRef, isMobile]);

  const handleNavClick = (id: string) => {
    onClose();
    setTimeout(() => {
      scrollTo(`#${id}`);
      triggerRef.current?.focus();
    }, isMobile ? 180 : 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          initial={
            prefersReduced || isMobile
              ? { opacity: 0, y: -10 }
              : { clipPath: "circle(0% at calc(100% - 4rem) 3rem)", opacity: 0 }
          }
          animate={
            prefersReduced || isMobile
              ? {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                }
              : {
                  clipPath: "circle(150% at calc(100% - 4rem) 3rem)",
                  opacity: 1,
                  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
                }
          }
          exit={
            prefersReduced || isMobile
              ? {
                  opacity: 0,
                  y: -10,
                  transition: { duration: 0.2, ease: "easeIn" },
                }
              : {
                  clipPath: "circle(0% at calc(100% - 4rem) 3rem)",
                  opacity: 0,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                }
          }
          className="fixed inset-0 z-[150] h-[100dvh] w-full bg-[var(--bg)] md:bg-[var(--bg)]/98 md:backdrop-blur-2xl overflow-y-auto overscroll-contain"
          data-lenis-prevent
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="min-h-full flex flex-col justify-between p-5 sm:p-6 md:px-12 md:py-6 max-w-7xl mx-auto w-full">
            {/* Top Bar with Wordmark and Close Button */}
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 md:pb-4 shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-semibold">
                  NAVIGATION
                </span>
                <span className="h-1 w-1 rounded-full bg-[var(--text-dim)]" />
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  SAGAR VASHIST
                </span>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!canClose) return;
                  onClose();
                  triggerRef.current?.focus();
                }}
                aria-label="Close navigation menu"
                className={cn(
                  "touch-manipulation select-none flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--text)] transition-colors cursor-pointer",
                  !canClose && "pointer-events-none"
                )}
              >
                <span className="font-mono text-xs uppercase tracking-widest font-semibold">
                  CLOSE
                </span>
                <X className="w-4 h-4 text-[var(--accent)]" />
              </button>
            </div>

            {/* Navigation Links List */}
            <nav
              aria-label="Primary navigation menu"
              className="my-auto py-2 sm:py-3 divide-y divide-[var(--line)] border-b border-[var(--line)]"
            >
              {MENU_ITEMS.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={isMobile ? { opacity: 0 } : { opacity: 0, x: -20 }}
                  animate={isMobile ? { opacity: 1 } : { opacity: 1, x: 0 }}
                  transition={{
                    delay: isMobile ? 0.04 + index * 0.02 : 0.12 + index * 0.035,
                    duration: isMobile ? 0.2 : 0.35,
                    ease: "easeOut",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className="group w-full py-2 sm:py-2.5 md:py-3 flex items-center justify-between text-left cursor-pointer transition-all duration-200"
                  >
                    <div className="flex items-baseline gap-4 md:gap-8">
                      <span className="font-mono text-xs md:text-sm text-[var(--accent)] font-semibold tracking-widest">
                        {item.num}
                      </span>
                      <span className="font-display text-xl sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[38px] font-bold tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] group-hover:translate-x-3 transition-all duration-200 leading-tight">
                        {item.label}
                      </span>
                    </div>

                    <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[var(--text-dim)] group-hover:text-[var(--accent)] group-hover:rotate-45 transition-all duration-200 shrink-0" />
                  </button>
                </motion.div>
              ))}
            </nav>

            {/* Bottom Row */}
            <div className="pt-3 md:pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0">
              <a
                href={`mailto:${profile.email}`}
                className="font-mono text-xs md:text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
              >
                {profile.email}
              </a>

              <div className="flex items-center gap-6">
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-1 min-h-[44px]"
                >
                  <span>GITHUB</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-1 min-h-[44px]"
                >
                  <span>LINKEDIN</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
