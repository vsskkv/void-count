import Image from "next/image";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export const HeroSection = () => {
  return (
    <section className="relative flex min-h-[750px] flex-col items-center justify-center overflow-hidden bg-transparent px-4 pb-12 pt-12 sm:px-6 sm:pt-16 md:min-h-[90vh] md:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(79,70,229,0.16),transparent_64%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)]" />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center">
        <Image
          src="/optimized/back-v2.jpg"
          alt="Void Count Card Back - New Strategic Card Game | Card Game 2026"
          width={640}
          height={896}
          priority
          className="mx-auto block h-auto w-[180px] rounded-3xl object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,1)] sm:w-[220px] md:w-[280px] lg:w-[320px]"
          sizes="(min-width: 1024px) 320px, (min-width: 768px) 280px, (min-width: 640px) 220px, 180px"
        />

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <PrimaryButton
            href="/contact"
            className="min-w-[220px] px-8 py-4 text-sm font-black uppercase tracking-[0.12em] sm:text-base"
          >
            Launching Soon
          </PrimaryButton>
          <PrimaryButton
            variant="secondary"
            href="/how-to-play"
            className="min-w-[180px] px-8 py-4 text-sm font-black uppercase tracking-[0.12em] sm:text-base"
          >
            How to Play
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};
