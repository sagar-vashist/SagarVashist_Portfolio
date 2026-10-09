"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { services } from "@/data/services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export function Services() {
  const [activeId, setActiveId] = useState<string | null>("full-stack-web-development");
  const prefersReduced = useReducedMotion();

  const handleToggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const handleHover = (id: string) => {
    setActiveId(id);
  };

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="section-padding relative border-t border-[var(--line)]"
    >
      <div className="site-container">
        {/* Section Header */}
        <SectionHeader
          index="03"
          label="SERVICES"
          title="Turning complex logic into reliable software."
          subLabel="ARCHITECTURE & DEVELOPMENT"
        />

        {/* Subtitle intro */}
        <Reveal delay={0.1}>
          <p className="text-base md:text-lg text-[var(--text-muted)] -mt-6 mb-10 max-w-[62ch]">
            End-to-end full-stack capabilities engineered for founders, teams, and growing platforms.
          </p>
        </Reveal>

        {/* Services List with Hover & Accordion Expand */}
        <Reveal delay={0.2}>
          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {services.map((service) => {
              const isOpen = activeId === service.id;
              const triggerId = `service-trigger-${service.id}`;
              const panelId = `service-panel-${service.id}`;

              return (
                <div
                  key={service.id}
                  onMouseEnter={() => handleHover(service.id)}
                  className={cn(
                    "group relative transition-all duration-300",
                    isOpen ? "bg-[var(--surface)]/40" : "hover:bg-[var(--surface)]/20"
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
                      onClick={() => handleToggle(service.id)}
                      onFocus={() => handleHover(service.id)}
                      className={cn(
                        "w-full py-6 md:py-8 px-4 sm:px-6 flex items-center justify-between text-left cursor-pointer",
                        "transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                      )}
                    >
                      <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
                        <span
                          className={cn(
                            "font-mono text-xs font-semibold tracking-[0.14em] transition-colors duration-200",
                            isOpen
                              ? "text-[var(--accent)]"
                              : "text-[var(--text-dim)] group-hover:text-[var(--accent)]"
                          )}
                        >
                          {service.index}
                        </span>
                        <span
                          className={cn(
                            "font-display text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-200",
                            isOpen
                              ? "text-[var(--text)]"
                              : "text-[var(--text-muted)] group-hover:text-[var(--text)]"
                          )}
                        >
                          {service.title}
                        </span>
                      </div>

                      <div className="flex items-center shrink-0 ml-4">
                        <ChevronDown
                          className={cn(
                            "w-5 h-5 transition-transform duration-300",
                            isOpen
                              ? "rotate-180 text-[var(--accent)]"
                              : "text-[var(--text-dim)] group-hover:text-[var(--text)]"
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
                            opacity: { duration: 0.25, delay: 0.08 },
                          },
                        }}
                        exit={
                          prefersReduced
                            ? { opacity: 0, height: 0 }
                            : {
                                height: 0,
                                opacity: 0,
                                transition: {
                                  height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                                  opacity: { duration: 0.15 },
                                },
                              }
                        }
                        className="overflow-hidden"
                      >
                        <div className="pt-1 pb-7 md:pb-8 pl-10 sm:pl-16 md:pl-20 pr-4 sm:pr-8 flex flex-col gap-4">
                          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-3xl">
                            {service.description}
                          </p>

                          <div className="flex flex-wrap gap-2 pt-1">
                            {service.tags.map((tag, tIdx) => (
                              <Chip
                                key={tIdx}
                                label={tag}
                                className="py-1 px-3 text-[11px] font-mono tracking-wider bg-[var(--bg-elev)] border-[var(--line)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--text)] transition-colors"
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
