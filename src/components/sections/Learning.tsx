import React from "react";
import { Award, GraduationCap } from "lucide-react";
import { educationList } from "@/data/education";
import { certifications } from "@/data/certifications";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export function Learning() {
  return (
    <section
      id="learning"
      aria-labelledby="learning-title"
      className="section-padding relative border-t border-[var(--line)]"
    >
      <div className="site-container">
        {/* Section Header */}
        <SectionHeader
          index="05"
          label="LEARNING"
          title="Learning, on the record."
          subLabel="EDUCATION & CERTIFICATIONS"
        />

        {/* Part 1: Education */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-5 h-5 text-[var(--accent)]" />
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--text-muted)] font-semibold">
              ACADEMIC BACKGROUND
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationList.map((edu, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <Card className="h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-[var(--line)] pb-3 mb-4">
                      <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
                        {edu.period}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-dim)]">
                        {edu.location}
                      </span>
                    </div>

                    <h4 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[var(--text)] leading-snug">
                      {edu.degree}
                    </h4>
                  </div>

                  <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] mt-6 pt-4 border-t border-[var(--line)]">
                    {edu.institution}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Part 2: Certifications */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-5 h-5 text-[var(--accent)]" />
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--text-muted)] font-semibold">
              CREDENTIALS & SPECIALIZATIONS
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {certifications.map((cert, index) => (
              <Reveal key={index} delay={0.1 * index}>
                <Card className="h-full flex flex-col justify-between p-5 md:p-6 hover:border-[var(--accent)] transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 rounded-lg bg-[var(--bg-elev)] border border-[var(--line)] flex items-center justify-center text-[var(--accent)]">
                        <Award className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
                        {cert.date}
                      </span>
                    </div>

                    <h4 className="font-display text-sm md:text-base font-bold tracking-tight text-[var(--text)] leading-snug">
                      {cert.title}
                    </h4>
                  </div>

                  <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)] mt-6 pt-3 border-t border-[var(--line)]">
                    {cert.issuer}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
