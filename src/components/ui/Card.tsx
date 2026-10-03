import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "glass-card p-6 md:p-8 overflow-hidden",
        "relative before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-[rgba(255,255,255,0.06)] before:to-transparent",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
