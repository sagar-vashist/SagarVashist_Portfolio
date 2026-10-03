"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.14em] font-medium transition-all duration-200 select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] min-h-[44px] min-w-[44px] px-6 rounded-full";

    const variantStyles = {
      primary:
        "bg-[var(--accent)] text-[#060708] font-semibold hover:brightness-110 shadow-[0_0_20px_rgba(92,242,196,0.25)] hover:shadow-[0_0_28px_rgba(92,242,196,0.4)]",
      secondary:
        "bg-[var(--surface)] text-[var(--text)] border border-[var(--line-strong)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
      outline:
        "border border-[var(--line)] text-[var(--text)] hover:border-[var(--line-strong)] hover:bg-[var(--bg-elev)]",
      ghost:
        "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]",
    };

    const sizeStyles = {
      sm: "py-2 px-4 text-[11px] min-h-[40px]",
      md: "py-3 px-6 text-xs min-h-[44px]",
      lg: "py-4 px-8 text-sm min-h-[52px]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
        {icon && <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
