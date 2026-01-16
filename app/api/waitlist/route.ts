import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type WaitlistRequestBody = {
  email?: string;
  fullName?: string;
  source?: string;
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
  // intentionally simple; good enough for waitlist capture
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: WaitlistRequestBody;

  try {
    body = (await request.json()) as WaitlistRequestBody;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON body." },
      { status: 400 }
    );
  }

  // Basic bot trap: if honeypot is filled, pretend success
  if (body.hp && body.hp.trim().length > 0) {
    return NextResponse.json({ ok: true, message: "You're on the list." });
  }

  const rawEmail = body.email ?? "";
  const email = normaliseEmail(rawEmail);

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const fullName =
    body.fullName && body.fullName.trim().length > 0
      ? body.fullName.trim().slice(0, 120)
      : null;

  const source =
    body.source && body.source.trim().length > 0
      ? body.source.trim().slice(0, 120)
      : null;

  // Use publishable key; RLS policy allows insert
  const supabase = createClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY")
  );

  const { error } = await supabase.from("waitlist_signups").insert({
    email,
    full_name: fullName,
    source,
  });

  if (error) {
    // Duplicate email (unique index) -> treat as success to avoid leaking info
    // Postgres unique violation = 23505
    const isDuplicate = (error as any)?.code === "23505";
    if (isDuplicate) {
      return NextResponse.json({ ok: true, message: "You're on the list." });
    }

    return NextResponse.json(
      { ok: false, message: "Could not add you right now. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, message: "You're on the list." });
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
