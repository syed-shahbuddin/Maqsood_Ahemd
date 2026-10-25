import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import GradientButton, { Arrow } from "./ui/GradientButton";
import { explorations, site, type Exploration } from "../data/site";

gsap.registerPlugin(ScrollTrigger);

const ROTATIONS = [-4, 3, -2, 5, -3, 2];

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<Exploration | null>(null);

  const left = explorations.filter((_, i) => i % 2 === 0);
  const right = explorations.filter((_, i) => i % 2 === 1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the centre content while the columns scroll past
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      // Parallax: each column moves at its own speed
      gsap.fromTo(
        leftRef.current,
        { yPercent: 10 },
        {
          yPercent: -35,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
        },
      );
      gsap.fromTo(
        rightRef.current,
        { yPercent: 30 },
        {
          yPercent: -15,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const Card = ({ item, index }: { item: Exploration; index: number }) => (
    <motion.button
      type="button"
      onClick={() => setLightbox(item)}
      whileHover={{ scale: 1.04, rotate: 0 }}
      style={{ rotate: ROTATIONS[index % ROTATIONS.length] }}
      className="group relative aspect-square w-full max-w-[320px] overflow-hidden rounded-3xl border border-stroke bg-surface shadow-2xl shadow-black/40"
      aria-label={item.title}
    >
      <img src={item.image} alt="" loading="lazy" onError={(e) => (e.currentTarget.style.visibility = "hidden")} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="absolute bottom-4 left-4 translate-y-2 text-left text-sm text-text-primary opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="font-display text-lg italic">{item.title}</span>
      </span>
    </motion.button>
  );

  return (
    <section ref={sectionRef} id="explorations" className="relative min-h-[300vh] bg-bg">
      {/* Layer 1 — pinned centre */}
      <div
        ref={contentRef}
        className="relative z-10 flex h-screen flex-col items-center justify-center px-6 text-center"
      >
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">Explorations</span>
          <span className="h-px w-8 bg-stroke" />
        </div>
        <h2 className="text-4xl leading-[1.05] tracking-tight text-text-primary md:text-6xl lg:text-7xl">
          Finance <span className="font-display italic">playground</span>
        </h2>
        <p className="mt-5 max-w-md text-sm text-muted md:text-base">
          The tools and topics I keep coming back to — Excel models, annual reports, markets, research and the marketing side of growth.
        </p>
        <GradientButton
          variant="outline"
          href={site.linkedin}
          target="_blank"
          rel="noreferrer"
          className="mt-8"
        >
          Connect on LinkedIn <Arrow />
        </GradientButton>
      </div>

      {/* Layer 2 — parallax columns */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="mx-auto grid h-full max-w-[1400px] grid-cols-2 gap-12 px-6 md:gap-40 md:px-12">
          <div ref={leftRef} className="pointer-events-auto flex flex-col items-start gap-24 pt-[20vh] md:gap-40">
            {left.map((item, i) => (
              <div key={item.title} className={`w-full max-w-[320px] ${i % 2 ? "md:translate-x-16" : ""}`}>
                <Card item={item} index={i * 2} />
              </div>
            ))}
          </div>
          <div ref={rightRef} className="pointer-events-auto flex flex-col items-end gap-24 pt-[60vh] md:gap-40">
            {right.map((item, i) => (
              <div key={item.title} className={`w-full max-w-[320px] ${i % 2 ? "md:-translate-x-16" : ""}`}>
                <Card item={item} index={i * 2 + 1} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/90 p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.figure
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.image}
                alt={lightbox.title}
                className="max-h-[70vh] w-full rounded-3xl border border-stroke object-cover"
              />
              <figcaption className="mt-5 text-center">
                <span className="font-display text-2xl italic text-text-primary">{lightbox.title}</span>
                <p className="mt-2 text-sm text-muted">{lightbox.caption}</p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
