import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FAQSection } from "@/components/home/FAQSection";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: `Find answers to common questions about ${SITE_NAME}. ${SITE_DESCRIPTION}`,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: `FAQ | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: "/faq",
  },
  twitter: {
    title: `FAQ | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
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
