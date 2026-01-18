import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SITE_NAME } from "@/lib/site";
import { WAITLIST_FORM_ID } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Void Count | The Story Behind the New Card Game | Card Games | Card Game for Family",
  description:
    "Discover the origins of Void Count, a new card game built for social sabotage and laughs. Learn about this strategic card game and why it's the perfect gift for board game lovers, family game nights, and Kickstarter fans. One of the best new card games launching in 2026.",
  keywords: [
    "about card game",
    "new card game story",
    "card game creators",
    "strategic card game history",
    "Void Count creators",
    "card game development",
    "card games",
    "new card games",
    "best new card game",
    "card game 2026",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Void Count | The Story Behind the New Card Game | Card Games",
    description:
      "Discover the origins of Void Count, a new card game built for social sabotage and laughs. Learn about this strategic card game and why it's perfect for board game lovers and family game nights.",
    url: "/about",
  },
  twitter: {
    title: "About Void Count | The Story Behind the New Card Game",
    description:
      "Discover the origins of Void Count, a new card game built for social sabotage and laughs. Learn about this strategic card game.",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-50 overflow-x-hidden">
      <SiteHeader />

      <div className="pt-20 sm:pt-24 md:pt-32 lg:pt-48 pb-12 sm:pb-16 md:pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
        {/* How it all started */}
        <section className="mb-12 sm:mb-16 md:mb-20 lg:mb-32 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 sm:mb-8 text-white tracking-tighter uppercase italic leading-[0.9] md:scale-y-110">
            How it all started
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 leading-relaxed font-medium">
            Void Count brings people together. The initial idea grew through countless game nights, late-night play sessions, and the shared belief that the best new card games are easy to learn but hard to master.
          </p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 leading-relaxed font-medium mt-4 sm:mt-6">
            What started as a fun concept during weekend game sessions became something special—a game that anyone could pick up in minutes, whether you're a seasoned strategist or just looking for a good time with friends.
          </p>
        </section>

        {/* Our Game */}
        <section className="mb-12 sm:mb-16 md:mb-20 lg:mb-32 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 sm:mb-8 text-white tracking-tighter uppercase italic leading-[0.9] md:scale-y-110">
            Our Game
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 leading-relaxed font-medium">
            We don't make entertaining games. We make games that make the people you're playing with more entertaining! 
          </p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 leading-relaxed font-medium mt-4 sm:mt-6">
            Void Count is quick to learn, endlessly replayable, and packed with those <span className="italic text-indigo-400">"just one more round"</span> moments. Every draw is a gamble. Every Power card can turn the tables. Every round is a new chance to outplay your friends.
          </p>
        </section>

        {/* Call to Action */}
        <section className="text-center pt-8 sm:pt-12">
          <a
            href={`/#${WAITLIST_FORM_ID}`}
            className="inline-block w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white text-lg sm:text-xl md:text-2xl font-black px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl uppercase italic tracking-tighter shadow-[0_20px_50px_rgba(79,70,229,0.5)] transform hover:scale-105 transition-all mb-4 sm:mb-6"
          >
            Join the Waiting List
          </a>
          <div className="text-slate-500 text-xs sm:text-sm mt-3 sm:mt-4 opacity-60">
            <span className="cursor-not-allowed">
              Learn How to Play (Coming Soon) →
            </span>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
