"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  getRsvpDraftStorageKey,
  getRsvpSubmissionsStorageKey,
  getWeddingSide,
  type EventResponse,
  type WeddingSideKey,
} from "@/lib/weddingData";

type EventResponseMap = Record<string, EventResponse | "">;

interface RsvpFormState {
  guestName: string;
  email: string;
  partySize: string;
  dietaryNotes: string;
  message: string;
  responses: EventResponseMap;
}

interface SavedSubmission extends RsvpFormState {
  id: string;
  side: WeddingSideKey;
  submittedAt: string;
}

const responseOptions: Array<{ value: EventResponse; label: string }> = [
  { value: "attending", label: "Attending" },
  { value: "maybe", label: "Maybe" },
  { value: "not_attending", label: "Can't make it" },
];

function createInitialState(side: WeddingSideKey): RsvpFormState {
  const portal = getWeddingSide(side);
  const responses: EventResponseMap = {};

  portal.events.forEach((event) => {
    responses[event.id] = "";
  });

  return {
    guestName: "",
    email: "",
    partySize: "1",
    dietaryNotes: "",
    message: "",
    responses,
  };
}

function readStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  const raw = window.localStorage.getItem(key);

  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function RsvpForm({ side }: { side: WeddingSideKey }) {
  const portal = getWeddingSide(side);
  const draftKey = getRsvpDraftStorageKey(side);
  const submissionsKey = getRsvpSubmissionsStorageKey(side);
  const [form, setForm] = useState<RsvpFormState>(() => createInitialState(side));
  const [submissions, setSubmissions] = useState<SavedSubmission[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedDraft = readStoredValue<RsvpFormState>(draftKey, createInitialState(side));
    const savedSubmissions = readStoredValue<SavedSubmission[]>(submissionsKey, []);

    setForm(savedDraft);
    setSubmissions(savedSubmissions);
    setIsHydrated(true);
  }, [draftKey, side, submissionsKey]);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(draftKey, JSON.stringify(form));
  }, [draftKey, form, isHydrated]);

  const isBlue = side === "singh";

  const updateResponse = (eventId: string, response: EventResponse) => {
    setForm((current) => ({
      ...current,
      responses: {
        ...current.responses,
        [eventId]: response,
      },
    }));
    setErrorMessage("");
    setStatusMessage("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const missingResponses = portal.events.some((item) => !form.responses[item.id]);

    if (!form.guestName.trim() || !form.email.trim()) {
      setErrorMessage("Please add your name and email before saving the RSVP.");
      setStatusMessage("");
      return;
    }

    if (missingResponses) {
      setErrorMessage("Please choose a response for both events.");
      setStatusMessage("");
      return;
    }

    const submission: SavedSubmission = {
      ...form,
      id: `${side}-${Date.now()}`,
      side,
      submittedAt: new Date().toISOString(),
    };

    const nextSubmissions = [submission, ...submissions].slice(0, 6);

    window.localStorage.setItem(submissionsKey, JSON.stringify(nextSubmissions));
    window.localStorage.removeItem(draftKey);

    setSubmissions(nextSubmissions);
    setForm(createInitialState(side));
    setStatusMessage("RSVP saved locally on this device. Supabase can be plugged in later.");
    setErrorMessage("");
  };

  const latestSubmission = submissions[0];

  return (
    <div
      className="rounded-[34px] border p-6 shadow-2xl backdrop-blur-xl md:p-8"
      style={{
        background: portal.palette.surfaceStrong,
        borderColor: portal.palette.border,
        boxShadow: `0 28px 90px ${portal.palette.shadow}`,
      }}
    >
      <div className="space-y-3">
        <p
          className="text-[0.72rem] uppercase tracking-[0.34em]"
          style={{ color: portal.palette.highlight }}
        >
          RSVP
        </p>
        <h3
          className="font-[var(--font-display)] text-4xl font-semibold"
          style={{ color: portal.palette.soft }}
        >
          Confirm each event separately
        </h3>
        <p className="max-w-2xl text-sm leading-6" style={{ color: portal.palette.muted }}>
          This form works right now in static mode by saving on-device. Later, the submit handler
          can be pointed at Supabase without changing the experience for guests.
        </p>
      </div>

      <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium" style={{ color: portal.palette.soft }}>
              Full name
            </span>
            <input
              type="text"
              value={form.guestName}
              onChange={(event) =>
                setForm((current) => ({ ...current, guestName: event.target.value }))
              }
              className="w-full rounded-2xl border px-4 py-3 outline-none transition-colors"
              style={{
                background: portal.palette.surface,
                borderColor: portal.palette.border,
                color: portal.palette.soft,
              }}
              placeholder="Your name"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium" style={{ color: portal.palette.soft }}>
              Email
            </span>
            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
              className="w-full rounded-2xl border px-4 py-3 outline-none transition-colors"
              style={{
                background: portal.palette.surface,
                borderColor: portal.palette.border,
                color: portal.palette.soft,
              }}
              placeholder="you@example.com"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-[180px_1fr]">
          <label className="space-y-2">
            <span className="text-sm font-medium" style={{ color: portal.palette.soft }}>
              Party size
            </span>
            <select
              value={form.partySize}
              onChange={(event) =>
                setForm((current) => ({ ...current, partySize: event.target.value }))
              }
              className="w-full rounded-2xl border px-4 py-3 outline-none transition-colors"
              style={{
                background: portal.palette.surface,
                borderColor: portal.palette.border,
                color: portal.palette.soft,
              }}
            >
              <option value="1">1 guest</option>
              <option value="2">2 guests</option>
              <option value="3">3 guests</option>
              <option value="4">4 guests</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium" style={{ color: portal.palette.soft }}>
              Dietary notes
            </span>
            <input
              type="text"
              value={form.dietaryNotes}
              onChange={(event) =>
                setForm((current) => ({ ...current, dietaryNotes: event.target.value }))
              }
              className="w-full rounded-2xl border px-4 py-3 outline-none transition-colors"
              style={{
                background: portal.palette.surface,
                borderColor: portal.palette.border,
                color: portal.palette.soft,
              }}
              placeholder="Vegetarian, allergies, access needs"
            />
          </label>
        </div>

        <div className="space-y-4">
          {portal.events.map((eventItem) => (
            <div
              key={eventItem.id}
              className="rounded-[28px] border p-5"
              style={{
                background: portal.palette.surface,
                borderColor: portal.palette.border,
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.28em]"
                    style={{ color: portal.palette.highlight }}
                  >
                    {eventItem.tag}
                  </p>
                  <h4
                    className="font-[var(--font-display)] text-2xl font-semibold"
                    style={{ color: portal.palette.soft }}
                  >
                    {eventItem.title}
                  </h4>
                  <p className="text-sm leading-6" style={{ color: portal.palette.muted }}>
                    {eventItem.time} / {eventItem.venue}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {responseOptions.map((option) => {
                    const isSelected = form.responses[eventItem.id] === option.value;

                    return (
                      <button
                        key={`${eventItem.id}-${option.value}`}
                        type="button"
                        onClick={() => updateResponse(eventItem.id, option.value)}
                        className="rounded-full border px-4 py-2 text-sm transition-transform duration-200 hover:-translate-y-0.5"
                        style={{
                          borderColor: isSelected ? portal.palette.primary : portal.palette.border,
                          background: isSelected
                            ? isBlue
                              ? "rgba(30, 74, 150, 0.85)"
                              : "rgba(147, 25, 56, 0.85)"
                            : "transparent",
                          color: isSelected ? "#fff9f3" : portal.palette.soft,
                        }}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <p className="mt-3 text-sm leading-6" style={{ color: portal.palette.muted }}>
                {eventItem.description}
              </p>
            </div>
          ))}
        </div>

        <label className="space-y-2">
          <span className="text-sm font-medium" style={{ color: portal.palette.soft }}>
            Message
          </span>
          <textarea
            value={form.message}
            onChange={(event) =>
              setForm((current) => ({ ...current, message: event.target.value }))
            }
            rows={4}
            className="w-full rounded-[26px] border px-4 py-3 outline-none transition-colors"
            style={{
              background: portal.palette.surface,
              borderColor: portal.palette.border,
              color: portal.palette.soft,
            }}
            placeholder="Anything the family should know?"
          />
        </label>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-h-6 text-sm">
            {errorMessage ? (
              <p style={{ color: "#ffc9c1" }}>{errorMessage}</p>
            ) : statusMessage ? (
              <p style={{ color: "#d8ffd8" }}>{statusMessage}</p>
            ) : (
              <p style={{ color: portal.palette.muted }}>
                Your draft also stays saved while you type on this device.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] transition-transform duration-200 hover:-translate-y-0.5"
            style={{
              background: `linear-gradient(135deg, ${portal.palette.secondary}, ${portal.palette.primary})`,
              color: "#fffaf3",
              boxShadow: `0 16px 40px ${portal.palette.shadow}`,
            }}
          >
            Save RSVP
          </button>
        </div>
      </form>

      {latestSubmission ? (
        <div
          className="mt-8 rounded-[28px] border p-5"
          style={{
            background: portal.palette.surface,
            borderColor: portal.palette.border,
          }}
        >
          <p
            className="text-[0.7rem] uppercase tracking-[0.3em]"
            style={{ color: portal.palette.highlight }}
          >
            Latest saved RSVP
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <p className="text-lg font-medium" style={{ color: portal.palette.soft }}>
              {latestSubmission.guestName}
            </p>
            <span
              className="rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em]"
              style={{
                borderColor: portal.palette.border,
                color: portal.palette.muted,
              }}
            >
              {latestSubmission.partySize} guest{latestSubmission.partySize === "1" ? "" : "s"}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {portal.events.map((eventItem) => (
              <span
                key={`${latestSubmission.id}-${eventItem.id}`}
                className="rounded-full border px-3 py-2 text-xs uppercase tracking-[0.16em]"
                style={{
                  borderColor: portal.palette.border,
                  color: portal.palette.soft,
                }}
              >
                {eventItem.title}:{" "}
                {latestSubmission.responses[eventItem.id]
                  ?.replace("not_attending", "can't make it")
                  .replace("_", " ")}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
