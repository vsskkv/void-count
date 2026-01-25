import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SITE_NAME } from "@/lib/site";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: `Contact Us | ${SITE_NAME} | New Card Game Support | Card Games`,
  description: `Contact ${SITE_NAME}, the new card game launching in 2026. Have questions about this strategic card game? Want to collaborate or provide feedback? We'd love to hear from you! Reach out about this innovative card game.`,
  keywords: [
    "contact card game",
    "new card game contact",
    "card game support",
    "Void Count contact",
    "card game inquiries",
    "card games contact",
    "new card games support",
    "card game 2026",
    "new card games 2026",
  ],
  alternates: { canonical: "https://voidcount.com/contact" },
  openGraph: {
    title: `Contact Us | ${SITE_NAME} | New Card Game Support`,
    description: `Contact ${SITE_NAME}, the new card game launching in 2026. Have questions about this strategic card game? We'd love to hear from you!`,
    url: "/contact",
  },
  twitter: {
    title: `Contact Us | ${SITE_NAME} | New Card Game Support`,
    description: `Contact ${SITE_NAME}, the new card game launching in 2026. Have questions? We'd love to hear from you!`,
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-50 flex flex-col">
      <SiteHeader />
      <div className="flex-1 flex items-center justify-center pt-24 pb-16 px-4 md:px-6">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tighter uppercase italic">
              Contact <span className="text-indigo-500">Us</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              Have a question about Void Count? Want to collaborate or provide feedback? We'd love to hear from you!
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}


