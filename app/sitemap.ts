import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/how-to-play`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${siteUrl}/shop`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: "yearly", priority: 0.4 },
  ];
}


