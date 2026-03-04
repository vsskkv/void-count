"use client";

import React, { useState } from "react";

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildSourceLabel(params: URLSearchParams | null): string {
  const base = "kickstarter-prelaunch";
  if (!params) return base;

  const parts: string[] = [];
  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  const utmCampaign = params.get("utm_campaign");

  if (utmSource) parts.push(`utm_source=${utmSource}`);
  if (utmMedium) parts.push(`utm_medium=${utmMedium}`);
  if (utmCampaign) parts.push(`utm_campaign=${utmCampaign}`);

  if (parts.length === 0) return base;
  return `${base}?${parts.join("&")}`.slice(0, 120);
}

type Props = {
  kickstarterUrl: string;
  ctaLabel: string;
  ctaClassName: string;
};

export function KickstarterEmailCaptureForm({
  kickstarterUrl,
  ctaLabel,
  ctaClassName,
}: Props) {
  const hasKickstarterUrl = Boolean(kickstarterUrl && kickstarterUrl.trim().length > 0);
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState(""); // honeypot
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const submitEmail = async (normalizedEmail: string, sourceLabel: string) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey =
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        setMessage(
          "Configuration error. Please try again later (missing Supabase env vars)."
        );
        setIsSubmitting(false);
        return;
      }

      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { error } = await supabase.from("waitlist_signups").insert({
        email: normalizedEmail,
        full_name: null,
        source: sourceLabel,
      });

      if (error) {
        const errorCode =
          typeof (error as { code?: unknown })?.code === "string"
            ? (error as { code?: string }).code
            : undefined;

        // Duplicate email (unique constraint)
        if (
          errorCode === "23505" ||
          error.message?.includes("duplicate") ||
          error.message?.includes("unique")
        ) {
          setMessage("You're already on the list!");
          setEmail("");
          setIsSubmitting(false);
          return;
        }

        setMessage("Could not add you right now. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setMessage("You're on the list!");
      setEmail("");
    } catch (error) {
      console.error("Kickstarter email capture error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openKickstarter = () => {
    if (typeof window === "undefined") return;
    if (!kickstarterUrl) return;

    const popup = window.open(kickstarterUrl, "_blank", "noopener,noreferrer");
    if (!popup) {
      window.location.href = kickstarterUrl;
    }
  };

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Bot trap: if honeypot is filled, do nothing else
    if (hp && hp.trim().length > 0) return;

    const normalizedEmail = normalizeEmail(email);
    if (!normalizedEmail) {
      // Email is optional, but if there is no Kickstarter URL configured,
      // give a clear prompt instead of doing nothing.
      if (!hasKickstarterUrl) {
        setMessage("Kickstarter link is coming soon — enter your email below.");
        return;
      }

      openKickstarter();
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      setMessage("Enter a valid email (or leave blank).");
      return;
    }

    // If email is provided, open Kickstarter (new tab) and submit email in the background.
    if (hasKickstarterUrl) {
      openKickstarter();
    }

    const params =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : null;
    const sourceLabel = buildSourceLabel(params);
    void submitEmail(normalizedEmail, sourceLabel);
  };

  return (
    <form
      onSubmit={handleNotify}
      className="relative mt-5 flex flex-col gap-3 sm:gap-4"
      aria-busy={isSubmitting}
    >
      {/* Honeypot - hidden from users */}
      <input
        type="text"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px]"
      />

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <label className="sr-only" htmlFor="kickstarter-email">
          Email address
        </label>
        <input
          id="kickstarter-email"
          type="email"
          inputMode="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          name="email"
          className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-slate-950/60 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-[#05ce78] focus:ring-2 focus:ring-[#05ce78]/40 transition-all text-base"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${ctaClassName} w-full sm:w-auto whitespace-nowrap px-6 py-3 sm:py-3.5 rounded-xl text-center text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          {ctaLabel}
        </button>
      </div>

      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
        Optional: enter your email, then hit Notify. Kickstarter can’t message
        you. We’ll email you on launch day.
      </p>

      <div role="status" aria-live="polite">
        {isSubmitting ? (
          <p className="text-sm font-bold text-slate-400">Saving…</p>
        ) : message ? (
          <p
            className={`text-sm font-bold ${
              message.includes("list") ? "text-[#05ce78]" : "text-rose-400"
            }`}
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
