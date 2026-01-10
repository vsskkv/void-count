"use client";

import React, { useState } from "react";

const FAQ_DATA = [
  {
    question: "How many players can play?",
    answer: "Void Count is designed for 2–6 players. It works great as a tight 1v1 duel or a chaotic party game."
  },
  {
    question: "How long does a game take?",
    answer: "Rounds are fast and intense. The overall game length depends on player strategy and sabotage levels."
  },
  {
    question: "Is it easy to learn?",
    answer: "Absolutely. Most people pick up the basics in just a few minutes. The complexity comes from the strategic use of Power cards."
  },
  {
    question: "When is the Kickstarter launching?",
    answer: "We're in the final stages of playtesting. Join the waiting list to get the exact launch date and early-bird discounts."
  },
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative z-20 py-24 md:py-32 bg-slate-950">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-[0.8] mb-6 scale-y-110">
            COMMON <span className="text-indigo-500 italic">QUESTIONS</span>
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
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-0 text-slate-400 font-medium leading-relaxed italic">
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
