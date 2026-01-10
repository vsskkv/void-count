import Link from 'next/link';

export const SiteHeader = () => {
  return (
    <header className="w-full p-4 md:p-6 flex justify-between items-center border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="text-lg md:text-2xl font-extrabold tracking-wider">
        <Link href="/" className="text-white hover:text-indigo-400 transition-colors whitespace-nowrap">
          VOID COUNT
        </Link>
      </div>
      <nav className="flex gap-3 md:gap-8 text-[10px] md:text-sm font-black text-slate-300">
        <Link href="/about" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all whitespace-nowrap uppercase tracking-tighter">
          ABOUT
        </Link>
        <Link href="/how-to-play" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all whitespace-nowrap uppercase tracking-tighter">
          HOW TO PLAY
        </Link>
        <Link href="/faq" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all whitespace-nowrap uppercase tracking-tighter">
          FAQ
        </Link>
      </nav>
    </header>
  );
};
