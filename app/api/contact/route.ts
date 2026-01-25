import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type ContactRequestBody = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  hp?: string; // honeypot
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function normaliseEmail(email: string): string {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: ContactRequestBody;

  try {
    body = (await request.json()) as ContactRequestBody;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON body." },
      { status: 400 }
    );
  }

  // Basic bot trap: if honeypot is filled, pretend success
  if (body.hp && body.hp.trim().length > 0) {
    return NextResponse.json({ ok: true, message: "Message sent successfully." });
  }

  // Validate required fields
  const rawEmail = body.email ?? "";
  const email = normaliseEmail(rawEmail);

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const name = body.name?.trim();
  if (!name || name.length === 0) {
    return NextResponse.json(
      { ok: false, message: "Please enter your name." },
      { status: 400 }
    );
  }

  const subject = body.subject?.trim();
  if (!subject || subject.length === 0) {
    return NextResponse.json(
      { ok: false, message: "Please enter a subject." },
      { status: 400 }
    );
  }

  const message = body.message?.trim();
  if (!message || message.length === 0) {
    return NextResponse.json(
      { ok: false, message: "Please enter a message." },
      { status: 400 }
    );
  }

  // Sanitize and limit field lengths
  const sanitizedName = name.slice(0, 120);
  const sanitizedEmail = email.slice(0, 255);
  const sanitizedSubject = subject.slice(0, 200);
  const sanitizedMessage = message.slice(0, 5000);

  // Use publishable key with RLS policy allowing insert
  const supabase = createClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY")
  );

  const { error } = await supabase.from("contact_submissions").insert({
    name: sanitizedName,
    email: sanitizedEmail,
    subject: sanitizedSubject,
    message: sanitizedMessage,
  });

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json(
      { ok: false, message: "Could not send your message right now. Please try again or email us directly at hello@voidcount.com." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, message: "Message sent successfully." });
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
