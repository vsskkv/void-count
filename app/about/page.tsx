import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SITE_NAME } from "@/lib/site";
import { WAITLIST_FORM_ID } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Void Count | The Story Behind the New Card Game | Card Game for Family",
  description:
    "Discover the origins of Void Count, a new card game built for social sabotage and laughs. Learn about this strategic card game and why it's the perfect gift for board game lovers, family game nights, and Kickstarter fans.",
  keywords: [
    "about card game",
    "new card game story",
    "card game creators",
    "strategic card game history",
    "Void Count creators",
    "card game development",
  ],
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden">
      <SiteHeader />

      <div className="pt-20 sm:pt-24 md:pt-32 lg:pt-48 pb-12 sm:pb-16 md:pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
        {/* How it all started */}
        <section className="mb-12 sm:mb-16 md:mb-20 lg:mb-32 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 sm:mb-8 text-white tracking-tighter uppercase italic leading-[0.9] md:scale-y-110">
            How it all started
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 leading-relaxed font-medium">
            Void Count brings people together. Like how the initial idea for a strategic card game brought two friends together in the UK. 
            <span className="italic text-indigo-400"> That</span> idea grew through countless game nights, late-night play sessions, and the shared belief that the best games are easy to learn but hard to master.
          </p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 leading-relaxed font-medium mt-4 sm:mt-6">
            What started as a fun concept during weekend game sessions became something special—a game that anyone could pick up in minutes, whether you're a seasoned strategist or just looking for a good time with friends.
          </p>
        </section>

        {/* Our Founders */}
        <section className="mb-12 sm:mb-16 md:mb-20 lg:mb-32">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-8 sm:mb-10 md:mb-12 text-white tracking-tighter uppercase italic leading-[0.9] md:scale-y-110 text-center">
            Our Founders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border-4 border-indigo-500/30 flex items-center justify-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-black text-indigo-400">C</div>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-indigo-400 uppercase italic mb-2">Channi</h3>
              <p className="text-base sm:text-lg md:text-xl text-slate-300 font-bold italic mb-3 sm:mb-4">Founder & Creative Lead</p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-sm mx-auto px-2">
                Channi is the creative force behind Void Count. From dreaming up card names and their unique abilities to crafting the rules that make each round unpredictable, Channi brings the game's personality and strategic depth to life.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border-4 border-purple-500/30 flex items-center justify-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-black text-purple-400">V</div>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-purple-400 uppercase italic mb-2">Vikram</h3>
              <p className="text-base sm:text-lg md:text-xl text-slate-300 font-bold italic mb-3 sm:mb-4">Co-Founder & Designer</p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-sm mx-auto px-2">
                Vikram is the designer co-founder who brings Void Count's vision to reality. With an eye for what makes games look and feel great, Vikram ensures every card, every detail, and every moment of play delivers the experience we set out to create.
              </p>
            </div>
          </div>
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
          <div className="text-slate-400 text-xs sm:text-sm mt-3 sm:mt-4">
            <a href="/how-to-play" className="hover:text-white transition-colors underline">
              Learn How to Play →
            </a>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
