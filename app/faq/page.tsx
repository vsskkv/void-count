import type { Metadata } from "next";
import Script from "next/script";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FAQSection } from "@/components/home/FAQSection";
import { SITE_NAME, getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `Void Count FAQ | Gameplay, Launch, and Shipping`,
  description: `Find answers to common questions about ${SITE_NAME}. The Kickstarter campaign is now over, and Void Count will be launching soon.`,
  keywords: [
    "void count faq",
    "void count launch faq",
    "card game help",
    "strategic card game questions",
    "card game launch updates",
    "card game shipping faq",
  ],
  alternates: { canonical: `${getSiteUrl()}/faq` },
  openGraph: {
    title: `Void Count FAQ | Gameplay, Launch, and Shipping`,
    description: `Find answers to common questions about ${SITE_NAME}. The Kickstarter is now over, and the game will be launching soon.`,
    url: "/faq",
  },
  twitter: {
    title: `Void Count FAQ | Gameplay, Launch, and Shipping`,
    description: `Find answers to common questions about ${SITE_NAME}. The Kickstarter is now over.`,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Void Count still on Kickstarter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The Void Count Kickstarter campaign is now over, and the game will be launching soon with more availability updates on the way.",
      },
    },
    {
      "@type": "Question",
      name: "How many players can play?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Void Count is designed for 2-8 players and works for both small groups and larger tables. It plays well as a tight 1v1 duel or a chaotic party game.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a game take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rounds are fast-paced and intense, typically lasting 5-10 minutes. The overall game length depends on player strategy and sabotage levels, making it perfect for quick game nights.",
      },
    },
    {
      "@type": "Question",
      name: "What are Power cards?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Power cards are special action cards that let you manipulate the game. Examples include Sabotage (force opponents to take cards), Toss (discard cards), Take Two (draw extra cards), and Double Your Hand (double your score).",
      },
    },
    {
      "@type": "Question",
      name: "Will you ship internationally?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We plan to support international shipping where possible. Shipping regions and rates will be confirmed closer to launch.",
      },
    },
    {
      "@type": "Question",
      name: "When will the game be delivered?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Delivery timelines will be shared as launch plans are confirmed. We will keep supporters updated throughout production and shipping.",
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-50 flex flex-col">
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SiteHeader />
      <div className="flex-1 pt-24 pb-16">
        <FAQSection />
      </div>
      <SiteFooter />
    </main>
  );
}
