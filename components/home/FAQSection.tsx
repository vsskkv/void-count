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
    answer: "Void Count is designed for 2–6 players. It works great as a tight 1v1 duel or a chaotic party game with more players."
  },
  {
    question: "How long does a game take?",
    answer: "Rounds are fast and intense. The overall game length depends on player strategy and sabotage levels, typically ranging from quick rounds to extended strategic battles."
  },
  {
    question: "What age is this game suitable for?",
    answer: "Void Count is suitable for ages 7 and up. The rules are simple enough for younger players, while the strategic depth appeals to adults. Perfect for family game nights."
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
    answer: "Yes! Void Count works excellently with 2 players, creating intense strategic duels. The game scales well from 2 to 6 players, each player count offering a different dynamic."
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
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative z-20 py-24 md:py-32 bg-slate-950">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-[0.8] mb-6 scale-y-110">
            FREQUENTLY ASKED <span className="text-indigo-500 italic">QUESTIONS</span>
          </h2>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => (
            <div 
              key={index}
              className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden transition-all hover:border-white/20"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4"
              >
                <span className="text-lg font-black text-white uppercase italic tracking-tight">{item.question}</span>
                <span className={`text-2xl text-indigo-500 transition-transform duration-300 ${openIndex === index ? "rotate-45" : ""}`}>+</span>
              </button>
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-0 pb-6 text-slate-400 font-medium leading-relaxed italic">
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
