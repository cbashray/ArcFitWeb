import { useState } from "react";
import { cn } from "../utils/cn";
import { useActiveSection, useScrollY } from "../lib/hooks";
import { Logo, PrimaryButton } from "./primitives";

const LINKS = [
  { id: "features", label: "Features" },
  { id: "ai-coach", label: "AI Coach" },
  { id: "nutrition", label: "Nutrition" },
  { id: "leaderboard", label: "Leaderboard" },
  { id: "progress", label: "Progress" },
  { id: "faq", label: "FAQ" },
];

export default function Navbar() {
  const y = useScrollY();
  const [open, setOpen] = useState(false);
  const active = useActiveSection(LINKS.map((l) => l.id));
  const scrolled = y > 24;

  const progress =
    typeof document !== "undefined"
      ? Math.min(
          100,
          (y / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) * 100,
        )
      : 0;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-500",
          scrolled
            ? "border-b border-onyx-700/70 bg-[rgba(12,14,18,0.72)] backdrop-blur-2xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <a href="#top" className="shrink-0" aria-label="OnyxFit home">
            <Logo />
          </a>

          <div className="hidden items-center gap-1 rounded-full border border-onyx-700/80 bg-onyx-850/50 p-1 backdrop-blur-xl lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-300",
                  active === l.id
                    ? "bg-onyx-750 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]"
                    : "text-iron-400 hover:text-white",
                )}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="#ai-coach"
              className="hidden rounded-full border border-onyx-600 px-4 py-2 text-[13px] font-semibold text-iron-300 transition-all duration-300 hover:border-neon-400/40 hover:text-white sm:inline-flex"
            >
              Try Web Demo
            </a>
            <PrimaryButton href="#download" size="sm" className="hidden sm:inline-flex">
              Get App Free
            </PrimaryButton>

            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-onyx-700 bg-onyx-850/70 text-iron-300 lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                {open ? (
                  <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* scroll progress */}
        <div className="h-px w-full bg-transparent">
          <div
            className="h-px bg-[linear-gradient(90deg,#00e676,#0066ff)] transition-[width] duration-150"
            style={{ width: `${progress}%`, opacity: scrolled ? 1 : 0 }}
          />
        </div>
      </div>

      {/* mobile sheet */}
      <div
        className={cn(
          "overflow-hidden border-b border-onyx-700/70 bg-[rgba(12,14,18,0.96)] backdrop-blur-2xl transition-[max-height,opacity] duration-400 lg:hidden",
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="mx-auto grid max-w-7xl gap-1 px-5 py-4 sm:px-8">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-iron-300 transition-colors hover:bg-onyx-800 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2">
            <a
              href="#ai-coach"
              onClick={() => setOpen(false)}
              className="rounded-full border border-onyx-600 py-2.5 text-center text-[13px] font-semibold text-iron-200"
            >
              Web Demo
            </a>
            <PrimaryButton href="#download" size="sm" onClick={() => setOpen(false)}>
              Get App Free
            </PrimaryButton>
          </div>
        </div>
      </div>
    </header>
  );
}
