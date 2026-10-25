import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimate, useReducedMotion } from "framer-motion";

const WORDS = ["Veni.", "Vidi.", "Vici."];
const SUBTITLE = "I came. I saw. I conquered.";
const DURATION = 3600;

// Timeline (seconds)
const WORD_START = 0.3;
const WORD_GAP = 0.6;
const LINE_AT = 2.15;
const SUB_AT = 2.4;
const QUOTE_AT = 3.0;

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const done = useRef(false);
  const reduceMotion = useReducedMotion();
  const [stage, animate] = useAnimate();

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
          setTimeout(onComplete, 700);
        }, 300);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  // Each word lands with a screen shake + white flash
  const impact = (strength: number) => {
    if (reduceMotion || !stage.current) return;
    const s = strength;
    animate(
      stage.current,
      { x: [0, -14 * s, 12 * s, -8 * s, 5 * s, -2 * s, 0], y: [0, 8 * s, -6 * s, 4 * s, -2 * s, 0], rotate: [0, -0.6 * s, 0.4 * s, 0] },
      { duration: 0.45, ease: "easeOut" }
    );
    animate(".impact-flash", { opacity: [0.18 * s, 0] }, { duration: 0.35, ease: "easeOut" });
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col overflow-hidden bg-[#0d0d0d] px-6 py-6 md:px-10 md:py-8"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          aria-busy="true"
          aria-label="Loading portfolio"
        >
          {/* Grunge texture: speckles knocked out of the stamped words */}
          <svg className="absolute h-0 w-0" aria-hidden="true">
            <filter id="grunge">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" seed="7" result="noise" />
              <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -14 5.2" result="specks" />
              <feComposite in="SourceGraphic" in2="specks" operator="out" />
            </filter>
          </svg>

          {/* Atmosphere: spotlight, vignette, moving film grain, scanlines */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.07)_0%,transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)]" />
          <div className="film-grain pointer-events-none absolute -inset-[50%] opacity-[0.09]" />
          <div className="scanlines pointer-events-none absolute inset-0 opacity-[0.06]" />
          <div className="impact-flash pointer-events-none absolute inset-0 bg-white opacity-0" />

          {/* Top bar */}
          <div className="relative flex items-center justify-between">
            <motion.span
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-xs uppercase tracking-[0.3em] text-muted"
            >
              Portfolio
            </motion.span>
            <motion.span
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="font-stamp text-sm tracking-[0.4em] text-muted"
            >
              MMXXVI
            </motion.span>
          </div>

          {/* Center stage */}
          <div ref={stage} className="relative flex flex-1 flex-col items-center justify-center">
            <h1
              className="flex flex-wrap justify-center gap-x-[0.28em] font-stamp text-[17vw] leading-[0.85] tracking-wide text-[#f2f2f2] sm:text-[15vw] lg:text-[11.5rem]"
              style={{ filter: "url(#grunge)" }}
            >
              {WORDS.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, scale: 3.2, y: -40, filter: "blur(18px)" }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: WORD_START + i * WORD_GAP, duration: 0.32, ease: [0.7, 0, 0.84, 0] }}
                  onAnimationComplete={() => impact(i === WORDS.length - 1 ? 1.6 : 1)}
                  className="relative inline-block uppercase"
                >
                  {/* RGB split layers that snap together, then keep glitching */}
                  <motion.span
                    aria-hidden
                    initial={{ x: -40, opacity: 0.9 }}
                    animate={{ x: 0, opacity: 0.75 }}
                    transition={{ delay: WORD_START + i * WORD_GAP + 0.2, duration: 0.5, ease: "easeOut" }}
                    className="glitch-red absolute inset-0 text-[#ff2b4e] mix-blend-screen"
                  >
                    {word}
                  </motion.span>
                  <motion.span
                    aria-hidden
                    initial={{ x: 40, opacity: 0.9 }}
                    animate={{ x: 0, opacity: 0.75 }}
                    transition={{ delay: WORD_START + i * WORD_GAP + 0.2, duration: 0.5, ease: "easeOut" }}
                    className="glitch-cyan absolute inset-0 text-[#00e1ff] mix-blend-screen"
                  >
                    {word}
                  </motion.span>
                  <span className="relative">{word}</span>
                </motion.span>
              ))}
            </h1>

            {/* Rule draws out from the centre with a glow */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: LINE_AT, duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              className="mt-6 h-[3px] w-[45vw] max-w-[34rem] origin-center bg-[#f2f2f2] shadow-[0_0_14px_rgba(255,255,255,0.6)] md:mt-8"
            />

            {/* Subtitle: letters flicker on one by one */}
            <p
              className="mt-5 flex flex-wrap justify-center font-stamp text-base uppercase tracking-[0.45em] text-[#f2f2f2]/85 sm:text-xl md:mt-7"
              aria-label={SUBTITLE}
            >
              {SUBTITLE.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: [0, 1, 0.2, 1], y: 0 }}
                  transition={{ delay: SUB_AT + i * 0.022, duration: 0.25 }}
                  className="inline-block"
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              ))}
            </p>

            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: QUOTE_AT, duration: 0.5, ease: "easeOut" }}
              className="mt-6 font-display text-base italic text-muted md:text-lg"
            >
              — Julius Caesar, 47 BC
            </motion.span>
          </div>

          {/* Bottom-right counter */}
          <div className="relative flex items-end justify-end">
            <span className="font-stamp text-5xl tabular-nums leading-none tracking-wider text-[#f2f2f2]/50 md:text-7xl">
              {String(count).padStart(3, "0")}
            </span>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50">
            <div
              className="h-full w-full origin-left bg-[#f2f2f2]"
              style={{
                transform: `scaleX(${count / 100})`,
                boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
                transition: "transform 80ms linear",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
