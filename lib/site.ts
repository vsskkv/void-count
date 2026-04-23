export const SITE_NAME = "Void Count";
export const SITE_VERSION = "2.0.0";
export const SITE_DESCRIPTION =
  "Void Count is a fast, social strategy card game for 2-8 players where the lowest score wins.";

/**
 * Used for absolute URLs in metadata. Set NEXT_PUBLIC_SITE_URL in production.
 * We fall back to localhost so local builds never inherit the old project URL.
 */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "http://localhost:3000";

  return raw.replace(/\/+$/, "");
}
