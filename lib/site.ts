export const SITE_NAME = "Vikram & Chinese Wedding";
export const SITE_VERSION = "3.0.0";
export const SITE_DESCRIPTION =
  "A split wedding portal for the Singh and Kaur families, with private entry screens and side-specific RSVP moments.";

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
