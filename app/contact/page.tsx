import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${SITE_NAME}. ${SITE_DESCRIPTION}`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: "/contact",
  },
  twitter: {
    title: `Contact | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <SiteHeader />
      <div className="flex-1 flex items-center justify-center pt-24 pb-16 px-4 md:px-6">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tighter uppercase italic">
            Contact <span className="text-indigo-500">Us</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8">
            Have a question about Void Count? Want to collaborate or provide feedback? We'd love to hear from you!
          </p>
          <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12">
            <p className="text-slate-400 mb-4">
              For inquiries, partnerships, or press opportunities:
            </p>
            <a
              href="mailto:hello@voidcount.com"
              className="inline-block text-indigo-400 hover:text-indigo-300 text-lg font-bold transition-colors underline"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="text-slate-500 text-sm mt-6">
              We typically respond within 24-48 hours.
            </p>
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}


