"use client";

import { useEffect, useState } from "react";
import {
  getUnlockStorageKey,
  getWeddingSide,
  type WeddingSideKey,
} from "@/lib/weddingData";

const keypadValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "clear", "0", "back"] as const;

interface PasscodeCardProps {
  side: WeddingSideKey;
  onSuccess?: () => void;
}

export function PasscodeCard({ side, onSuccess }: PasscodeCardProps) {
  const portal = getWeddingSide(side);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (value.length !== 4) {
      return;
    }

    if (value === portal.password) {
      window.localStorage.setItem(getUnlockStorageKey(side), "true");
      setError("");
      setIsUnlocked(true);

      const timeoutId = window.setTimeout(() => {
        onSuccess?.();
      }, 280);

      return () => window.clearTimeout(timeoutId);
    }

    setError("That passcode did not match.");

    const timeoutId = window.setTimeout(() => {
      setValue("");
    }, 140);

    return () => window.clearTimeout(timeoutId);
  }, [onSuccess, portal.password, side, value]);

  const handleKeypadPress = (key: (typeof keypadValues)[number]) => {
    if (isUnlocked) {
      return;
    }

    if (key === "clear") {
      setValue("");
      setError("");
      return;
    }

    if (key === "back") {
      setValue((current) => current.slice(0, -1));
      setError("");
      return;
    }

    setValue((current) => {
      if (current.length >= 4) {
        return current;
      }

      return `${current}${key}`;
    });
    setError("");
  };

  const isBlue = side === "singh";

  return (
    <div
      className="w-full max-w-md rounded-[34px] border p-6 shadow-2xl backdrop-blur-xl md:p-8"
      style={{
        background: isBlue
          ? "linear-gradient(180deg, rgba(9,18,41,0.94), rgba(6,12,25,0.98))"
          : "linear-gradient(180deg, rgba(43,10,17,0.94), rgba(24,6,10,0.98))",
        borderColor: isBlue
          ? "rgba(129, 188, 255, 0.24)"
          : "rgba(255, 171, 150, 0.2)",
        boxShadow: isBlue
          ? "0 32px 100px rgba(28, 88, 176, 0.26)"
          : "0 32px 100px rgba(146, 25, 61, 0.24)",
      }}
    >
      <div className="space-y-3 text-center">
        <p
          className="text-[0.72rem] uppercase tracking-[0.34em]"
          style={{ color: isBlue ? "#99d2ff" : "#ffb3bc" }}
        >
          {portal.portalLabel}
        </p>
        <h2
          className="font-[var(--font-display)] text-4xl font-semibold"
          style={{ color: isBlue ? "#f3faff" : "#fff4ef" }}
        >
          Enter the portal
        </h2>
        <p
          className="mx-auto max-w-sm text-sm leading-6"
          style={{ color: isBlue ? "#bdd7f5" : "#efc8cc" }}
        >
          This side is protected with a four-digit numeric passcode for now.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, index) => {
          const digit = value[index];

          return (
            <div
              key={`${portal.key}-digit-${index}`}
              className="flex h-16 items-center justify-center rounded-2xl border text-2xl"
              style={{
                borderColor: digit
                  ? isBlue
                    ? "rgba(108, 199, 255, 0.4)"
                    : "rgba(255, 111, 136, 0.36)"
                  : isBlue
                    ? "rgba(129, 188, 255, 0.14)"
                    : "rgba(255, 171, 150, 0.14)",
                background: digit
                  ? isBlue
                    ? "rgba(18, 43, 88, 0.8)"
                    : "rgba(78, 18, 30, 0.8)"
                  : isBlue
                    ? "rgba(7, 16, 34, 0.8)"
                    : "rgba(33, 8, 13, 0.8)",
                color: isBlue ? "#e8f6ff" : "#fff2ed",
              }}
            >
              {digit ? "•" : ""}
            </div>
          );
        })}
      </div>

      <p
        className="mt-4 min-h-6 text-center text-sm"
        style={{ color: error ? "#ffc9c1" : isUnlocked ? "#d9ffd8" : "transparent" }}
      >
        {error || (isUnlocked ? "Unlocked. Taking you through..." : ".")}
      </p>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {keypadValues.map((key) => (
          <button
            key={`${portal.key}-${key}`}
            type="button"
            onClick={() => handleKeypadPress(key)}
            className="rounded-2xl border px-4 py-4 text-sm font-medium uppercase tracking-[0.18em] transition-transform duration-200 hover:-translate-y-0.5"
            style={{
              borderColor: isBlue
                ? "rgba(129, 188, 255, 0.18)"
                : "rgba(255, 171, 150, 0.18)",
              background:
                key === "clear" || key === "back"
                  ? isBlue
                    ? "rgba(10, 22, 46, 0.86)"
                    : "rgba(40, 10, 16, 0.86)"
                  : isBlue
                    ? "rgba(17, 35, 72, 0.9)"
                    : "rgba(63, 16, 26, 0.9)",
              color:
                key === "clear" || key === "back"
                  ? isBlue
                    ? "#bdd7f5"
                    : "#f4cfd3"
                  : isBlue
                    ? "#f0faff"
                    : "#fff3ef",
            }}
          >
            {key === "clear" ? "Clear" : key === "back" ? "Delete" : key}
          </button>
        ))}
      </div>
    </div>
  );
}
