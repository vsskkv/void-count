"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-6H4Z6M4QBK";

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
    if (!window.gtag || !GA_MEASUREMENT_ID) return;

    // Build full path including query string
    const search = searchParams?.toString();
    const page_path = search ? `${pathname}?${search}` : pathname;

    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path,
    });
  }, [pathname, searchParams]);

  return null;
}
