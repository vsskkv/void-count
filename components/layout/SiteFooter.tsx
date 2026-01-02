export const SiteFooter = () => {
  return (
    <footer className="w-full py-12 px-4 text-center text-slate-300 text-sm relative z-50">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        <p>&copy; 2026 Void Count. All rights reserved.</p>
        <div className="flex justify-center gap-6">
          <a href="#" className="hover:text-purple-300 transition-colors">Twitter</a>
          <a href="#" className="hover:text-purple-300 transition-colors">Discord</a>
          <a href="#" className="hover:text-purple-300 transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
};
