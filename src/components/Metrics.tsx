import { useCountUp } from "../lib/hooks";
import { Reveal } from "./primitives";

const STATS = [
  { v: 50, suffix: "k+", label: "Workouts Logged", sub: "across 38 countries", tone: "text-neon-400", icon: "🏋️" },
  { v: 100, suffix: "%", label: "Offline-First", sub: "zero lag, zero cloud", tone: "text-cyber-400", icon: "📴" },
  { v: 4.9, suffix: "★", label: "Lifter Rating", sub: "2,140+ reviews", tone: "text-amber-neon", decimals: 1, icon: "⭐" },
  { v: 30, suffix: "+", label: "Smart Templates", sub: "PPL, Upper/Lower, 5×5", tone: "text-neon-400", icon: "🧩" },
];

const TAGS = [
  "Powerlifting",
  "PPL Hypertrophy",
  "Body Recomposition",
  "Calisthenics",
  "Strongman",
  "CrossTraining",
  "Olympic Lifting",
  "Bro Split",
  "Upper / Lower",
  "5×5 Strength",
  "Push Pull Legs",
  "German Volume",
];

function Stat({ s, i }: { s: (typeof STATS)[number]; i: number }) {
  const { ref, value } = useCountUp(s.v, 1900, s.decimals ?? 0);
  return (
    <Reveal delay={i * 90} className="h-full">
      <div className="card-surface hover-lift group h-full rounded-2xl p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <span className="text-[18px] opacity-80 transition-transform duration-500 group-hover:scale-110">
            {s.icon}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-neon-400/50" />
        </div>
        <span
          ref={ref}
          className={`mt-4 block font-display text-[2.1rem] leading-none font-extrabold tracking-tight tabular-nums ${s.tone} sm:text-[2.5rem]`}
        >
          {s.decimals ? value.toFixed(s.decimals) : Math.round(value).toLocaleString()}
          {s.suffix}
        </span>
        <p className="mt-2.5 text-[14px] font-semibold text-white">{s.label}</p>
        <p className="mt-0.5 text-[12px] text-iron-500">{s.sub}</p>
      </div>
    </Reveal>
  );
}

export default function Metrics() {
  return (
    <section className="relative border-y border-onyx-700/60 bg-[linear-gradient(180deg,rgba(15,17,21,0.4),rgba(10,12,15,0.9))] py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="mb-8 text-center text-[11px] font-semibold tracking-[0.22em] text-iron-500 uppercase">
            Trusted by lifters who track everything
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Stat key={s.label} s={s} i={i} />
          ))}
        </div>
      </div>

      {/* ticker */}
      <div className="mask-fade-x mt-12 overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-3 pr-3">
          {[...TAGS, ...TAGS].map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-onyx-700 bg-onyx-850/70 px-4 py-2 text-[13px] font-semibold text-iron-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-neon-400 to-cyber-400" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
