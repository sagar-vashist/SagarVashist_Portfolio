import React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { projects } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { KanbanVisual } from "@/components/visuals/KanbanVisual";
import { CardioVisual } from "@/components/visuals/CardioVisual";
import { MapVisual } from "@/components/visuals/MapVisual";
import { WaveformVisual } from "@/components/visuals/WaveformVisual";
import { formatMonoIndex } from "@/lib/utils";

export function Work() {
  const projectCountLabel = `${formatMonoIndex(projects.length)} PROJECTS`;

  const renderVisual = (
    visual: "kanban" | "map" | "waveform" | "cardio",
    image: string,
    title: string
  ) => {
    if (image && image.trim() !== "") {
      return (
        <div className="relative w-full h-full min-h-[260px] md:min-h-[340px] rounded-2xl overflow-hidden border border-[var(--line)]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      );
    }

    switch (visual) {
      case "kanban":
        return <KanbanVisual />;
      case "cardio":
        return <CardioVisual />;
      case "map":
        return <MapVisual />;
      case "waveform":
        return <WaveformVisual />;
      default:
        return <KanbanVisual />;
    }
  };

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="section-padding relative border-t border-[var(--line)]"
    >
      <div className="site-container">
        {/* Section Header */}
        <SectionHeader
          index="02"
          label="WORK"
          title="Selected work."
          subLabel={projectCountLabel}
        />

        {/* Project Cards List */}
        <div className="flex flex-col gap-16 md:gap-24">
          {projects.map((project, index) => {
            const isReversed = index % 2 === 1;

            return (
              <article
                key={project.slug}
                data-cursor="project"
                className="glass-card p-6 sm:p-8 md:p-10"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center ${
                    isReversed ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Visual Side (Left on even, Right on odd on >=1024px) */}
                  <div
                    className={`lg:col-span-6 w-full flex flex-col gap-4 ${
                      isReversed ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <Reveal delay={0.1}>
                      {renderVisual(project.visual, project.image, project.title)}
                    </Reveal>

                    {/* Action Links Below Project Animation Card */}
                    {(project.liveUrl || project.githubUrl) && (
                      <Reveal delay={0.15}>
                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${project.title} — live demo (opens in new tab)`}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider bg-[var(--accent)] text-[#060708] font-bold hover:brightness-110 shadow-sm transition-all cursor-pointer min-h-[44px]"
                            >
                              <span>Live Demo</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${project.title} — view code on GitHub (opens in new tab)`}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider bg-[var(--surface)] text-[var(--text)] border border-[var(--line-strong)] hover:border-[var(--accent)] hover:text-[var(--accent)] shadow-sm transition-all cursor-pointer min-h-[44px]"
                            >
                              <GithubIcon className="w-4 h-4" />
                              <span>GitHub</span>
                            </a>
                          )}
                        </div>
                      </Reveal>
                    )}
                  </div>

                  {/* Information & Details Side */}
                  <div
                    className={`lg:col-span-6 flex flex-col gap-6 ${
                      isReversed ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <Reveal delay={0.15}>
                      {/* Project Index & Category */}
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-semibold">
                          {project.index}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-[var(--line-strong)]" />
                        <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
                          {project.category}
                        </span>
                      </div>

                      {/* Title & Descriptor */}
                      <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text)] mt-3 leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[var(--text-muted)] mt-2 leading-relaxed">
                        {project.descriptor}
                      </p>
                    </Reveal>

                    {/* Bullet Points */}
                    <Reveal delay={0.2}>
                      <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed list-none">
                        {project.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </Reveal>

                    {/* Tech Chips */}
                    <Reveal delay={0.25}>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tech.map((t, tIdx) => (
                          <Chip key={tIdx} label={t} />
                        ))}
                      </div>
                    </Reveal>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
