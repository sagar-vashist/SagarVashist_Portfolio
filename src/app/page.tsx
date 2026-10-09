import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Services } from "@/components/sections/Services";
import { Stack } from "@/components/sections/Stack";
import { Experience } from "@/components/sections/Experience";
import { Learning } from "@/components/sections/Learning";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      {/* 00 — Hero */}
      <Hero />

      {/* 01 — About */}
      <About />

      {/* 02 — Work */}
      <Work />

      {/* 03 — Services */}
      <Services />

      {/* Stack */}
      <Stack />

      {/* 04 — Experience */}
      <Experience />

      {/* 05 — Learning (Education & Certifications) */}
      <Learning />

      {/* 06 — Contact */}
      <Contact />
    </>
  );
}
