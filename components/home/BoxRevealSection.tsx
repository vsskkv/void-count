"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MAX_PLAYERS, MIN_PLAYERS, TOTAL_CARDS } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const REVEAL_CARDS = [
  { id: "toss", src: "/optimized/toss-v1.jpg", name: "Toss" },
  { id: "sabotage", src: "/optimized/sabotage-v1.jpg", name: "Sabotage" },
  { id: "take-two", src: "/optimized/take-two-v1.jpg", name: "Take Two" },
  { id: "double", src: "/optimized/double-your-hand-v1.jpg", name: "Double Up" },
  { id: "blue-glacier", src: "/optimized/blue-glacier-v1.jpg", name: "Blue Glacier" },
  { id: "desert", src: "/optimized/desert-horizon-v1.jpg", name: "Desert Horizon" },
  { id: "toxic", src: "/optimized/toxic-swamp-v1.jpg", name: "Toxic Swamp" },
  { id: "volcanix", src: "/optimized/volcanix-lava-v1.jpg", name: "Volcanix Lava" },
] as const;

const CARD_SPREAD = [
  { x: -390, y: -150, rotate: -30 },
  { x: -280, y: -270, rotate: -20 },
  { x: -138, y: -346, rotate: -10 },
  { x: 4, y: -372, rotate: -1 },
  { x: 144, y: -346, rotate: 9 },
  { x: 272, y: -288, rotate: 17 },
  { x: 372, y: -195, rotate: 25 },
  { x: 432, y: -82, rotate: 33 },
] as const;

const REVEAL_SIGNALS = [
  "Lowest score wins",
  "Power cards change the table",
  `Great for ${MIN_PLAYERS}-${MAX_PLAYERS} players`,
  "Call Count at the perfect moment",
] as const;

