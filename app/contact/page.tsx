import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SITE_NAME, getSiteUrl } from "@/lib/site";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: `Contact ${SITE_NAME} | Support and Partnerships`,
  description: `Contact ${SITE_NAME}, now live on Kickstarter. Have questions about this strategic card game, partnerships, or campaign support? Reach out anytime.`,
  keywords: [
    "contact void count",
    "void count support",
    "void count partnerships",
    "card game support",
    "card game inquiries",
    "kickstarter campaign contact",
  ],
  alternates: { canonical: `${getSiteUrl()}/contact` },
  openGraph: {
    title: `Contact ${SITE_NAME} | Support and Partnerships`,
    description: `Contact ${SITE_NAME}, now live on Kickstarter. Have questions? We'd love to hear from you.`,
    url: "/contact",
  },
  twitter: {
    title: `Contact ${SITE_NAME} | Support and Partnerships`,
    description: `Contact ${SITE_NAME}, now live on Kickstarter. Have questions? We'd love to hear from you!`,
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
