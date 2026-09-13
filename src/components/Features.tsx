import { useState, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { useReveal } from "../lib/hooks";
import { Reveal, SectionHeading } from "./primitives";

/* ------------------------------------------------------------------ */
function Card({
  children,
  className,
  delay = 0,
  accent = "neon",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  accent?: "neon" | "cyber" | "amber";
}) {
  const glow = {
    neon: "from-neon-400/12",
    cyber: "from-cyber-500/12",
    amber: "from-amber-neon/12",
  } as const;
  return (
    <Reveal delay={delay} className={cn("h-full", className)}>
      <article className="card-surface hover-lift group relative h-full overflow-hidden rounded-3xl p-6 sm:p-7">
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-gradient-to-b to-transparent opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100",
            glow[accent],
          )}
        />
        <div className="relative z-10 flex h-full flex-col">{children}</div>
      </article>
    </Reveal>
  );
}

function Head({
  icon,
  title,
  desc,
  tone = "neon",
}: {
  icon: string;
  title: string;
  desc: string;
  tone?: "neon" | "cyber" | "amber";
}) {
  const ring = {
    neon: "border-neon-400/25 bg-neon-400/10",
    cyber: "border-cyber-400/25 bg-cyber-500/10",
    amber: "border-amber-neon/25 bg-amber-neon/10",
  } as const;
  return (
    <>
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "grid h-11 w-11 shrink-0 place-items-center rounded-2xl border text-[19px] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110",
            ring[tone],
          )}
        >
          {icon}
        </span>
        <h3 className="font-display text-[17px] leading-tight font-bold tracking-tight text-white sm:text-[18.5px]">
          {title}
        </h3>
      </div>
      <p className="mt-3.5 text-[13.5px] leading-relaxed text-iron-400">{desc}</p>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Widget 1 — logging
 * ------------------------------------------------------------------ */
