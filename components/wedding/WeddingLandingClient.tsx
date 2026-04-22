"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PasscodeCard } from "@/components/wedding/PasscodeCard";
import {
  getUnlockStorageKey,
  getWeddingSide,
  weddingSideList,
  WEDDING_LANDING_LEFT,
  WEDDING_LANDING_RIGHT,
  WEDDING_SITE_TITLE,
  type WeddingSideKey,
} from "@/lib/weddingData";

export function WeddingLandingClient() {
  const router = useRouter();
  const [selectedSide, setSelectedSide] = useState<WeddingSideKey | null>(null);
  const [unlockedSides, setUnlockedSides] = useState<Record<WeddingSideKey, boolean>>({
    singh: false,
    kaur: false,
  });

  useEffect(() => {
    setUnlockedSides({
      singh: window.localStorage.getItem(getUnlockStorageKey("singh")) === "true",
      kaur: window.localStorage.getItem(getUnlockStorageKey("kaur")) === "true",
    });
  }, []);

  const handleEnter = (side: WeddingSideKey) => {
    const portal = getWeddingSide(side);

    if (unlockedSides[side]) {
      router.push(portal.route);
      return;
    }

    setSelectedSide(side);
  };

  const closeModal = () => {
    setSelectedSide(null);
  };

  const handleUnlockSuccess = (side: WeddingSideKey) => {
    const portal = getWeddingSide(side);

    setUnlockedSides((current) => ({ ...current, [side]: true }));
    window.setTimeout(() => {
      setSelectedSide(null);
      router.push(portal.route);
    }, 320);
  };

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#060912] text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(180deg,#071427_0%,#091c3f_50%,#06111f_100%)]" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(180deg,#2a0810_0%,#58111f_52%,#1b0509_100%)]" />
        <div
          className="absolute left-1/2 top-0 h-full w-[2px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.75), rgba(255,255,255,0.06))",
            animation: "softPulse 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute left-[17%] top-[10%] h-64 w-64 rounded-full blur-3xl"
          style={{
            background: "rgba(74, 167, 255, 0.25)",
            animation: "slowFloat 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[8%] right-[12%] h-72 w-72 rounded-full blur-3xl"
          style={{
            background: "rgba(255, 72, 102, 0.2)",
            animation: "slowFloat 16s ease-in-out infinite",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,9,18,0.12)_52%,rgba(6,9,18,0.5)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.38em] text-white/65">
              Private wedding portal
            </p>
            <h1 className="mt-2 font-[var(--font-display)] text-3xl font-semibold tracking-wide text-white sm:text-4xl">
              {WEDDING_SITE_TITLE}
            </h1>
          </div>
          <div className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/70 backdrop-blur">
            Blue left / red right
          </div>
        </header>

        <section className="flex flex-1 flex-col justify-center py-12">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm uppercase tracking-[0.42em] text-white/55">
              Choose your side to enter
            </p>
            <div className="mt-6 grid items-center gap-2 md:grid-cols-[1fr_auto_1fr]">
              <span className="font-[var(--font-display)] text-6xl font-semibold tracking-tight text-[#9ed9ff] sm:text-7xl md:text-8xl">
                {WEDDING_LANDING_LEFT}
              </span>
              <span className="mx-auto hidden h-20 w-px bg-white/20 md:block" />
              <span className="font-[var(--font-display)] text-6xl font-semibold tracking-tight text-[#ff9aab] sm:text-7xl md:text-8xl">
                {WEDDING_LANDING_RIGHT}
              </span>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
              The landing screen stays split down the middle so both family portals feel distinct
              before they merge into the same celebration.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {weddingSideList.map((portal) => {
              const isBlue = portal.key === "singh";

              return (
                <article
                  key={portal.key}
                  className="group relative overflow-hidden rounded-[34px] border p-6 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 md:p-8"
                  style={{
                    background: isBlue
                      ? "linear-gradient(180deg, rgba(9,18,41,0.8), rgba(7,15,31,0.94))"
                      : "linear-gradient(180deg, rgba(44,10,17,0.8), rgba(28,7,12,0.94))",
                    borderColor: isBlue
                      ? "rgba(129, 188, 255, 0.18)"
                      : "rgba(255, 171, 150, 0.16)",
                    boxShadow: isBlue
                      ? "0 24px 80px rgba(25, 80, 170, 0.22)"
                      : "0 24px 80px rgba(138, 28, 58, 0.22)",
                  }}
                >
                  <div
                    className="absolute inset-x-10 top-0 h-px"
                    style={{
                      background: isBlue
                        ? "linear-gradient(90deg, transparent, rgba(108,199,255,0.8), transparent)"
                        : "linear-gradient(90deg, transparent, rgba(255,111,136,0.75), transparent)",
                    }}
                  />
                  <div className="flex h-full flex-col justify-between gap-8">
                    <div className="space-y-5">
                      <div className="flex items-center justify-between gap-3">
                        <div
                          className="inline-flex rounded-full border px-3 py-1 text-[0.68rem] uppercase tracking-[0.28em]"
                          style={{
                            borderColor: isBlue
                              ? "rgba(108, 199, 255, 0.26)"
                              : "rgba(255, 111, 136, 0.24)",
                            color: isBlue ? "#d9f0ff" : "#ffe9e4",
                          }}
                        >
                          {portal.portalLabel}
                        </div>
                        {unlockedSides[portal.key] ? (
                          <span className="text-xs uppercase tracking-[0.24em] text-white/55">
                            unlocked
                          </span>
                        ) : null}
                      </div>

                      <div>
                        <h2
                          className="font-[var(--font-display)] text-5xl font-semibold"
                          style={{ color: isBlue ? "#f2faff" : "#fff3ee" }}
                        >
                          {portal.familyLabel}
                        </h2>
                        <p
                          className="mt-3 max-w-md text-sm leading-6"
                          style={{ color: isBlue ? "#bcd7f6" : "#efc7cc" }}
                        >
                          {portal.heroCopy}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em]">
                        <span
                          className="rounded-full border px-3 py-2"
                          style={{
                            borderColor: isBlue
                              ? "rgba(129, 188, 255, 0.18)"
                              : "rgba(255, 171, 150, 0.16)",
                            color: isBlue ? "#9ed9ff" : "#ffacb8",
                          }}
                        >
                          Password protected
                        </span>
                        <span
                          className="rounded-full border px-3 py-2"
                          style={{
                            borderColor: isBlue
                              ? "rgba(129, 188, 255, 0.18)"
                              : "rgba(255, 171, 150, 0.16)",
                            color: isBlue ? "#9ed9ff" : "#ffacb8",
                          }}
                        >
                          Two event RSVP
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleEnter(portal.key)}
                        className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] transition-transform duration-200 hover:-translate-y-0.5"
                        style={{
                          background: isBlue
                            ? "linear-gradient(135deg, #2b7fff, #6cc7ff)"
                            : "linear-gradient(135deg, #ff3d57, #ff7c94)",
                          color: "#fff8f2",
                        }}
                      >
                        Enter portal
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>

      {selectedSide ? (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#05070d]/75 px-4 backdrop-blur-md">
          <button
            type="button"
            onClick={closeModal}
            className="absolute right-5 top-5 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.26em] text-white/75"
          >
            Close
          </button>
          <PasscodeCard side={selectedSide} onSuccess={() => handleUnlockSuccess(selectedSide)} />
        </div>
      ) : null}
    </main>
  );
}
