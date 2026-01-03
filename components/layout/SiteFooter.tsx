export const SiteFooter = () => {
  return (
    <footer className="w-full py-12 px-4 text-center text-slate-300 text-sm relative z-50">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        <div>
          <p>&copy; 2026 Void Count. All rights reserved.</p>
          <p className="mt-1 text-slate-500 text-xs">
            Made by <a href="https://VikramSinghKainth.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">Venture Consultancy</a>
          </p>
        </div>
        <div className="flex justify-center gap-6">
          <a href="#" className="hover:text-purple-300 transition-colors">Instagram</a>
          <a href="#" className="hover:text-purple-300 transition-colors">TikTok</a>
          <a href="#" className="hover:text-purple-300 transition-colors">YouTube</a>
        </div>
      </div>
    </footer>
  );
};
