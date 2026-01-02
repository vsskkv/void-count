"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const RotatingCardSection = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const element = cardRef.current;

    const tl = gsap.to(element, {
      rotateY: 10,
      rotateX: -8,
      duration: 5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="px-6 py-16 max-w-5xl mx-auto grid md:grid-cols-[1.1fr,1fr] gap-10 items-center">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-slate-50">
          The Void is counting down.
        </h2>
        <p className="text-slate-200 mb-3 leading-relaxed">
          Every game of Void Count is a test of nerve. Keep your hand value low, sabotage your opponents, and call Count before they do.
        </p>
        <p className="text-slate-400 text-sm">
          2–8 players · Ages 7+ · Easy to learn, endlessly replayable.
        </p>
      </div>

      <div className="flex justify-center perspective-[1000px]">
        <div
          ref={cardRef}
          className="relative w-56 h-80 rounded-2xl border border-slate-100/20 bg-slate-950 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Starry background */}
          <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_0,#38bdf8_0,transparent_55%),radial-gradient(circle_at_80%_100%,#6366f1_0,transparent_55%)] opacity-70" />
          <div className="absolute inset-0 rounded-2xl bg-slate-950/70" />

          {/* Moon / comet / wave motifs to echo the logo */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
            <div className="w-16 h-16 rounded-full border border-slate-100/70 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <span className="text-xl font-semibold tracking-[0.3em] text-white ml-1">
                VC
              </span>
            </div>
            <div className="w-28 h-6 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-sky-500 blur-[6px] opacity-80 animate-pulse" />
          </div>

          <div className="absolute bottom-3 left-0 right-0 px-4 text-[10px] uppercase tracking-[0.2em] text-center text-slate-200/80">
            Prototype card art – not final
          </div>
        </div>
      </div>
    </section>
  );
};
