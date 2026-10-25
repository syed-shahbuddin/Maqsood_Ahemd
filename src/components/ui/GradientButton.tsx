import type { ReactNode, ComponentProps } from "react";
import { Link } from "react-router-dom";

type Variant = "solid" | "outline" | "ghost";

type BaseProps = {
  variant?: Variant;
  size?: "sm" | "md";
  className?: string;
  children: ReactNode;
};

type ButtonProps = BaseProps &
  (
    | ({ to: string; href?: never } & Omit<ComponentProps<typeof Link>, "to">)
    | ({ href: string; to?: never } & ComponentProps<"a">)
    | ({ to?: never; href?: never } & ComponentProps<"button">)
  );

/**
 * Pill button with an accent-gradient border ring that appears on hover.
 * The ring is an absolutely positioned span inset -2px behind the content.
 */
export default function GradientButton({
  variant = "solid",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const sizeClass =
    size === "sm"
      ? "text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
      : "text-sm px-7 py-3.5";

  const inner =
    variant === "solid"
      ? "bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary"
      : variant === "outline"
        ? "bg-bg text-text-primary border-2 border-stroke group-hover:border-transparent"
        : "bg-surface text-text-primary";

  const classes = `group relative inline-flex items-center justify-center rounded-full font-medium transition-transform duration-300 hover:scale-105 ${className}`;

  const content = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute rounded-full accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ inset: "-2px" }}
      />
      <span
        className={`relative z-10 inline-flex items-center gap-2 rounded-full backdrop-blur-md transition-colors duration-300 ${sizeClass} ${inner}`}
      >
        {children}
      </span>
    </>
  );

  if ("to" in rest && rest.to) {
    const { to, ...linkProps } = rest as { to: string } & ComponentProps<typeof Link>;
    return (
      <Link to={to} className={classes} {...linkProps}>
        {content}
      </Link>
    );
  }
  if ("href" in rest && rest.href) {
    const anchorProps = rest as ComponentProps<"a">;
    return (
      <a className={classes} {...anchorProps}>
        {content}
      </a>
    );
  }
  const buttonProps = rest as ComponentProps<"button">;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {content}
    </button>
  );
}

export const Arrow = ({ className = "" }: { className?: string }) => (
  <svg
    className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
