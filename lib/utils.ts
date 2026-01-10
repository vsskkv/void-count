/**
 * Utility functions for common operations
 */

/**
 * Smoothly scrolls to an element by ID
 */
export function scrollToElement(id: string, behavior: ScrollBehavior = "smooth"): void {
  if (typeof window === "undefined") return;
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior });
  }
}

/**
 * Formats a number with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-GB").format(num);
}
