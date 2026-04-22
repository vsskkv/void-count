"use client";

import { useEffect, useState } from "react";
import type { WeddingSideKey } from "@/lib/weddingData";

interface AdaptiveWeddingImageProps {
  assetBase: string;
  alt: string;
  side: WeddingSideKey;
  label: string;
  caption: string;
  className?: string;
}

export function AdaptiveWeddingImage({
  assetBase,
  alt,
  side,
  label,
  caption,
  className = "",
}: AdaptiveWeddingImageProps) {
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  useEffect(() => {
    setShowPlaceholder(false);
  }, [assetBase]);
  const src = `/wedding/${assetBase}.jpg`;
  const isBlue = side === "singh";

  if (showPlaceholder) {
    return (
      <div
        className={`relative overflow-hidden rounded-[30px] border p-6 ${className}`}
        style={{
          background: isBlue
            ? "linear-gradient(160deg, rgba(18,34,73,0.94), rgba(7,15,31,0.98))"
            : "linear-gradient(160deg, rgba(73,18,28,0.94), rgba(26,8,12,0.98))",
          borderColor: isBlue
            ? "rgba(129, 188, 255, 0.22)"
            : "rgba(255, 171, 150, 0.2)",
        }}
      >
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: isBlue
              ? "linear-gradient(135deg, rgba(108,199,255,0.16), transparent 50%, rgba(248,214,136,0.08))"
              : "linear-gradient(135deg, rgba(255,111,136,0.16), transparent 50%, rgba(255,211,141,0.08))",
          }}
        />
        <div className="relative z-10 flex h-full min-h-[260px] flex-col justify-between">
          <div className="space-y-3">
            <div
              className="inline-flex rounded-full border px-3 py-1 text-[0.72rem] uppercase tracking-[0.26em]"
              style={{
                borderColor: isBlue
                  ? "rgba(108, 199, 255, 0.28)"
                  : "rgba(255, 111, 136, 0.26)",
                color: isBlue ? "#d9f0ff" : "#ffe9e4",
              }}
            >
              Placeholder frame
            </div>
            <div
              className="font-[var(--font-display)] text-3xl font-semibold"
              style={{ color: isBlue ? "#f3faff" : "#fff4ef" }}
            >
              {label}
            </div>
            <p
              className="max-w-sm text-sm leading-6"
              style={{ color: isBlue ? "#bdd7f5" : "#efc8cc" }}
            >
              {caption}
            </p>
          </div>

          <div className="space-y-2 text-xs uppercase tracking-[0.22em]">
            <p style={{ color: isBlue ? "#91caff" : "#ffb4bd" }}>
              Drop image later into
            </p>
            <p
              className="rounded-2xl border px-4 py-3 normal-case tracking-normal"
              style={{
                borderColor: isBlue
                  ? "rgba(129, 188, 255, 0.24)"
                  : "rgba(255, 171, 150, 0.22)",
                background: isBlue
                  ? "rgba(9, 18, 41, 0.55)"
                  : "rgba(52, 13, 21, 0.55)",
                color: isBlue ? "#e8f6ff" : "#fff2ed",
              }}
            >
              /public/wedding/{assetBase}.jpg
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-[30px] ${className}`}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
        onError={() => setShowPlaceholder(true)}
      />
    </div>
  );
}
