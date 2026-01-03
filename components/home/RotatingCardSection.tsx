"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { GameCard } from "../3d/GameCard";

export const RotatingCardSection = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const element = cardRef.current;

    const tl = gsap.to(element, {
      rotateY: 180,
      duration: 4,
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

      <div className="flex justify-center">
        <GameCard 
          ref={cardRef} 
          variant="standard" 
          className="w-64 aspect-[2.5/3.5]" 
        />
      </div>
    </section>
  );
};
