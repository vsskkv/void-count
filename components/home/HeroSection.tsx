"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import {
  KICKSTARTER_URL,
  MAX_PLAYERS,
  MIN_PLAYERS,
  TOTAL_CARDS,
} from "@/lib/constants";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const HERO_CHIPS = [
  "Live on Kickstarter",
  `${MIN_PLAYERS}-${MAX_PLAYERS} players`,
  `${TOTAL_CARDS} card deck`,
] as const;

const HERO_PROOF = [
  {
    title: "Easy hook",
    body: "New players understand the goal instantly: keep your score lower than everyone else.",
  },
  {
    title: "Big interaction",
    body: "Power cards keep the table active, reactive, and ready to punish a weak read.",
  },
  {
    title: "One more round energy",
    body: "Fast rounds and loud reversals make instant rematches feel inevitable.",
  },
] as const;

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Keep your score low",
    body: "Draw, play, and manage your hand so your total stays safer than the rest of the table.",
  },
  {
    step: "02",
    title: "Use power cards for pressure",
    body: "Sabotage, Toss, Take Two, and Double Up create swings that wreck comfortable hands.",
  },
  {
    step: "03",
    title: "Call Count at the right moment",
    body: "End the round when you think you are ahead. If your read is wrong, everyone sees it.",
  },
] as const;

const TABLE_MOMENTS = [
  {
    label: "Someone calls Count",
    className:
      "hero-stage-item left-[2%] top-[10%] hidden rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.22em] text-emerald-100 xl:block",
  },
  {
    label: "The table flips fast",
    className:
      "hero-stage-item right-[4%] top-[15%] hidden rounded-full border border-amber-200/25 bg-amber-200/10 px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.22em] text-amber-100 xl:block",
  },
  {
    label: "No hand feels safe",
    className:
      "hero-stage-item right-[8%] bottom-[12%] hidden rounded-full border border-white/14 bg-white/8 px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.22em] text-slate-100 xl:block",
  },
] as const;

