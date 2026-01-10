"use client";

import { forwardRef, useMemo, useState } from "react";
import styles from "./GameCard.module.css";

interface GameCardProps {
  className?: string;
  variant?: "hero" | "standard";
  frontSrc?: string;
  backSrc?: string;
  frontAlt?: string;
  manualRef?: React.Ref<HTMLDivElement>;
}

export const GameCard = forwardRef<HTMLDivElement, GameCardProps>(
  (
    {
      className = "",
      variant = "standard",
      frontSrc = "/Void v1.png",
      backSrc = "/Back V1.png",
      frontAlt = "Void Count strategic card game front",
      manualRef,
    },
    ref
  ) => {
    const isHero = variant === "hero";
    const [frontError, setFrontError] = useState(false);
    const [backError, setBackError] = useState(false);

    // Front image logic
    const showFrontImage = frontSrc && !frontError;
    // Back image logic - defaults to Back V1.png
    const showBackImage = backSrc && !backError;

    const containerClasses =
      variant === "hero"
        ? "relative h-[60vh] md:h-[75vh] w-auto aspect-[2.5/3.5] max-w-[85vw] max-h-[900px]"
        : "relative w-full h-full"; 

    return (
      <div className={`perspective-[1000px] ${className}`}>
        <div
          ref={ref}
          className={`${containerClasses} ${styles.card}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Inner wrapper for 3D rotation */}
          <div ref={manualRef} className={styles.inner}>
            {/* FRONT FACE */}
            <div className={`${styles.face} ${styles.front}`}>
              {showFrontImage ? (
                <>
                  <img
                    className={styles.image}
                    src={frontSrc}
                    alt={frontAlt}
                    draggable={false}
                    loading="eager"
                    decoding="async"
                    onError={() => setFrontError(true)}
                  />
                  <div className={styles.neonBorder} />
                </>
              ) : (
                <>
                  {/* CSS Fallback Art */}
                  <div className={styles.vortexWrap}>
                    <div className={styles.vortexC} />
                    <div className={styles.vortexA} />
                    <div className={styles.vortexB} />
                  </div>
                  <div className={styles.vignette} />
                  <div className={styles.sheen} />
                  <div className={styles.titleWrap}>
                    <div className={styles.title} style={{ fontSize: isHero ? "min(11vh, 12vw)" : "3.75rem" }}>
                      <span className={styles.word}>
                        <span className={styles.emptySet} style={{ fontSize: isHero ? "min(3vh, 3.2vw)" : "1.05rem" }}>∅</span>
                        VOID
                      </span>
                      <span className={styles.word}>COUNT</span>
                    </div>
                  </div>
                  <div className={styles.neonBorder} />
                </>
              )}
            </div>

            {/* BACK FACE */}
            <div className={`${styles.face} ${styles.back}`}>
              {showBackImage ? (
                <>
                  <img
                    className={styles.image}
                    src={backSrc}
                    alt="Void Count card back"
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                    onError={() => setBackError(true)}
                  />
                  <div className={styles.neonBorder} />
                </>
              ) : (
                <>
                  {/* CSS Fallback Back Art */}
                  <div className={styles.backBg} />
                  <div className={styles.backParticles} />
                  <div className={styles.backRing} />
                  <div className={styles.backLabelTop} style={{ fontSize: isHero ? "min(4.2vh, 5vw)" : "2.25rem" }}>VOID</div>
                  <div className={styles.backLabelBottom} style={{ fontSize: isHero ? "min(4.2vh, 5vw)" : "2.25rem" }}>VOID</div>
                  <div className={`${styles.pip} ${styles.pipTL}`}><span>0</span></div>
                  <div className={`${styles.pip} ${styles.pipBR}`}><span>0</span></div>
                  <div className={styles.neonBorder} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

GameCard.displayName = "GameCard";
