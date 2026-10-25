import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import HlsVideo from "./ui/HlsVideo";
import GradientButton, { Arrow } from "./ui/GradientButton";
import { fadeUp } from "./ui/SectionHeader";
import { site } from "../data/site";

const SOCIALS = [
  { label: "LinkedIn", href: site.linkedin, external: true },
  { label: "Email", href: `mailto:${site.email}`, external: false },
  { label: "Phone", href: site.phoneHref, external: false },
  { label: "WhatsApp", href: site.whatsapp, external: true },
  { label: "Resume", href: "/resume", external: false },
];

export default function Contact() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const tween = gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, []);

  const marqueeText = Array.from({ length: 10 }, () => `${site.marquee} • `).join("");

  return (
    <footer id="contact" className="relative overflow-hidden bg-bg pb-8 pt-16 md:pb-12 md:pt-20">
      {/* Background video — flipped vertically */}
      <div className="absolute inset-0">
        <HlsVideo src={site.heroVideo} className="scale-y-[-1]" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-bg to-transparent" />
      </div>

      {/* Marquee */}
      <div className="relative z-10 overflow-hidden border-y border-white/5 py-4">
        <div ref={marqueeRef} className="flex w-max whitespace-nowrap">
          {[0, 1].map((k) => (
            <span
              key={k}
              className="font-display text-4xl italic tracking-tight text-text-primary/80 md:text-6xl"
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        {...fadeUp}
        className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center px-6 py-24 text-center md:py-32"
      >
        <span className="mb-6 text-xs uppercase tracking-[0.3em] text-muted">Let's talk</span>
        <h2 className="max-w-3xl text-4xl leading-[1.05] tracking-tight text-text-primary md:text-6xl lg:text-7xl">
          Looking for an intern who <span className="font-display italic">reads the numbers</span> and the market?
        </h2>
        <p className="mt-6 max-w-lg text-sm text-muted md:text-base">
          I'm seeking a first internship in finance or business in {site.location} — eager to learn from industry professionals and contribute from day one.
        </p>
        <GradientButton variant="solid" href={`mailto:${site.email}`} className="mt-10">
          {site.email} <Arrow />
        </GradientButton>
        <a href={site.phoneHref} className="mt-4 text-sm text-muted transition-colors hover:text-text-primary">
          {site.phone}
        </a>
      </motion.div>

      {/* Footer bar */}
      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 border-t border-white/10 px-6 pt-8 md:flex-row md:px-10 lg:px-16">
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.external ? "_blank" : undefined}
                rel={s.external ? "noreferrer" : undefined}
                className="text-sm text-muted transition-colors duration-300 hover:text-text-primary"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 text-sm text-muted">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          Available for internships
        </div>

        <p className="text-xs text-muted/70">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
