import type { Metadata } from "next";
import { RuleSection } from "@/components/how-to-play/RuleSection";
import { DrawPileVisual, PowerCardVisual, CountCallVisual, DemoCard } from "@/components/how-to-play/DemoCards";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "How to Play",
  description: `Learn how to play ${SITE_NAME}. ${SITE_DESCRIPTION}`,
  alternates: { canonical: "/how-to-play" },
  openGraph: {
    title: `How to Play | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: "/how-to-play",
  },
  twitter: {
    title: `How to Play | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
  },
};

export default function HowToPlayPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden">
      <SiteHeader />
      
      <div className="pt-24 md:pt-32 pb-12 md:pb-16 px-4 md:px-6 text-center">
        <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-cyan-200 leading-tight">
          How to Play Void Count
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
          <span className="text-xs md:text-sm text-indigo-400 font-bold uppercase tracking-widest mt-2 block">
            2-8 Players • Ages 7+
          </span>
        </p>
      </div>

      {/* Aim of the Game */}
      <RuleSection 
        title="Aim of the Game"
        alignment="left"
        icon="🎯"
        description={
          <p>Avoid reaching the score limit by keeping the lowest total of Point Cards each round.</p>
        }
        cardVisual={
          <div className="flex gap-4 justify-center">
             <DemoCard src="/One v1.png" label="1 Point" />
             <DemoCard src="/Two v1.png" label="2 Points" />
          </div>
        }
      />

      {/* Contents */}
      <RuleSection 
        title="Contents (116 Cards)"
        alignment="right"
        icon="📦"
        description={
          <ul className="list-disc list-inside space-y-2 ml-2 text-left">
            <li><strong>Void Cards (0 Points):</strong> x4</li>
            <li><strong>Point Cards (1–9 Points, 8 of each):</strong> x72</li>
            <li><strong>Point Cards (10 Points, 8 each of: Blood Moon, Spring Waterfall, Desert Horizon, Blue Glacier):</strong> x32</li>
            <li><strong>Power Cards:</strong> Each has a special effect (Take Two x2, Toss x2, Sabotage x3, Double Your Hand x1) x8</li>
          </ul>
        }
        cardVisual={
          <div className="grid grid-cols-2 gap-2">
            <DemoCard src="/Blue Glacier v1.png" label="Blue Glacier" />
            <DemoCard src="/Desert Horizon v1.png" label="Desert Horizon" />
            <DemoCard src="/Volcanix Lava v1.png" label="Volcanix Lava" />
            <DemoCard src="/Toxic Swamp v1.png" label="Toxic Swamp" />
          </div>
        }
      />

      {/* Game Setup */}
      <RuleSection 
        title="Game Setup"
        alignment="left"
        icon="🃏"
        description={
          <ul className="list-disc list-inside space-y-2 ml-2 text-left">
            <li>Shuffle all 116 cards.</li>
            <li>Deal <strong>8 cards</strong> to each player.</li>
            <li>Place the remaining cards face down in the centre – <strong>Draw Deck</strong>.</li>
            <li>Flip the top card of the Draw Deck face up beside it – <strong>Open Pile</strong>. (The first open card can be any type (Point or Power)).</li>
          </ul>
        }
        cardVisual={<DrawPileVisual />}
      />

      {/* Turn Actions */}
      <RuleSection 
        title="On Your Turn"
        alignment="right"
        icon="🔄"
        description={
          <div className="space-y-6 text-left">
            <p>Do <strong>one</strong> of the following:</p>
            
            <div>
              <h3 className="text-indigo-300 font-bold text-xl mb-2">1. Play Point Card(s)</h3>
              <p className="mb-2">Play a single Point Card or multiple Point Cards of the <strong>same value</strong>.</p>
              <ul className="list-disc list-inside pl-2 space-y-1 text-slate-400 text-sm">
                <li>There are 4 different types of 10 value Point Cards: Blood Moon, Spring Waterfall, Desert Horizon, and Blue Glacier. Sets must be the <strong>exact same</strong> type (e.g., 2 Blood Moons).</li>
                <li>If your played set matches the top card of the Open Pile, you <strong>do not draw</strong>.</li>
                <li>Otherwise, you must <strong>draw 1 card</strong> after playing.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-indigo-300 font-bold text-xl mb-2">2. Play a Power Card</h3>
              <p>Play onto the Open Pile and follow its effect immediately. Then, <strong>draw 1 card</strong> (unless playing Toss or the Power Card matches the previous Power Card on the Open Pile).</p>
            </div>

            <div>
              <h3 className="text-indigo-300 font-bold text-xl mb-2">3. Pick up from Open Pile</h3>
              <p>Take the top card for strategic purposes. You must then play a <strong>different</strong> card from your hand in the same turn.</p>
            </div>

            <div>
              <h3 className="text-indigo-300 font-bold text-xl mb-2">4. Call "Count"</h3>
              <p>Call "Count" at the start of your turn if your hand totals <strong>7 points or less</strong> and contains <strong>no Power Cards</strong>. Everyone reveals their hand and the round ends immediately.</p>
            </div>
          </div>
        }
      />

      {/* Power Cards Explained */}
      <RuleSection 
        title="Power Cards Explained"
        alignment="left"
        icon="⚡"
        description={
          <div className="space-y-4 text-left">
             <p className="text-sm italic text-slate-400 mb-4">Note: After resolving its effect, draw one card from the Draw Deck, except when playing a Toss Card or when the Power Card matches the previous Power Card.</p>
             
             <div>
                <strong className="text-indigo-200">Take Two (Value 2):</strong>
                <p>Choose a player to draw 2 cards. You draw 1 replacement card.</p>
             </div>
             
             <div>
                <strong className="text-indigo-200">Toss Card (Value 1):</strong>
                <p>Discard any Point Card(s) of the same value. Do <strong>not</strong> draw a replacement card.</p>
             </div>

             <div>
                <strong className="text-indigo-200">Sabotage Card (Value 3):</strong>
                <p>Choose a player and give them one or more Point Cards of the same value. You draw 1 replacement card. (If it's your last card, no player is sabotaged).</p>
             </div>

             <div>
                <strong className="text-indigo-200">Double Your Hand (Value 5):</strong>
                <p>Choose another player. They must draw as many cards as they currently hold. Cannot be used on yourself.</p>
             </div>
          </div>
        }
        cardVisual={<PowerCardVisual />}
      />

      {/* Game Rules Explained */}
      <RuleSection 
        title="Game Rules & Scoring"
        alignment="right"
        icon="📝"
        description={
          <div className="space-y-4 text-left">
             <ul className="list-disc list-inside space-y-2">
                <li><strong>Scoring Results:</strong> If caller has the lowest total, they score <strong>0</strong>. If someone else is lower, caller takes <strong>20 penalty points</strong>.</li>
                <li><strong>Ties:</strong> If others tie with the caller for lowest, caller still scores 0.</li>
                <li><strong>Score Cap:</strong> Max <strong>25 points</strong> per round per player.</li>
                <li><strong>Counting Score:</strong> Point Cards are face value (1-10). Power Cards also have point values (1-5) after Count is called.</li>
                <li><strong>Empty Hand:</strong> If turn ends with 0 cards, draw 1 card immediately. You cannot call Count with zero cards.</li>
                <li><strong>Empty Draw Deck:</strong> Reshuffle Open Pile to make a new Draw Deck.</li>
             </ul>
          </div>
        }
      />

      {/* Winning the Game */}
      <RuleSection 
        title="Winning the Game"
        alignment="left"
        icon="🏆"
        description={
          <div className="grid md:grid-cols-2 gap-6 text-left">
             <div className="bg-slate-900/50 p-6 rounded-xl border border-indigo-500/20">
                <h3 className="font-bold text-indigo-300 mb-2">Option 1: Lowest Score</h3>
                <p className="text-sm text-slate-300">Play until a player reaches/exceeds the limit (50-500). The player with the <strong>lowest overall score</strong> wins.</p>
             </div>
             <div className="bg-slate-900/50 p-6 rounded-xl border border-indigo-500/20">
                <h3 className="font-bold text-indigo-300 mb-2">Option 2: Elimination</h3>
                <p className="text-sm text-slate-300">When a player reaches the limit (50-500), they are <strong>eliminated</strong>. Last player standing wins.</p>
             </div>
          </div>
        }
        cardVisual={<CountCallVisual />}
      />

      {/* Tips and Tricks */}
      <RuleSection 
        title="Tips & Tricks"
        alignment="right"
        icon="💡"
        description={
          <ul className="list-disc list-inside space-y-3 text-left">
             <li><strong>Keep Void Cards!</strong> They are worth 0 and make calling Count easier.</li>
             <li><strong>Don't hold Power Cards for too long.</strong> They stop you from calling "Count" and hold point values.</li>
             <li><strong>Bluff & Time Wisely.</strong> Calling too early could cost you 20 points!</li>
             <li><strong>Watch the Open Pile.</strong> Avoid picking up Power Cards late if the round is ending soon.</li>
          </ul>
        }
      />

      <SiteFooter />
    </main>
  );
}
