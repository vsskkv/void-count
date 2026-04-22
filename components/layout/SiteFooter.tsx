import Link from 'next/link';
import { VersionLabel } from '@/components/layout/VersionLabel';
import { CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/constants';

export const SiteFooter = () => {
  return (
    <footer className="w-full py-8 sm:py-10 md:py-12 px-4 sm:px-6 text-center text-slate-300 text-xs sm:text-sm relative z-50 bg-transparent">
      <div className="max-w-4xl mx-auto flex flex-col gap-6 sm:gap-8 md:gap-10">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4">
            <Link href="/" className="hover:text-white transition-colors font-bold tracking-widest text-[10px] sm:text-xs uppercase">HOME</Link>
            <Link href="/about" className="hover:text-white transition-colors font-bold tracking-widest text-[10px] sm:text-xs uppercase">ABOUT</Link>
            <Link href="/how-to-play" className="hover:text-white transition-colors font-bold tracking-widest text-[10px] sm:text-xs uppercase">HOW TO PLAY</Link>
            <Link href="/faq" className="hover:text-white transition-colors font-bold tracking-widest text-[10px] sm:text-xs uppercase">FAQ</Link>
            <Link href="/settling-debates" className="hover:text-white transition-colors font-bold tracking-widest text-[10px] sm:text-xs uppercase">SETTLING DEBATES</Link>
            <Link href="/contact" className="hover:text-white transition-colors font-bold tracking-widest text-[10px] sm:text-xs uppercase">CONTACT</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="https://www.instagram.com/voidcountltd?igsh=dHh1bWV5c216YXJ1&utm_source=qr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-purple-300 transition-colors uppercase tracking-widest text-[9px] sm:text-[10px] font-black group">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform sm:w-3.5 sm:h-3.5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              Instagram
            </a>
            <a href="#" className="flex items-center gap-2 text-slate-300 hover:text-purple-300 transition-colors uppercase tracking-widest text-[9px] sm:text-[10px] font-black group">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform sm:w-3.5 sm:h-3.5"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              TikTok
            </a>
            <a href="#" className="flex items-center gap-2 text-slate-300 hover:text-purple-300 transition-colors uppercase tracking-widest text-[9px] sm:text-[10px] font-black group">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform sm:w-3.5 sm:h-3.5"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2 69.44 69.44 0 0 1 15 0 2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2 69.44 69.44 0 0 1-15 0 2 2 0 0 1-2-2Z"/><path d="m10 15 5-3-5-3z"/></svg>
              YouTube
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex min-w-0 items-center gap-2 text-slate-300 hover:text-purple-300 transition-colors tracking-wide text-[10px] sm:text-xs font-semibold group">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:scale-110 transition-transform sm:w-3.5 sm:h-3.5"><path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8"/><rect width="18" height="14" x="3" y="5" rx="2"/></svg>
              <span className="break-all">{CONTACT_EMAIL}</span>
            </a>
            <a href={`tel:${CONTACT_PHONE}`} className="flex min-w-0 items-center gap-2 text-slate-300 hover:text-purple-300 transition-colors tracking-wide text-[10px] sm:text-xs font-semibold group">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:scale-110 transition-transform sm:w-3.5 sm:h-3.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.22a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span className="break-all">{CONTACT_PHONE}</span>
            </a>
          </div>
        </div>
        <div>
          <p className="text-xs sm:text-sm text-slate-300">&copy; 2026 Void Count. All rights reserved.</p>
          <VersionLabel />
          <p className="mt-2 text-slate-400 text-[10px] sm:text-xs">
            Made by <a href="https://vikramsinghkainth.com/venture-consultancy/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">Venture Consultancy</a>
          </p>
        </div>
      </div>
    </footer>
  );
};
