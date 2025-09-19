// src/components/lib/utils.js

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes intelligently.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a URL-friendly page path from a page name.
 * Example: "Welcome Page" → "/welcome-page"
 */
export function createPageUrl(pageName) {
  return `/${pageName.toLowerCase().replace(/\s+/g, "-")}`;
}

/**
 * Example helper to capitalize strings
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Example helper to format dates
 */
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
