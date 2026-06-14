import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SITE_NAME, getSiteUrl } from "@/lib/site";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: `Contact ${SITE_NAME} | Support and Partnerships`,
  description: `Contact ${SITE_NAME}. The Kickstarter campaign is now over, and Void Count will be launching soon. Reach out with questions, partnerships, or support requests.`,
  keywords: [
    "contact void count",
    "void count support",
    "void count partnerships",
    "card game support",
    "card game inquiries",
    "void count launch contact",
  ],
  alternates: { canonical: `${getSiteUrl()}/contact` },
  openGraph: {
    title: `Contact ${SITE_NAME} | Support and Partnerships`,
    description: `Contact ${SITE_NAME}. The Kickstarter is now over, and launch updates are coming soon.`,
    url: "/contact",
  },
  twitter: {
    title: `Contact ${SITE_NAME} | Support and Partnerships`,
    description: `Contact ${SITE_NAME}. The Kickstarter is now over, and launch updates are coming soon.`,
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
              Have a question about Void Count? Want to collaborate or provide feedback? We&apos;d love to hear from you!
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
