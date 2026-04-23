import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const routes = [
    { path: "/", priority: 1 },
    { path: "/kickstarter", priority: 0.95 },
    { path: "/how-to-play", priority: 0.9 },
    { path: "/about", priority: 0.75 },
    { path: "/settling-debates", priority: 0.7 },
    { path: "/faq", priority: 0.65 },
    { path: "/contact", priority: 0.5 },
  ] as const;

  return routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority,
  }));
}
