import Link from 'next/link';

export const SiteHeader = () => {
  return (
    <header className="w-full p-6 flex justify-between items-center border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="text-2xl font-extrabold tracking-wider">
        <Link href="/" className="text-white hover:text-indigo-400 transition-colors">
          VOID COUNT
        </Link>
      </div>
      <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
        <Link href="/how-to-play" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">
          HOW TO PLAY
        </Link>
        <Link href="/shop" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">
          SHOP
        </Link>
        <Link href="/contact" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">
          CONTACT
        </Link>
      </nav>
    </header>
  );
};
