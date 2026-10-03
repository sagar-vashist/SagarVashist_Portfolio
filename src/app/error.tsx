"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-center bg-[var(--bg)]">
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-red-400 mb-4">
        SYSTEM EXCEPTION
      </div>
      <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text)] mb-6">
        Something went wrong
      </h1>
      <p className="text-[var(--text-muted)] max-w-md mb-8 leading-relaxed text-sm">
        An unexpected error occurred during rendering. Please attempt to reset the application state.
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-[#060708] font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Try Again</span>
      </button>
    </main>
  );
}
