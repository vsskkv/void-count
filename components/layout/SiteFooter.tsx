import Link from 'next/link';
import { SITE_VERSION } from '@/lib/site';

export const SiteFooter = () => {
  return (
    <footer className="w-full py-12 px-4 text-center text-slate-300 text-sm relative z-50">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <Link href="/" className="hover:text-white transition-colors font-bold tracking-widest text-xs uppercase">HOME</Link>
            <Link href="/about" className="hover:text-white transition-colors font-bold tracking-widest text-xs uppercase">ABOUT</Link>
            <Link href="/how-to-play" className="hover:text-white transition-colors font-bold tracking-widest text-xs uppercase">HOW TO PLAY</Link>
          </div>
          <div className="flex justify-center gap-6">
            <a href="https://www.instagram.com/voidcountltd?igsh=dHh1bWV5c216YXJ1&utm_source=qr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-purple-300 transition-colors uppercase tracking-widest text-[10px] font-black group">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              Instagram
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-purple-300 transition-colors uppercase tracking-widest text-[10px] font-black group">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              TikTok
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-purple-300 transition-colors uppercase tracking-widest text-[10px] font-black group">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2 69.44 69.44 0 0 1 15 0 2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2 69.44 69.44 0 0 1-15 0 2 2 0 0 1-2-2Z"/><path d="m10 15 5-3-5-3z"/></svg>
              YouTube
            </a>
          </div>
        </div>
        <div>
          <p>&copy; 2026 Void Count. All rights reserved.</p>
          <p className="mt-1 text-slate-500 text-[10px] uppercase tracking-widest font-medium">
            Version {SITE_VERSION}
          </p>
          <p className="mt-2 text-slate-500 text-xs">
            Made by <a href="https://vikramsinghkainth.com/venture-consultancy/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">Venture Consultancy</a>
          </p>
        </div>
      </div>
    </footer>
  );
};
