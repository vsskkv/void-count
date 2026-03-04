import type { Metadata } from "next";
import Script from "next/script";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FAQSection } from "@/components/home/FAQSection";
import { SITE_NAME, getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `Void Count FAQ | Gameplay, Rewards, and Shipping`,
  description: `Find answers to common questions about ${SITE_NAME}, now live on Kickstarter. Learn about gameplay, player count, campaign rewards, delivery, and more.`,
  keywords: [
    "void count faq",
    "void count kickstarter faq",
    "card game help",
    "strategic card game questions",
    "kickstarter campaign rewards",
    "card game shipping faq",
  ],
  alternates: { canonical: `${getSiteUrl()}/faq` },
  openGraph: {
    title: `Void Count FAQ | Gameplay, Rewards, and Shipping`,
    description: `Find answers to common questions about ${SITE_NAME}, now live on Kickstarter. Learn about gameplay, campaign rewards, and more.`,
    url: "/faq",
  },
  twitter: {
    title: `Void Count FAQ | Gameplay, Rewards, and Shipping`,
    description: `Find answers to common questions about ${SITE_NAME}, now live on Kickstarter.`,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Void Count live on Kickstarter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Void Count is live on Kickstarter right now, and backing the campaign directly helps fund production and delivery.",
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
        text: "Yes, we plan to offer international shipping through Kickstarter. Shipping regions and rates are listed on the campaign page.",
      },
    },
    {
      "@type": "Question",
      name: "When will the game be delivered?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Delivery timelines are posted in the Kickstarter reward details and campaign updates. We keep backers updated throughout production and shipping.",
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
