import Link from 'next/link';

export const SiteFooter = () => {
  return (
    <footer className="w-full py-12 px-4 text-center text-slate-300 text-sm relative z-50">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <Link href="/" className="hover:text-white transition-colors font-bold tracking-widest text-xs uppercase">HOME</Link>
          <Link href="/about" className="hover:text-white transition-colors font-bold tracking-widest text-xs uppercase">ABOUT</Link>
          <Link href="/how-to-play" className="hover:text-white transition-colors font-bold tracking-widest text-xs uppercase">HOW TO PLAY</Link>
        </div>
        <div>
          <p>&copy; 2026 Void Count. All rights reserved.</p>
          <p className="mt-1 text-slate-500 text-xs">
            Made by <a href="https://vikramsinghkainth.com/venture-consultancy/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">Venture Consultancy</a>
          </p>
        </div>
        <div className="flex justify-center gap-6">
          <a href="https://www.instagram.com/voidcountltd?igsh=dHh1bWV5c216YXJ1&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors uppercase tracking-widest text-[10px] font-black">Instagram</a>
          <a href="#" className="hover:text-purple-300 transition-colors uppercase tracking-widest text-[10px] font-black">TikTok</a>
          <a href="#" className="hover:text-purple-300 transition-colors uppercase tracking-widest text-[10px] font-black">YouTube</a>
        </div>
      </div>
    </footer>
  );
};