function LogWidget() {
  return (
    <div className="mt-6 rounded-2xl border border-onyx-700 bg-onyx-900/70 p-4">
      <div className="flex items-center justify-between text-[10px] font-bold tracking-wider text-iron-500 uppercase">
        <span>Incline DB Press</span>
        <span className="text-neon-400">e1RM 108 kg</span>
      </div>
      <div className="mt-3 space-y-1.5">
        {[
          { w: 32, r: 12, done: true },
          { w: 36, r: 10, done: true },
          { w: 40, r: 8, done: false },
        ].map((s, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-2.5 rounded-xl border px-3 py-2 transition-all duration-500",
              s.done ? "border-neon-400/20 bg-neon-400/6" : "border-onyx-600 bg-onyx-850",
            )}
          >
            <span className="font-mono text-[11px] text-iron-500">{i + 1}</span>
            <span className="font-mono text-[13px] font-bold text-white tabular-nums">{s.w}kg</span>
            <span className="text-[11px] text-iron-600">×</span>
            <span className="font-mono text-[13px] font-bold text-white tabular-nums">{s.r}</span>
            <span
              className={cn(
                "ml-auto grid h-5 w-5 place-items-center rounded-md text-[10px]",
                s.done ? "bg-neon-400 text-onyx-950" : "border border-onyx-600 text-iron-500",
              )}
            >
              {s.done ? "✓" : "+"}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        {[
          ["Rest", "0:90"],
          ["Tonnage", "7.4 t"],
          ["Sets", "24"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-onyx-850 py-2">
            <p className="text-[9px] tracking-wider text-iron-500 uppercase">{k}</p>
            <p className="font-mono text-[12px] font-bold text-white">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Widget 2 — AI score dial
 * ------------------------------------------------------------------ */
function ScoreWidget() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.35);
  const R = 46;
  const C = 2 * Math.PI * R;
  const pct = 0.94;
  return (
    <div ref={ref} className="mt-6 flex flex-1 items-center gap-5 rounded-2xl border border-onyx-700 bg-onyx-900/70 p-4">
      <div className="relative h-[116px] w-[116px] shrink-0">
        <svg viewBox="0 0 116 116" className="h-full w-full -rotate-90">
          <circle cx="58" cy="58" r={R} className="fill-none stroke-onyx-750" strokeWidth="9" />
          <circle
            cx="58"
            cy="58"
            r={R}
            fill="none"
            stroke="url(#scoreG)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={visible ? C * (1 - pct) : C}
            style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1)" }}
          />
          <defs>
            <linearGradient id="scoreG" x1="0" y1="0" x2="116" y2="116">
              <stop stopColor="#00e676" />
              <stop offset="0.6" stopColor="#00a859" />
              <stop offset="1" stopColor="#0066ff" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 grid place-content-center text-center">
          <p className="font-display text-[26px] leading-none font-extrabold text-white">9.4</p>
          <p className="mt-0.5 text-[9px] font-bold tracking-[0.14em] text-iron-500">/ 10 SCORE</p>
        </div>
      </div>
      <div className="min-w-0 flex-1 space-y-2.5">
        {[
          ["Progressive overload", 96, "#00e676"],
          ["Muscle balance", 82, "#0066ff"],
          ["Recovery window", 71, "#ff9500"],
        ].map(([k, v, c], i) => (
          <div key={k as string}>
            <div className="flex justify-between text-[10.5px]">
              <span className="text-iron-400">{k}</span>
              <span className="font-mono font-bold text-white">{v}%</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-onyx-750">
              <div
                className="h-full rounded-full transition-[width] duration-1000 ease-out"
                style={{
                  width: visible ? `${v}%` : "0%",
                  background: c as string,
                  transitionDelay: `${i * 160}ms`,
                  boxShadow: `0 0 10px ${c}80`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Widget 3 — substitution
 * ------------------------------------------------------------------ */
const SWAPS = [
  { k: "Dumbbell", n: "Incline DB Press", m: 96, i: "🏋️" },
  { k: "Cable", n: "Low-to-High Fly", m: 91, i: "🔗" },
  { k: "Machine", n: "Hammer Press", m: 89, i: "⚙️" },
  { k: "Bodyweight", n: "Deficit Push-Up", m: 78, i: "🤸" },
];

function SwapWidget() {
  const [sel, setSel] = useState(0);
  return (
    <div className="mt-6 flex flex-1 flex-col rounded-2xl border border-onyx-700 bg-onyx-900/70 p-4">
      <p className="text-[10px] font-bold tracking-[0.16em] text-iron-500 uppercase">Bench press taken →</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {SWAPS.map((s, i) => (
          <button
            key={s.k}
            type="button"
            onClick={() => setSel(i)}
            className={cn(
              "rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-all duration-300",
              sel === i
                ? "border-cyber-400/50 bg-cyber-500/15 text-cyber-400"
                : "border-onyx-600 bg-onyx-850 text-iron-400 hover:text-white",
            )}
          >
            {s.k}
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-onyx-700 bg-onyx-850 p-3">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-onyx-900 text-[15px]">{SWAPS[sel].i}</span>
          <div className="min-w-0">
            <p className="truncate text-[12.5px] font-bold text-white">{SWAPS[sel].n}</p>
            <p className="text-[10px] text-iron-500">Matched EMG activation</p>
          </div>
          <span className="ml-auto font-mono text-[14px] font-extrabold text-cyber-400">{SWAPS[sel].m}%</span>
        </div>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-onyx-750">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#0066ff,#3d8bff)] transition-[width] duration-700"
            style={{ width: `${SWAPS[sel].m}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Widget 4 — hydration + macros
 * ------------------------------------------------------------------ */
function FuelWidget() {
  const [ml, setMl] = useState(1750);
  const goal = 3500;
  const p = Math.min(1, ml / goal);
  return (
    <div className="mt-6 flex flex-1 flex-col rounded-2xl border border-onyx-700 bg-onyx-900/70 p-4">
      <div className="flex items-center gap-4">
        {/* bottle */}
        <div className="relative h-[92px] w-[46px] shrink-0 overflow-hidden rounded-xl border border-onyx-600 bg-onyx-850">
          <div
            className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,#3d8bff,#0066ff)] transition-[height] duration-700 ease-out"
            style={{ height: `${p * 100}%` }}
          >
            <div className="absolute inset-x-0 top-0 h-1.5 animate-pulse-glow bg-white/40" />
          </div>
          <span className="absolute inset-x-0 bottom-1.5 text-center font-mono text-[10px] font-bold text-white drop-shadow">
            {(ml / 1000).toFixed(2)}L
          </span>
        </div>
        <div className="flex-1 space-y-2">
          {[
            ["Protein", 168, 210, "#00e676"],
            ["Carbs", 244, 320, "#0066ff"],
            ["Fats", 61, 80, "#ff9500"],
          ].map(([k, v, g, c]) => (
            <div key={k as string}>
              <div className="flex justify-between text-[10px]">
                <span className="text-iron-400">{k}</span>
                <span className="font-mono text-iron-500">
                  {v as number}/{g as number}g
                </span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-onyx-750">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${((v as number) / (g as number)) * 100}%`, background: c as string }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3.5 flex gap-1.5">
        {[250, 500].map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => setMl((w) => Math.min(goal, w + q))}
            className="flex-1 rounded-lg border border-cyber-400/30 bg-cyber-500/10 py-2 text-[11px] font-bold text-cyber-400 transition-all hover:bg-cyber-500/20 active:scale-95"
          >
            +{q}ml
          </button>
        ))}
        <button
          type="button"
          onClick={() => setMl(0)}
          className="rounded-lg border border-onyx-600 px-3 py-2 text-[11px] font-bold text-iron-400 transition-all hover:text-white active:scale-95"
        >
          ↺
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Widget 5 — podium
 * ------------------------------------------------------------------ */
function PodiumWidget() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.35);
  const bars = [
    { m: "🥈", n: "Mira", h: 52, c: "#a7b0bf" },
    { m: "🥇", n: "You", h: 76, c: "#ff9500" },
    { m: "🥉", n: "Dev", h: 40, c: "#b06a3b" },
  ];
  return (
    <div ref={ref} className="mt-6 flex flex-1 flex-col rounded-2xl border border-onyx-700 bg-onyx-900/70 p-4">
      <div className="flex items-end justify-center gap-3">
        {bars.map((b, i) => (
          <div key={b.n} className="flex w-[58px] flex-col items-center">
            <span className="text-[16px]">{b.m}</span>
            <span className="text-[10.5px] font-bold text-white">{b.n}</span>
            <div
              className="mt-1.5 w-full rounded-t-lg border-t-2 transition-[height] duration-1000 ease-out"
              style={{
                height: visible ? b.h : 0,
                borderColor: b.c,
                background: `linear-gradient(180deg, ${b.c}30, ${b.c}08)`,
                transitionDelay: `${i * 140}ms`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-1.5">
        {[
          ["🔥 Consistency Crusher", "18 / 21"],
          ["🏋️ Tonnage Titan", "84.2 t"],
        ].map(([a, b]) => (
          <div key={a} className="flex items-center justify-between rounded-lg bg-onyx-850 px-2.5 py-1.5">
            <span className="text-[11px] font-semibold text-iron-300">{a}</span>
            <span className="font-mono text-[10px] font-bold text-amber-neon">{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Widget 6 — chart + PDF
 * ------------------------------------------------------------------ */
export function TrendChart({ className }: { className?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.3);
  const pts = [22, 34, 29, 46, 41, 58, 52, 68, 74, 66, 84, 92];
  const w = 320;
  const h = 110;
  const step = w / (pts.length - 1);
  const line = pts.map((p, i) => `${i * step},${h - (p / 100) * h}`).join(" ");
  return (
    <div ref={ref} className={cn("relative", className)}>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-[110px] w-full overflow-visible" preserveAspectRatio="none">
        {[0, 0.25, 0.5, 0.75, 1].map((g) => (
          <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} stroke="#262b35" strokeWidth="1" strokeDasharray="3 5" />
        ))}
        <polyline
          points={`0,${h} ${line} ${w},${h}`}
          fill="url(#areaG)"
          opacity={visible ? 1 : 0}
          style={{ transition: "opacity 1s ease 0.4s" }}
        />
        <polyline
          points={line}
          fill="none"
          stroke="url(#lineG)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="900"
          strokeDashoffset={visible ? 0 : 900}
          style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.22,1,0.36,1)" }}
        />
        {pts.map((p, i) => (
          <circle
            key={i}
            cx={i * step}
            cy={h - (p / 100) * h}
            r={i === pts.length - 1 ? 4 : 2.2}
            fill={i === pts.length - 1 ? "#00e676" : "#0f1115"}
            stroke="#00e676"
            strokeWidth="1.6"
            opacity={visible ? 1 : 0}
            style={{ transition: `opacity 0.4s ease ${0.6 + i * 0.06}s` }}
          />
        ))}
        <defs>
          <linearGradient id="areaG" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#00e676" stopOpacity="0.3" />
            <stop offset="1" stopColor="#00e676" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineG" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#0066ff" />
            <stop offset="1" stopColor="#00e676" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function ReportWidget() {
  return (
    <div className="mt-6 grid flex-1 gap-4 sm:grid-cols-[1.35fr_1fr]">
      <div className="rounded-2xl border border-onyx-700 bg-onyx-900/70 p-4">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold tracking-[0.16em] text-iron-500 uppercase">Weekly volume (tonnes)</p>
          <span className="rounded-md bg-neon-400/10 px-2 py-0.5 font-mono text-[10px] font-bold text-neon-400">
            +34.6%
          </span>
        </div>
        <TrendChart className="mt-4" />
        <div className="mt-3 flex justify-between font-mono text-[9px] text-iron-600">
          {["W1", "W3", "W5", "W7", "W9", "W11"].map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-onyx-700 bg-onyx-900/70 p-4">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-neon/10 text-[13px]">📄</span>
          <div>
            <p className="text-[12px] font-bold text-white">Q3_Progress.pdf</p>
            <p className="text-[9.5px] text-iron-500">Auto-generated · 6 pages</p>
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          {["Body composition delta", "Lift-by-lift 1RM table", "Adherence & streak log", "Coach notes + next block"].map(
            (r) => (
              <div key={r} className="flex items-center gap-2 rounded-lg bg-onyx-850 px-2.5 py-1.5">
                <span className="text-neon-400">✓</span>
                <span className="text-[10.5px] text-iron-300">{r}</span>
              </div>
            ),
          )}
        </div>
        <div className="mt-3 rounded-lg bg-[linear-gradient(100deg,#00e676,#00a859)] py-2 text-center text-[11px] font-bold text-onyx-950">
          Export &amp; Share
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
export default function Features() {
  return (
    <section id="features" className="relative scroll-mt-24 py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,230,118,0.09),transparent)] blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,102,255,0.09),transparent)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The Toolkit"
          title={
            <>
              Every rep, macro and milestone —{" "}
              <span className="text-gradient-neon">engineered into one app.</span>
            </>
          }
          sub="Six deeply-integrated systems that replace your notes app, spreadsheet, macro tracker and coach — all running locally on your device."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-6">
          <Card className="lg:col-span-3" delay={0} accent="neon">
            <Head
              icon="🏋️"
              title="1-Tap Workout Logging & PR Tracker"
              desc="Live set/rep counters, an estimated 1RM calculator, auto-starting rest timers and running volume tonnage — logged faster than you can rack the bar."
            />
            <LogWidget />
          </Card>

          <Card className="lg:col-span-3" delay={90} accent="cyber">
            <Head
              icon="🧠"
              title="Post-Workout AI Review & Scoring"
              desc="The moment you finish, Onyx grades the session out of 10 — auditing progressive overload, muscle-group balance and your recovery window, then writes the fix."
              tone="cyber"
            />
            <ScoreWidget />
          </Card>

          <Card className="lg:col-span-2" delay={0} accent="cyber">
            <Head
              icon="🔄"
              title="Biomechanical Swap AI"
              desc="Machine taken? Instantly swap to dumbbell, cable, machine or bodyweight variants matched on target-muscle activation."
              tone="cyber"
            />
            <SwapWidget />
          </Card>

          <Card className="lg:col-span-2" delay={90} accent="amber">
            <Head
              icon="💧"
              title="Hydration & Macro Engine"
              desc="Quick-log water, track calories, protein, carbs and fats — then let AI suggest meals that fill exactly what's left."
              tone="amber"
            />
            <FuelWidget />
          </Card>

          <Card className="lg:col-span-2" delay={180} accent="amber">
            <Head
              icon="🏆"
              title="Leaderboards & Weekly Quests"
              desc="Climb the XP podium, unlock badges and chase quests like Consistency Crusher and Tonnage Titan."
              tone="amber"
            />
            <PodiumWidget />
          </Card>

          <Card className="lg:col-span-6" delay={0} accent="neon">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-xl">
                <Head
                  icon="📊"
                  title="PDF Export & Interactive Visual Trends"
                  desc="Rich fl_chart volume trends, body-composition metrics and a one-click, executive-ready PDF summary you can hand to a coach, client or your future self."
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {["Volume", "1RM curve", "Body comp", "Adherence"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-onyx-700 bg-onyx-850 px-3 py-1.5 text-[11.5px] font-semibold text-iron-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <ReportWidget />
          </Card>
        </div>
      </div>
    </section>
  );
}
