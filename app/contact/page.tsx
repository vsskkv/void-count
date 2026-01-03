import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
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
    <main className="p-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Contact</h1>
      <p className="text-lg text-gray-700">Contact form or email link coming soon.</p>
    </main>
  );
}


