import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getSiteUrl } from "@/lib/site";
import { KICKSTARTER_URL, MAX_PLAYERS, MIN_PLAYERS } from "@/lib/constants";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Void Count | Story and Design Philosophy",
  description:
    "Discover the origins of Void Count, a strategic card game built for social sabotage and laughs. Learn why it is a standout game night pick and now live on Kickstarter.",
  keywords: [
    "about void count",
    "void count story",
    "void count game design",
    "card game creators",
    "strategic card game history",
    "card game development",
    "kickstarter card game",
    "tabletop card game",
  ],
  alternates: { canonical: `${getSiteUrl()}/about` },
  openGraph: {
    title: "About Void Count | Story and Design Philosophy",
    description:
      "Discover how Void Count was designed for sabotage, bluffing, and replayable table moments.",
    url: "/about",
  },
  twitter: {
    title: "About Void Count | Story and Design Philosophy",
    description:
      "Discover how Void Count was designed for sabotage, bluffing, and replayable table moments.",
  },
};

const STORY_STEPS = [
  {
    title: "Prototype Nights",
    body: "Void Count started during long game nights where we tested round pacing, bluff windows, and sabotage timing until every turn felt tense and fun.",
  },
  {
    title: "Rules That Stay Fast",
    body: "We kept the rules lightweight on purpose. The goal was simple: make setup quick, decisions sharp, and every table argument easy to settle.",
  },
  {
    title: "Built for Replayability",
    body: "Power cards, hand management, and shifting momentum make each round play differently. Players can learn quickly and still discover depth over time.",
  },
] as const;

const GAME_PILLARS = [
  {
    title: "Social Strategy",
    body: "Every decision creates pressure at the table. You are reading opponents, timing your cards, and deciding when to call Count.",
  },
  {
    title: "Controlled Chaos",
    body: "Power cards can flip momentum fast, but skilled players still shape outcomes through risk management and hand control.",
  },
  {
    title: "Quick Rounds",
    body: "Rounds stay tight and energetic so players can run it back instantly. It works for short sessions and longer game nights.",
  },
] as const;

const SHOWCASE_CARDS = [
  { src: "/optimized/sabotage-v1.jpg", alt: "Void Count Sabotage card", className: styles.cardOne },
  { src: "/optimized/toss-v1.jpg", alt: "Void Count Toss card", className: styles.cardTwo },
  { src: "/optimized/take-two-v1.jpg", alt: "Void Count Take Two card", className: styles.cardThree },
  { src: "/optimized/double-your-hand-v1.jpg", alt: "Void Count Double Your Hand card", className: styles.cardFour },
] as const;

const KICKSTARTER_HREF = /^https?:\/\//i.test(KICKSTARTER_URL)
  ? KICKSTARTER_URL
  : `https://${KICKSTARTER_URL.replace(/^\/+/, "")}`;

export default function AboutPage() {
  return (
    <main className={`min-h-screen bg-transparent text-slate-50 overflow-x-hidden ${styles.pageShell}`}>
      <SiteHeader />

      <div className="relative pt-24 sm:pt-28 md:pt-36 lg:pt-44 pb-14 sm:pb-16 md:pb-24 px-4 sm:px-6">
        <div className={`${styles.glowOrb} ${styles.glowOrbTop}`} aria-hidden="true" />
        <div className={`${styles.glowOrb} ${styles.glowOrbBottom}`} aria-hidden="true" />

        <section className="max-w-6xl mx-auto mb-12 sm:mb-14 md:mb-16">
          <div className={`${styles.heroPanel} grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.2fr_0.8fr]`}>
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-indigo-300 font-semibold mb-4">
                The Story Behind The Game
              </p>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase italic tracking-tighter leading-[0.85] ${styles.titleFlux}`}>
                About
                <span className="block">Void Count</span>
              </h1>
              <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
                We built Void Count to create loud, high-stakes table moments with clean rules and deep decision-making. It is fast to learn, competitive to master, and designed to keep friends asking for one more round.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <span className={`${styles.badgePulse} inline-flex items-center rounded-full border border-indigo-400/40 bg-indigo-500/15 px-4 py-2 text-xs sm:text-sm uppercase tracking-[0.14em] text-indigo-200 font-semibold`}>
                  {MIN_PLAYERS}-{MAX_PLAYERS} Players
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-600/70 bg-slate-900/70 px-4 py-2 text-xs sm:text-sm uppercase tracking-[0.12em] text-slate-200 font-semibold">
                  Strategic + Social
                </span>
              </div>
            </div>

            <div className={styles.cardScene} aria-hidden="true">
              <div className={styles.cardHalo} />
              {SHOWCASE_CARDS.map((card, index) => (
                <div key={card.src} className={`${styles.showcaseCard} ${card.className}`}>
                  <Image
                    src={card.src}
                    alt={card.alt}
                    width={190}
                    height={266}
                    className="w-full h-auto object-contain"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto mb-12 sm:mb-14 md:mb-16">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase italic tracking-tight text-white">
              How It Took Shape
            </h2>
          </div>
          <ol className="grid gap-4 sm:gap-5 md:grid-cols-3">
            {STORY_STEPS.map((item, index) => (
              <li key={item.title}>
                <article
                  className={`${styles.storyCard} h-full p-5 sm:p-6`}
                  style={{ animationDelay: `${140 + index * 110}ms` }}
                >
                  <span className={styles.storyNumber}>{index + 1}</span>
                  <h3 className="mt-4 text-base sm:text-lg font-black uppercase tracking-wide text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                    {item.body}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section className="max-w-6xl mx-auto mb-12 sm:mb-14 md:mb-16">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase italic tracking-tight text-white">
              Our Game Philosophy
            </h2>
          </div>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
            {GAME_PILLARS.map((pillar) => (
              <article key={pillar.title} className={`${styles.pillarCard} p-5 sm:p-6`}>
                <h3 className="text-base sm:text-lg font-black uppercase tracking-wide text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                  {pillar.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto">
          <div className={`${styles.ctaPanel} p-6 sm:p-7 md:p-8 rounded-2xl md:rounded-3xl`}>
            <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-indigo-300 font-semibold mb-4">
              Campaign Is Live
            </p>
            <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl">
              Back Void Count on <span className="text-[#05ce78]">Kickstarter</span> to help us bring the first edition to tables worldwide. If your table likes strategic chaos, you are exactly who we built this for.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
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
                View Settling Debates
              </Link>
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
