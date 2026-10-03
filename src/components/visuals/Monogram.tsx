import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MonogramProps {
  photoUrl?: string;
  name?: string;
  className?: string;
}

export function Monogram({
  photoUrl,
  name = "Sagar Vashist",
  className = "",
}: MonogramProps) {
  if (photoUrl && photoUrl.trim() !== "") {
    return (
      <div
        className={cn(
          "relative aspect-square w-full max-w-[340px] rounded-2xl overflow-hidden border-2 border-[var(--accent)] shadow-[0_0_30px_rgba(92,242,196,0.15)]",
          className
        )}
      >
        <Image
          src={photoUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 340px"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative aspect-square w-full max-w-[340px] rounded-2xl border border-[var(--line)] overflow-hidden select-none",
        "bg-[radial-gradient(ellipse_at_bottom_left,rgba(124,140,255,0.12)_0%,transparent_60%),radial-gradient(ellipse_at_top_right,rgba(92,242,196,0.08)_0%,transparent_60%),var(--surface)]",
        className
      )}
    >
      {/* Background Micro Grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Center SV Monogram */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-8xl md:text-9xl font-extrabold tracking-[-0.05em] text-[var(--text)] select-none opacity-90 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
          SV
        </span>
      </div>

      {/* Hairline Accents */}
      <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] signal-dot" />
        SYSTEM IDENTIFIER
      </div>

      <div className="absolute bottom-4 right-4 font-mono text-[9px] uppercase tracking-widest text-[var(--text-dim)]">
        VER. 2027 // ECE
      </div>
    </div>
  );
}
