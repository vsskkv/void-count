import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FAQSection } from "@/components/home/FAQSection";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `FAQ | ${SITE_NAME} | New Card Game Questions | Card Games`,
  description: `Find answers to common questions about ${SITE_NAME}, the new card game launching in 2024. Learn about this strategic card game, gameplay, player count, and more. Everything you need to know about one of the best new card games.`,
  keywords: [
    "card game FAQ",
    "new card game questions",
    "card game help",
    "Void Count FAQ",
    "strategic card game questions",
    "card games FAQ",
    "new card games FAQ",
    "best new card game FAQ",
    "card game information",
  ],
  alternates: { canonical: "/faq" },
  openGraph: {
    title: `FAQ | ${SITE_NAME} | New Card Game Questions | Card Games`,
    description: `Find answers to common questions about ${SITE_NAME}, the new card game launching in 2024. Learn about this strategic card game, gameplay, and more.`,
    url: "/faq",
  },
  twitter: {
    title: `FAQ | ${SITE_NAME} | New Card Game Questions`,
    description: `Find answers to common questions about ${SITE_NAME}, the new card game launching in 2024. Learn about this strategic card game and more.`,
  },
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <SiteHeader />
      <div className="flex-1 pt-24 pb-16">
        <FAQSection />
      </div>
      <SiteFooter />
    </main>
  );
}
