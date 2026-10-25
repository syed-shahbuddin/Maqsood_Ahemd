import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import HlsVideo from "./ui/HlsVideo";
import GradientButton from "./ui/GradientButton";
import { scrollToId } from "./Navbar";
import { site } from "../data/site";

export default function Hero({ start }: { start: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle role word every 2s
  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % site.roles.length), 2000);
    return () => clearInterval(id);
  }, []);

  // GSAP entrance — runs once the loading screen has finished
  useEffect(() => {
    if (!start || !ref.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 },
      ).fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1 },
        0.3,
      );
    }, ref);
    return () => ctx.revert();
  }, [start]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background video */}
      <div className="absolute inset-0">
        <HlsVideo src={site.heroVideo} />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center px-6 pt-32 pb-28 text-center"
        style={{ visibility: start ? "visible" : "hidden" }}
      >
        <h1 className="name-reveal mb-6 font-display text-6xl italic leading-[0.9] tracking-tight text-text-primary md:text-8xl lg:text-9xl">
          {site.name}
        </h1>

        <p className="blur-in mb-5 text-base text-text-primary/90 md:text-xl">
          {/^[aeiou]/i.test(site.roles[roleIndex]) ? "An" : "A"}{" "}
          <span
            key={roleIndex}
            className="inline-block animate-role-fade-in font-display italic text-text-primary"
          >
            {site.roles[roleIndex]}
          </span>{" "}
          based in {site.location}.
        </p>

        <p className="blur-in mb-12 max-w-md text-sm text-muted md:text-base">
          {site.description}
        </p>

        <div className="blur-in inline-flex flex-wrap justify-center gap-4">
          <GradientButton variant="solid" onClick={() => scrollToId("work")}>
            See Works
          </GradientButton>
          <GradientButton variant="outline" href={`mailto:${site.email}`}>
            Reach out...
          </GradientButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-stroke">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-down bg-text-primary" />
        </span>
      </div>
    </section>
  );
}
