export const SITE_NAME = "Void Count";
export const SITE_DESCRIPTION =
  "Void Count is a strategic social card game of risk, timing, and cosmic chaos.";

/**
 * Used for absolute URLs in SEO metadata (OpenGraph/Twitter/sitemap).
 *
 * IMPORTANT: Set NEXT_PUBLIC_SITE_URL in your production build environment
 * (e.g. https://your-domain.com). For local dev it falls back to localhost.
 */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "http://localhost:3000";
  return raw.replace(/\/+$/, "");
}


