"use client";

import React, { useEffect, useState } from "react";

type Props = {
  href: string;
  openInNewTab?: boolean;
  ctaLabel: string;
  ctaClassName: string;
};

export function KickstarterStickyCTA({
  href,
  openInNewTab = false,
  ctaLabel,
  ctaClassName,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        setIsVisible(window.scrollY > 520);
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-hidden={!isVisible}
      className={`fixed bottom-0 left-0 right-0 z-[100] md:hidden p-3 border-t border-slate-800 bg-slate-950/90 backdrop-blur-md pointer-events-auto transition-all duration-500 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center gap-3">
        <div className="flex-1">
          <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest leading-none">
            Campaign is live.
          </p>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">
            {openInNewTab ? <>Opens <span className="text-[#05ce78]">Kickstarter</span> campaign</> : "View campaign"}
          </p>
        </div>
        <a
          href={href || "#"}
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
          tabIndex={isVisible ? undefined : -1}
          className={`${ctaClassName} px-4 py-3 text-xs`}
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}
