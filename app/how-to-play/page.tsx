import type { Metadata } from "next";
import { RuleSection } from "@/components/how-to-play/RuleSection";
import {
  DrawPileVisual,
  PowerCardVisual,
  CountCallVisual,
  DemoCard,
} from "@/components/how-to-play/DemoCards";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import { TurnFlow } from "@/components/how-to-play/TurnFlow";
import { WAITLIST_FORM_ID } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Play Void Count | Official Rules for the New Strategy Card Game",
  description:
    "Learn the rules of Void Count, the fast-paced card game of risk and sabotage. Perfect for game nights, gifts, and strategy fans. See why it's a must-play new card game.",
  alternates: { canonical: "/how-to-play" },
  openGraph: {
    title: "How to Play Void Count | Official Rules for the New Strategy Card Game",
    description:
      "Learn the rules of Void Count, the fast-paced card game of risk and sabotage. Perfect for game nights, gifts, and strategy fans. See why it's a must-play new card game.",
    url: "/how-to-play",
  },
  twitter: {
    title: "How to Play Void Count | Official Rules for the New Strategy Card Game",
    description:
      "Learn the rules of Void Count, the fast-paced card game of risk and sabotage. Perfect for game nights, gifts, and strategy fans. See why it's a must-play new card game.",
  },
};

