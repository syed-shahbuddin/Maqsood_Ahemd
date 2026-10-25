import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { site } from "../data/site";

const LINKS = [
  { label: "Home", to: "/", hash: "home" },
  { label: "Work", to: "/", hash: "work" },
  { label: "Resume", to: "/resume", hash: "" },
];

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is in view on the home page
  useEffect(() => {
    if (!onHome) {
      setActive("resume");
      return;
    }
    const sections = ["home", "work"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome]);

  const handleNav = (e: React.MouseEvent, link: (typeof LINKS)[number]) => {
    if (!link.hash) return; // normal route link
    e.preventDefault();
    if (onHome) {
      scrollToId(link.hash);
    } else {
      navigate(`/#${link.hash}`);
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <nav
        className={`inline-flex items-center rounded-full border border-white/10 bg-surface px-2 py-2 backdrop-blur-md transition-shadow duration-500 ${
          scrolled ? "shadow-md shadow-black/10" : ""
        }`}
        aria-label="Primary"
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={(e) => {
            if (onHome) {
              e.preventDefault();
              scrollToId("home");
            }
          }}
          className="group relative h-9 w-9 shrink-0 transition-transform duration-300 hover:scale-110"
          aria-label="Maqsood Ahmed — home"
        >
          <span className="absolute inset-0 rounded-full accent-gradient transition-opacity duration-300 group-hover:opacity-0" />
          <span className="absolute inset-0 rounded-full accent-gradient-reverse opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="absolute inset-[2px] flex items-center justify-center rounded-full bg-bg font-display text-[13px] italic text-text-primary">
            {site.initials}
          </span>
        </Link>

        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        {/* Nav links */}
        <ul className="flex items-center">
          {LINKS.map((link) => {
            const key = link.hash || "resume";
            const isActive = active === key;
            return (
              <li key={link.label}>
                <Link
                  to={link.hash ? `/#${link.hash}` : link.to}
                  onClick={(e) => handleNav(e, link)}
                  className={`block rounded-full px-3 py-1.5 text-xs transition-colors duration-300 sm:px-4 sm:py-2 sm:text-sm ${
                    isActive
                      ? "bg-stroke/50 text-text-primary"
                      : "text-muted hover:bg-stroke/50 hover:text-text-primary"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        {/* Say hi */}
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noreferrer"
          aria-label="Say hi on WhatsApp"
          className="group relative ml-1 inline-flex rounded-full"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute rounded-full accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ inset: "-2px" }}
          />
          <span className="relative z-10 inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 text-xs text-text-primary backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm">
            Say hi <span aria-hidden>↗</span>
          </span>
        </a>
      </nav>
    </header>
  );
}
