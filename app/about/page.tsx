import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Void Count | Strategic Sabotage Card Game",
  description:
    "Void Count is a fast-paced card game of risk, bluffing, and sabotage. Stay below the limit, outplay your friends, and use clever power moves to win.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden">
      <SiteHeader />

      <div className="pt-24 md:pt-32 pb-16 px-4 max-w-4xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-white tracking-tighter uppercase italic leading-[0.8]">
            About <span className="text-indigo-500">Void Count</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 font-bold italic leading-tight">
            Void Count is a fast-paced card game of risk, bluffing, and
            sabotage. Stay below the limit, outplay your friends, and use
            clever power moves to keep your score at zero.
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none space-y-12">
          {/* Our Story */}
          <section>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tight mb-4">
              Our Story
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Void Count was born in the UK out of a love for competitive game
              nights and the thrill of a well-timed sabotage. We wanted to
              create a game that was easy to pick up but offered layers of
              strategy that keep players engaged round after round.
            </p>
          </section>

          {/* Player Experience Section */}
          <section className="bg-slate-900/40 p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-12 h-12 bg-indigo-500/10 rounded-br-3xl flex items-center justify-center text-indigo-500 font-black">
              🎴
            </div>
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
                <h3 className="text-xl font-bold text-purple-400 uppercase italic">Bluffing Matters</h3>
                <p className="text-slate-300 text-base leading-relaxed">
                  Make them think you're holding a winning hand. Use the chaos
                  to hide your real total until the very last second.
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
                <span className="text-3xl">🎲</span>
                <span className="font-bold uppercase italic tracking-tight text-slate-200">Game nights with friends</span>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                <span className="text-3xl">👨‍👩‍👧‍👦</span>
                <span className="font-bold uppercase italic tracking-tight text-slate-200">Families with teens</span>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                <span className="text-3xl">🎁</span>
                <span className="font-bold uppercase italic tracking-tight text-slate-200">A unique gift for gamers</span>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                <span className="text-3xl">🍻</span>
                <span className="font-bold uppercase italic tracking-tight text-slate-200">Casual strategy fans</span>
              </div>
            </div>
          </section>

          {/* Trust Signals */}
          <section className="pt-8 border-t border-white/10">
            <div className="flex flex-wrap justify-center md:justify-start gap-8 opacity-70">
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500 mb-1">Origin</span>
                <span className="font-bold text-white uppercase italic">Designed in the UK</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500 mb-1">Testing</span>
                <span className="font-bold text-white uppercase italic">Play-tested Groups</span>
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
              Join the Chaos
            </a>
          </section>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}

