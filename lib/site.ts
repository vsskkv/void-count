export const SITE_NAME = "Void Count";
export const SITE_VERSION = "2.0.0";
export const SITE_DESCRIPTION =
  "Void Count is a strategic card game of sabotage, bluffing, and hand management for 2-8 players. Back the live Kickstarter campaign.";

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
    "https://voidcount.com";
  return raw.replace(/\/+$/, "");
}
