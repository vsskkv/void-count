import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/about", label: "ABOUT", featured: false },
  { href: "/how-to-play", label: "HOW TO PLAY", featured: false },
  { href: "/faq", label: "FAQ", featured: false },
  { href: "/settling-debates", label: "SETTLING DEBATES", featured: false },
  { href: "/contact", label: "CONTACT", featured: true },
] as const;

export const SiteHeader = () => {
  return (
    <header className="relative z-50 flex w-full items-center justify-between border-b border-slate-900 bg-slate-950/80 p-3 backdrop-blur-md sm:p-4 md:p-6">
      <Link href="/" className="group flex items-center" aria-label="Void Count home">
        <div className="relative h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12">
          <Image
            src="/void-count-logo.webp"
            alt="Void Count - New Strategic Card Game 2026 Logo"
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-110"
            priority
          />
        </div>
      </Link>

      <nav className="hidden gap-6 text-sm font-black text-slate-300 md:flex lg:gap-8">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap uppercase tracking-tighter transition-all ${
              link.featured
                ? "text-purple-400 hover:text-purple-300 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                : "hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <details className="mobile-menu md:hidden">
        <summary
          className="mobile-menu-summary relative z-[102] -mr-2 flex min-h-11 w-11 cursor-pointer list-none items-center justify-center text-slate-300 transition-colors hover:text-white"
          aria-label="Toggle menu"
        >
          <svg
            className="mobile-menu-open-icon h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            className="mobile-menu-close-icon h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </summary>

        <nav className="fixed left-0 right-0 top-[57px] z-[101] max-h-[calc(100vh-57px)] overflow-y-auto border-b border-slate-800/50 bg-slate-950 shadow-2xl backdrop-blur-md sm:top-[73px] sm:max-h-[calc(100vh-73px)]">
          <div className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex min-h-12 items-center border-b border-slate-800/50 px-6 py-4 text-sm font-black uppercase tracking-tighter transition-colors ${
                  link.featured
                    ? "text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
                    : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </details>
    </header>
  );
};
