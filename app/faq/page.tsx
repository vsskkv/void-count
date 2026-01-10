"use client";

import React from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FAQSection } from "@/components/home/FAQSection";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <SiteHeader />
      <div className="flex-1 pt-24 pb-16">
        <FAQSection />
      </div>
      <SiteFooter />
    </main>
  );
}