export const BoxRevealSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener("resize", checkViewport, { passive: true });
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;
    if (!sectionRef.current || !lidRef.current || !stageRef.current) return;

    let cancelled = false;
    let ctx: { revert: () => void } | null = null;

    (async () => {
      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        if (
          cancelled ||
          !sectionRef.current ||
          !lidRef.current ||
          !stageRef.current
        ) {
          return;
        }

        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=280%",
              pin: sceneRef.current,
              scrub: 1.4,
              anticipatePin: 1,
            },
          });

          tl.to(
            lidRef.current,
            {
              rotateX: -118,
              duration: 0.5,
              ease: "power2.inOut",
            },
            0
          );

          tl.to(
            stageRef.current,
            {
              scale: 0.95,
              y: 14,
              duration: 0.8,
              ease: "power2.out",
            },
            0.12
          );

          cardRefs.current.forEach((card, index) => {
            if (!card) return;
            const position =
              CARD_SPREAD[index] ?? CARD_SPREAD[CARD_SPREAD.length - 1];

            tl.to(
              card,
              {
                x: position.x,
                y: position.y,
                opacity: 1,
                scale: 1,
                rotate: position.rotate,
                duration: 0.58,
                ease: "power3.out",
              },
              0.32 + index * 0.08
            );
          });
        }, sectionRef);
      } catch (error) {
        console.error("Box reveal animation failed to load:", error);
      }
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [prefersReducedMotion, isMobile]);

  const revealContent =
    prefersReducedMotion || isMobile ? (
      <section className="relative overflow-hidden px-4 py-18 sm:px-6 sm:py-22">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#060910_0%,#0a1019_38%,#060910_100%)]" />
        <div className="absolute inset-0 opacity-18 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:88px_88px]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-10">
            <div className="relative w-[250px] sm:w-[300px]">
              <Image
                src="/optimized/card-box-cutout.png"
                alt="Void Count card game box"
                width={746}
                height={1000}
                className="h-auto w-full drop-shadow-[0_32px_80px_rgba(0,0,0,0.78)]"
                sizes="(min-width: 640px) 300px, 250px"
              />
            </div>

            <div className="grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
              {REVEAL_CARDS.slice(0, 4).map((card) => (
                <div
                  key={card.id}
                  className="relative aspect-[2.5/3.5] overflow-hidden rounded-[1.05rem] border border-white/10 bg-slate-950/70 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                >
                  <Image
                    src={card.src}
                    alt={card.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 22vw, 42vw"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-[0.68rem] font-black uppercase tracking-[0.26em] text-slate-200/80">
              {REVEAL_SIGNALS.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full border border-white/10 bg-white/6 px-4 py-2"
                >
                  {signal}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    ) : (
      <section ref={sectionRef} className="relative h-[380vh]">
        <div ref={sceneRef} className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#060910_0%,#090f18_42%,#05080f_100%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:96px_96px]" />
          <div className="absolute inset-x-[12%] top-[18%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)]" />
          <div className="absolute inset-x-[10%] bottom-[18%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)]" />
          <div className="absolute left-1/2 top-[68%] h-px w-[min(82vw,980px)] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.24),transparent)]" />

          <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center gap-10 px-4 pb-16 pt-28 sm:px-6 lg:px-10">
            <div className="relative flex-1">
              <div className="absolute inset-x-0 top-0 hidden items-start justify-between text-[0.7rem] font-black uppercase tracking-[0.24em] text-slate-200/72 lg:flex">
                <div className="space-y-3">
                  <p>Low score wins</p>
                  <p>Power cards hit hard</p>
                  <p>Count changes everything</p>
                </div>
                <div className="space-y-3 text-right">
                  <p>{MIN_PLAYERS}-{MAX_PLAYERS} players</p>
                  <p>{TOTAL_CARDS} cards</p>
                  <p>Fast, social rounds</p>
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  ref={stageRef}
                  className="relative flex items-center justify-center"
                  style={{ perspective: "1400px", perspectiveOrigin: "50% 54%" }}
                >
                  {REVEAL_CARDS.map((card, index) => (
                    <div
                      key={card.id}
                      ref={(element) => {
                        cardRefs.current[index] = element;
                      }}
                      className="absolute z-20"
                      style={{
                        width: 124,
                        aspectRatio: "2.5 / 3.5",
                        left: "50%",
                        top: "50%",
                        marginLeft: -62,
                        marginTop: -87,
                        opacity: 0,
                        transform:
                          "translate3d(0, 40px, 0) scale(0.45) rotate(0deg)",
                        willChange: "transform, opacity",
                      }}
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-[1rem] border border-white/10 shadow-[0_18px_48px_rgba(0,0,0,0.74)]">
                        <Image
                          src={card.src}
                          alt={card.name}
                          fill
                          className="object-cover"
                          sizes="124px"
                        />
                      </div>
                    </div>
                  ))}

                  <div
                    className="relative z-30"
                    style={{
                      width: 288,
                      height: 410,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      className="absolute bottom-0 left-0 overflow-hidden rounded-b-[2.2rem] border border-white/8 shadow-[0_34px_70px_rgba(0,0,0,0.92)]"
                      style={{ width: 288, height: 212 }}
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,16,0.18),rgba(3,5,12,0.6))]" />
                      <Image
                        src="/optimized/card-box.jpg"
                        alt="Void Count box base"
                        fill
                        className="object-cover object-bottom"
                        sizes="288px"
                      />
                    </div>

                    <div
                      ref={lidRef}
                      className="absolute left-0 top-0 overflow-hidden rounded-t-[2.2rem] border border-white/8 shadow-[0_-8px_28px_rgba(0,0,0,0.56)]"
                      style={{
                        width: 288,
                        height: 204,
                        transformOrigin: "center bottom",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <Image
                        src="/optimized/card-box.jpg"
                        alt=""
                        fill
                        aria-hidden
                        className="object-cover object-top"
                        sizes="288px"
                      />
                      <div
                        className="absolute inset-0 rounded-t-[2.2rem] border-b border-white/10"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(10,14,24,0.92) 0%, rgba(18,26,42,0.96) 72%, rgba(38,55,79,0.92) 100%)",
                          transform: "rotateX(180deg) translateZ(1px)",
                          backfaceVisibility: "visible",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-[0.68rem] font-black uppercase tracking-[0.26em] text-slate-200/78">
              {REVEAL_SIGNALS.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full border border-white/10 bg-white/6 px-4 py-2 backdrop-blur"
                >
                  {signal}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    );

  return revealContent;
};
