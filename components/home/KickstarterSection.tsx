"use client";

import React from "react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export const KickstarterSection = () => {
  return (
    <section className="relative z-20 py-24 md:py-32 bg-slate-950 overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Product Mock Placeholder */}
          <div className="order-2 lg:order-1 relative group">
            <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl opacity-50 group-hover:opacity-100 transition-all duration-700" />
            <div className="relative aspect-video lg:aspect-square bg-slate-900 rounded-[2.5rem] border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
              <div className="flex flex-col items-center gap-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-indigo-600/20 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-4xl sm:text-6xl italic font-black text-indigo-400">∅</span>
                </div>
                <div className="text-center px-4">
                  <p className="text-white font-black uppercase italic tracking-tighter text-3xl sm:text-4xl">
                    Base Deck
                  </p>
                  <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs">
                    Coming Soon to Kickstarter
                  </p>
                </div>
              </div>
              
              {/* Teaser Badges */}
              <div className="absolute top-8 right-8 bg-indigo-600 text-white text-[10px] font-black uppercase px-4 py-2 rounded-full shadow-lg tracking-[0.2em] transform rotate-12">
                Launch Edition
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-4xl md:text-7xl font-black mb-6 text-white tracking-tighter uppercase italic leading-[0.8] scale-y-110">
              KICKSTARTER <br />
              <span className="text-indigo-500 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent italic">IS COMING</span>
            </h2>
            
            <p className="text-lg md:text-2xl text-slate-300 font-bold italic mb-10 leading-tight">
              Get ready for the first edition of Void Count. Join the Kickstarter list to secure early bird pricing and exclusive playtest invites.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-12">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <span className="block text-2xl mb-2">🎴</span>
                <span className="block text-white font-black uppercase text-sm mb-1 italic">116 Cards</span>
                <span className="block text-slate-500 text-[10px] font-black uppercase tracking-widest">Premium Stock</span>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <span className="block text-2xl mb-2">👥</span>
                <span className="block text-white font-black uppercase text-sm mb-1 italic">2–6 Players</span>
                <span className="block text-slate-500 text-[10px] font-black uppercase tracking-widest">Ultimate Strategy</span>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <span className="block text-2xl mb-2">⚡</span>
                <span className="block text-white font-black uppercase text-sm mb-1 italic">Fast Pace</span>
                <span className="block text-slate-500 text-[10px] font-black uppercase tracking-widest">Rapid Rounds</span>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <span className="block text-2xl mb-2">🎨</span>
                <span className="block text-white font-black uppercase text-sm mb-1 italic">Premium Art</span>
                <span className="block text-slate-500 text-[10px] font-black uppercase tracking-widest">Custom Design</span>
              </div>
            </div>

            <PrimaryButton 
              className="w-full sm:w-auto text-xl font-black px-12 py-6 rounded-2xl shadow-[0_20px_50px_rgba(79,70,229,0.4)] transform hover:scale-105 transition-all"
              onClick={() => scrollToElement(WAITLIST_FORM_ID)}
            >
              Notify Me at Launch
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};
