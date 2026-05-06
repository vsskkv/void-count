"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const CARDS = [
  { id: "toss", src: "/optimized/toss-v1.jpg", name: "Toss" },
  { id: "sabotage", src: "/optimized/sabotage-v1.jpg", name: "Sabotage" },
  { id: "take-two", src: "/optimized/take-two-v1.jpg", name: "Take Two" },
  { id: "double", src: "/optimized/double-your-hand-v1.jpg", name: "Double Up" },
  { id: "blue-glacier", src: "/optimized/blue-glacier-v1.jpg", name: "Blue Glacier" },
  { id: "desert", src: "/optimized/desert-horizon-v1.jpg", name: "Desert Horizon" },
  { id: "toxic", src: "/optimized/toxic-swamp-v1.jpg", name: "Toxic Swamp" },
  { id: "volcanix", src: "/optimized/volcanix-lava-v1.jpg", name: "Volcanix Lava" },
];

// Target positions for the card fan (relative to box center)
const CARD_SPREAD = [
  { x: -375, y: -155, rotate: -30 },
  { x: -265, y: -265, rotate: -19 },
  { x: -130, y: -335, rotate: -9 },
  { x: 10, y: -360, rotate: -1 },
  { x: 145, y: -340, rotate: 8 },
  { x: 265, y: -280, rotate: 17 },
  { x: 360, y: -185, rotate: 25 },
  { x: 415, y: -80, rotate: 32 },
];

export const BoxRevealSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;
    const section = sectionRef.current;
    const lid = lidRef.current;
    if (!section || !lid) return;

    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=280%",
            pin: sceneRef.current,
            scrub: 1.4,
            anticipatePin: 1,
          },
        });

        // Phase 1: lid rotates open
        tl.to(lid, {
          rotateX: -118,
          duration: 0.5,
          ease: "power2.inOut",
        }, 0);

        // Phase 2: cards fly out with stagger
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const pos = CARD_SPREAD[i] ?? CARD_SPREAD[CARD_SPREAD.length - 1];
          tl.fromTo(
            card,
            { x: 0, y: 40, opacity: 0, scale: 0.45, rotate: 0 },
            {
              x: pos.x,
              y: pos.y,
              opacity: 1,
              scale: 1,
              rotate: pos.rotate,
              duration: 0.55,
              ease: "power3.out",
            },
            0.3 + i * 0.08
          );
        });
      }, section);

      return () => ctx.revert();
    })();

    return () => {
      cancelled = true;
    };
  }, [prefersReducedMotion, isMobile]);

  // Mobile / reduced-motion: static grid
  if (prefersReducedMotion || isMobile) {
    return (
      <section className="relative py-16 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.08),transparent_70%)] pointer-events-none" />
        <div className="flex flex-col items-center gap-8">
          <div
            className="relative rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.8)] border border-slate-800/60"
            style={{ width: 220, height: 308 }}
          >
            <img
              src="/Card%20Box.jpg"
              alt="Void Count card game box"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl w-full">
            {CARDS.map((card) => (
              <div key={card.id} className="rounded-xl overflow-hidden shadow-lg aspect-[2.5/3.5]">
                <img src={card.src} alt={card.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[380vh]">
      <div
        ref={sceneRef}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      >
        {/* Background atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,rgba(99,102,241,0.13),transparent_62%)] pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.18)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        {/* Scene */}
        <div
          className="relative flex items-center justify-center"
          style={{ perspective: "1300px", perspectiveOrigin: "50% 52%" }}
        >
          {/* Cards - start stacked at box center, spread on scroll */}
          {CARDS.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute"
              style={{
                width: 110,
                aspectRatio: "2.5/3.5",
                left: "50%",
                top: "50%",
                marginLeft: -55,
                marginTop: -77,
                zIndex: 20,
                willChange: "transform, opacity",
              }}
            >
              <img
                src={card.src}
                alt={card.name}
                className="w-full h-full object-cover rounded-xl shadow-[0_16px_45px_rgba(0,0,0,0.75)]"
                loading="lazy"
              />
            </div>
          ))}

          {/* Box: base + lid, stacked above cards initially */}
          <div
            className="relative"
            style={{
              width: 280,
              height: 400,
              transformStyle: "preserve-3d",
              zIndex: 30,
            }}
          >
            {/* Base - bottom half of box image */}
            <div
              className="absolute bottom-0 left-0 overflow-hidden rounded-b-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
              style={{ width: 280, height: 204 }}
            >
              <img
                src="/Card%20Box.jpg"
                alt="Void Count card game box"
                className="absolute bottom-0 left-0 w-[280px] h-[400px] object-cover object-bottom"
              />
            </div>

            {/* Lid - top half of box image, hinged at its bottom edge */}
            <div
              ref={lidRef}
              className="absolute top-0 left-0 overflow-hidden rounded-t-[2rem] shadow-[0_-8px_30px_rgba(0,0,0,0.6)]"
              style={{
                width: 280,
                height: 200,
                transformOrigin: "center bottom",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front face */}
              <img
                src="/Card%20Box.jpg"
                alt=""
                aria-hidden
                className="absolute top-0 left-0 w-[280px] h-[400px] object-cover object-top"
              />
              {/* Inner face (visible when lid is open) */}
              <div
                className="absolute inset-0 rounded-t-[2rem]"
                style={{
                  background: "linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%)",
                  transform: "rotateX(180deg) translateZ(1px)",
                  backfaceVisibility: "visible",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
