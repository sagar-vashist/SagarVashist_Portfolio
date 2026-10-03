import React from "react";
import { skillGroups } from "@/data/skills";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Accordion, AccordionItemData } from "@/components/ui/Accordion";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";

export function Stack() {
  const accordionItems: AccordionItemData[] = skillGroups.map((group) => ({
    id: group.name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
    index: group.index,
    title: group.name,
    count: group.skills.length,
    content: (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-2">
        {group.skills.map((skill, sIdx) => {
          // Monogram or first two letters for skill chip avatar
          const initial = skill.slice(0, 2).toUpperCase();

          return (
            <Chip
              key={sIdx}
              label={skill}
              className="py-2.5 px-4 text-xs font-mono justify-start bg-[var(--surface)] hover:border-[var(--accent)]"
              icon={
                <span className="w-5 h-5 rounded-md bg-[var(--bg-elev)] border border-[var(--line-strong)] text-[10px] font-bold text-[var(--accent)] flex items-center justify-center shrink-0">
                  {initial}
                </span>
              }
            />
          );
        })}
      </div>
    ),
  }));

  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="section-padding relative border-t border-[var(--line)]"
    >
      <div className="site-container">
        {/* Section Header */}
        <SectionHeader
          index="03"
          label="STACK"
          title="The toolkit."
          subLabel="CORE COMPETENCIES"
        />

        <Reveal delay={0.1}>
          <p className="text-base md:text-lg text-[var(--text-muted)] -mt-6 mb-10 max-w-[62ch]">
            Technologies I use to design, build and ship.
          </p>
        </Reveal>

        {/* 5 Accordion Groups */}
        <Reveal delay={0.2}>
          <Accordion
            items={accordionItems}
            defaultOpenId={accordionItems[0]?.id}
          />
        </Reveal>
      </div>
    </section>
  );
}
