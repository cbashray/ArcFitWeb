import { useState } from "react";
import { cn } from "../utils/cn";
import { useCountUp, useReveal } from "../lib/hooks";
import { ArrowIcon, CheckIcon, Eyebrow, GhostButton, Reveal, SectionHeading } from "./primitives";
import { TrendChart } from "./Features";

/* ================================================================== *
 * NUTRITION
 * ================================================================== */
const PRESETS = [
  { k: "Cut", kcal: 2640, p: 210, c: 244, f: 61 },
  { k: "Maintain", kcal: 3010, p: 195, c: 320, f: 78 },
  { k: "Bulk", kcal: 3480, p: 215, c: 412, f: 92 },
];

function MacroDonut({ preset }: { preset: (typeof PRESETS)[number] }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.3);
  const total = preset.p * 4 + preset.c * 4 + preset.f * 9;
  const parts = [
    { k: "Protein", v: (preset.p * 4) / total, c: "#00e676" },
    { k: "Carbs", v: (preset.c * 4) / total, c: "#0066ff" },
    { k: "Fats", v: (preset.f * 9) / total, c: "#ff9500" },
  ];
  const R = 62;
  const C = 2 * Math.PI * R;
  let offset = 0;

  return (
    <div ref={ref} className="relative mx-auto h-[168px] w-[168px]">
      <svg viewBox="0 0 168 168" className="h-full w-full -rotate-90">
        <circle cx="84" cy="84" r={R} className="fill-none stroke-onyx-750" strokeWidth="15" />
        {parts.map((p) => {
          const dash = C * p.v * 0.96;
          const el = (
            <circle
              key={p.k}
              cx="84"
              cy="84"
              r={R}
              fill="none"
              stroke={p.c}
              strokeWidth="15"
              strokeLinecap="round"
              strokeDasharray={`${visible ? dash : 0} ${C}`}
              strokeDashoffset={-C * offset}
              style={{ transition: "stroke-dasharray 1.2s cubic-bezier(0.22,1,0.36,1)" }}
            />
          );
          offset += p.v * 0.96 + 0.013;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <p className="font-display text-[30px] leading-none font-extrabold text-white tabular-nums">
          {preset.kcal.toLocaleString()}
        </p>
        <p className="mt-1 text-[10px] font-bold tracking-[0.18em] text-iron-500">KCAL TARGET</p>
      </div>
    </div>
  );
}

export function NutritionSection() {
  const [pi, setPi] = useState(0);
  const [ml, setMl] = useState(1750);
  const preset = PRESETS[pi];
  const goal = 3500;

  return (
    <section id="nutrition" className="relative scroll-mt-24 py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-10 right-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,149,0,0.1),transparent)] blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            tone="amber"
            eyebrow="Fuel Engine"
            title={
              <>
                Muscle is built in the kitchen.{" "}
                <span className="text-gradient-neon">Onyx does the math.</span>
              </>
            }
            sub="Pick a phase, and OnyxFit calculates calories, protein, carbs, fats and hydration targets from your bodyweight, training volume and recovery load — then keeps score all day."
          />

          <Reveal delay={180}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                ["🥩", "Protein-first targets", "Auto-scaled to lean mass + weekly tonnage"],
                ["💧", "Hydration quick-log", "+250ml / +500ml taps with smart reminders"],
                ["🤖", "AI gap filler", "Meals that fit exactly what's left today"],
                ["📉", "Deficit intelligence", "Warns before you undereat protein on a cut"],
              ].map(([i, t, d], k) => (
                <li
                  key={t}
                  className="card-surface hover-lift rounded-2xl p-4"
                  style={{ transitionDelay: `${k * 40}ms` }}
                >
                  <span className="text-[17px]">{i}</span>
                  <p className="mt-2 text-[13.5px] font-bold text-white">{t}</p>
                  <p className="mt-1 text-[12px] leading-snug text-iron-500">{d}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* dashboard panel */}
        <Reveal delay={120}>
          <div className="card-surface relative overflow-hidden rounded-[28px] p-6 sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-amber-neon/10 blur-3xl"
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold tracking-[0.2em] text-iron-500 uppercase">Daily target</p>
                <div className="flex gap-1 rounded-full border border-onyx-700 bg-onyx-900/70 p-1">
                  {PRESETS.map((p, i) => (
                    <button
                      key={p.k}
                      type="button"
                      onClick={() => setPi(i)}
                      className={cn(
                        "rounded-full px-3 py-1 text-[11.5px] font-bold transition-all duration-300",
                        pi === i ? "bg-amber-neon/15 text-amber-neon" : "text-iron-500 hover:text-white",
                      )}
                    >
                      {p.k}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid items-center gap-6 sm:grid-cols-[auto_1fr]">
                <MacroDonut key={preset.k} preset={preset} />
                <div className="space-y-3">
                  {[
                    ["Protein", preset.p, "#00e676"],
                    ["Carbs", preset.c, "#0066ff"],
                    ["Fats", preset.f, "#ff9500"],
                  ].map(([k, v, c]) => (
                    <div key={k as string} className="rounded-xl border border-onyx-700 bg-onyx-900/60 px-3.5 py-2.5">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-[12.5px] font-semibold text-iron-300">
                          <span className="h-2 w-2 rounded-full" style={{ background: c as string }} />
                          {k}
                        </span>
                        <span className="font-mono text-[13px] font-bold text-white">{v as number}g</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* hydration */}
              <div className="mt-6 rounded-2xl border border-onyx-700 bg-onyx-900/60 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[12.5px] font-bold text-white">💧 Hydration</span>
                  <span className="font-mono text-[12px] font-bold text-cyber-400">
                    {(ml / 1000).toFixed(2)}L / 3.5L
                  </span>
                </div>
                <div className="relative mt-2.5 h-3 overflow-hidden rounded-full bg-onyx-750">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#0066ff,#3d8bff,#00e676)] shadow-[0_0_16px_rgba(0,102,255,0.5)] transition-[width] duration-700 ease-out"
                    style={{ width: `${Math.min(100, (ml / goal) * 100)}%` }}
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[250, 500, 750].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setMl((w) => Math.min(goal, w + q))}
                      className="flex-1 rounded-xl border border-cyber-400/30 bg-cyber-500/10 py-2 text-[12px] font-bold text-cyber-400 transition-all hover:bg-cyber-500/20 active:scale-95"
                    >
                      +{q}ml
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setMl(0)}
                    className="rounded-xl border border-onyx-600 px-3.5 py-2 text-[12px] font-bold text-iron-400 transition-all hover:text-white active:scale-95"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-neon-400/20 bg-neon-400/6 p-4">
                <span className="text-[16px]">🤖</span>
                <p className="text-[12.5px] leading-relaxed text-iron-300">
                  <span className="font-bold text-neon-400">AI suggestion:</span> 42g protein and 76g carbs remain.
                  Grilled chicken + jasmine rice (512 kcal) closes the gap without breaking your deficit.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== *
 * LEADERBOARD
 * ================================================================== */
const BOARD = [
  { r: 1, n: "Mira K.", xp: 16820, t: "142.8t", s: 46, you: false },
  { r: 2, n: "You", xp: 16340, t: "138.2t", s: 18, you: true },
  { r: 3, n: "Dev R.", xp: 15110, t: "131.6t", s: 31, you: false },
  { r: 4, n: "Sofia L.", xp: 14290, t: "120.4t", s: 27, you: false },
  { r: 5, n: "Kenji T.", xp: 13740, t: "118.9t", s: 22, you: false },
];

export function LeaderboardSection() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.25);
  const xp = useCountUp(16340, 2000);

  return (
    <section
      id="leaderboard"
      className="relative scroll-mt-24 overflow-hidden border-y border-onyx-700/60 bg-[linear-gradient(180deg,rgba(10,12,15,0.85),rgba(15,17,21,0.5))] py-20 sm:py-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/3 h-[26rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,149,0,0.1),transparent)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          tone="amber"
          eyebrow="Gamified Consistency"
          title={
            <>
              Consistency is a sport. <span className="text-gradient-neon">Here's the scoreboard.</span>
            </>
          }
          sub="Every logged set awards XP. Every week resets the quests. Every season crowns a podium. Discipline, but with a dopamine loop attached."
        />

        <div ref={ref} className="mt-14 grid gap-4 lg:grid-cols-[1.15fr_1fr]">
          {/* board */}
          <Reveal>
            <div className="card-surface h-full overflow-hidden rounded-3xl p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold tracking-[0.2em] text-iron-500 uppercase">Season 4 · Global</p>
                <span className="rounded-full border border-amber-neon/25 bg-amber-neon/10 px-3 py-1 text-[11px] font-bold text-amber-neon">
                  You rank Top 5%
                </span>
              </div>

              <div className="mt-5 space-y-2">
                {BOARD.map((b, i) => (
                  <div
                    key={b.n}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-700",
                      b.you
                        ? "border-neon-400/35 bg-neon-400/8 shadow-[0_0_36px_-20px_rgba(0,230,118,0.8)]"
                        : "border-onyx-700 bg-onyx-900/50",
                    )}
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "none" : "translateX(-16px)",
                      transitionDelay: `${i * 90}ms`,
                    }}
                  >
                    <span
                      className={cn(
                        "grid h-8 w-8 shrink-0 place-items-center rounded-xl font-display text-[13px] font-extrabold",
                        b.r === 1
                          ? "bg-amber-neon/15 text-amber-neon"
                          : b.r === 2
                            ? "bg-iron-300/10 text-iron-300"
                            : b.r === 3
                              ? "bg-[#b06a3b]/15 text-[#c98150]"
                              : "bg-onyx-800 text-iron-500",
                      )}
                    >
                      {b.r}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={cn("truncate text-[14px] font-bold", b.you ? "text-neon-400" : "text-white")}>
                        {b.n}
                      </p>
                      <p className="font-mono text-[11px] text-iron-500">
                        {b.t} lifted · 🔥 {b.s}-day streak
                      </p>
                    </div>
                    <span className="font-mono text-[14px] font-extrabold text-white tabular-nums">
                      {b.xp.toLocaleString()}
                      <span className="ml-1 text-[10px] text-iron-500">XP</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* right column */}
          <div className="grid gap-4">
            <Reveal delay={100}>
              <div className="card-surface rounded-3xl p-6 sm:p-7">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.2em] text-iron-500 uppercase">Your XP</p>
                    <p className="mt-1 font-display text-[2.3rem] leading-none font-extrabold text-white">
                      <span ref={xp.ref} className="tabular-nums">
                        {Math.round(xp.value).toLocaleString()}
                      </span>
                    </p>
                  </div>
                  <span className="rounded-xl border border-neon-400/25 bg-neon-400/10 px-3 py-1.5 text-[12px] font-bold text-neon-400">
                    Lv 27 · Iron Vanguard
                  </span>
                </div>
                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-onyx-750">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#0066ff,#00e676)] shadow-[0_0_18px_rgba(0,230,118,0.6)] transition-[width] duration-[1600ms] ease-out"
                    style={{ width: visible ? "74%" : "0%" }}
                  />
                </div>
                <p className="mt-2 text-[11.5px] text-iron-500">1,660 XP to Level 28 — Titanium Tier</p>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { i: "🔥", t: "Consistency Crusher", d: "Train 21 days this month", p: 86, c: "#ff9500" },
                  { i: "🏋️", t: "Tonnage Titan", d: "Move 100 tonnes", p: 84, c: "#00e676" },
                  { i: "⚡", t: "Overload Streak", d: "6 sessions adding load", p: 60, c: "#0066ff" },
                  { i: "🧊", t: "Smart Deload", d: "Take the AI-timed week", p: 33, c: "#a7b0bf" },
                ].map((q, i) => (
                  <div key={q.t} className="card-surface hover-lift rounded-2xl p-4">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-onyx-900 text-[15px]">{q.i}</span>
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-bold text-white">{q.t}</p>
                        <p className="truncate text-[11px] text-iron-500">{q.d}</p>
                      </div>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-onyx-750">
                      <div
                        className="h-full rounded-full transition-[width] duration-1000 ease-out"
                        style={{
                          width: visible ? `${q.p}%` : "0%",
                          background: q.c,
                          transitionDelay: `${300 + i * 110}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== *
 * PROGRESS / REPORTS
 * ================================================================== */
export function ProgressSection() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.25);
  const metrics = [
    { k: "Total tonnage", v: "1,284 t", d: "+34.6%", c: "text-neon-400" },
    { k: "Bench e1RM", v: "124 kg", d: "+18 kg", c: "text-cyber-400" },
    { k: "Body fat", v: "12.4%", d: "−4.1%", c: "text-amber-neon" },
    { k: "Lean mass", v: "74.8 kg", d: "+5.2 kg", c: "text-neon-400" },
  ];

  return (
    <section id="progress" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Progress & Reports"
          title={
            <>
              Proof you're getting stronger —{" "}
              <span className="text-gradient-neon">in one shareable PDF.</span>
            </>
          }
          sub="Interactive charts for volume, intensity and body composition, plus a one-click executive summary export your coach can actually read."
        />

        <div ref={ref} className="mt-14 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div className="card-surface h-full rounded-3xl p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.2em] text-iron-500 uppercase">
                    Weekly training volume
                  </p>
                  <p className="mt-1 font-display text-[1.9rem] leading-none font-extrabold text-white">
                    92.4 <span className="text-[1rem] text-iron-500">tonnes / wk</span>
                  </p>
                </div>
                <div className="flex gap-1 rounded-full border border-onyx-700 bg-onyx-900/70 p-1">
                  {["12W", "6M", "1Y"].map((r, i) => (
                    <span
                      key={r}
                      className={cn(
                        "rounded-full px-3 py-1 text-[11.5px] font-bold",
                        i === 0 ? "bg-neon-400/15 text-neon-400" : "text-iron-500",
                      )}
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <TrendChart className="mt-7" />
              <div className="mt-3 flex justify-between font-mono text-[10px] text-iron-600">
                {["W1", "W3", "W5", "W7", "W9", "W11"].map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {metrics.map((m, i) => (
                  <div
                    key={m.k}
                    className="rounded-2xl border border-onyx-700 bg-onyx-900/60 p-3.5 transition-all duration-700"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "none" : "translateY(12px)",
                      transitionDelay: `${300 + i * 90}ms`,
                    }}
                  >
                    <p className="text-[10.5px] tracking-wider text-iron-500 uppercase">{m.k}</p>
                    <p className="mt-1.5 font-display text-[19px] font-extrabold text-white">{m.v}</p>
                    <p className={cn("mt-0.5 font-mono text-[11px] font-bold", m.c)}>{m.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* PDF preview */}
          <Reveal delay={120}>
            <div className="card-surface relative h-full overflow-hidden rounded-3xl p-6 sm:p-8">
              <Eyebrow tone="amber">📄 Executive Report</Eyebrow>
              <h3 className="mt-4 font-display text-[1.35rem] leading-tight font-extrabold text-white">
                12-week transformation summary
              </h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-iron-400">
                Generated locally. Zero uploads. Share it as a PDF, or keep it for your own receipts.
              </p>

              <div className="relative mt-6 rounded-2xl border border-onyx-700 bg-[linear-gradient(180deg,#f6f7f9,#e7eaee)] p-4 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.9)]">
                <div className="flex items-center justify-between border-b border-black/10 pb-2">
                  <span className="font-display text-[11px] font-extrabold tracking-tight text-onyx-950">
                    OnyxFit · Progress Report
                  </span>
                  <span className="font-mono text-[8px] text-onyx-600">Q3 · 2026</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {["+34.6%", "124kg", "−4.1%"].map((v) => (
                    <div key={v} className="rounded-md bg-white px-2 py-1.5 text-center">
                      <p className="font-display text-[12px] font-extrabold text-onyx-950">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 space-y-1.5">
                  {[92, 74, 86, 62, 80].map((w, i) => (
                    <div key={i} className="h-1.5 rounded-full bg-black/8">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#00a859,#00e676)] transition-[width] duration-1000"
                        style={{ width: visible ? `${w}%` : "0%", transitionDelay: `${400 + i * 90}ms` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-3 h-10 rounded-md bg-white/70" />
              </div>

              <ul className="mt-5 space-y-2">
                {["Body composition delta", "Lift-by-lift 1RM table", "Adherence & streak log"].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-[12.5px] text-iron-300">
                    <span className="grid h-4.5 w-4.5 place-items-center rounded-full bg-neon-400/15 text-neon-400">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              <GhostButton href="#download" className="mt-6 w-full">
                Export a sample report <ArrowIcon />
              </GhostButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
