import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp } from "./ui/SectionHeader";
import { stats } from "../data/site";

function Counter({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const target = parseInt(value, 10);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-display text-7xl tabular-nums leading-none text-text-primary md:text-8xl">
      {n}
      <span className="text-4xl italic text-muted md:text-5xl">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-10 border-y border-stroke py-12 md:grid-cols-3 md:gap-6 md:py-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              className={`flex flex-col items-center text-center ${
                i < stats.length - 1 ? "md:border-r md:border-stroke" : ""
              }`}
            >
              <Counter value={s.value} suffix={s.suffix} />
              <span className="mt-4 text-xs uppercase tracking-[0.25em] text-muted">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
