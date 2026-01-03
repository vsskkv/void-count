import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Void Count | The Story Behind the Game",
  description:
    "Discover the origins of Void Count, a strategic card game built for sabotage, bluffing, and big laughs. Created by Venture Consultancy.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden">
      <SiteHeader />

      <div className="pt-24 md:pt-32 pb-16 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black mb-8 text-white tracking-tighter uppercase italic">
          About <span className="text-indigo-500">Void Count</span>
        </h1>

        <div className="prose prose-invert prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase italic tracking-tight">
              Our Story
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Void Count was born out of a love for competitive game nights and
              the thrill of a well-timed sabotage. We wanted to create a game
              that was easy to pick up but offered layers of strategy that keep
              players engaged round after round.
            </p>
          </section>

          <section className="bg-slate-900/40 p-8 rounded-3xl border border-white/10">
            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase italic tracking-tight mb-4">
              The Race to the Lowest Score
            </h2>
            <p className="text-slate-300 leading-relaxed">
              The core of Void Count is staying below the limit. It’s a constant 
              balancing act where players manage their risk, bluff through 
              tricky hands, and use clever plays to keep their points at zero. 
              It's about more than just numbers; it's about outsmarting your 
              friends and having a great time doing it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase italic tracking-tight">
              The Perfect Addition to Your Collection
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Whether you're a seasoned board game enthusiast or looking for a
              new family favorite, Void Count is designed to be the perfect
              gift and a staple of your game night rotation. Compact, premium,
              and infinitely replayable.
            </p>
          </section>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}

