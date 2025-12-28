export const SiteFooter = () => {
  return (
    <footer className="w-full py-12 px-4 text-center bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent text-slate-500 text-sm relative z-50">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        <p>&copy; {new Date().getFullYear()} Void Count. All rights reserved.</p>
        <div className="flex justify-center gap-6">
          <a href="#" className="hover:text-indigo-400 transition-colors">Twitter</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Discord</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
};
