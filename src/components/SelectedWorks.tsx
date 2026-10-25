import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeader, { fadeUp } from "./ui/SectionHeader";
import GradientButton, { Arrow } from "./ui/GradientButton";
import { projects, type Project } from "../data/site";

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <motion.article
      {...fadeUp}
      transition={{ ...fadeUp.transition, delay: index * 0.08 }}
      className={`group relative cursor-pointer overflow-hidden rounded-3xl border border-stroke bg-surface ${project.span} ${project.aspect}`}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
      aria-label={`${project.title} ${project.italic}`}
    >
      <img
        src={project.image}
        alt=""
        loading="lazy"
        onError={(e) => (e.currentTarget.style.visibility = "hidden")}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {/* Halftone overlay */}
      <div className="halftone pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/10 to-transparent" />

      {/* Static meta */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6 transition-opacity duration-500 group-hover:opacity-0">
        <span className="rounded-full border border-white/10 bg-bg/50 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-text-primary/80 backdrop-blur-md">
          {project.tag}
        </span>
        <span className="rounded-full bg-bg/50 px-3 py-1 text-[11px] text-muted backdrop-blur-md">
          {project.status}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 transition-opacity duration-500 group-hover:opacity-0 md:p-8">
        <h3 className="text-2xl leading-tight text-text-primary md:text-3xl">
          {project.title} <span className="font-display italic">{project.italic}</span>
        </h3>
        <p className="mt-2 max-w-sm text-sm text-muted">{project.summary}</p>
      </div>

      {/* Hover state */}
      <div className="absolute inset-0 flex items-center justify-center bg-bg/70 opacity-0 backdrop-blur-lg transition-opacity duration-500 group-hover:opacity-100">
        <span className="relative inline-flex rounded-full p-[2px]">
          <span className="absolute inset-0 rounded-full accent-gradient-animated" />
          <span className="relative z-10 rounded-full bg-white px-6 py-3 text-sm text-bg">
            View — <span className="font-display italic">{project.title} {project.italic}</span>
          </span>
        </span>
      </div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-bg/80 p-4 backdrop-blur-md sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-2xl overflow-hidden rounded-3xl border border-stroke bg-surface"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/8]">
          <img src={project.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-bg/60 text-text-primary backdrop-blur-md transition-colors hover:bg-bg"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="p-6 md:p-8">
          <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted">
            <span>{project.tag}</span>
            <span className="h-1 w-1 rounded-full bg-stroke" />
            <span>{project.status}</span>
          </div>
          <h3 className="text-3xl text-text-primary md:text-4xl">
            {project.title} <span className="font-display italic">{project.italic}</span>
          </h3>
          <p className="mt-3 text-muted">{project.summary}</p>
          <ul className="mt-6 space-y-3 border-t border-stroke pt-6">
            {project.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-sm text-text-primary/85">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full accent-gradient" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SelectedWorks() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="work" className="scroll-mt-24 bg-bg py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Selected Work"
          title="Featured"
          italic="projects"
          subtext="A selection of the finance projects and study tracks I'm working on — from raw annual reports to finished analysis."
          action={
            <GradientButton variant="ghost" size="sm" to="/resume" className="hidden md:inline-flex">
              View full resume <Arrow />
            </GradientButton>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} onOpen={() => setOpen(p)} />
          ))}
        </div>
      </div>

      <AnimatePresence>{open && <ProjectModal project={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
