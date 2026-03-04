import type { Metadata } from "next";
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

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-50 flex flex-col">
      <SiteHeader />
      <div className="flex-1 pt-24 pb-16">
        <FAQSection />
      </div>
      <SiteFooter />
    </main>
  );
}
