import { motion } from "framer-motion";
import SectionHeader, { fadeUp } from "./ui/SectionHeader";
import GradientButton, { Arrow } from "./ui/GradientButton";
import { journal, site } from "../data/site";

export default function Journal() {
  return (
    <section id="journal" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Journal"
          title="Recent"
          italic="thoughts"
          subtext="Short write-ups from my coursework, CMA prep and personal projects — what I'm learning, in plain language."
          action={
            <GradientButton
              variant="ghost"
              size="sm"
              href={`mailto:${site.email}?subject=Journal`}
              className="hidden md:inline-flex"
            >
              Ask for a draft <Arrow />
            </GradientButton>
          }
        />

        <div className="mt-12 flex flex-col gap-4">
          {journal.map((entry, i) => (
            <motion.a
              key={entry.title}
              href={`mailto:${site.email}?subject=${encodeURIComponent(entry.title)}`}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="group flex items-center gap-6 rounded-[40px] border border-stroke bg-surface/30 p-4 transition-colors duration-500 hover:bg-surface sm:rounded-full"
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-3xl sm:h-20 sm:w-20 sm:rounded-full">
                <img
                  src={entry.image}
                  alt=""
                  loading="lazy"
                  onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base leading-snug text-text-primary sm:text-xl">{entry.title}</h3>
                <p className="mt-1 hidden truncate text-sm text-muted sm:block">{entry.excerpt}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted sm:hidden">
                  <span>{entry.readTime}</span>
                  <span className="h-1 w-1 rounded-full bg-stroke" />
                  <span>{entry.date}</span>
                </div>
              </div>
              <div className="hidden items-center gap-6 pr-4 text-sm text-muted sm:flex">
                <span>{entry.readTime}</span>
                <span className="w-20 text-right">{entry.date}</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke text-text-primary transition-all duration-300 group-hover:border-transparent group-hover:bg-text-primary group-hover:text-bg">
                  <Arrow />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
