import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatMonoIndex(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}
