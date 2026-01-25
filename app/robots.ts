import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl() || "https://voidcount.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/shop"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}


