import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  italic: string;
  subtext: string;
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

export default function SectionHeader({
  eyebrow,
  title,
  italic,
  subtext,
  action,
  align = "left",
  className = "",
}: Props) {
  const centered = align === "center";
  return (
    <motion.div
      {...fadeUp}
      className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${
        centered ? "items-center text-center md:flex-col md:items-center" : ""
      } ${className}`}
    >
      <div className={centered ? "flex flex-col items-center" : ""}>
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">{eyebrow}</span>
          {centered && <span className="h-px w-8 bg-stroke" />}
        </div>
        <h2 className="text-4xl leading-[1.05] tracking-tight text-text-primary md:text-5xl lg:text-6xl">
          {title} <span className="font-display italic">{italic}</span>
        </h2>
        <p className="mt-4 max-w-md text-sm text-muted md:text-base">{subtext}</p>
      </div>
      {action}
    </motion.div>
  );
}
