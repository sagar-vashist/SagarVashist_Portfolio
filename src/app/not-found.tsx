import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-center bg-[var(--bg)]">
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
        ERROR 404 // NOT FOUND
      </div>
      <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[var(--text)] mb-6">
        Page Not Found
      </h1>
      <p className="text-[var(--text-muted)] max-w-md mb-8 leading-relaxed">
        The requested resource does not exist or has been relocated.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--surface)] border border-[var(--line-strong)] text-[var(--text)] font-mono text-xs uppercase tracking-wider hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </main>
  );
}