const STAGE_CARDS = [
  {
    src: "/optimized/sabotage-v1.jpg",
    alt: "Void Count Sabotage card",
    className:
      "hero-stage-card left-[4%] top-[15%] hidden sm:block w-[114px] rotate-[-18deg] md:left-[8%] md:w-[142px] lg:w-[172px]",
  },
  {
    src: "/optimized/take-two-v1.jpg",
    alt: "Void Count Take Two card",
    className:
      "hero-stage-card left-[13%] top-[54%] hidden md:block w-[128px] rotate-[-8deg] lg:left-[16%] lg:w-[156px]",
  },
  {
    src: "/optimized/toss-v1.jpg",
    alt: "Void Count Toss card",
    className:
      "hero-stage-card right-[4%] top-[12%] hidden sm:block w-[118px] rotate-[14deg] md:right-[9%] md:w-[146px] lg:w-[176px]",
  },
  {
    src: "/optimized/double-your-hand-v1.jpg",
    alt: "Void Count Double Up card",
    className:
      "hero-stage-card right-[10%] top-[52%] hidden md:block w-[130px] rotate-[22deg] lg:right-[15%] lg:w-[158px]",
  },
] as const;

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const kickstarterUrl = /^https?:\/\//i.test(KICKSTARTER_URL)
    ? KICKSTARTER_URL
    : `https://${KICKSTARTER_URL.replace(/^\/+/, "")}`;

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    let cancelled = false;
    let ctx: { revert: () => void } | null = null;

    import("gsap")
      .then((gsapModule) => {
        if (cancelled || !containerRef.current) return;

        const gsap = gsapModule.default;

        ctx = gsap.context(() => {
          const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

          intro
            .from(".hero-chip", {
              y: 18,
              opacity: 0,
              stagger: 0.06,
              duration: 0.42,
            })
            .from(
              ".hero-eyebrow",
              {
                y: 24,
                opacity: 0,
                duration: 0.5,
              },
              "-=0.12"
            )
            .from(
              ".hero-title-line",
              {
                y: 44,
                opacity: 0,
                stagger: 0.1,
                duration: 0.82,
              },
              "-=0.22"
            )
            .from(
              ".hero-copy",
              {
                y: 24,
                opacity: 0,
                duration: 0.58,
              },
              "-=0.38"
            )
            .from(
              ".hero-action",
              {
                y: 20,
                opacity: 0,
                stagger: 0.08,
                duration: 0.48,
              },
              "-=0.22"
            )
            .from(
              ".hero-note",
              {
                y: 18,
                opacity: 0,
                duration: 0.45,
              },
              "-=0.18"
            )
            .from(
              ".hero-proof",
              {
                y: 26,
                opacity: 0,
                stagger: 0.08,
                duration: 0.58,
              },
              "-=0.25"
            )
            .from(
              ".hero-stage-item",
              {
                y: 32,
                opacity: 0,
                scale: 0.96,
                stagger: 0.08,
                duration: 0.72,
              },
              "-=0.42"
            )
            .from(
              ".hero-step",
              {
                y: 30,
                opacity: 0,
                stagger: 0.09,
                duration: 0.6,
              },
              "-=0.32"
            );

          if (stageRef.current) {
            gsap.to(stageRef.current, {
              y: -10,
              duration: 4.8,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
          }

          gsap
            .utils.toArray<HTMLElement>(".hero-stage-card")
            .forEach((card, index) => {
              gsap.to(card, {
                y: index % 2 === 0 ? -12 : 12,
                duration: 3.8 + index * 0.4,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
              });
            });
        }, containerRef);
      })
      .catch((error) => {
        console.error("Hero animation failed to load:", error);
      });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden px-4 pb-18 pt-26 sm:px-6 sm:pb-22 sm:pt-30 md:pt-34 md:pb-24"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#050814_0%,#080d16_38%,#05070e_100%)]" />
      <div className="absolute inset-0 opacity-26 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:96px_96px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.24),transparent)]" />
      <div className="absolute inset-y-0 left-[7%] hidden w-px bg-[linear-gradient(180deg,transparent,rgba(34,197,94,0.2),transparent)] xl:block" />
      <div className="absolute inset-y-0 right-[7%] hidden w-px bg-[linear-gradient(180deg,transparent,rgba(251,191,36,0.18),transparent)] xl:block" />
      <div className="absolute left-1/2 top-[18%] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-emerald-400/8 blur-[110px]" />
      <div className="absolute right-[12%] top-[12%] h-[18rem] w-[18rem] rounded-full bg-amber-300/8 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 text-[0.64rem] font-black uppercase tracking-[0.28em] text-slate-200/82 sm:text-[0.68rem]">
              {HERO_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="hero-chip rounded-full border border-white/12 bg-white/6 px-4 py-2 backdrop-blur"
                >
                  {chip}
                </span>
              ))}
            </div>

            <p className="hero-eyebrow mt-8 text-[0.72rem] font-black uppercase tracking-[0.34em] text-emerald-200/88">
              Void Count
            </p>

            <h1 className="mt-4 font-[var(--font-display)] text-[3rem] font-semibold uppercase leading-[0.84] tracking-[0.03em] text-white sm:text-[4.4rem] md:text-[5.5rem] lg:text-[6.7rem]">
              <span className="hero-title-line block">The strategy card game</span>
              <span className="hero-title-line block bg-[linear-gradient(90deg,#ffffff_0%,#d1fae5_42%,#fde68a_100%)] bg-clip-text text-transparent">
                where the lowest score wins.
              </span>
            </h1>

            <p className="hero-copy mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 md:text-xl">
              Use power cards to sabotage opponents, protect your own hand, and
              call Count at the exact moment the table thinks you are bluffing.
              It is easy to teach, fast to replay, and built for loud game-night
              reactions.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <PrimaryButton
                className="hero-action min-w-[240px] bg-white px-8 py-4 text-base font-black uppercase tracking-[0.12em] text-slate-950 shadow-[0_18px_45px_rgba(5,206,120,0.24)] hover:bg-emerald-200"
                onClick={() => {
                  if (typeof window === "undefined" || !kickstarterUrl) return;
                  window.open(kickstarterUrl, "_blank", "noopener,noreferrer");
                }}
              >
                Back on Kickstarter
              </PrimaryButton>
              <PrimaryButton
                variant="secondary"
                href="/how-to-play"
                className="hero-action min-w-[220px] border-white/18 bg-white/6 px-8 py-4 text-base font-black uppercase tracking-[0.12em] text-slate-100 hover:border-amber-300/60 hover:bg-white/10"
              >
                Learn How to Play
              </PrimaryButton>
            </div>

            <p className="hero-note mt-4 max-w-xl text-sm leading-6 text-slate-300/88 sm:text-base">
              Back the live Kickstarter campaign while it is open and help bring
              the first edition of Void Count to the table.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {HERO_PROOF.map((item) => (
                <article
                  key={item.title}
                  className="hero-proof border border-white/10 bg-[linear-gradient(180deg,rgba(10,14,24,0.84),rgba(6,9,16,0.96))] px-5 py-5"
                >
                  <p className="text-[0.68rem] font-black uppercase tracking-[0.24em] text-amber-200/88">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div
            ref={stageRef}
            className="relative mx-auto w-full max-w-[38rem] lg:max-w-[42rem]"
          >
            <div className="absolute inset-x-[8%] bottom-[6%] h-[16rem] rounded-[999px] bg-[radial-gradient(circle_at_50%_50%,rgba(5,206,120,0.18),transparent_68%)] blur-3xl" />
            <div className="absolute left-1/2 top-[57%] h-[14rem] w-[92%] -translate-x-1/2 rounded-[3rem] border border-white/10 bg-[linear-gradient(180deg,rgba(7,12,21,0.95),rgba(3,6,12,0.98))] shadow-[0_40px_120px_rgba(0,0,0,0.7)] [transform:perspective(1400px)_rotateX(74deg)]" />

            {STAGE_CARDS.map((card) => (
              <div
                key={card.src}
                className={`hero-stage-item absolute aspect-[2.5/3.5] ${card.className}`}
              >
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  className="rounded-[1.15rem] border border-white/10 object-cover shadow-[0_24px_70px_rgba(0,0,0,0.72)]"
                  sizes="(min-width: 1024px) 176px, (min-width: 768px) 146px, 114px"
                />
              </div>
            ))}

            {TABLE_MOMENTS.map((moment) => (
              <div key={moment.label} className={moment.className}>
                {moment.label}
              </div>
            ))}

            <div className="hero-stage-item relative z-20 mx-auto w-[250px] pt-10 sm:w-[320px] md:w-[390px] lg:w-[468px]">
              <Image
                src="/optimized/card-box-cutout.png"
                alt="Void Count card game box"
                width={746}
                height={1000}
                priority
                className="h-auto w-full drop-shadow-[0_45px_90px_rgba(0,0,0,0.82)]"
                sizes="(min-width: 1024px) 468px, (min-width: 768px) 390px, 320px"
              />
            </div>

            <div className="hero-stage-item mx-auto mt-6 grid max-w-3xl gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
              <div className="bg-[linear-gradient(180deg,rgba(8,12,20,0.88),rgba(4,7,13,0.96))] px-4 py-4 text-center">
                <p className="text-[0.68rem] font-black uppercase tracking-[0.24em] text-emerald-200/88">
                  Social tension
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Every Count call is public, risky, and instantly readable by the whole table.
                </p>
              </div>
              <div className="bg-[linear-gradient(180deg,rgba(8,12,20,0.88),rgba(4,7,13,0.96))] px-4 py-4 text-center">
                <p className="text-[0.68rem] font-black uppercase tracking-[0.24em] text-emerald-200/88">
                  Real interaction
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Power cards do not sit quietly. They force decisions, pressure, and big reversals.
                </p>
              </div>
              <div className="bg-[linear-gradient(180deg,rgba(8,12,20,0.88),rgba(4,7,13,0.96))] px-4 py-4 text-center">
                <p className="text-[0.68rem] font-black uppercase tracking-[0.24em] text-emerald-200/88">
                  Fast replay value
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  The rules land quickly, but timing the table stays interesting round after round.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 border border-white/10 bg-black/20">
          <div className="grid gap-px bg-white/10 lg:grid-cols-[0.84fr_1.16fr]">
            <div className="bg-[linear-gradient(180deg,rgba(10,14,24,0.86),rgba(6,9,16,0.96))] px-6 py-8 sm:px-8">
              <p className="text-[0.72rem] font-black uppercase tracking-[0.34em] text-amber-200/88">
                How It Works
              </p>
              <h2 className="mt-4 font-[var(--font-display)] text-[2rem] font-semibold uppercase leading-[0.92] tracking-[0.03em] text-white sm:text-[2.5rem]">
                Learn in one round.
                <span className="block text-slate-200">Time for years.</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Void Count is easy to explain to cold traffic because the core
                loop is simple: stay low, pressure the table, and call Count when
                you think you have the edge.
              </p>
            </div>

            <div className="grid gap-px bg-white/10 md:grid-cols-3">
              {HOW_IT_WORKS.map((item) => (
                <article
                  key={item.title}
                  className="hero-step bg-[linear-gradient(180deg,rgba(8,12,20,0.88),rgba(4,7,13,0.98))] px-5 py-6 sm:px-6"
                >
                  <p className="text-[0.72rem] font-black uppercase tracking-[0.24em] text-emerald-200/88">
                    {item.step}
                  </p>
                  <h3 className="mt-3 text-lg font-black uppercase tracking-[0.04em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
