import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { STRIPE_CHECKOUT_URL } from "@/lib/constants";

export default function ShopPage() {
  return (
    <main className="p-8 min-h-screen max-w-5xl mx-auto flex flex-col items-center pt-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">Shop</h1>
      <div className="grid md:grid-cols-1 gap-8 w-full max-w-2xl">
        <div className="bg-slate-900/80 border border-indigo-500/30 rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center shadow-[0_0_40px_rgba(79,70,229,0.1)]">
           {/* Placeholder for product image */}
          <div className="w-full md:w-64 h-64 bg-indigo-950/50 rounded-xl border border-indigo-500/20 flex items-center justify-center text-slate-500">
            Product Image
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">Void Count: Base Deck</h2>
            <p className="text-slate-400 mb-4">
              The complete 110-card deck. Includes rulebook, tokens, and everything you need for 2-4 players.
            </p>
            <p className="text-3xl font-bold text-white mb-6">$25.00</p>
            <PrimaryButton href={STRIPE_CHECKOUT_URL} className="w-full md:w-auto">
              Pre-order Now
            </PrimaryButton>
          </div>
        </div>
      </div>
    </main>
  );
}
