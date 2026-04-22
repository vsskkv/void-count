import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SITE_NAME, getSiteUrl } from "@/lib/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/constants";

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
            <div className="mt-6 grid gap-3 sm:grid-cols-2 text-left">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex items-center gap-3 rounded-lg border border-white/10 bg-slate-900/40 p-4 text-slate-200 transition-colors hover:border-indigo-400/60 hover:bg-indigo-500/10"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"
                    />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Email
                  </span>
                  <span className="block break-all text-sm font-bold text-white group-hover:text-indigo-200">
                    {CONTACT_EMAIL}
                  </span>
                </span>
              </a>
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="group flex items-center gap-3 rounded-lg border border-white/10 bg-slate-900/40 p-4 text-slate-200 transition-colors hover:border-indigo-400/60 hover:bg-indigo-500/10"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 0 0-1.173.417l-.97 1.293a1.125 1.125 0 0 1-1.21.38 12.035 12.035 0 0 1-7.143-7.143 1.125 1.125 0 0 1 .38-1.21l1.293-.97c.37-.277.534-.751.417-1.173L6.963 3.102A1.125 1.125 0 0 0 5.872 2.25H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Phone
                  </span>
                  <span className="block break-all text-sm font-bold text-white group-hover:text-indigo-200">
                    {CONTACT_PHONE}
                  </span>
                </span>
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
