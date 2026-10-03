"use client";

import React from "react";
import { ArrowDown, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { profile } from "@/data/profile";
import { allTechSkills } from "@/data/skills";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Marquee } from "@/components/ui/Marquee";
import { useLenis } from "@/hooks/useLenis";

import { DotLattice } from "@/components/visuals/DotLattice";

export function Hero() {
  const { scrollTo } = useLenis();

  return (
    <section
      id="index"
      aria-label="Introduction and Overview"
      className="relative min-h-[100dvh] w-full flex flex-col justify-between pt-28 md:pt-36 pb-0 overflow-hidden"
    >
      {/* Interactive Dot-Lattice Background Canvas */}
      <DotLattice />

      {/* Hero Content Container */}
      <div className="site-container relative z-10 my-auto flex flex-col justify-center">
        {/* Eyebrow Label */}
        <div className="flex items-center gap-2 mb-6">
          <span className="signal-dot" aria-hidden="true" />
          <span className="font-mono text-xs md:text-sm uppercase tracking-[0.16em] text-[var(--accent)] font-semibold">
            {profile.name} — {profile.role}
          </span>
        </div>

        {/* Display H1 Headline (Server rendered, LCP priority) */}
        <h1 className="font-display text-[clamp(2.4rem,7.5vw+0.5rem,7.5rem)] font-bold tracking-[-0.035em] leading-[0.98] text-[var(--text)] max-w-[18ch]">
          {profile.headline}
        </h1>

        {/* Sub-headline */}
        <p className="mt-6 md:mt-8 text-base md:text-xl text-[var(--text-muted)] max-w-[62ch] leading-relaxed">
          {profile.subHeadline}
        </p>

        {/* Meta Metadata Row */}
        <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-6 font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
          <span className="text-[var(--text)] font-medium">
            {profile.location}
          </span>
          <span className="h-1 w-1 rounded-full bg-[var(--line-strong)]" />
          <span>{profile.educationShort}</span>
          <span className="h-1 w-1 rounded-full bg-[var(--line-strong)]" />
          <span className="text-[var(--accent)] font-semibold">
            {profile.availability}
          </span>
        </div>

        {/* CTAs and Social Links Row */}
        <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-4 sm:gap-6">
          <MagneticButton>
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollTo("#work")}
              className="group"
            >
              <span>View my work</span>
              <ArrowDown className="w-4 h-4 text-[#060708] group-hover:translate-y-0.5 transition-transform" />
            </Button>
          </MagneticButton>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.open(profile.links.resume, "_blank")}
            icon={<Download className="w-4 h-4 text-[var(--accent)]" />}
          >
            Download résumé
          </Button>

          {/* Social Icon Links */}
          <div className="flex items-center gap-2 sm:ml-2">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in new tab)"
              className="flex items-center justify-center w-11 h-11 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--line-strong)] transition-colors cursor-pointer"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in new tab)"
              className="flex items-center justify-center w-11 h-11 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--line-strong)] transition-colors cursor-pointer"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${profile.email}`}
              aria-label="Send email"
              className="flex items-center justify-center w-11 h-11 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--line-strong)] transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Down Cue & Tech Marquee */}
      <div className="relative z-10 w-full mt-12 md:mt-16">
        <div className="site-container flex items-center justify-between pb-6">
          <button
            type="button"
            onClick={() => scrollTo("#about")}
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors cursor-pointer"
            aria-label="Scroll to about section"
          >
            <span>SCROLL</span>
            <span className="w-8 h-[1px] bg-[var(--line-strong)] inline-block" />
          </button>
          <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-dim)]">
            INDEX 00 // 06
          </span>
        </div>

        {/* Tech Marquee */}
        <Marquee items={allTechSkills} />
      </div>
    </section>
  );
}
