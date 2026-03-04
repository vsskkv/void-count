import type { Metadata } from "next";
import Image from "next/image";
import { KickstarterStickyCTA } from "@/components/kickstarter/KickstarterStickyCTA";
import { KICKSTARTER_URL } from "@/lib/constants";
import { SITE_NAME, getSiteUrl } from "@/lib/site";
import styles from "./kickstarter.module.css";

const CTA_LABEL = "Back Void Count on Kickstarter";

export const metadata: Metadata = {
  title: `Void Count Kickstarter Campaign | Back Now`,
  description:
    "Void Count is live on Kickstarter. Back the campaign now to support production of this fast, social strategy card game for 2-8 players where the lowest score wins.",
  keywords: [
    "void count kickstarter",
    "kickstarter card game",
    "strategic card game",
    "bluffing card game",
    "sabotage card game",
    "2-8 player card game",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: `${getSiteUrl()}/kickstarter` },
  openGraph: {
    title: `Void Count on Kickstarter | ${SITE_NAME}`,
    description:
      "Void Count is live on Kickstarter. Back the campaign now and help bring Void Count to tables worldwide.",
    url: "/kickstarter",
    images: [
      {
        url: "/void-count-logo.webp",
        width: 1200,
        height: 630,
        alt: "Void Count - Kickstarter Campaign Live",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Void Count on Kickstarter | ${SITE_NAME}`,
    description:
      "Void Count is live on Kickstarter. Back the campaign now.",
    images: ["/void-count-logo.webp"],
  },
};

export default function KickstarterCampaignPage() {
  const rawKickstarterUrl = (KICKSTARTER_URL || "").trim();
  const normalizedKickstarterUrl = rawKickstarterUrl
    ? /^https?:\/\//i.test(rawKickstarterUrl)
      ? rawKickstarterUrl
      : `https://${rawKickstarterUrl.replace(/^\/+/, "")}`
    : "";
  const hasKickstarterUrl = Boolean(normalizedKickstarterUrl);
  const notifyHref = hasKickstarterUrl ? normalizedKickstarterUrl : "#";
  const notifyTarget = hasKickstarterUrl ? "_blank" : undefined;
  const notifyRel = hasKickstarterUrl ? "noopener noreferrer" : undefined;

  const ctaClassName =
    "inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#05ce78] to-[#00b96b] text-slate-950 font-black uppercase italic tracking-tight shadow-[0_0_18px_rgba(5,206,120,0.45)] hover:from-[#22e395] hover:to-[#05ce78] hover:shadow-[0_0_28px_rgba(5,206,120,0.65)] active:scale-[0.99] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05ce78]";

  return (
    <main className="min-h-screen bg-transparent text-slate-50 overflow-x-hidden">
      {/* Minimal sticky header (no nav) */}
      <header className="sticky top-0 z-50 border-b border-slate-900 bg-slate-950/70 backdrop-blur-md pointer-events-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 select-none">
            <span className="relative w-9 h-9 sm:w-10 sm:h-10">
              <Image
                src="/void-count-logo.webp"
                alt="Void Count logo"
                fill
                className="object-contain"
                priority
              />
            </span>
            <span className="text-sm sm:text-base font-black uppercase tracking-tight text-white">
              Void Count
            </span>
          </div>

          <a
            href={notifyHref}
            target={notifyTarget}
            rel={notifyRel}
            className={`${ctaClassName} px-4 sm:px-5 py-2.5 text-xs sm:text-sm`}
          >
            Back Void Count on <span className="text-[#065f46]">Kickstarter</span>
          </a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-28 md:pb-16">
        <section className="grid gap-10 lg:gap-12 lg:grid-cols-2 items-center">
          {/* Copy */}
          <div>
            <p
              className={`${styles.enter} text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#05ce78] font-black`}
            >
              <span className="text-[#05ce78]">Kickstarter</span> Campaign Live
            </p>
            <h1
              className={`${styles.enter} ${styles.d1} mt-4 text-4xl sm:text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.85] text-white`}
            >
              Void Count is live on{" "}
              <span className="text-[#05ce78]">Kickstarter.</span>
            </h1>

            {/* 1-sentence promise */}
            <p
              className={`${styles.enter} ${styles.d2} mt-5 text-base sm:text-lg md:text-xl text-slate-200 font-bold leading-tight max-w-xl`}
            >
              Void Count is a fast, social strategy card game where the{" "}
              <strong>lowest score wins</strong>—play power cards, bluff,{" "}
              sabotage, and call <strong>Count</strong> at the perfect moment.
            </p>

            {/* 3 bullets */}
            <ul className={`${styles.enter} ${styles.d3} mt-7 space-y-3 max-w-xl`}>
              <li className="flex gap-3 items-start">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-[#05ce78] flex-none" />
                <p className="text-slate-200">
                  <strong className="text-white">2–8 players</strong> — perfect
                  for game nights, small groups, and bigger tables.
                </p>
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-[#05ce78] flex-none" />
                <p className="text-slate-200">
                  <strong className="text-white">Lowest score wins</strong> —
                  it’s tense because you can never relax.
                </p>
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-[#05ce78] flex-none" />
                <p className="text-slate-200">
                  <strong className="text-white">Sabotage</strong> —
                  power cards create big swings and big table moments.
                </p>
              </li>
            </ul>

            <div className={`${styles.enter} ${styles.d4} mt-8 flex flex-col sm:flex-row gap-3`}>
              <a
                href={notifyHref}
                target={notifyTarget}
                rel={notifyRel}
                className={`${ctaClassName} px-8 sm:px-10 py-4 text-base sm:text-lg`}
              >
                Back Void Count on <span className="text-[#065f46]">Kickstarter</span>
              </a>
            </div>

            <p className={`${styles.enter} ${styles.d5} mt-3 text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-widest`}>
              {hasKickstarterUrl
                ? <>Opens <span className="text-[#05ce78]">Kickstarter</span> campaign in a new tab.</>
                : <><span className="text-[#05ce78]">Kickstarter</span> link is not configured yet.</>}
            </p>

            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Every back helps us unlock stronger production, broader reach, and
              faster momentum for Void Count.
            </p>

            {!hasKickstarterUrl ? (
              <p className="mt-4 text-xs text-amber-300 font-bold">
                Set{" "}
                <code className="font-mono">NEXT_PUBLIC_KICKSTARTER_URL</code>{" "}
                in your build environment to enable the Kickstarter campaign link.
              </p>
            ) : null}
          </div>

          {/* Hero image (clean, high contrast) */}
          <div className={`${styles.enter} ${styles.d2} relative`}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 md:-inset-10 bg-indigo-500/10 blur-3xl opacity-60 hidden md:block"
            />
            <div className="relative mx-auto max-w-md">
              <div className={`${styles.stage} relative aspect-[4/5]`}>
                <div className="absolute inset-0 rounded-[2.25rem] bg-slate-950/60 border border-slate-800 shadow-2xl" />

                <div className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2 rotate-[-10deg]">
                  <div className={styles.floatA}>
                    <Image
                      src="/optimized/back-v2.jpg"
                      alt="Void Count card back"
                      width={420}
                      height={600}
                      className="w-full h-auto object-contain rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.75)] border border-slate-800"
                    />
                  </div>
                </div>

                <div className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2 rotate-[10deg]">
                  <div className={styles.floatB}>
                    <Image
                      src="/optimized/sabotage-v1.jpg"
                      alt="Void Count card art"
                      width={420}
                      height={600}
                      className="w-full h-auto object-contain rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.75)] border border-slate-800"
                    />
                  </div>
                </div>

                <div className="absolute left-1/2 top-1/2 w-[82%] -translate-x-1/2 -translate-y-1/2">
                  <div className={styles.floatC}>
                    <Image
                      src="/optimized/void-v1.jpg"
                      alt="Void Count card game preview"
                      width={440}
                      height={630}
                      priority
                      className="w-full h-auto object-contain rounded-3xl shadow-[0_35px_90px_rgba(0,0,0,0.85)] border border-indigo-500/20"
                    />
                  </div>
                </div>
              </div>

              <p className="mt-5 text-center text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-widest">
                Clean rules. Loud table moments. Lowest score wins.
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-16 text-center text-xs text-slate-500">
          © 2026 {SITE_NAME}. All rights reserved.
        </footer>
      </div>

      <KickstarterStickyCTA
        href={notifyHref}
        openInNewTab={hasKickstarterUrl}
        ctaLabel={CTA_LABEL}
        ctaClassName={ctaClassName}
      />
    </main>
  );
}
