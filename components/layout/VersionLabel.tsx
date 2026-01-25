"use client";

import { useState, useEffect } from "react";
import { SITE_VERSION } from "@/lib/site";

const versionClassName =
  "mt-1 text-slate-400 text-[9px] sm:text-[10px] uppercase tracking-widest font-medium";

/**
 * Renders the app version only after client mount to avoid hydration mismatch
 * when server and client bundles disagree (e.g. cache).
 */
export function VersionLabel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <p className={versionClassName} aria-hidden>Version —</p>;
  }

  return (
    <p className={versionClassName}>
      Version {SITE_VERSION}
    </p>
  );
}
