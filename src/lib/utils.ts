// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to merge conditional classNames with Tailwind's rules in mind.
 * Example:
 *   cn("px-2 py-1", isActive && "bg-blue-500", "text-sm")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
