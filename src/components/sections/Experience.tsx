import React from "react";
import { experiences } from "@/data/experience";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="section-padding relative border-t border-[var(--line)]"
    >
      <div className="site-container">
        {/* Section Header */}
        <SectionHeader
          index="04"
          label="EXPERIENCE"
          title="Where I've worked."
          subLabel="INDUSTRY & INTERNSHIPS"
        />

        {/* Vertical Timeline */}
        <div className="relative pl-8 md:pl-12 border-l border-[var(--line)] space-y-12 md:space-y-16 max-w-4xl ml-2 md:ml-4">
          {experiences.map((exp, index) => (
            <article key={index} className="relative group">
              {/* Timeline Node Point */}
              <div
                className="absolute -left-[41px] md:-left-[57px] top-1.5 flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center group-hover:border-[var(--accent)] transition-colors">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] signal-dot" />
                </div>
              </div>

              <Reveal delay={index * 0.15}>
                <div className="glass-card p-6 md:p-8">
                  {/* Role & Period Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--line)] pb-4">
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[var(--text)]">
                        {exp.role}
                      </h3>
                      <p className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] mt-1">
                        {exp.company} — {exp.location}
                      </p>
                    </div>

                    <div className="font-mono text-xs text-[var(--text-muted)] tracking-wider px-3 py-1 rounded-full bg-[var(--bg-elev)] border border-[var(--line)] self-start sm:self-center">
                      {exp.period}
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <ul className="mt-6 flex flex-col gap-3 text-sm text-[var(--text-muted)] leading-relaxed list-none">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills / Tech Chips */}
                  <div className="mt-6 pt-4 border-t border-[var(--line)] flex flex-wrap gap-2">
                    {exp.skills.map((skill, sIdx) => (
                      <Chip key={sIdx} label={skill} />
                    ))}
                  </div>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
