"use client";

import { forwardRef } from "react";
import styles from "./GameCard.module.css";

interface GameCardProps {
  className?: string;
  variant?: "hero" | "standard";
}

export const GameCard = forwardRef<HTMLDivElement, GameCardProps>(
  ({ className = "", variant = "standard" }, ref) => {
    const isHero = variant === "hero";

    const containerClasses =
      variant === "hero"
        ? "relative h-[60vh] md:h-[75vh] w-auto aspect-[2/3] max-w-[85vw] max-h-[900px]"
        : "relative w-full h-full"; // Standard variant fills parent

    return (
      <div className={`perspective-[1000px] ${className}`}>
        <div
          ref={ref}
          className={`${containerClasses} ${styles.card} shadow-[0_30px_80px_rgba(0,0,0,0.7)]`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* FRONT (Void Count cover) */}
          <div className={`${styles.face} ${styles.front}`}>
            <div className={styles.vortexWrap}>
              <div className={styles.vortexC} />
              <div className={styles.vortexA} />
              <div className={styles.vortexB} />
            </div>

            <div className={styles.vignette} />
            <div className={styles.sheen} />

            <div className={styles.titleWrap}>
              <div
                className={styles.title}
                style={{ fontSize: isHero ? "min(11vh, 12vw)" : "3.75rem" }}
              >
                <span className={styles.word}>
                  <span
                    className={styles.emptySet}
                    style={{ fontSize: isHero ? "min(3vh, 3.2vw)" : "1.05rem" }}
                  >
                    ∅
                  </span>
                  VOID
                </span>
                <span className={styles.word}>COUNT</span>
              </div>
            </div>
          </div>

          {/* BACK (Void card back) */}
          <div className={`${styles.face} ${styles.back}`}>
            <div className={styles.backBg} />
            <div className={styles.backParticles} />
            <div className={styles.backRing} />

            <div
              className={styles.backLabelTop}
              style={{ fontSize: isHero ? "min(4.2vh, 5vw)" : "2.25rem" }}
            >
              VOID
            </div>
            <div
              className={styles.backLabelBottom}
              style={{ fontSize: isHero ? "min(4.2vh, 5vw)" : "2.25rem" }}
            >
              VOID
            </div>

            <div className={`${styles.pip} ${styles.pipTL}`}>
              <span style={{ fontSize: isHero ? "min(3.4vh, 4vw)" : "1.75rem" }}>
                0
              </span>
            </div>
            <div className={`${styles.pip} ${styles.pipBR}`}>
              <span style={{ fontSize: isHero ? "min(3.4vh, 4vw)" : "1.75rem" }}>
                0
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

GameCard.displayName = "GameCard";


