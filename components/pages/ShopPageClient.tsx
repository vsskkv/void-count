"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProductCarousel } from "@/components/shop/ProductCarousel";

export default function ShopPageClient() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <SiteHeader />

      <div className="flex-1 flex flex-col items-center justify-center pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-cyan-200">
          Shop
        </h1>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl w-full items-center">
          <div className="flex justify-center relative">
            <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full -z-10 scale-75" />
            <ProductCarousel />
          </div>

          <div className="flex flex-col gap-6 text-center md:text-left">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Void Count: Base Deck
              </h2>
              <p className="text-indigo-400 font-medium tracking-wider uppercase text-sm">
                First Edition • UK Release
              </p>
            </div>

            <p className="text-slate-300 text-lg leading-relaxed">
              The complete 116-card deck. Includes rulebook, tokens, and everything
              you need for 2-8 players. Perfect for game nights, parties, and
              strategic cosmic battles.
            </p>

            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-center md:justify-start gap-3">
                <span className="text-4xl font-bold text-white">£20.00</span>
                <span className="text-slate-500 line-through text-lg">£25.00</span>
                <span className="px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  EARLY BIRD
                </span>
              </div>
              <p className="text-slate-400 text-sm">Free shipping within the UK.</p>
            </div>

            <div className="pt-4">
              <Link
                href="/#waitlist-form"
                className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-lg transition-all text-lg inline-block text-center"
              >
                Join the Waitlist
              </Link>
              <p className="mt-4 text-xs text-slate-500">
                The shop is opening soon. Join the waitlist to be first in line.
              </p>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}


