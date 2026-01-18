"use client";

import React, { useState } from "react";

const FAQ_DATA = [
  {
    question: "When is the Kickstarter launching?",
    answer: "We're in the final stages of playtesting. Join the waiting list to get the exact launch date and early-bird discounts."
  },
  {
    question: "How do I join the waiting list?",
    answer: "Simply scroll to the bottom of our homepage and enter your email address. You'll receive updates about the Kickstarter launch, early-bird pricing, and exclusive playtest invitations."
  },
  {
    question: "What will I get by joining the waiting list?",
    answer: "Early access to the Kickstarter campaign, exclusive early-bird pricing, first access to playtest invitations, and updates on game development progress."
  },
  {
    question: "How many players can play?",
    answer: "Void Count is designed for 2–8 players, making it one of the best new card games for both small groups and large parties. It works great as a tight 1v1 duel or a chaotic party game."
  },
  {
    question: "How long does a game take?",
    answer: "Rounds are fast-paced and intense, typically lasting 5-10 minutes. The overall game length depends on player strategy and sabotage levels, making it perfect for quick game nights."
  },
  {
    question: "What age is this game suitable for?",
    answer: "Void Count is suitable for ages 7 and up. The rules are simple enough for younger players, while the deep strategy appeals to adults. It's a perfect family card game gift."
  },
  {
    question: "Is it easy to learn?",
    answer: "Absolutely. Most people pick up the basics in just a few minutes. The complexity comes from the strategic use of Power cards and reading your opponents."
  },
  {
    question: "What's the goal of the game?",
    answer: "The goal is to have the lowest score at the end of each round. Use Power cards to sabotage opponents, lower your own hand value, and call Count when you think you have the lowest total."
  },
  {
    question: "What are Power cards?",
    answer: "Power cards are special action cards that let you manipulate the game. Examples include Sabotage (force opponents to take cards), Toss (discard cards), Take Two (draw extra cards), and Double Your Hand (double your score)."
  },
  {
    question: "What are 10-point cards?",
    answer: "10-point cards represent different environments (like Blue Glacier, Desert Horizon, Toxic Swamp, Volcanix Lava). Each adds 10 points to your hand value, so avoiding them is crucial to winning."
  },
  {
    question: "What happens when I call Count?",
    answer: "When you call Count, all players reveal their hands. If you have the lowest total, you win the round. If not, you face a penalty for calling incorrectly."
  },
  {
    question: "Can I play with just 2 players?",
    answer: "Yes! Void Count works excellently with 2 players, creating intense strategic duels. The game scales well from 2 to 8 players, each player count offering a different dynamic."
  },
  {
    question: "What's included in the game?",
    answer: "The Kickstarter edition will include a full deck of Void Count cards, including Power cards and 10-point environment cards, along with the official rulebook."
  },
  {
    question: "Will you ship internationally?",
    answer: "Yes, we plan to offer international shipping through our Kickstarter campaign. Exact shipping rates and regions will be announced closer to launch."
  },
  {
    question: "When will the game be delivered?",
    answer: "Delivery timelines will be confirmed during the Kickstarter campaign. We'll keep all backers updated throughout the production and shipping process."
  },
  {
    question: "Can I play the game before it's released?",
    answer: "We occasionally host playtest sessions for members of our waiting list. Join the list to be notified about upcoming playtesting opportunities and events."
  },
  {
    question: "Will there be expansions or additional cards?",
    answer: "We're always exploring new ideas and card designs. Future expansions will depend on community feedback and interest. Join the waiting list to stay informed about future content."
  },
  {
    question: "Is this game similar to other card games?",
    answer: "Void Count has a unique blend of strategy, sabotage, and bluffing mechanics. While it shares elements with some classic card games, its focus on lowest score, Power cards, and the Count mechanic creates a distinct gameplay experience."
  },
  {
    question: "What makes Void Count different?",
    answer: "Void Count combines strategic hand management with active player interaction through Power cards. The goal of having the lowest score (instead of highest) flips traditional card game strategy, while sabotage elements keep every round unpredictable."
  },
  {
    question: "Can I buy Void Count in stores?",
    answer: "Initially, Void Count will be available through our Kickstarter campaign. Retail distribution will depend on the success of the campaign and community demand."
  },
  {
    question: "How do Power cards affect gameplay?",
    answer: "Power cards are the heart of Void Count's strategy. They allow you to disrupt opponents' plans, protect yourself, or manipulate your own hand. Using them at the right moment can turn the tide of any round."
  },
  {
    question: "What is the next evolution of strategic card games?",
    answer: "Void Count represents a meticulous strategic experience that combines the best elements of classic card games with innovative mechanics. As one of the most anticipated new card games of 2026, it offers a unique blend of risk management, psychological bluffing, and tactical sabotage."
  },
  {
    question: "Why choose Void Count for your next game night?",
    answer: "Void Count provides endless replayability with its dynamic deck mechanics and player-driven chaos. It's the perfect choice for both intimate 1v1 duels and large party settings (up to 8 players). Plus, it features stunning cosmic artwork and high-quality card stock, making it a premium card game gift."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative z-20 py-12 sm:py-16 md:py-24 lg:py-32 bg-transparent">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tighter uppercase italic leading-[0.85] sm:leading-[0.8] mb-4 sm:mb-6 md:scale-y-110 px-2">
            FREQUENTLY ASKED <span className="text-indigo-500 italic">QUESTIONS</span>
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {FAQ_DATA.map((item, index) => (
            <div 
              key={index}
              className="rounded-xl sm:rounded-2xl bg-white/5 border border-slate-800 overflow-hidden transition-all hover:border-slate-700"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-4 sm:p-5 md:p-6 text-left flex items-center justify-between gap-3 sm:gap-4"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
              >
                <span className="text-base sm:text-lg font-black text-white uppercase italic tracking-tight pr-2">{item.question}</span>
                <span className={`text-xl sm:text-2xl text-indigo-500 transition-transform duration-300 shrink-0 ${openIndex === index ? "rotate-45" : ""}`} aria-hidden="true">+</span>
              </button>
              <div 
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-4 sm:p-5 md:p-6 pt-0 pb-4 sm:pb-5 md:pb-6 text-sm sm:text-base text-slate-300 font-medium leading-relaxed italic">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
