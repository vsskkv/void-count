import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SITE_NAME, getSiteUrl } from "@/lib/site";
import styles from "./settling-debates.module.css";

const SETTLING_DEBATES = [
  {
    title: "Beat the Caller",
    body: "If one or more players beat the Count Caller score, the caller receives a 20 point penalty. The player or tied players with the lowest point total score 0.",
  },
  {
    title: "Tie With Caller",
    body: "Players tying with the Count Caller score 1 point and the Count Caller scores 0.",
  },
  {
    title: "Single-Round Cap",
    body: "No player can score more than 25 points in a single round, even if their total exceeds 25 points.",
  },
  {
    title: "Draw Deck Refill",
    body: "If the Draw Deck runs out, reshuffle the Discard Pile and use it as the new Draw Deck.",
  },
  {
    title: "Last Card Edge Case",
    body: "If a player's last card is Toss, place the Power Card on the Discard Pile and draw one card from the Draw Deck. If a player's last card is Sabotage, place the card on the Discard Pile, draw one card from the Draw Deck, and give that drawn card to a chosen other player.",
  },
  {
    title: "No Empty-Hand Turn Start",
    body: "'Count' cannot be called and turns cannot begin with an empty hand. After playing the last card, draw one card from the Draw Deck.",
  },
  {
    title: "No Self-Targeting Power",
    body: "A player cannot use a Power Card against themselves.",
  },
  {
    title: "Power Card Penalty After Count",
    body: "Power Cards hold a point value after 'Count' is called. If the Count Caller is holding a Power Card, they receive a 20 point penalty and score 0 is given to the player or tied players with the lowest score.",
  },
  {
    title: "Matching Discard-Pile Power Card",
    body: "If the Power Card picked from the Discard Pile is the same as one a player already possesses, it can be played.",
  },
] as const;

const SHOWCASE_CARDS = [
  { src: "/optimized/sabotage-v1.jpg", alt: "Void Count Sabotage card", className: styles.deckCardOne },
  { src: "/optimized/toss-v1.jpg", alt: "Void Count Toss card", className: styles.deckCardTwo },
  { src: "/optimized/take-two-v1.jpg", alt: "Void Count Take Two card", className: styles.deckCardThree },
  { src: "/optimized/double-your-hand-v1.jpg", alt: "Void Count Double Your Hand card", className: styles.deckCardFour },
] as const;

export const metadata: Metadata = {
  title: `Settling Debates | ${SITE_NAME} Rules Clarifications | Card Games`,
  description:
    `Review official Settling Debates rulings for ${SITE_NAME}. These clarifications cover Count Caller penalties, tie scoring, Draw Deck reshuffles, and Power Card edge cases for smoother gameplay.`,
  keywords: [
    "Void Count settling debates",
    "Void Count rules clarifications",
    "count caller penalty rule",
    "card game tie scoring",
    "power card rule clarifications",
    "draw deck reshuffle rule",
    "card game official rulings",
  ],
  alternates: { canonical: `${getSiteUrl()}/settling-debates` },
  openGraph: {
    title: `Settling Debates | ${SITE_NAME} Rules Clarifications`,
    description:
      `Official rulings for key ${SITE_NAME} gameplay debates, including Count scoring, Power Card penalties, and deck reset rules.`,
    url: "/settling-debates",
  },
  twitter: {
    title: `Settling Debates | ${SITE_NAME} Rules Clarifications`,
    description:
      `Official rulings for key ${SITE_NAME} gameplay debates, including Count scoring and Power Card edge cases.`,
  },
};

export default function SettlingDebatesPage() {
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
                Official Rules Clarifications
              </p>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase italic tracking-tighter leading-[0.85] ${styles.titleFlux}`}>
                Settling
                <span className="block">Debates</span>
              </h1>
              <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
                Use these rulings when the table debates an edge case. They settle score calls, Power Card outcomes, and deck flow so each round keeps moving.
              </p>

              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <span className={`${styles.badgePulse} inline-flex items-center rounded-full border border-indigo-400/40 bg-indigo-500/15 px-4 py-2 text-xs sm:text-sm uppercase tracking-[0.15em] text-indigo-200 font-semibold`}>
                  9 Rule Decisions
                </span>
                <Link
                  href="/faq"
                  className="inline-flex items-center rounded-full border border-slate-600/70 bg-slate-900/60 px-4 py-2 text-xs sm:text-sm uppercase tracking-[0.12em] text-slate-200 font-semibold hover:border-indigo-400/60 hover:text-white transition-colors"
                >
                  See FAQ
                </Link>
              </div>
            </div>

            <div className={styles.deckScene} aria-hidden="true">
              <div className={styles.deckHalo} />
              {SHOWCASE_CARDS.map((card, index) => (
                <div key={card.src} className={`${styles.deckCard} ${card.className}`}>
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

        <section className="max-w-6xl mx-auto">
          <ol className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {SETTLING_DEBATES.map((debate, index) => (
              <li key={debate.title}>
                <article
                  className={`${styles.ruleCard} h-full p-5 sm:p-6`}
                  style={{ animationDelay: `${180 + index * 80}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <span className={styles.ruleNumber}>{index + 1}</span>
                    <div>
                      <h2 className="text-base sm:text-lg font-black uppercase tracking-wide text-white">
                        {debate.title}
                      </h2>
                      <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                        {debate.body}
                      </p>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section className="max-w-5xl mx-auto mt-12 sm:mt-14 md:mt-16">
          <div className={`${styles.quickPanel} p-6 sm:p-7 md:p-8 rounded-2xl md:rounded-3xl`}>
            <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-indigo-300 font-semibold mb-4">
              Fast Table Reminder
            </p>
            <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-indigo-400/20 bg-slate-900/70 p-4">
                <p className="text-sm sm:text-base font-semibold text-slate-100">Lowest score wins the round.</p>
              </div>
              <div className="rounded-xl border border-indigo-400/20 bg-slate-900/70 p-4">
                <p className="text-sm sm:text-base font-semibold text-slate-100">Caller mistakes trigger penalties.</p>
              </div>
              <div className="rounded-xl border border-indigo-400/20 bg-slate-900/70 p-4">
                <p className="text-sm sm:text-base font-semibold text-slate-100">Nobody starts a turn with zero cards.</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm uppercase tracking-[0.12em] font-semibold px-4 py-2.5 transition-colors"
              >
                Send a Rules Question
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
