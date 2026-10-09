import React from "react";
import { profile } from "@/data/profile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Monogram } from "@/components/visuals/Monogram";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="section-padding relative border-t border-[var(--line)]"
    >
      <div className="site-container">
        {/* Section Header */}
        <SectionHeader
          index="01"
          label="ABOUT"
          title="Engineer first. Builder always."
          subLabel="SUMMARY & BACKGROUND"
        />

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Monogram Card & Fact List */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start gap-8">
            <Reveal delay={0.1}>
              <Monogram photoUrl={profile.photo} name={profile.name} />
            </Reveal>

            {/* Mono Fact List */}
            <Reveal delay={0.2} className="w-full">
              <dl className="w-full divide-y divide-[var(--line)] border-y border-[var(--line)] py-1">
                {profile.facts.map((fact, index) => (
                  <div
                    key={index}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs"
                  >
                    <dt className="font-mono uppercase tracking-[0.14em] text-[var(--accent)] shrink-0">
                      {fact.label}
                    </dt>
                    <dd className="font-mono text-[var(--text-muted)] sm:text-right text-[11px] leading-relaxed">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Right Column: Bio Paragraphs */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-base md:text-lg text-[var(--text-muted)] leading-relaxed">
            <Reveal delay={0.15}>
              <p className="text-[var(--text)] font-medium text-lg md:text-xl leading-relaxed text-justify">
                {profile.summary.paragraph1}
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="text-justify">{profile.summary.paragraph2}</p>
            </Reveal>

            {profile.summary.paragraph3 && (
              <Reveal delay={0.35}>
                <p className="text-justify">{profile.summary.paragraph3}</p>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
