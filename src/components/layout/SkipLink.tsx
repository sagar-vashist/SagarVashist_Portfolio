import React from "react";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[250] focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-[#060708] focus:font-mono focus:text-xs focus:uppercase focus:font-bold focus:rounded-md focus:shadow-xl"
    >
      Skip to main content
    </a>
  );
}
