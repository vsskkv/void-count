"use client";

import React from "react";
import Link from "next/link";

export const SEOContentSection = () => {
  return (
    <section className="relative z-20 py-12 sm:py-16 md:py-24 lg:py-32 bg-slate-950 overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.05),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="prose prose-invert prose-lg max-w-none">
          {/* Main H2 with target keywords */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 text-white tracking-tight">
            Discover the Best New Card Game of 2024
          </h2>
          
          <div className="space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed">
            <p>
              Looking for a <strong>new card game</strong> that brings excitement to your game nights? 
              <strong> Void Count</strong> is the <strong>new card game</strong> you've been waiting for. 
              This innovative <strong>strategic card game</strong> combines elements of risk, bluffing, and 
              sabotage to create an unforgettable gaming experience. Whether you're a seasoned card game 
              enthusiast or discovering <strong>card games</strong> for the first time, Void Count offers 
              something special.
            </p>
            
            <p>
              As one of the most anticipated <strong>new card games</strong> launching in 2024, Void Count 
              stands out in the crowded world of <strong>card games</strong>. Unlike traditional card games, 
              this <strong>strategy card game</strong> challenges players to think several moves ahead while 
              navigating the chaos of sabotage cards and strategic plays. It's the perfect <strong>card game 
              for families</strong> and friends who love competitive gameplay.
            </p>
            
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mt-8 mb-4 text-white">
              Why Choose Void Count as Your Next Card Game?
            </h3>
            
            <ul className="space-y-4 list-none pl-0">
              <li className="flex items-start gap-3">
                <span className="text-indigo-500 text-xl shrink-0 mt-1">✓</span>
                <div>
                  <strong className="text-white">Fast-Paced Gameplay:</strong> This <strong>new card game</strong> 
                  delivers quick rounds that keep everyone engaged. Perfect for those who want a <strong>card game</strong> 
                  that doesn't drag on for hours.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-500 text-xl shrink-0 mt-1">✓</span>
                <div>
                  <strong className="text-white">Strategic Depth:</strong> While easy to learn, this <strong>strategic 
                  card game</strong> offers layers of complexity that reward clever play. It's a <strong>card game</strong> 
                  that grows with you.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-500 text-xl shrink-0 mt-1">✓</span>
                <div>
                  <strong className="text-white">Perfect for Groups:</strong> Works great with 2-6 players, making it 
                  an ideal <strong>family card game</strong> and <strong>party card game</strong>. Whether you're hosting 
                  a game night or looking for a <strong>new card game</strong> to play with friends, Void Count delivers.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-500 text-xl shrink-0 mt-1">✓</span>
                <div>
                  <strong className="text-white">Unique Mechanics:</strong> This <strong>new card game</strong> introduces 
                  fresh gameplay mechanics that set it apart from other <strong>card games</strong>. The sabotage and bluffing 
                  elements create memorable moments every game.
                </div>
              </li>
            </ul>
            
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mt-8 mb-4 text-white">
              The Ultimate Card Game for Strategy Lovers
            </h3>
            
            <p>
              If you're searching for <strong>new card games</strong> that offer more than just luck, Void Count is 
              designed for you. This <strong>strategy card game</strong> rewards tactical thinking and psychological 
              play. Each round of this <strong>card game</strong> presents new challenges and opportunities, ensuring 
              that no two games feel the same.
            </p>
            
            <p>
              As a <strong>new card game</strong> launching on Kickstarter, Void Count represents the next evolution 
              in <strong>card games</strong>. It combines the best elements of classic <strong>card games</strong> with 
              innovative mechanics that modern players crave. Whether you're building your <strong>card game</strong> 
              collection or looking for the perfect gift for a board game enthusiast, Void Count is a must-have 
              <strong> new card game</strong>.
            </p>
            
            <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-indigo-950/40 border border-indigo-500/30">
              <h4 className="text-xl sm:text-2xl font-black mb-4 text-white">
                Ready to Experience This New Card Game?
              </h4>
              <p className="mb-4">
                Join thousands of players who are already excited about this <strong>new card game</strong>. 
                Be among the first to get Void Count when it launches on Kickstarter. This <strong>strategic 
                card game</strong> is perfect for anyone who loves <strong>card games</strong> that combine 
                strategy, fun, and replayability.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/how-to-play" 
                  className="text-indigo-400 hover:text-indigo-300 font-bold underline"
                >
                  Learn how to play this new card game →
                </Link>
                <span className="text-slate-500">|</span>
                <Link 
                  href="/about" 
                  className="text-indigo-400 hover:text-indigo-300 font-bold underline"
                >
                  About Void Count card game →
                </Link>
                <span className="text-slate-500">|</span>
                <Link 
                  href="/faq" 
                  className="text-indigo-400 hover:text-indigo-300 font-bold underline"
                >
                  Card game FAQ →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
