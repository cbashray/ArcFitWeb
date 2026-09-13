import { cn } from "../utils/cn";
import gymBg from "../assets/gym-ambient.jpg";
import { useCountUp } from "../lib/hooks";
import { ArrowIcon, Eyebrow, GhostButton, PrimaryButton, Reveal, StoreBadge } from "./primitives";
import { LoggerScreen, PhoneFrame } from "./PhoneScreens";

function MiniStat({
  value,
  suffix,
  label,
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
}) {
  const { ref, value: v } = useCountUp(value, 1900, decimals);
  return (
    <div className="flex flex-col">
      <span ref={ref} className="font-display text-[22px] leading-none font-extrabold text-white tabular-nums">
        {decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString()}
        <span className="text-neon-400">{suffix}</span>
      </span>
      <span className="mt-1.5 text-[11px] font-medium text-iron-500">{label}</span>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[104px] pb-16 sm:pt-[130px] lg:pb-28">
      {/* backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.30] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.55)_40%,transparent_88%)]"
          style={{ backgroundImage: `url(${gymBg})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,17,21,0.55),rgba(15,17,21,0.85)_55%,rgba(15,17,21,1))]" />
        <div className="absolute inset-0 mesh-radial" />
        <div className="grid-lines absolute inset-0 opacity-70 [mask-image:radial-gradient(70%_60%_at_50%_25%,#000,transparent)]" />
        <div className="absolute top-[-14rem] left-1/2 h-[36rem] w-[72rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,230,118,0.16),transparent)] blur-3xl" />
        <div className="absolute top-[16rem] -right-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,102,255,0.16),transparent)] blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,149,0,0.08),transparent)] blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* ---------- copy ---------- */}
        <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
          <Reveal>
            <Eyebrow tone="neon" className="shadow-[0_0_30px_-8px_rgba(0,230,118,0.6)]">
              <span className="text-[13px]">⚡</span> AI-Driven Hypertrophy &amp; Consistency
            </Eyebrow>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-[2.6rem] leading-[1.03] font-extrabold tracking-[-0.035em] text-balance text-white sm:text-[3.4rem] lg:text-[4.05rem]">
              Stop Guessing Your Gains.
              <br className="hidden sm:block" />{" "}
              <span className="relative inline-block">
                <span className="text-gradient-neon">Train Smarter</span>
                <svg
                  viewBox="0 0 300 12"
                  className="absolute -bottom-1 left-0 h-2.5 w-full text-neon-400/50"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path d="M2 8c60-6 130-7 296-3" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>{" "}
              With Your AI Iron Coach.
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-pretty text-iron-400 sm:text-[17px]">
              Log sets in seconds, get instant post-workout AI analysis, swap crowded machines with 1-tap
              biomechanical substitutions, and smash your daily macros—
              <span className="font-semibold text-iron-50">100% offline &amp; private.</span>
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <PrimaryButton href="#download" size="lg">
                Download App <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
              </PrimaryButton>
              <GhostButton href="#ai-coach" size="lg">
                <span className="grid h-5 w-5 place-items-center rounded-full border border-neon-400/50 text-neon-400">
                  <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-current">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                Explore Live Demo
              </GhostButton>
            </div>
          </Reveal>

          <Reveal delay={290}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
              <StoreBadge store="apple" />
              <StoreBadge store="google" />
            </div>
          </Reveal>

          <Reveal delay={350}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-9 gap-y-5 border-t border-onyx-700/70 pt-7 lg:justify-start">
              <MiniStat value={50} suffix="k+" label="Workouts logged" />
              <MiniStat value={4.9} decimals={1} suffix="★" label="Lifter rating" />
              <MiniStat value={0} suffix="ms" label="Offline sync lag" />
              <MiniStat value={30} suffix="+" label="Smart templates" />
            </div>
          </Reveal>
        </div>

        {/* ---------- visual ---------- */}
        <Reveal delay={180} className="relative flex justify-center lg:justify-end">
          <div className="relative">
            {/* orbit rings */}
            <div
              aria-hidden
              className="absolute top-1/2 left-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-onyx-700/70"
            />
            <div
              aria-hidden
              className="absolute top-1/2 left-1/2 -z-10 h-[660px] w-[660px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-onyx-700/40"
            />

            <div className="tilt-3d">
              <PhoneFrame>
                <LoggerScreen />
              </PhoneFrame>
            </div>

            {/* floating: AI score */}
            <FloatCard
              className="animate-float-slow -top-4 -left-8 sm:-left-24"
              accent="neon"
              delay="0s"
            >
              <div className="flex items-center gap-3">
                <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-neon-400/12 text-lg">
                  🧠
                </span>
                <div>
                  <p className="text-[11px] font-bold text-white">
                    Post-Workout AI Score: <span className="text-neon-400">9.4/10</span>
                  </p>
                  <p className="text-[10px] text-iron-400">Volume Overload Detected 🔥</p>
                </div>
              </div>
              <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-onyx-750">
                <div className="h-full w-[94%] rounded-full bg-[linear-gradient(90deg,#00a859,#00e676)]" />
              </div>
            </FloatCard>

            {/* floating: streak */}
            <FloatCard
              className="animate-float-slower right-0 bottom-24 sm:-right-16"
              accent="amber"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg">🔥</span>
                <div>
                  <p className="text-[11px] font-bold text-white">18-Day Workout Streak</p>
                  <p className="text-[10px] text-amber-neon">Top 5% Rank · Season 4</p>
                </div>
              </div>
            </FloatCard>

            {/* floating: swap chip */}
            <FloatCard className="animate-float-slow -bottom-2 -left-4 sm:-left-14" accent="cyber">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-cyber-500/12 text-sm">🔄</span>
                <div>
                  <p className="text-[10.5px] font-bold text-white">Machine taken?</p>
                  <p className="text-[9.5px] text-cyber-400">3 swaps · 96% activation match</p>
                </div>
              </div>
            </FloatCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FloatCard({
  children,
  className,
  accent = "neon",
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: "neon" | "cyber" | "amber";
  delay?: string;
}) {
  const ring = {
    neon: "border-neon-400/25 shadow-[0_20px_50px_-25px_rgba(0,230,118,0.7)]",
    cyber: "border-cyber-400/25 shadow-[0_20px_50px_-25px_rgba(0,102,255,0.7)]",
    amber: "border-amber-neon/25 shadow-[0_20px_50px_-25px_rgba(255,149,0,0.6)]",
  } as const;
  return (
    <div
      style={{ animationDelay: delay }}
      className={cn(
        "absolute z-20 hidden w-[232px] rounded-2xl border bg-[rgba(20,23,29,0.78)] p-3.5 backdrop-blur-xl sm:block",
        ring[accent],
        className,
      )}
    >
      {children}
    </div>
  );
}
