"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string | null;
  className?: string;
}

export function Toast({ message, className = "" }: ToastProps) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-6 right-6 z-50 pointer-events-none"
    >
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "flex items-center gap-3 px-5 py-3 rounded-full",
              "bg-[var(--surface)] text-[var(--text)] border border-[var(--accent)]/40",
              "shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(92,242,196,0.2)]",
              className
            )}
          >
            <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
            <span className="font-mono text-xs uppercase tracking-wider font-medium text-[var(--text)]">
              {message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
