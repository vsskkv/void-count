"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./FAQSection.module.css";
import { KICKSTARTER_URL, MAX_PLAYERS, MIN_PLAYERS } from "@/lib/constants";

const FAQ_DATA = [
  {
    category: "Launch",
    question: "Is Void Count live on Kickstarter?",
    answer:
      "Yes. Void Count is live on Kickstarter right now, and backing the campaign directly helps fund production and delivery.",
  },
  {
    category: "Launch",
    question: "Where can I back Void Count?",
    answer:
      "Use any Back on Kickstarter button on the site to open the campaign page and choose your reward tier.",
  },
  {
    category: "Launch",
    question: "Why back on Kickstarter?",
    answer:
      "Backers help us fund the first print run and unlock stretch goals, while securing campaign rewards through Kickstarter.",
  },
  {
    category: "Gameplay",
    question: "How many players can play?",
    answer:
      "Void Count is designed for 2–8 players, making it one of the best new card games for both small groups and large parties. It works great as a tight 1v1 duel or a chaotic party game.",
  },
  {
    category: "Gameplay",
    question: "How long does a game take?",
    answer:
      "Rounds are fast-paced and intense, typically lasting 5-10 minutes. The overall game length depends on player strategy and sabotage levels, making it perfect for quick game nights.",
  },
  {
    category: "Gameplay",
    question: "What age is this game suitable for?",
    answer:
      "Void Count is suitable for ages 7 and up. The rules are simple enough for younger players, while the deep strategy appeals to adults. It's a perfect family card game gift.",
  },
  {
    category: "Gameplay",
    question: "Is it easy to learn?",
    answer:
      "Absolutely. Most people pick up the basics in just a few minutes. The complexity comes from the strategic use of Power cards and reading your opponents.",
  },
  {
    category: "Gameplay",
    question: "What's the goal of the game?",
    answer:
      "The goal is to have the lowest score at the end of each round. Use Power cards to sabotage opponents, lower your own hand value, and call Count when you think you have the lowest total.",
  },
  {
    category: "Cards",
    question: "What are Power cards?",
    answer:
      "Power cards are special action cards that let you manipulate the game. Examples include Sabotage (force opponents to take cards), Toss (discard cards), Take Two (draw extra cards), and Double Your Hand (double your score).",
  },
  {
    category: "Cards",
    question: "What are 10-point cards?",
    answer:
      "10-point cards represent different environments (like Blue Glacier, Desert Horizon, Toxic Swamp, Volcanix Lava). Each adds 10 points to your hand value, so avoiding them is crucial to winning.",
  },
  {
    category: "Gameplay",
    question: "What happens when I call Count?",
    answer:
      "When you call Count, all players reveal their hands. If you have the lowest total, you win the round. If not, you face a penalty for calling incorrectly.",
  },
  {
    category: "Gameplay",
    question: "Can I play with just 2 players?",
    answer:
      "Yes! Void Count works excellently with 2 players, creating intense strategic duels. The game scales well from 2 to 8 players, each player count offering a different dynamic.",
  },
  {
    category: "Availability",
    question: "What's included in the game?",
    answer:
      "The Kickstarter edition will include a full deck of Void Count cards, including Power cards and 10-point environment cards, along with the official rulebook.",
  },
  {
    category: "Availability",
    question: "Will you ship internationally?",
    answer:
      "Yes, we plan to offer international shipping through our Kickstarter campaign. Exact shipping rates and regions will be announced closer to launch.",
  },
  {
    category: "Availability",
    question: "When will the game be delivered?",
    answer:
      "Delivery timelines will be confirmed during the Kickstarter campaign. We'll keep all backers updated throughout the production and shipping process.",
  },
  {
    category: "Launch",
    question: "Can I play the game before it's released?",
    answer:
      "We occasionally host playtest sessions. Follow the Kickstarter campaign updates and social channels for announcements.",
  },
  {
    category: "Launch",
    question: "Will there be expansions or additional cards?",
    answer:
      "We're always exploring new ideas and card designs. Future expansions will depend on campaign momentum and community feedback.",
  },
  {
    category: "Gameplay",
    question: "Is this game similar to other card games?",
    answer:
      "Void Count has a unique blend of strategy, sabotage, and bluffing mechanics. While it shares elements with some classic card games, its focus on lowest score, Power cards, and the Count mechanic creates a distinct gameplay experience.",
  },
  {
    category: "Gameplay",
    question: "What makes Void Count different?",
    answer:
      "Void Count combines strategic hand management with active player interaction through Power cards. The goal of having the lowest score (instead of highest) flips traditional card game strategy, while sabotage elements keep every round unpredictable.",
  },
  {
    category: "Availability",
    question: "Can I buy Void Count in stores?",
    answer:
      "Initially, Void Count will be available through our Kickstarter campaign. Retail distribution will depend on the success of the campaign and community demand.",
  },
  {
    category: "Cards",
    question: "How do Power cards affect gameplay?",
    answer:
      "Power cards are the heart of Void Count's strategy. They allow you to disrupt opponents' plans, protect yourself, or manipulate your own hand. Using them at the right moment can turn the tide of any round.",
  },
  {
    category: "Gameplay",
    question: "What is the next evolution of strategic card games?",
    answer:
      "Void Count represents a meticulous strategic experience that combines the best elements of classic card games with innovative mechanics. As one of the most anticipated new card games of 2026, it offers a unique blend of risk management, psychological bluffing, and tactical sabotage.",
  },
  {
    category: "Gameplay",
    question: "Why choose Void Count for your next game night?",
    answer:
      "Void Count provides endless replayability with its dynamic deck mechanics and player-driven chaos. It's the perfect choice for both intimate 1v1 duels and large party settings (up to 8 players). Plus, it features stunning cosmic artwork and high-quality card stock, making it a premium card game gift.",
  },
] as const;

