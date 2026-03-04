import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { DemoCard, DrawPileVisual, PowerCardVisual } from "@/components/how-to-play/DemoCards";
import { RuleSection } from "@/components/how-to-play/RuleSection";
import {
  CARDS_PER_PLAYER,
  HOW_TO_PLAY_VIDEO_URL,
  KICKSTARTER_URL,
  MAX_PLAYERS,
  MIN_PLAYERS,
  TOTAL_CARDS,
} from "@/lib/constants";
import { getSiteUrl } from "@/lib/site";
import styles from "./how-to-play.module.css";

export const metadata: Metadata = {
  title: "How to Play Void Count | Official Rules and Setup",
  description:
    "Learn how to play Void Count with the official gameplay guide. Set up in minutes, understand turn flow, use Power Cards correctly, and score every round with confidence. A fast strategic card game for 2-8 players.",
  keywords: [
    "how to play void count",
    "void count rules",
    "void count setup",
    "strategic card game rules",
    "card game instructions",
    "card game scoring rules",
    "2-8 player card game",
    "kickstarter card game rules",
  ],
  alternates: { canonical: `${getSiteUrl()}/how-to-play` },
  openGraph: {
    title: "How to Play Void Count | Official Rules and Setup",
    description:
      "Learn how to play Void Count with official setup, turn flow, power card, and scoring rules.",
    url: "/how-to-play",
  },
  twitter: {
    title: "How to Play Void Count | Official Rules and Setup",
    description:
      "Official Void Count rules covering setup, turn flow, power cards, and scoring.",
  },
};

const HERO_CARDS = [
  { src: "/optimized/back-v2.jpg", alt: "Void Count card back", className: styles.heroCardOne },
  { src: "/optimized/take-two-v1.jpg", alt: "Void Count Take Two card", className: styles.heroCardTwo },
  { src: "/optimized/sabotage-v1.jpg", alt: "Void Count Sabotage card", className: styles.heroCardThree },
] as const;

const SETUP_STEPS = [
  {
    title: "Deal cards",
    body: `Deal ${CARDS_PER_PLAYER} cards to each player.`,
  },
  {
    title: "Create the center",
    body: "Place the remaining deck in the middle and flip one card to start the Discard Pile.",
  },
  {
    title: "Start with dealer's left",
    body: "The player to the dealer's left begins, then play continues clockwise for the round.",
  },
  {
    title: "Play fast",
    body: "Keep turns moving. Resolve card effects immediately so momentum stays high.",
  },
] as const;

const QUICK_RULINGS = [
  "Lowest hand total wins the round.",
  "If the Count caller is beaten, they take a 20-point penalty.",
  "If a player ties the caller, tied players score 1 and caller scores 0.",
  "No player can score over 25 points in one round.",
  "A player cannot use a Power Card on themselves.",
  "If Draw Deck runs out, reshuffle the Discard Pile.",
] as const;

const KICKSTARTER_HREF = /^https?:\/\//i.test(KICKSTARTER_URL)
  ? KICKSTARTER_URL
  : `https://${KICKSTARTER_URL.replace(/^\/+/, "")}`;

