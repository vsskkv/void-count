export const SITE_NAME = "Void Count";
export const SITE_VERSION = "0.1.0";
export const SITE_DESCRIPTION =
  "Void Count is a fast-paced strategic card game full of sabotage, bluffing and clever play. The perfect new card game to play with friends and family, and an ideal gift for board game lovers.";

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


