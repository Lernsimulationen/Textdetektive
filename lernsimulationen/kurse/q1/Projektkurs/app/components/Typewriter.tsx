"use client";

import { useEffect, useMemo, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: "normal" | "fast" | "instant";
  onComplete?: () => void;
}

export function Typewriter({
  text,
  speed = "normal",
  onComplete,
}: TypewriterProps) {
  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
  const instant = speed === "instant" || prefersReducedMotion;
  const [visible, setVisible] = useState(instant ? text.length : 0);

  useEffect(() => {
    setVisible(instant ? text.length : 0);
  }, [text, instant]);

  useEffect(() => {
    if (instant || visible >= text.length) {
      if (visible >= text.length) onComplete?.();
      return;
    }
    const delay = speed === "fast" ? 8 : 24;
    const timer = window.setTimeout(
      () => setVisible((value) => Math.min(value + 1, text.length)),
      delay,
    );
    return () => window.clearTimeout(timer);
  }, [instant, onComplete, speed, text.length, visible]);

  const done = visible >= text.length;

  return (
    <div className="typewriter">
      <p aria-live="polite">
        {text.slice(0, visible)}
        {!done && <span className="typewriter-cursor" aria-hidden="true" />}
      </p>
      {!done && (
        <button
          className="text-action"
          type="button"
          onClick={() => setVisible(text.length)}
        >
          Text sofort anzeigen
        </button>
      )}
    </div>
  );
}

