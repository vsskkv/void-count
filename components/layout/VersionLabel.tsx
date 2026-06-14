"use client";

import { SITE_VERSION } from "@/lib/site";

const versionClassName =
  "mt-1 text-slate-400 text-[9px] sm:text-[10px] uppercase tracking-widest font-medium";

export function VersionLabel() {
  return (
    <p className={versionClassName}>
      Version {SITE_VERSION}
    </p>
  );
}
