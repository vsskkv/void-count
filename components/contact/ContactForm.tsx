"use client";

import { useState, FormEvent } from "react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { CONTACT_EMAIL } from "@/lib/constants";

type FormStatus = "idle" | "submitting" | "success" | "error";

function normaliseEmail(email: string): string {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ContactForm() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    hp: "", // honeypot field
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    setErrorMessage("");

    try {
      // Bot trap: if honeypot is filled, pretend success
      if (formData.hp && formData.hp.trim().length > 0) {
        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "", hp: "" });
        return;
      }

      const email = normaliseEmail(formData.email);
      if (!email || !isValidEmail(email)) {
        setFormStatus("error");
        setErrorMessage("Please enter a valid email address.");
        return;
      }
      const name = formData.name?.trim();
      if (!name || name.length === 0) {
        setFormStatus("error");
        setErrorMessage("Please enter your name.");
        return;
      }
      const subject = formData.subject?.trim();
      if (!subject || subject.length === 0) {
        setFormStatus("error");
        setErrorMessage("Please enter a subject.");
        return;
      }
      const message = formData.message?.trim();
      if (!message || message.length === 0) {
        setFormStatus("error");
        setErrorMessage("Please enter a message.");
        return;
      }

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey =
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        setFormStatus("error");
        setErrorMessage(`Configuration error. Please try again later or email ${CONTACT_EMAIL}.`);
        return;
      }

      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { error } = await supabase.from("contact_submissions").insert({
        name: name.slice(0, 120),
        email: email.slice(0, 255),
        subject: subject.slice(0, 200),
        message: message.slice(0, 5000),
      });

      if (error) {
        console.error("Contact Supabase error:", error);
        if (error.code === "42501" || error.message?.includes("permission") || error.message?.includes("RLS")) {
          setErrorMessage(`Unable to send right now. Please email ${CONTACT_EMAIL}.`);
        } else {
          setErrorMessage(error.message || `Could not send your message. Please try again or email ${CONTACT_EMAIL}.`);
        }
        setFormStatus("error");
        return;
      }

      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "", hp: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      setFormStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (formStatus === "success") {
    return (
      <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
          <p className="text-slate-300">
            Thanks for reaching out! We'll get back to you within 24-48 hours.
          </p>
        </div>
        <button
          onClick={() => setFormStatus("idle")}
          className="text-indigo-400 hover:text-indigo-300 transition-colors font-semibold"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          name="hp"
          value={formData.hp}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          className="absolute opacity-0 pointer-events-none"
          aria-hidden="true"
        />

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-slate-300 mb-2"
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            disabled={formStatus === "submitting"}
            className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-slate-300 mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={formStatus === "submitting"}
            className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-semibold text-slate-300 mb-2"
          >
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            disabled={formStatus === "submitting"}
            className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="What's this about?"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-slate-300 mb-2"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            disabled={formStatus === "submitting"}
            className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Tell us more about your inquiry, partnership idea, or feedback..."
          />
        </div>

        {formStatus === "error" && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{errorMessage}</p>
          </div>
        )}

        <PrimaryButton
          type="submit"
          disabled={formStatus === "submitting"}
          className="w-full"
        >
          {formStatus === "submitting" ? "Sending..." : "Send Message"}
        </PrimaryButton>

        <p className="text-slate-500 text-xs text-center">
          We typically respond within 24-48 hours
        </p>
      </form>
    </div>
  );
}
