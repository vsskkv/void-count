import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WAITLIST_FORM_ID } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Play Void Count | Official Rules for the New Card Game | Card Games | Strategy Card Game",
  description:
    "Learn how to play Void Count, a new card game that combines strategy, sabotage, and fast-paced action. Complete rules for this strategic card game perfect for game nights, family gatherings, and competitive play. Discover why it's one of the best new card games. Easy to learn card game rules for 2-8 players. Launching on Kickstarter in 2026.",
  keywords: [
    "how to play card game",
    "card game rules",
    "new card game rules",
    "strategy card game rules",
    "Void Count rules",
    "card game instructions",
    "new card game how to play",
    "card games",
    "new card games",
    "card game for beginners",
    "strategic card game rules",
    "best new card game rules",
    "card game 2026",
  ],
  alternates: { canonical: "/how-to-play" },
  openGraph: {
    title: "How to Play Void Count | Official Rules for the New Card Game | Card Games",
    description:
      "Learn how to play Void Count, a new card game that combines strategy, sabotage, and fast-paced action. Complete rules for this strategic card game. Easy to learn card game rules for 2-8 players.",
    url: "/how-to-play",
  },
  twitter: {
    title: "How to Play Void Count | Official Rules for the New Card Game | Card Games",
    description:
      "Learn how to play Void Count, a new card game that combines strategy, sabotage, and fast-paced action. Complete rules for this strategic card game.",
  },
};

export default function HowToPlayPage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-50 overflow-x-hidden">
      <SiteHeader />

      {/* Coming Soon Section */}
      <div className="pt-20 sm:pt-24 md:pt-32 lg:pt-48 pb-12 sm:pb-16 md:pb-24 px-4 sm:px-6 text-center flex items-center justify-center min-h-[70vh]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black mb-4 sm:mb-6 text-white tracking-tighter uppercase italic leading-[0.8] sm:leading-[0.85] md:scale-y-110">
            HOW TO PLAY <br />
            <span className="text-indigo-500 italic">VOID COUNT</span>
          </h1>
          <div className="bg-indigo-950/40 backdrop-blur-md border-2 border-indigo-500/40 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 mb-8 sm:mb-12">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-indigo-400 mb-4 sm:mb-6 uppercase italic tracking-tight">
              COMING SOON
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 font-bold italic mb-6 sm:mb-8 max-w-2xl mx-auto leading-tight">
              The complete rules and gameplay guide for Void Count will be available soon. 
              <br className="hidden sm:block" />
              Join the waitlist to be notified when it launches!
            </p>
            <Link
              href={`/#${WAITLIST_FORM_ID}`}
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white text-base sm:text-lg md:text-xl font-black px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl shadow-[0_20px_50px_rgba(79,70,229,0.4)] transform hover:scale-105 transition-all uppercase italic"
            >
              Join Waiting List
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6 px-2">
            <Link
              href="/"
              className="text-slate-400 hover:text-white text-sm sm:text-base font-bold transition-colors underline"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
