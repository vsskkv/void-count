"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdaptiveWeddingImage } from "@/components/wedding/AdaptiveWeddingImage";
import { PasscodeCard } from "@/components/wedding/PasscodeCard";
import { RsvpForm } from "@/components/wedding/RsvpForm";
import {
  getUnlockStorageKey,
  getWeddingSide,
  WEDDING_SITE_TITLE,
  type WeddingSideKey,
} from "@/lib/weddingData";

export function WeddingPortalPage({ side }: { side: WeddingSideKey }) {
  const portal = getWeddingSide(side);
  const alternatePortal = getWeddingSide(portal.alternateSide);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const isBlue = side === "singh";

  useEffect(() => {
    setIsUnlocked(window.localStorage.getItem(getUnlockStorageKey(side)) === "true");
  }, [side]);

  return (
    <main
      className="relative min-h-[100svh] overflow-hidden text-white"
      style={{ background: portal.palette.background }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: portal.palette.glow,
          opacity: 1,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_0%,rgba(4,7,14,0.2)_48%,rgba(4,7,14,0.45)_100%)]" />
      <div
        className="absolute left-[10%] top-[8%] h-64 w-64 rounded-full blur-3xl"
        style={{
          background: isBlue ? "rgba(50, 138, 255, 0.18)" : "rgba(255, 73, 102, 0.16)",
          animation: "slowFloat 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[12%] right-[8%] h-72 w-72 rounded-full blur-3xl"
        style={{
          background: isBlue ? "rgba(114, 204, 255, 0.14)" : "rgba(255, 176, 126, 0.14)",
          animation: "slowFloat 16s ease-in-out infinite",
        }}
      />

      <div
        className={`relative z-10 transition duration-300 ${
          isUnlocked ? "blur-0" : "blur-[10px] saturate-[0.85]"
        }`}
      >
        <header className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-6 sm:px-8 lg:px-10">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.34em] text-white/55">
              {WEDDING_SITE_TITLE}
            </p>
            <h1 className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-white sm:text-4xl">
              {portal.familyLabel}
            </h1>
          </div>

          <nav className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.24em] sm:text-sm">
            <Link
              href="/"
              className="rounded-full border px-4 py-2 text-white/75 transition-colors hover:text-white"
              style={{ borderColor: portal.palette.border }}
            >
              Home
            </Link>
            <a
              href="#itinerary"
              className="rounded-full border px-4 py-2 text-white/75 transition-colors hover:text-white"
              style={{ borderColor: portal.palette.border }}
            >
              Itinerary
            </a>
            <a
              href="#gallery"
              className="rounded-full border px-4 py-2 text-white/75 transition-colors hover:text-white"
              style={{ borderColor: portal.palette.border }}
            >
              Gallery
            </a>
            <a
              href="#rsvp"
              className="rounded-full px-4 py-2 text-white"
              style={{
                background: `linear-gradient(135deg, ${portal.palette.secondary}, ${portal.palette.primary})`,
              }}
            >
              RSVP
            </a>
          </nav>
        </header>

        <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-14 pt-4 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-10 lg:pb-20 lg:pt-10">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <p
                className="text-[0.72rem] uppercase tracking-[0.34em]"
                style={{ color: portal.palette.highlight }}
              >
                {portal.heroEyebrow}
              </p>
              <h2
                className="max-w-xl font-[var(--font-display)] text-6xl font-semibold leading-none sm:text-7xl"
                style={{ color: portal.palette.soft }}
              >
                {portal.heroTitle}
              </h2>
              <p className="max-w-xl text-base leading-7 sm:text-lg" style={{ color: portal.palette.muted }}>
                {portal.heroCopy}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#itinerary"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(135deg, ${portal.palette.secondary}, ${portal.palette.primary})`,
                  color: "#fff8f2",
                  boxShadow: `0 18px 36px ${portal.palette.shadow}`,
                }}
              >
                {portal.heroCta}
              </a>
              <a
                href="#rsvp"
                className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  borderColor: portal.palette.border,
                  background: portal.palette.surface,
                  color: portal.palette.soft,
                }}
              >
                {portal.secondaryCta}
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {portal.highlights.map((highlight) => (
                <article
                  key={highlight.title}
                  className="rounded-[28px] border p-5"
                  style={{
                    background: portal.palette.surface,
                    borderColor: portal.palette.border,
                    boxShadow: `0 16px 38px ${portal.palette.shadow}`,
                  }}
                >
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.28em]"
                    style={{ color: portal.palette.highlight }}
                  >
                    {highlight.eyebrow}
                  </p>
                  <h3
                    className="mt-3 font-[var(--font-display)] text-2xl font-semibold"
                    style={{ color: portal.palette.soft }}
                  >
                    {highlight.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6" style={{ color: portal.palette.muted }}>
                    {highlight.body}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute inset-[10%] rounded-full border"
              style={{
                borderColor: isBlue
                  ? "rgba(108, 199, 255, 0.2)"
                  : "rgba(255, 111, 136, 0.18)",
              }}
            />
            <div
              className="absolute left-[6%] top-[16%] h-[18px] w-[18px] rounded-full"
              style={{ background: portal.palette.highlight }}
            />
            <AdaptiveWeddingImage
              assetBase={portal.heroImage.assetBase}
              alt={`${portal.familyLabel} hero image`}
              side={side}
              label={portal.heroImage.label}
              caption={portal.heroImage.caption}
              className="relative ml-auto min-h-[420px] border"
            />
          </div>
        </section>

        <section id="itinerary" className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="space-y-4">
              <p
                className="text-[0.72rem] uppercase tracking-[0.34em]"
                style={{ color: portal.palette.highlight }}
              >
                Itinerary
              </p>
              <h3
                className="font-[var(--font-display)] text-5xl font-semibold"
                style={{ color: portal.palette.soft }}
              >
                {portal.traditionHeading}
              </h3>
              <p className="text-base leading-7" style={{ color: portal.palette.muted }}>
                {portal.traditionCopy}
              </p>
            </div>

            <div className="grid gap-5">
              {portal.events.map((eventItem, index) => (
                <article
                  key={eventItem.id}
                  className="rounded-[30px] border p-6 md:p-7"
                  style={{
                    background: portal.palette.surfaceStrong,
                    borderColor: portal.palette.border,
                    boxShadow: `0 24px 70px ${portal.palette.shadow}`,
                  }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-3">
                      <p
                        className="text-[0.68rem] uppercase tracking-[0.28em]"
                        style={{ color: portal.palette.highlight }}
                      >
                        {eventItem.tag}
                      </p>
                      <h4
                        className="font-[var(--font-display)] text-3xl font-semibold"
                        style={{ color: portal.palette.soft }}
                      >
                        {eventItem.title}
                      </h4>
                      <p className="text-sm leading-6" style={{ color: portal.palette.muted }}>
                        {eventItem.description}
                      </p>
                    </div>
                    <div
                      className="rounded-full border px-4 py-2 text-sm uppercase tracking-[0.24em]"
                      style={{
                        borderColor: portal.palette.border,
                        color: portal.palette.soft,
                      }}
                    >
                      0{index + 1}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div
                      className="rounded-[24px] border px-4 py-4"
                      style={{
                        borderColor: portal.palette.border,
                        background: portal.palette.surface,
                      }}
                    >
                      <p className="text-xs uppercase tracking-[0.24em]" style={{ color: portal.palette.highlight }}>
                        Time
                      </p>
                      <p className="mt-2 text-sm leading-6" style={{ color: portal.palette.soft }}>
                        {eventItem.time}
                      </p>
                    </div>
                    <div
                      className="rounded-[24px] border px-4 py-4"
                      style={{
                        borderColor: portal.palette.border,
                        background: portal.palette.surface,
                      }}
                    >
                      <p className="text-xs uppercase tracking-[0.24em]" style={{ color: portal.palette.highlight }}>
                        Venue
                      </p>
                      <p className="mt-2 text-sm leading-6" style={{ color: portal.palette.soft }}>
                        {eventItem.venue}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-3">
              <p
                className="text-[0.72rem] uppercase tracking-[0.34em]"
                style={{ color: portal.palette.highlight }}
              >
                Gallery placeholders
              </p>
              <h3
                className="font-[var(--font-display)] text-5xl font-semibold"
                style={{ color: portal.palette.soft }}
              >
                {portal.galleryHeading}
              </h3>
              <p className="max-w-3xl text-base leading-7" style={{ color: portal.palette.muted }}>
                {portal.galleryCopy}
              </p>
            </div>
            <p className="max-w-sm text-sm leading-6 text-right" style={{ color: portal.palette.muted }}>
              {portal.uploadNote}
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
            <AdaptiveWeddingImage
              assetBase={portal.gallery[0].assetBase}
              alt={portal.gallery[0].label}
              side={side}
              label={portal.gallery[0].label}
              caption={portal.gallery[0].caption}
              className="min-h-[320px] border"
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {portal.gallery.slice(1).map((item) => (
                <AdaptiveWeddingImage
                  key={item.assetBase}
                  assetBase={item.assetBase}
                  alt={item.label}
                  side={side}
                  label={item.label}
                  caption={item.caption}
                  className="min-h-[320px] border"
                />
              ))}
            </div>
          </div>
        </section>

        <section id="rsvp" className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[0.74fr_1.26fr]">
            <div
              className="rounded-[34px] border p-6 md:p-8"
              style={{
                background: portal.palette.surfaceStrong,
                borderColor: portal.palette.border,
              }}
            >
              <p
                className="text-[0.72rem] uppercase tracking-[0.34em]"
                style={{ color: portal.palette.highlight }}
              >
                RSVP details
              </p>
              <h3
                className="mt-3 font-[var(--font-display)] text-5xl font-semibold"
                style={{ color: portal.palette.soft }}
              >
                Keep replies clean from day one
              </h3>
              <p className="mt-4 text-base leading-7" style={{ color: portal.palette.muted }}>
                The form is set up for two events with separate attendance choices, which means
                your future Supabase table can map directly to what guests already see here.
              </p>
              <div className="mt-8 space-y-4">
                {portal.events.map((eventItem) => (
                  <div
                    key={`summary-${eventItem.id}`}
                    className="rounded-[24px] border px-4 py-4"
                    style={{
                      borderColor: portal.palette.border,
                      background: portal.palette.surface,
                    }}
                  >
                    <p
                      className="text-[0.68rem] uppercase tracking-[0.28em]"
                      style={{ color: portal.palette.highlight }}
                    >
                      {eventItem.tag}
                    </p>
                    <p className="mt-2 text-lg font-medium" style={{ color: portal.palette.soft }}>
                      {eventItem.title}
                    </p>
                    <p className="mt-2 text-sm leading-6" style={{ color: portal.palette.muted }}>
                      {eventItem.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <RsvpForm side={side} />
          </div>
        </section>

        <footer className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-8 sm:px-8 lg:px-10">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.34em] text-white/45">
              {portal.roleLabel}
            </p>
            <p className="mt-2 text-sm leading-6" style={{ color: portal.palette.muted }}>
              Built as a three-screen experience with locked side portals and replaceable image
              slots.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full border px-5 py-3 text-sm uppercase tracking-[0.22em]"
              style={{
                borderColor: portal.palette.border,
                color: portal.palette.soft,
              }}
            >
              Back to entry
            </Link>
            <Link
              href={alternatePortal.route}
              className="rounded-full px-5 py-3 text-sm uppercase tracking-[0.22em]"
              style={{
                background: portal.palette.surface,
                border: `1px solid ${portal.palette.border}`,
                color: portal.palette.soft,
              }}
            >
              {portal.alternateLabel}
            </Link>
          </div>
        </footer>
      </div>

      {!isUnlocked ? (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#04070d]/72 px-4 backdrop-blur-md">
          <PasscodeCard side={side} onSuccess={() => setIsUnlocked(true)} />
        </div>
      ) : null}
    </main>
  );
}
