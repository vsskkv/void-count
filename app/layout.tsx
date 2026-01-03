import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Void Count",
  description: "A game of mystery and perception",
  icons: {
    icon: [
      { url: "/void-count-logo.png" },
      { url: "/void-count-logo.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/void-count-logo.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-950 text-slate-50`}
      >
        <div className="min-h-screen flex flex-col bg-[radial-gradient(circle_at_top,#1d2540_0,transparent_55%),radial-gradient(circle_at_bottom,#020617_0,transparent_55%)]">
          {children}
        </div>
      </body>
    </html>
  );
}
