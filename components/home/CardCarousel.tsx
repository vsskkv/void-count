import Image from "next/image";

const CARD_DATA = [
  { id: "toss", front: "/optimized/toss-v1.jpg", name: "Toss", category: "Power" },
  { id: "sabotage", front: "/optimized/sabotage-v1.jpg", name: "Sabotage", category: "Power" },
  { id: "take-two", front: "/optimized/take-two-v1.jpg", name: "Take Two", category: "Power" },
  { id: "double", front: "/optimized/double-your-hand-v1.jpg", name: "Double Your Hand", category: "Power" },
  { id: "blue-glacier", front: "/optimized/blue-glacier-v1.jpg", name: "Blue Glacier", category: "10 point" },
  { id: "desert", front: "/optimized/desert-horizon-v1.jpg", name: "Desert Horizon", category: "10 point" },
  { id: "toxic", front: "/optimized/toxic-swamp-v1.jpg", name: "Toxic Swamp", category: "10 point" },
  { id: "volcanix", front: "/optimized/volcanix-lava-v1.jpg", name: "Volcanic Lava", category: "10 point" },
] as const;

const LOOPED_CARD_DATA = [...CARD_DATA, CARD_DATA[0]];

export const CardCarousel = () => {
  return (
    <section
      className="deck-carousel relative bg-transparent px-4 py-12 sm:px-6 sm:py-16 md:py-20"
      aria-label="Void Count card deck carousel"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.08),transparent_70%)]" />
      <div className="relative z-20 mb-6 w-full text-center sm:mb-8 md:mb-10">
        <h2 className="mb-4 flex flex-wrap justify-center gap-2 text-center text-2xl font-black uppercase italic tracking-tighter text-white sm:mb-6 sm:gap-4 sm:text-3xl md:mb-8 md:scale-y-110 md:text-4xl lg:text-5xl">
          <span>EXPLORE THE</span>
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text italic text-transparent">
            CARD GAME
          </span>
          <span>DECK</span>
        </h2>
        <p className="mx-auto mb-4 max-w-2xl px-4 text-sm text-slate-200 sm:text-base md:text-lg">
          Discover the cards from Void Count. The{" "}
          <span className="text-[#05ce78]">Kickstarter</span> is now over, and the game is launching soon.
        </p>
      </div>

      <div className="relative z-20 mx-auto max-w-sm">
        <div className="overflow-hidden rounded-[1.4rem]">
          <div
            className="deck-carousel-track flex transition-transform duration-500 ease-out"
            aria-live="off"
          >
            {LOOPED_CARD_DATA.map((card, index) => (
              <article
                key={`${card.id}-${index}`}
                aria-hidden={index === CARD_DATA.length}
                className="deck-carousel-slide relative min-w-0 flex-[0_0_100%]"
              >
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-800 bg-white/5 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:p-4">
                  <div className="relative aspect-[2.5/3.5] w-full overflow-hidden rounded-xl bg-slate-900/70">
                    <Image
                      src={card.front}
                      alt={
                        index === CARD_DATA.length
                          ? ""
                          : `${card.name} card from Void Count new card game`
                      }
                      fill
                      className="object-cover"
                      priority={index === 0}
                      sizes="(min-width: 640px) 384px, calc(100vw - 32px)"
                    />
                  </div>
                </div>

                <div className="mt-4 min-h-[3.25rem] text-center">
                  <p className="text-sm font-black uppercase tracking-tight text-white sm:text-base">
                    {card.name}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                    {card.category}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div
          className="deck-carousel-dots mt-5 flex justify-center gap-2"
          aria-label="Card carousel slides"
        >
          {CARD_DATA.map((card) => (
            <span
              key={card.id}
              aria-label={`Show ${card.name}`}
              className="deck-carousel-dot h-2 w-2 rounded-full bg-white/30"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
