import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import GradientButton, { Arrow } from "../components/ui/GradientButton";
import { fadeUp } from "../components/ui/SectionHeader";
import { certifications, education, languages, projects, site, skills } from "../data/site";

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <motion.section {...fadeUp} className="grid gap-6 border-t border-stroke py-10 md:grid-cols-12 md:py-14">
      <h2 className="text-xs uppercase tracking-[0.3em] text-muted md:col-span-3">{label}</h2>
      <div className="md:col-span-9">{children}</div>
    </motion.section>
  );
}

export default function Resume() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-[1000px] px-6 pb-24 pt-36 md:px-10 md:pt-44">
        {/* Header */}
        <motion.header {...fadeUp} className="mb-10 md:mb-16">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted">Resume</p>
          <h1 className="text-5xl leading-[0.95] tracking-tight text-text-primary md:text-7xl">
            {site.firstName} <span className="font-display italic">Ahmed</span>
          </h1>
          <p className="mt-5 text-base text-muted md:text-lg">{site.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <span>{site.location}, Karnataka, India</span>
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-text-primary">
              {site.email}
            </a>
            <a href={site.phoneHref} className="transition-colors hover:text-text-primary">
              {site.phone}
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <GradientButton variant="solid" size="sm" href={`mailto:${site.email}`}>
              Get in touch <Arrow />
            </GradientButton>
            <GradientButton variant="outline" size="sm" href="/Maqsood-Ahmed-Resume.pdf" download>
              Download PDF
            </GradientButton>
          </div>
        </motion.header>

        <Block label="Profile">
          <p className="max-w-2xl text-base leading-relaxed text-text-primary/85 md:text-lg">
            BBA Strategic Finance student at CMS Jain University, pursuing the US CMA qualification, with a strong
            interest in finance, business strategy and marketing. Focused on how businesses use financial and market
            insights to drive growth and decision-making. Comfortable with digital platforms, data analysis and online
            research, and a proactive learner with strong communication skills. Seeking an internship to apply academic
            knowledge, learn from industry professionals and build a foundation for a career in finance.
          </p>
        </Block>

        <Block label="Projects">
          <ul className="space-y-8">
            {projects.slice(0, 2).map((p) => (
              <li key={p.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl text-text-primary md:text-2xl">
                    {p.title} <span className="font-display italic">{p.italic}</span>
                  </h3>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted">{p.status}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{p.tag} — {p.summary}</p>
                <ul className="mt-3 space-y-2">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm text-text-primary/80">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full accent-gradient" />
                      {b}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Block>

        <Block label="Experience">
          <p className="max-w-2xl text-base leading-relaxed text-text-primary/85">
            Fresher, seeking a first internship in finance or business. Eager to take on new challenges, apply academic
            knowledge from my BBA and CMA studies, and gain practical industry experience.
          </p>
        </Block>

        <Block label="Education">
          <ul className="space-y-6">
            {education.map((e) => (
              <li key={e.degree} className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-lg text-text-primary md:text-xl">{e.degree}</h3>
                  <p className="text-sm text-muted">{e.school}</p>
                </div>
                <span className="text-sm tabular-nums text-muted">
                  {e.period}
                  {e.note && <span className="ml-2 font-display italic text-text-primary/70">({e.note})</span>}
                </span>
              </li>
            ))}
          </ul>
        </Block>

        <Block label="Skills">
          <ul className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <li
                key={s}
                className="rounded-full border border-stroke bg-surface px-4 py-2 text-sm text-text-primary/85 transition-colors hover:border-[#4E85BF]/60"
              >
                {s}
              </li>
            ))}
          </ul>
        </Block>

        <Block label="Certifications">
          <ul className="space-y-2">
            {certifications.map((c) => (
              <li key={c.name} className="flex items-baseline justify-between text-text-primary/85">
                <span className="text-lg">{c.name}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted">{c.status}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block label="Languages">
          <p className="text-text-primary/85">{languages.join(" · ")}</p>
        </Block>
      </div>
    </PageTransition>
  );
}