const getYouTubeEmbedUrl = (input: string): string | null => {
  const value = input.trim();
  if (!value) {
    return null;
  }

  // Support direct video ID
  if (/^[A-Za-z0-9_-]{11}$/.test(value)) {
    return `https://www.youtube.com/embed/${value}?rel=0&modestbranding=1`;
  }

  // Support common YouTube URL shapes
  const patterns = [
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})/,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match?.[1]) {
      return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1`;
    }
  }

  return null;
};

export default function HowToPlayPage() {
  const youtubeEmbedUrl = getYouTubeEmbedUrl(HOW_TO_PLAY_VIDEO_URL);

  return (
    <main className={`min-h-screen bg-transparent text-slate-50 overflow-x-hidden ${styles.pageShell}`}>
      <SiteHeader />

      <div className="relative pt-24 sm:pt-28 md:pt-36 lg:pt-44 pb-14 sm:pb-16 md:pb-24 px-4 sm:px-6">
        <div className={`${styles.glowOrb} ${styles.glowOrbTop}`} aria-hidden="true" />
        <div className={`${styles.glowOrb} ${styles.glowOrbBottom}`} aria-hidden="true" />

        <section className="max-w-6xl mx-auto mb-12 sm:mb-14 md:mb-16">
          <div className={`${styles.heroPanel} grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr]`}>
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-indigo-300 font-semibold mb-4">
                Official Gameplay Guide
              </p>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase italic tracking-tighter leading-[0.85] ${styles.titleFlux}`}>
                How To Play
                <span className="block">Void Count</span>
              </h1>
              <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
                Learn the core flow, timing rules, and scoring in one pass. This page is your live table reference for quick setup and confident calls.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <span className={`${styles.badgePulse} inline-flex items-center rounded-full border border-indigo-400/40 bg-indigo-500/15 px-4 py-2 text-xs sm:text-sm uppercase tracking-[0.14em] text-indigo-200 font-semibold`}>
                  {MIN_PLAYERS}-{MAX_PLAYERS} Players
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-600/70 bg-slate-900/70 px-4 py-2 text-xs sm:text-sm uppercase tracking-[0.12em] text-slate-200 font-semibold">
                  {TOTAL_CARDS} Card Deck
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-600/70 bg-slate-900/70 px-4 py-2 text-xs sm:text-sm uppercase tracking-[0.12em] text-slate-200 font-semibold">
                  Lowest Score Wins
                </span>
              </div>

              <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
                <a
                  href={KICKSTARTER_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm uppercase tracking-[0.12em] font-semibold px-4 py-2.5 transition-colors"
                >
                  Back On <span className="text-[#05ce78]">Kickstarter</span>
                </a>
                <Link
                  href="/settling-debates"
                  className="inline-flex items-center rounded-full border border-slate-600/70 bg-slate-950/70 text-slate-200 hover:text-white hover:border-slate-400 text-xs sm:text-sm uppercase tracking-[0.12em] font-semibold px-4 py-2.5 transition-colors"
                >
                  Settling Debates
                </Link>
              </div>
            </div>

            <div className={styles.heroCardScene} aria-hidden="true">
              <div className={styles.heroCardHalo} />
              {HERO_CARDS.map((card, index) => (
                <div key={card.src} className={`${styles.heroCard} ${card.className}`}>
                  <Image
                    src={card.src}
                    alt={card.alt}
                    width={200}
                    height={280}
                    className="w-full h-full object-cover rounded-[0.9rem]"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto mb-12 sm:mb-14 md:mb-16">
          <div className={`${styles.setupPanel} p-6 sm:p-7 md:p-8 rounded-2xl md:rounded-3xl`}>
            <div className="mb-6 sm:mb-8">
              <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-indigo-300 font-semibold mb-4">
                Setup In One Minute
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase italic tracking-tight text-white">
                Table Setup
              </h2>
            </div>
            <ol className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {SETUP_STEPS.map((step, index) => (
                <li key={step.title}>
                  <article className={`${styles.setupCard} h-full p-5 sm:p-6`} style={{ animationDelay: `${120 + index * 100}ms` }}>
                    <span className={styles.setupNumber}>{index + 1}</span>
                    <h3 className="mt-4 text-base sm:text-lg font-black uppercase tracking-wide text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                      {step.body}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="max-w-6xl mx-auto mb-12 sm:mb-14 md:mb-16">
          <div className={`${styles.videoPanel} p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl`}>
            <div className="mb-4 sm:mb-5">
              <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-indigo-300 font-semibold mb-3">
                Video Guide
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase italic tracking-tight text-white">
                Watch How To Play
              </h2>
            </div>

            {youtubeEmbedUrl ? (
              <div className={styles.videoFrameWrap}>
                <iframe
                  src={youtubeEmbedUrl}
                  title="How to Play Void Count Video Guide"
                  className={styles.videoFrame}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className={styles.videoPlaceholder}>
                <p className="text-slate-100 text-sm sm:text-base md:text-lg font-semibold">
                  How-to-play video coming soon.
                </p>
                <p className="text-slate-300 text-xs sm:text-sm mt-2">
                  Add your YouTube link in <code className="text-indigo-200">/lib/constants.ts</code> as
                  <code className="text-indigo-200"> HOW_TO_PLAY_VIDEO_URL</code> and it will auto-embed here.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="max-w-6xl mx-auto mb-12 sm:mb-14 md:mb-16">
          <RuleSection
            title="Draw, then decide your play"
            icon={<span className={styles.sectionBadge}>01</span>}
            description={
              <>
                <p>On your turn, pull from the Draw Deck or Discard Pile, then make your best move for hand control.</p>
                <p>Smart turns are about pressure and timing, not just raw card value.</p>
              </>
            }
            cardVisual={<DrawPileVisual />}
          />

          <RuleSection
            alignment="right"
            title="Use Power Cards to shift momentum"
            icon={<span className={styles.sectionBadge}>02</span>}
            description={
              <>
                <p>Power Cards create swing turns. Use them to force mistakes, break table rhythm, or protect your own line.</p>
                <p>You cannot target yourself with a Power Card, and effects resolve immediately when played.</p>
              </>
            }
            cardVisual={<PowerCardVisual />}
          />

          <RuleSection
            title="Call Count and score accurately"
            icon={<span className={styles.sectionBadge}>03</span>}
            description={
              <>
                <p>Call Count when you believe your hand is safely low. If your read is right, you lock in a strong round.</p>
                <p>If the caller is beaten, the caller takes a 20-point penalty and lowest hand scores 0.</p>
              </>
            }
            cardVisual={
              <div className={styles.scoreVisual}>
                <DemoCard value={0} label="Best Round Score" color="sky" />
                <DemoCard value={20} label="Caller Penalty" color="rose" />
              </div>
            }
          />
        </section>

        <section className="max-w-6xl mx-auto mb-12 sm:mb-14 md:mb-16">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase italic tracking-tight text-white">
              Quick Rulings
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-3xl">
              Use these for fast table decisions. For edge cases and detailed clarifications, open Settling Debates.
            </p>
          </div>
          <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {QUICK_RULINGS.map((rule, index) => (
              <li key={rule}>
                <article className={`${styles.ruleCard} h-full p-5 sm:p-6`} style={{ animationDelay: `${140 + index * 70}ms` }}>
                  <span className={styles.ruleNumber}>{index + 1}</span>
                  <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed">
                    {rule}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section className="max-w-5xl mx-auto">
          <div className={`${styles.ctaPanel} p-6 sm:p-7 md:p-8 rounded-2xl md:rounded-3xl`}>
            <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-indigo-300 font-semibold mb-4">
              Keep The Table Moving
            </p>
            <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl">
              Start with this guide, then use Settling Debates for edge cases and FAQ for fast answers. If you are ready to play, back Void Count on <span className="text-[#05ce78]">Kickstarter</span>.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/settling-debates"
                className="inline-flex items-center rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm uppercase tracking-[0.12em] font-semibold px-4 py-2.5 transition-colors"
              >
                Open Settling Debates
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center rounded-full border border-slate-600/70 bg-slate-950/70 text-slate-200 hover:text-white hover:border-slate-400 text-xs sm:text-sm uppercase tracking-[0.12em] font-semibold px-4 py-2.5 transition-colors"
              >
                Browse FAQ
              </Link>
              <Link
                href="/"
                className="inline-flex items-center rounded-full border border-slate-600/70 bg-slate-950/70 text-slate-200 hover:text-white hover:border-slate-400 text-xs sm:text-sm uppercase tracking-[0.12em] font-semibold px-4 py-2.5 transition-colors"
              >
                Back Home
              </Link>
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
