"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsTouch } from "@/hooks/useIsTouch";

export interface AccordionItemData {
  id: string;
  index: string;
  title: string;
  count: number;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string;
  className?: string;
  expandOnHover?: boolean;
}

export function Accordion({
  items,
  defaultOpenId,
  className = "",
  expandOnHover = true,
}: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(
    defaultOpenId ?? (items.length > 0 ? items[0].id : null)
  );
  const prefersReduced = useReducedMotion();
  const isTouch = useIsTouch();

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleHover = (id: string) => {
    // Only expand on hover on desktop devices with a mouse
    if (isTouch) return;
    if (typeof window !== "undefined" && window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      return;
    }
    if (expandOnHover) {
      setOpenId(id);
    }
  };

  return (
    <div className={cn("divide-y divide-[var(--line)] border-y border-[var(--line)]", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const triggerId = `accordion-trigger-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div
            key={item.id}
            onMouseEnter={() => handleHover(item.id)}
            className={cn(
              "group relative transition-all duration-300",
              isOpen ? "bg-[var(--surface)]/30" : "hover:bg-[var(--surface)]/10"
            )}
          >
            {/* Left accent indicator line on active */}
            <div
              className={cn(
                "absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300",
                isOpen ? "bg-[var(--accent)] opacity-100" : "bg-transparent opacity-0"
              )}
            />

            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                onFocus={() => {
                  if (!isTouch && typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
                    handleHover(item.id);
                  }
                }}
                className={cn(
                  "w-full py-6 md:py-8 px-4 sm:px-6 flex items-center justify-between text-left cursor-pointer",
                  "transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                )}
              >
                <div className="flex items-center gap-4 md:gap-8">
                  <span
                    className={cn(
                      "font-mono text-xs font-semibold tracking-[0.14em] transition-colors duration-200",
                      isOpen
                        ? "text-[var(--accent)]"
                        : "text-[var(--text-dim)] group-hover:text-[var(--accent)]"
                    )}
                  >
                    {item.index}
                  </span>
                  <span
                    className={cn(
                      "font-display text-xl md:text-2xl font-bold tracking-tight transition-colors duration-200",
                      isOpen
                        ? "text-[var(--text)]"
                        : "text-[var(--text-muted)] group-hover:text-[var(--text)]"
                    )}
                  >
                    {item.title}
                  </span>
                </div>

                <div className="flex items-center shrink-0 ml-4">
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 transition-transform duration-300",
                      isOpen ? "rotate-180 text-[var(--accent)]" : "text-[var(--text-muted)] group-hover:text-[var(--text)]"
                    )}
                    aria-hidden="true"
                  />
                </div>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={
                    prefersReduced
                      ? { opacity: 1, height: "auto" }
                      : { height: 0, opacity: 0 }
                  }
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: {
                      height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.25, delay: 0.1 },
                    },
                  }}
                  exit={
                    prefersReduced
                      ? { opacity: 0, height: 0 }
                      : {
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.15 },
                          },
                        }
                  }
                  className="overflow-hidden"
                >
                  <div className="pb-8 pt-2 px-4 sm:px-6">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
