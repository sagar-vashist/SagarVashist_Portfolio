"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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
}

export function Accordion({
  items,
  defaultOpenId,
  className = "",
}: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(
    defaultOpenId ?? (items.length > 0 ? items[0].id : null)
  );
  const prefersReduced = useReducedMotion();

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn("divide-y divide-[var(--line)] border-y border-[var(--line)]", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const triggerId = `accordion-trigger-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div key={item.id} className="group transition-colors duration-200">
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className={cn(
                  "w-full py-6 md:py-8 flex items-center justify-between text-left cursor-pointer",
                  "transition-colors duration-200",
                  "hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                )}
              >
                <div className="flex items-center gap-4 md:gap-8">
                  <span className="font-mono text-xs text-[var(--accent)] font-semibold tracking-[0.14em]">
                    {item.index}
                  </span>
                  <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                    {item.title}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-[var(--text-muted)] tracking-wider px-2 py-0.5 rounded-full bg-[var(--surface)] border border-[var(--line)]">
                    {item.count} items
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-[var(--text-muted)] transition-transform duration-300",
                      isOpen && "rotate-180 text-[var(--accent)]"
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
                  <div className="pb-8 pt-2">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