export default function HowToPlayPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden">
      <SiteHeader />

      {/* Hero Section */}
      <div className="pt-32 md:pt-48 pb-12 md:pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black mb-6 text-white tracking-tighter uppercase italic leading-[0.8] scale-y-110">
            HOW TO PLAY <br />
            <span className="text-indigo-500 italic">VOID COUNT</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 font-bold italic mb-10 max-w-2xl mx-auto leading-tight">
            A fast-paced strategic card game of risk, timing, and sabotage.{" "}
            <br className="hidden md:block" />
            Easy to learn. Brutal to master.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <Link
              href={`/#${WAITLIST_FORM_ID}`}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white text-xl font-black px-10 py-5 rounded-2xl shadow-[0_20px_50px_rgba(79,70,229,0.4)] transform hover:scale-105 transition-all uppercase italic"
            >
              Join Waiting List
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-12 opacity-70">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-1">
                Players
              </span>
              <span className="font-bold text-white uppercase italic">
                2–8 Players
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-1">
                Ages
              </span>
              <span className="font-bold text-white uppercase italic">
                7+ Years
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-1">
                Strategy
              </span>
              <span className="font-bold text-white uppercase italic">
                Ultimate Sabotage
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-1">
                Design
              </span>
              <span className="font-bold text-white uppercase italic">
                Premium Quality
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Aim of the Game */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-8 text-white tracking-tighter uppercase italic">
            Aim of the <span className="text-indigo-500">Game</span>
          </h2>
          <p className="text-lg md:text-2xl text-slate-300 leading-relaxed font-bold italic mb-8">
            Go low. Stay low. The goal is to have the lowest total score when
            someone calls "Count". If you reach the limit, you're out.
          </p>
          <div className="flex gap-4 justify-center">
            <DemoCard src="/One v1.png" label="1 Point" />
            <DemoCard src="/Two v1.png" label="2 Points" />
          </div>
        </div>
      </div>

      {/* Turn Flow Section */}
      <TurnFlow />

      {/* Game Setup */}
      <RuleSection
        title="Game Setup"
        alignment="left"
        description={
          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold shrink-0">
                1
              </div>
              <p className="text-slate-300 font-medium">Shuffle all 116 custom cards.</p>
            </div>
            <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold shrink-0">
                2
              </div>
              <p className="text-slate-300 font-medium">Deal 8 cards to each player.</p>
            </div>
            <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold shrink-0">
                3
              </div>
              <p className="text-slate-300 font-medium">
                Place the remaining cards face down as the Draw Deck.
              </p>
            </div>
            <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold shrink-0">
                4
              </div>
              <p className="text-slate-300 font-medium">
                Flip the top card to start the Open Pile.
              </p>
            </div>
          </div>
        }
        cardVisual={<DrawPileVisual />}
      />

      {/* Turn Actions */}
      <RuleSection
        title="On Your Turn"
        alignment="right"
        description={
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/60 rounded-3xl border border-white/5">
              <h3 className="text-indigo-300 font-black text-xl mb-3 uppercase italic tracking-tight">
                1. Play Point Card(s)
              </h3>
              <p className="text-slate-300 font-medium mb-2">
                Play a single card or a set of matching values. If they match
                the top card, you don't draw. Otherwise, draw 1.
              </p>
            </div>

            <div className="p-6 bg-slate-900/60 rounded-3xl border border-white/5">
              <h3 className="text-indigo-300 font-black text-xl mb-3 uppercase italic tracking-tight">
                2. Play a Power Card
              </h3>
              <p className="text-slate-300 font-medium mb-2">
                Resolve the effect immediately. Strategic play of power cards helps you win games.
              </p>
            </div>

            <div className="p-6 bg-slate-900/60 rounded-3xl border border-white/5">
              <h3 className="text-indigo-300 font-black text-xl mb-3 uppercase italic tracking-tight">
                3. Call "Count"
              </h3>
              <p className="text-slate-300 font-medium">
                If you think you have the lowest hand, call Count. But beware: you'll take a 20-point penalty if you're wrong.
              </p>
            </div>
          </div>
        }
      />

      {/* Power Cards Explained */}
      <div className="py-24 md:py-32 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black mb-16 text-white tracking-tighter uppercase italic text-center">
          POWER CARDS: <span className="text-indigo-500 italic">SHOW & TELL</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center">
            <DemoCard src="/Take Two v1.png" label="Take Two" />
            <h3 className="text-xl font-black text-white uppercase italic mt-6 mb-2">
              Take Two
            </h3>
            <p className="text-slate-400 text-sm font-bold italic">
              Force a player to draw 2. Perfect for late-game sabotage.
            </p>
          </div>
          <div className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center">
            <DemoCard src="/Toss v1.png" label="Toss" />
            <h3 className="text-xl font-black text-white uppercase italic mt-6 mb-2">
              Toss
            </h3>
            <p className="text-slate-400 text-sm font-bold italic">
              Discard point cards without drawing back. The fastest way to zero.
            </p>
          </div>
          <div className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center">
            <DemoCard src="/Sabotage v1.png" label="Sabotage" />
            <h3 className="text-xl font-black text-white uppercase italic mt-6 mb-2">
              Sabotage
            </h3>
            <p className="text-slate-400 text-sm font-bold italic">
              Give your worst cards to someone else. Shift the burden.
            </p>
          </div>
          <div className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center">
            <DemoCard
              src="/Double Your Hand v1.png"
              label="Double Your Hand"
            />
            <h3 className="text-xl font-black text-white uppercase italic mt-6 mb-2">
              Double Up
            </h3>
            <p className="text-slate-400 text-sm font-bold italic">
              A nuclear option. Force a rival to double their entire hand.
            </p>
          </div>
        </div>
      </div>

      {/* Call Count Warning */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-rose-500/10 border-2 border-rose-500/30 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-bl-full flex items-center justify-center text-3xl opacity-50 font-black text-rose-500 italic">
            LIMIT
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tighter uppercase italic leading-tight">
            THE <span className="text-rose-500 italic">"COUNT"</span> RISK
          </h2>
          <p className="text-xl md:text-2xl text-slate-200 font-bold italic leading-tight mb-8">
            Calling Count is the ultimate gamble. If anyone beats your score,
            you immediately take 20 penalty points.
          </p>
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-white/5">
            <p className="text-slate-400 uppercase tracking-widest text-xs font-black mb-2">
              Example
            </p>
            <p className="text-slate-300 font-bold italic">
              You call Count with 4 points. Another player reveals they only
              have 3 points. You lose the gamble and take the penalty.
            </p>
          </div>
        </div>
      </div>

      {/* Winning Section */}
      <RuleSection
        title="Winning the Game"
        alignment="left"
        description={
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-slate-900/50 p-6 rounded-xl border border-indigo-500/20">
              <h3 className="font-bold text-indigo-300 mb-2 uppercase italic">
                Option 1: Lowest Score
              </h3>
              <p className="text-sm text-slate-300">
                Play until someone reaches the limit. The lowest overall score
                wins.
              </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-indigo-500/20">
              <h3 className="font-bold text-indigo-300 mb-2 uppercase italic">
                Option 2: Elimination
              </h3>
              <p className="text-sm text-slate-300">
                Once you reach the limit, you're eliminated. Last player
                standing wins.
              </p>
            </div>
          </div>
        }
        cardVisual={<CountCallVisual />}
      />

      {/* Footer CTA */}
      <section className="py-24 md:py-32 px-4 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-900/20 to-purple-900/20 p-12 md:p-20 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/stars-bg.svg')] opacity-10" />
          <h2 className="relative z-10 text-4xl md:text-7xl font-black mb-8 text-white tracking-tighter uppercase italic leading-[0.8] scale-y-110">
            READY TO <br />
            <span className="text-indigo-500 italic">START THE COUNT?</span>
          </h2>
          <div className="relative z-10 flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link
              href={`/#${WAITLIST_FORM_ID}`}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white text-2xl font-black px-12 py-6 rounded-2xl shadow-[0_20px_50px_rgba(79,70,229,0.4)] transform hover:scale-105 transition-all uppercase italic"
            >
              Sign Up To Our Waiting List For Kickstarter
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto text-lg font-black text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
