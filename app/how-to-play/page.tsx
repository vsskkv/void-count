import { RuleSection } from "@/components/how-to-play/RuleSection";
import { DrawPileVisual, PowerCardVisual, CountCallVisual, DemoCard } from "@/components/how-to-play/DemoCards";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function HowToPlayPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden">
      <SiteHeader />
      
      <div className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-cyan-200">
          How to Play Void Count
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          <span className="text-sm text-indigo-400 font-bold uppercase tracking-widest mt-2 block">
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
             <DemoCard value="0" type="void" color="violet" />
             <DemoCard value="1" label="Point Card" color="sky" />
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
            <li><strong>Point Cards (1–9 Points):</strong> x72 (8 of each)</li>
            <li><strong>Point Cards (10 Points):</strong> x32 (8 each of: Blood Moon, Spring Waterfall, Desert Horizon, Blue Glacier)</li>
            <li><strong>Power Cards:</strong> x8 (Take Two x2, Toss x2, Sabotage x3, Double Your Hand x1)</li>
          </ul>
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
            <li>Flip the top card of the Draw Deck face up beside it – <strong>Open Pile</strong>. (The first open card can be any type).</li>
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
                <li>For 10-value cards (Blood Moon, etc.), sets must be the <strong>exact same</strong> type (e.g., 2 Blood Moons).</li>
                <li>If your played set matches the Open Pile's top card value, you <strong>do not draw</strong>.</li>
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
              <p>Call "Count" at the start of your turn if your hand totals <strong>7 points or less</strong> and contains <strong>no Power Cards</strong>.</p>
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
             <p className="text-sm italic text-slate-400 mb-4">Note: If you hold these cards after "Count" is called, they have a point value.</p>
             
             <div>
                <strong className="text-indigo-200">Take Two (Value 2):</strong>
                <p>Play on Open Pile. Choose a player to draw 2 cards. You draw 1 replacement card.</p>
             </div>
             
             <div>
                <strong className="text-indigo-200">Toss (Value 1):</strong>
                <p>Play on Open Pile. Discard any number of Point Cards of the <strong>same value</strong>. Do <strong>not</strong> draw a replacement card.</p>
             </div>

             <div>
                <strong className="text-indigo-200">Sabotage (Value 3):</strong>
                <p>Choose a player and give them one or more Point Cards of the same value from your hand. You draw 1 replacement card. (If it's your last card, just play it and draw 1).</p>
             </div>

             <div>
                <strong className="text-indigo-200">Double Your Hand (Value 5):</strong>
                <p>Choose a player (not yourself). They must draw as many cards as they currently hold.</p>
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
                 <li><strong>Calling Count:</strong> If the caller has the lowest total, they score <strong>0</strong>. If someone else is lower, caller takes <strong>20 penalty points</strong>.</li>
                 <li><strong>Ties:</strong> If others tie with the caller for lowest, caller still gets 0. Tied players take their hand total.</li>
                 <li><strong>Score Cap:</strong> Max <strong>25 points</strong> per round per player.</li>
                 <li><strong>Empty Hand:</strong> If your turn ends with 0 cards, you must draw 1 card immediately. You cannot call Count with an empty hand.</li>
                 <li><strong>Reshuffle:</strong> If Draw Deck runs out, reshuffle Open Pile to make a new Draw Deck.</li>
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
                 <p className="text-sm">Play until a player reaches the limit (50-500). The player with the <strong>lowest overall score</strong> wins.</p>
              </div>
              <div className="bg-slate-900/50 p-6 rounded-xl border border-indigo-500/20">
                 <h3 className="font-bold text-indigo-300 mb-2">Option 2: Elimination</h3>
                 <p className="text-sm">Players reaching the limit are <strong>eliminated</strong>. Last player standing wins.</p>
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
             <li><strong>Don't hoard Power Cards.</strong> They stop you from calling "Count" and have point values if caught.</li>
             <li><strong>Bluff & Time Wisely.</strong> Calling too early can cost you 20 points!</li>
             <li><strong>Watch the Open Pile.</strong> Avoid picking up Power Cards late in the round.</li>
          </ul>
        }
      />

      <SiteFooter />
    </main>
  );
}