const CATEGORY_ORDER = [
  "All",
  "Gameplay",
  "Cards",
  "Launch",
  "Availability",
] as const;

type FAQCategory = (typeof CATEGORY_ORDER)[number];

const KICKSTARTER_HREF = /^https?:\/\//i.test(KICKSTARTER_URL)
  ? KICKSTARTER_URL
  : `https://${KICKSTARTER_URL.replace(/^\/+/, "")}`;

const SHOWCASE_CARDS = [
  { src: "/optimized/sabotage-v1.jpg", alt: "Void Count Sabotage card", className: styles.cardOne },
  { src: "/optimized/toss-v1.jpg", alt: "Void Count Toss card", className: styles.cardTwo },
  { src: "/optimized/take-two-v1.jpg", alt: "Void Count Take Two card", className: styles.cardThree },
] as const;

function toFaqId(question: string): string {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>("All");
  const [openQuestion, setOpenQuestion] = useState<string | null>(
    FAQ_DATA[0]?.question ?? null
  );

  const categoryCounts = useMemo(() => {
    const counts: Partial<Record<FAQCategory, number>> = { All: FAQ_DATA.length };
    FAQ_DATA.forEach((item) => {
      counts[item.category as FAQCategory] =
        (counts[item.category as FAQCategory] ?? 0) + 1;
    });
    return counts;
  }, []);

  const filteredFaq = useMemo(() => {
    if (activeCategory === "All") return FAQ_DATA;
    return FAQ_DATA.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    if (!filteredFaq.some((item) => item.question === openQuestion)) {
      setOpenQuestion(filteredFaq[0]?.question ?? null);
    }
  }, [filteredFaq, openQuestion]);

  return (
    <section className="relative z-20 py-12 sm:py-16 md:py-24 lg:py-32 bg-transparent overflow-x-hidden">
      <div className={`${styles.glowOrb} ${styles.glowOrbTop}`} aria-hidden="true" />
      <div className={`${styles.glowOrb} ${styles.glowOrbBottom}`} aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`${styles.heroPanel} mb-8 sm:mb-10 md:mb-12 grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.2fr_0.8fr]`}>
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-indigo-300 font-semibold mb-4">
              Everything You Need To Know
            </p>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase italic tracking-tighter leading-[0.85] ${styles.titleFlux}`}>
              Frequently Asked
              <span className="block">Questions</span>
            </h2>
            <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
              Fast answers on gameplay, launch details, cards, and delivery. Use category filters to jump straight to what you need.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
              <span className={`${styles.badgePulse} inline-flex items-center rounded-full border border-indigo-400/40 bg-indigo-500/15 px-4 py-2 text-xs sm:text-sm uppercase tracking-[0.12em] text-indigo-200 font-semibold`}>
                {FAQ_DATA.length}+ Answers
              </span>
              <span className="inline-flex items-center rounded-full border border-slate-600/70 bg-slate-900/70 px-4 py-2 text-xs sm:text-sm uppercase tracking-[0.12em] text-slate-200 font-semibold">
                {MIN_PLAYERS}-{MAX_PLAYERS} Players
              </span>
              <a
                href={KICKSTARTER_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-indigo-400/45 bg-slate-900/70 px-4 py-2 text-xs sm:text-sm uppercase tracking-[0.12em] text-indigo-200 font-semibold hover:border-indigo-300 hover:text-white transition-colors"
              >
                Back on <span className="text-[#05ce78]">Kickstarter</span>
              </a>
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

        <div className="mb-6 sm:mb-8 flex flex-wrap gap-2 sm:gap-3">
          {CATEGORY_ORDER.map((category) => {
            const isActive = activeCategory === category;
            const count = categoryCounts[category] ?? 0;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`${styles.filterChip} ${isActive ? styles.filterChipActive : ""}`}
              >
                {category} <span className={styles.filterCount}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="space-y-3 sm:space-y-4">
          {filteredFaq.map((item, index) => {
            const faqId = toFaqId(item.question);
            const answerId = `faq-answer-${faqId}`;
            const questionId = `faq-question-${faqId}`;
            const isOpen = openQuestion === item.question;

            return (
              <article
                key={item.question}
                className={`${styles.faqCard} ${isOpen ? styles.faqCardOpen : ""}`}
                style={{ animationDelay: `${120 + index * 70}ms` }}
              >
                <button
                  onClick={() =>
                    setOpenQuestion(isOpen ? null : item.question)
                  }
                  className={styles.faqButton}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  id={questionId}
                >
                  <div className="pr-3 sm:pr-4">
                    <span className={styles.categoryBadge}>{item.category}</span>
                    <span className="block mt-2 text-base sm:text-lg md:text-xl font-black text-white uppercase italic tracking-tight leading-tight">
                      {item.question}
                    </span>
                  </div>
                  <span
                    className={`${styles.toggleIcon} ${isOpen ? styles.toggleIconOpen : ""}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  className={`${styles.answerWrap} ${isOpen ? styles.answerWrapOpen : ""}`}
                >
                  <div className={styles.answerInner}>
                    <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed italic">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className={`${styles.helpPanel} mt-8 sm:mt-10 md:mt-12 p-5 sm:p-6 md:p-7 rounded-2xl`}>
          <p className="text-xs sm:text-sm uppercase tracking-[0.17em] text-indigo-300 font-semibold mb-3">
            Need More Help?
          </p>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            If you cannot find your answer here, send us a question and we will add it to this FAQ.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm uppercase tracking-[0.12em] font-semibold px-4 py-2.5 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/settling-debates"
              className="inline-flex items-center rounded-full border border-slate-600/70 bg-slate-950/70 text-slate-200 hover:text-white hover:border-slate-400 text-xs sm:text-sm uppercase tracking-[0.12em] font-semibold px-4 py-2.5 transition-colors"
            >
              View Settling Debates
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
