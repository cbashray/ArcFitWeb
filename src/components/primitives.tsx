import type { ReactNode } from "react";
import { cn } from "../utils/cn";
import { useReveal } from "../lib/hooks";

/* ------------------------------------------------------------------ *
 * Scroll reveal wrapper
 * ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  className,
  as: As = "div",
  threshold = 0.15,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "header";
  threshold?: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>(threshold);
  const Tag = As as "div";
  return (
    <Tag
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ *
 * Eyebrow pill
 * ------------------------------------------------------------------ */
export function Eyebrow({
  children,
  tone = "neon",
  className,
}: {
  children: ReactNode;
  tone?: "neon" | "cyber" | "amber" | "muted";
  className?: string;
}) {
  const tones = {
    neon: "border-neon-400/25 bg-neon-400/10 text-neon-400",
    cyber: "border-cyber-400/25 bg-cyber-500/10 text-cyber-400",
    amber: "border-amber-neon/25 bg-amber-neon/10 text-amber-neon",
    muted: "border-onyx-700 bg-onyx-800/70 text-iron-300",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase backdrop-blur-md",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Section heading block
 * ------------------------------------------------------------------ */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  tone = "neon",
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  align?: "center" | "left";
  tone?: "neon" | "cyber" | "amber";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={70}>
        <h2
          className={cn(
            "font-display text-[2rem] leading-[1.08] font-extrabold tracking-[-0.028em] text-balance text-white sm:text-[2.6rem] lg:text-[3.1rem]",
            align === "center" && "mx-auto max-w-4xl",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={140}>
          <p
            className={cn(
              "text-[15px] leading-relaxed text-pretty text-iron-400 sm:text-base",
              align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl",
            )}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Buttons
 * ------------------------------------------------------------------ */
export function PrimaryButton({
  children,
  href = "#download",
  className,
  size = "md",
  onClick,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}) {
  const sizes = {
    sm: "px-4 py-2 text-[13px]",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-[15px]",
  } as const;
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold text-onyx-950 transition-all duration-300",
        "bg-[linear-gradient(100deg,#00e676_0%,#00c765_45%,#00a859_100%)]",
        "shadow-[0_10px_30px_-10px_rgba(0,230,118,0.65)] hover:shadow-[0_16px_40px_-12px_rgba(0,230,118,0.85)] hover:brightness-110",
        "focus-visible:ring-2 focus-visible:ring-neon-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-onyx-900 focus-visible:outline-none",
        "active:scale-[0.975]",
        sizes[size],
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.55),transparent)] transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </a>
  );
}

export function GhostButton({
  children,
  href = "#ai-coach",
  className,
  size = "md",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "px-4 py-2 text-[13px]",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-[15px]",
  } as const;
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full border border-onyx-600 bg-onyx-800/60 font-semibold text-iron-50 backdrop-blur-md",
        "transition-all duration-300 hover:-translate-y-0.5 hover:border-neon-400/45 hover:bg-onyx-750/80 hover:text-white",
        "focus-visible:ring-2 focus-visible:ring-neon-400/50 focus-visible:outline-none active:scale-[0.975]",
        sizes[size],
        className,
      )}
    >
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ *
 * Store badges
 * ------------------------------------------------------------------ */
export function StoreBadge({ store }: { store: "apple" | "google" }) {
  return (
    <a
      href="#download"
      className="group inline-flex items-center gap-3 rounded-xl border border-onyx-700 bg-onyx-850/80 px-4 py-2.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-onyx-500 hover:bg-onyx-800"
    >
      {store === "apple" ? (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white/90" aria-hidden>
          <path d="M16.37 12.78c.03 3.2 2.8 4.27 2.84 4.29-.02.08-.44 1.52-1.46 3-.88 1.28-1.79 2.55-3.23 2.58-1.41.03-1.87-.84-3.49-.84-1.61 0-2.12.81-3.46.86-1.38.06-2.44-1.38-3.33-2.65-1.82-2.63-3.2-7.44-1.34-10.68.93-1.62 2.58-2.64 4.38-2.66 1.36-.03 2.64.91 3.47.91.83 0 2.39-1.13 4.03-.96.69.03 2.62.28 3.86 2.1-.1.06-2.3 1.35-2.27 4.05M13.9 4.4c.74-.89 1.23-2.12 1.1-3.35-1.06.04-2.34.7-3.1 1.59-.68.78-1.27 2.04-1.11 3.24 1.18.09 2.38-.6 3.11-1.48" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
          <path d="M3.6 1.9a1.3 1.3 0 0 0-.5 1.06v18.08c0 .43.19.81.5 1.05l10.1-10.1z" fill="#00e676" />
          <path d="m17.4 8.35-3.7-2.13-2.72 2.72 2.72 2.72z" fill="#ff9500" />
          <path d="m13.7 11.66-2.72 2.72 6.42 3.7 2.06-1.19c.86-.5.86-1.75 0-2.25z" fill="#0066ff" />
          <path d="M3.1 22.09c.3.24.74.28 1.2.02l13-7.5-2.72-2.72z" fill="#3d8bff" />
        </svg>
      )}
      <span className="text-left leading-tight">
        <span className="block text-[9px] font-medium tracking-[0.16em] text-iron-500 uppercase">
          {store === "apple" ? "Download on the" : "Get it on"}
        </span>
        <span className="block font-display text-[15px] font-bold text-white">
          {store === "apple" ? "App Store" : "Google Play"}
        </span>
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ *
 * Logo
 * ------------------------------------------------------------------ */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative grid h-9 w-9 place-items-center rounded-[11px] border border-neon-400/30 bg-[linear-gradient(145deg,#1a1d24,#0f1115)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <span className="absolute inset-0 rounded-[11px] bg-neon-400/15 blur-md" aria-hidden />
        <svg viewBox="0 0 24 24" className="relative h-5 w-5" fill="none" aria-hidden>
          <path
            d="M4 9v6M7 7.5v9M17 7.5v9M20 9v6M7 12h10"
            stroke="url(#lg)"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="lg" x1="4" y1="7" x2="20" y2="17" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00e676" />
              <stop offset="1" stopColor="#3d8bff" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute -top-0.5 -right-0.5 h-2 w-2 animate-blip rounded-full bg-neon-400" aria-hidden />
      </span>
      <span className="font-display text-[19px] font-extrabold tracking-[-0.03em] text-white">
        Onyx<span className="text-neon-400">Fit</span>
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Small helpers
 * ------------------------------------------------------------------ */
export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} fill="none" aria-hidden>
      <path d="m5 12.5 4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} fill="none" aria-hidden>
      <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} fill="none" aria-hidden>
      <path d="M5 12h13m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SectionGlow({
  className,
  color = "rgba(0,230,118,0.13)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full blur-[120px]", className)}
      style={{ background: color }}
    />
  );
}
