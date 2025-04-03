import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines and merges class names with Tailwind CSS, handling conflicts properly
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
