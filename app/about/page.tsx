import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Void Count | The Story Behind the New Strategy Card Game",
  description:
    "Discover the origins of Void Count, a card game built for social sabotage and laughs. Learn why it's the perfect gift for board game lovers and Kickstarter fans.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden">
      <SiteHeader />

      <div className="pt-32 md:pt-48 pb-16 px-6 max-w-4xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 text-white tracking-tighter uppercase italic leading-[0.8]">
            About <span className="text-indigo-500">Void Count</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 font-bold italic leading-tight">
            Void Count is a fast-paced card game of risk, timing, and
            sabotage. Stay below the limit, outplay your friends, and use
            clever power moves to win the round.
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none space-y-12">
          {/* Our Story */}
          <section>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tight mb-4">
              Our Story
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Void Count was conceptualised in the UK by two friends who shared a passion for game nights, strategic thinking, and that perfect moment when a well-timed move turns the tables.
            </p>
            <p className="text-slate-300 leading-relaxed mb-6">
              What started as a fun idea during countless game sessions grew into something special. We wanted to create a game that anyone could pick up in minutes—whether you're a seasoned strategist or just looking for a good time with friends.
            </p>
            <p className="text-slate-300 leading-relaxed">
              After countless rounds of testing, tweaking, and probably too many late-night play sessions, Void Count was born. It's the game we wish we'd had at our game nights—quick to learn, endlessly replayable, and packed with those "just one more round" moments.
            </p>
          </section>

          {/* Founders Section */}
          <section className="bg-slate-900/40 p-8 md:p-10 rounded-3xl border border-white/10">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tight mb-8">
              Meet the Founders
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-indigo-400 uppercase italic">Channi</h3>
                <p className="text-slate-200 font-bold italic mb-3">Founder & Creative Lead</p>
                <p className="text-slate-300 leading-relaxed">
                  Channi is the creative force behind Void Count. From dreaming up the card names and their unique abilities to crafting the rules that make each round unpredictable, Channi brings the game's personality and strategic depth to life.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-purple-400 uppercase italic">Vikram</h3>
                <p className="text-slate-200 font-bold italic mb-3">Co-Founder & Designer</p>
                <p className="text-slate-300 leading-relaxed">
                  Vikram is the designer co-founder who brings Void Count's vision to reality. With an eye for what makes games look and feel great, Vikram ensures every card, every detail, and every moment of play delivers the experience we set out to create.
                </p>
              </div>
            </div>
          </section>

          {/* Player Experience Section */}
          <section className="bg-slate-900/40 p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tight mb-6">
              The Race to Zero
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-indigo-400 uppercase italic">Tension Every Round</h3>
                <p className="text-slate-300 text-base leading-relaxed">
                  Every draw is a gamble. Will you pull the card that saves
                  your hand or the one that pushes you over the edge?
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-purple-400 uppercase italic">Strategy Matters</h3>
                <p className="text-slate-300 text-base leading-relaxed">
                  Plan your moves carefully. Use the chaos
                  to your advantage and time your "Count" call perfectly to win.
                </p>
              </div>
            </div>
            <p className="mt-8 text-slate-200 font-bold italic border-l-4 border-indigo-500 pl-4">
              "One mistake can cost you the game—but one clever play can win it."
            </p>
          </section>

          {/* Who is this for? */}
          <section>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tight mb-8">
              Who is this for?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                </div>
                <span className="font-bold uppercase italic tracking-tight text-slate-200">The perfect game night addition</span>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                </div>
                <span className="font-bold uppercase italic tracking-tight text-slate-200">Social strategy fans</span>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                </div>
                <span className="font-bold uppercase italic tracking-tight text-slate-200">A unique gift for gamers</span>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                </div>
                <span className="font-bold uppercase italic tracking-tight text-slate-200">Casual strategy fans</span>
              </div>
            </div>
          </section>

          {/* Trust Signals */}
          <section className="pt-8 border-t border-white/10">
            <div className="flex flex-wrap justify-center md:justify-start gap-8 opacity-70">
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500 mb-1">Design</span>
                <span className="font-bold text-white uppercase italic">Original Concept</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500 mb-1">Testing</span>
                <span className="font-bold text-white uppercase italic">Extensively Play-tested</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500 mb-1">Quality</span>
                <span className="font-bold text-white uppercase italic">116-Card Custom Deck</span>
              </div>
            </div>
          </section>

          {/* Calls to Action */}
          <section className="flex flex-col sm:flex-row gap-6 pt-12">
            <a
              href="/how-to-play"
              className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-center py-5 rounded-2xl font-black uppercase italic tracking-tighter shadow-xl transform hover:scale-105 transition-all"
            >
              Learn How to Play
            </a>
            <a
              href="/#waitlist-form"
              className="flex-1 bg-white/5 hover:bg-white/10 border border-white/20 text-white text-center py-5 rounded-2xl font-black uppercase italic tracking-tighter shadow-xl transform hover:scale-105 transition-all"
            >
              Join the Waiting List
            </a>
          </section>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
