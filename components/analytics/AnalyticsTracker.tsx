"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || typeof window === "undefined") return;

    const search = searchParams?.toString();
    const page_path = search ? `${pathname}?${search}` : pathname;

    // Push to GTM dataLayer (used by Google Tag Manager on all pages)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_path,
      page_location: typeof window !== "undefined" ? window.location.href : "",
    });

    // Also send to gtag/GA if loaded (e.g. via GTM or existing script)
    if (window.gtag && GA_MEASUREMENT_ID) {
      window.gtag("config", GA_MEASUREMENT_ID, { page_path });
    }
  }, [pathname, searchParams]);

  return null;
}
