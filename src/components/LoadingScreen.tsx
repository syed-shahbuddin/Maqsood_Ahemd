import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = ["Veni.", "Vidi.", "Vici."];
const DURATION = 3000;

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const done = useRef(false);

  // Counter 000 → 100 over DURATION ms using requestAnimationFrame
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION, 1);
      setCount(Math.round(progress * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!done.current) {
        done.current = true;
        setTimeout(() => {
          setExiting(true);
          setTimeout(onComplete, 600);
        }, 400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col bg-bg px-6 py-6 md:px-10 md:py-8"
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          aria-busy="true"
          aria-label="Loading portfolio"
        >
          {/* Top-left label */}
          <motion.span
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-xs uppercase tracking-[0.3em] text-muted"
          >
            Portfolio
          </motion.span>

          {/* Grunge texture: speckles knocked out of the stamped words */}
          <svg className="absolute h-0 w-0" aria-hidden="true">
            <filter id="grunge">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" seed="7" result="noise" />
              <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -14 5.2" result="specks" />
              <feComposite in="SourceGraphic" in2="specks" operator="out" />
            </filter>
          </svg>

          {/* Center: VENI. VIDI. VICI. stamped in one word at a time */}
          <div className="flex flex-1 flex-col items-center justify-center">
            <h1
              className="flex flex-wrap justify-center gap-x-[0.3em] font-stamp text-6xl leading-none tracking-wide text-text-primary sm:text-8xl lg:text-[10rem]"
              style={{ filter: "url(#grunge)" }}
            >
              {WORDS.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, scale: 1.8, filter: "blur(12px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ delay: 0.25 + i * 0.55, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block uppercase"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.9, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="mt-6 h-[3px] w-40 origin-center bg-text-primary sm:w-64 lg:w-96"
            />

            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.35em" }}
              transition={{ delay: 2.2, duration: 0.6, ease: "easeOut" }}
              className="mt-5 font-stamp text-sm uppercase text-text-primary/80 sm:text-lg"
            >
              I came. I saw. I conquered.
            </motion.p>
          </div>

          {/* Bottom-right counter */}
          <div className="flex items-end justify-end">
            <span className="font-display text-5xl tabular-nums leading-none text-text-primary/60 md:text-7xl">
              {String(count).padStart(3, "0")}
            </span>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50">
            <div
              className="h-full w-full origin-left accent-gradient"
              style={{
                transform: `scaleX(${count / 100})`,
                boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
                transition: "transform 80ms linear",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
