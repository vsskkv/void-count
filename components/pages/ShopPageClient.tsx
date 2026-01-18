"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProductCarousel } from "@/components/shop/ProductCarousel";
import { WAITLIST_FORM_ID } from "@/lib/constants";

export default function ShopPageClient() {
  return (
    <main className="min-h-screen bg-transparent text-slate-50 flex flex-col">
      <SiteHeader />

      <div className="flex-1 flex flex-col items-center justify-center pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-cyan-200">
          Shop
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 max-w-5xl w-full items-center">
          <div className="flex justify-center relative order-2 md:order-1">
            <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full -z-10 scale-75" />
            <ProductCarousel />
          </div>

          <div className="flex flex-col gap-4 sm:gap-6 text-center md:text-left order-1 md:order-2">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                Void Count: Base Deck
              </h2>
              <p className="text-indigo-400 font-medium tracking-wider uppercase text-xs sm:text-sm">
                First Edition • Kickstarter Release
              </p>
            </div>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              The complete 116-card deck. Includes rulebook, tokens, and everything
              you need for 2–6 players. Perfect for game nights, parties, and
              strategic cosmic battles.
            </p>

            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-center md:justify-start gap-2 sm:gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl font-bold text-white">£20.00</span>
                <span className="text-slate-500 line-through text-base sm:text-lg">£25.00</span>
                <span className="px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] sm:text-xs font-bold border border-emerald-500/30">
                  EARLY BIRD
                </span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm">Global shipping available.</p>
            </div>

            <div className="pt-2 sm:pt-4">
              <Link
                href={`/#${WAITLIST_FORM_ID}`}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all text-base sm:text-lg inline-block text-center"
              >
                Join the Waiting List
              </Link>
              <p className="mt-3 sm:mt-4 text-xs text-slate-500">
                The shop is opening soon. Join the waiting list to be first in line.
              </p>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}


