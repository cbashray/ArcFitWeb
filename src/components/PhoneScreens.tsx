import { useEffect, useMemo, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { useInterval, useReveal } from "../lib/hooks";

/* ================================================================== *
 * Phone chrome
 * ================================================================== */
export function PhoneFrame({
  children,
  className,
  glow = true,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      {glow && (
        <div
          aria-hidden
          className="absolute -inset-10 -z-10 animate-pulse-glow rounded-[60px] bg-[radial-gradient(closest-side,rgba(0,230,118,0.28),transparent_72%)] blur-2xl"
        />
      )}
      <div className="phone-shadow relative rounded-[44px] border border-onyx-600 bg-[linear-gradient(160deg,#2a2f3a,#0d0f13_38%,#0a0c0f)] p-[10px]">
        {/* side buttons */}
        <span className="absolute top-[120px] -left-[3px] h-14 w-[3px] rounded-l bg-onyx-600" aria-hidden />
        <span className="absolute top-[190px] -left-[3px] h-9 w-[3px] rounded-l bg-onyx-600" aria-hidden />
        <span className="absolute top-[150px] -right-[3px] h-20 w-[3px] rounded-r bg-onyx-600" aria-hidden />
        <div className="relative overflow-hidden rounded-[35px] bg-onyx-870 ring-1 ring-white/5">
          {/* dynamic island */}
          <div className="absolute top-2.5 left-1/2 z-30 flex h-[26px] w-[92px] -translate-x-1/2 items-center justify-end gap-1.5 rounded-full bg-black pr-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-400/70" />
            <span className="h-2 w-2 rounded-full bg-[#20242c] ring-1 ring-white/10" />
          </div>
          <div className="h-[632px] w-[286px] overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  );
}

function StatusBar({ label = "OnyxFit" }: { label?: string }) {
  return (
    <div className="flex items-center justify-between px-5 pt-3.5 pb-1 text-[10px] font-semibold text-iron-300">
      <span className="font-mono tracking-tight">9:41</span>
      <span className="sr-only">{label}</span>
      <span className="flex items-center gap-1">
        <svg viewBox="0 0 20 12" className="h-2.5 w-4 fill-iron-300" aria-hidden>
          <rect x="0" y="7" width="3" height="5" rx="1" />
          <rect x="4.5" y="5" width="3" height="7" rx="1" />
          <rect x="9" y="2.5" width="3" height="9.5" rx="1" />
          <rect x="13.5" y="0" width="3" height="12" rx="1" opacity="0.4" />
        </svg>
        <svg viewBox="0 0 26 12" className="h-3 w-6" aria-hidden>
          <rect x="0.5" y="0.5" width="21" height="11" rx="3" className="fill-none stroke-iron-500" strokeWidth="1" />
          <rect x="2" y="2" width="15" height="8" rx="1.6" className="fill-neon-400" />
          <rect x="23" y="4" width="2" height="4" rx="1" className="fill-iron-500" />
        </svg>
      </span>
    </div>
  );
}

function BottomNav({ active }: { active: 0 | 1 | 2 | 3 | 4 }) {
  const items = [
    { l: "Train", d: "M4 9v6M7 7.5v9M17 7.5v9M20 9v6M7 12h10" },
    { l: "Coach", d: "M12 3a7 7 0 0 1 7 7c0 2.4-1.2 3.7-2.4 5-.8.8-1.6 1.6-1.6 2.6V19H9v-1.4c0-1-.8-1.8-1.6-2.6C6.2 13.7 5 12.4 5 10a7 7 0 0 1 7-7Z" },
    { l: "Fuel", d: "M12 3c3 3.5 5 6 5 8.6A5 5 0 0 1 7 11.6C7 9 9 6.5 12 3Z" },
    { l: "Ranks", d: "M6 20h12M9 20v-5M15 20v-8M12 20V9M7 4h10l-1 4H8L7 4Z" },
    { l: "You", d: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 20a7 7 0 0 1 14 0" },
  ];
  return (
    <div className="absolute inset-x-0 bottom-0 flex items-center justify-around border-t border-onyx-700/80 bg-[rgba(15,17,21,0.92)] px-2 pt-2.5 pb-5 backdrop-blur-xl">
      {items.map((it, i) => (
        <span key={it.l} className="flex w-12 flex-col items-center gap-1">
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden>
            <path
              d={it.d}
              stroke={i === active ? "#00e676" : "#6b7589"}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={cn("text-[8.5px] font-semibold", i === active ? "text-neon-400" : "text-iron-500")}>
            {it.l}
          </span>
        </span>
      ))}
    </div>
  );
}

function ScreenShell({ children, nav }: { children: ReactNode; nav: 0 | 1 | 2 | 3 | 4 }) {
  return (
    <div className="relative flex h-full flex-col bg-[linear-gradient(180deg,#141821_0%,#0f1115_28%,#0d0f13_100%)]">
      <StatusBar />
      <div className="no-scrollbar flex-1 overflow-hidden pb-[70px]">{children}</div>
      <BottomNav active={nav} />
    </div>
  );
}

/* ================================================================== *
 * A — Workout logger
 * ================================================================== */
const REST_TOTAL = 90;

export function LoggerScreen() {
  const [rest, setRest] = useState(62);
  const [sessionSec, setSessionSec] = useState(2538);

  useInterval(() => {
    setRest((r) => (r <= 1 ? REST_TOTAL : r - 1));
    setSessionSec((s) => s + 1);
  }, 1000);

  const pct = rest / REST_TOTAL;
  const R = 30;
  const C = 2 * Math.PI * R;

  const sets = [
    { n: 1, w: 80, r: 10, rpe: 7, done: true },
    { n: 2, w: 90, r: 8, rpe: 8, done: true },
    { n: 3, w: 100, r: 6, rpe: 9, done: true },
    { n: 4, w: 100, r: 6, rpe: null, done: false },
  ];

  const mmss = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <ScreenShell nav={0}>
      <div className="space-y-2.5 px-4 pt-2">
        {/* header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[9px] font-bold tracking-[0.18em] text-neon-400 uppercase">Push Day A · Week 4</p>
            <h3 className="font-display text-[19px] font-extrabold tracking-tight text-white">Chest & Triceps</h3>
          </div>
          <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-onyx-700 bg-onyx-800 px-2 py-1 text-[9px] font-semibold text-iron-300">
            <span className="h-1.5 w-1.5 animate-blip rounded-full bg-neon-400" />
            {mmss(sessionSec)}
          </span>
        </div>

        {/* rest timer */}
        <div className="card-surface flex items-center gap-3.5 rounded-2xl p-3.5">
          <div className="relative h-[72px] w-[72px] shrink-0">
            <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
              <circle cx="36" cy="36" r={R} className="fill-none stroke-onyx-700" strokeWidth="6" />
              <circle
                cx="36"
                cy="36"
                r={R}
                className="fill-none stroke-[url(#restGrad)]"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - pct)}
                style={{ transition: "stroke-dashoffset 0.9s linear" }}
              />
              <defs>
                <linearGradient id="restGrad" x1="0" y1="0" x2="72" y2="72">
                  <stop stopColor="#00e676" />
                  <stop offset="1" stopColor="#0066ff" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-mono text-[17px] font-bold text-white tabular-nums">{rest}</span>
              <span className="absolute bottom-3 text-[7px] font-bold tracking-[0.16em] text-iron-500">SEC</span>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold text-white">Rest · auto-started</p>
            <p className="mt-0.5 text-[10px] leading-snug text-iron-400">
              Next: <span className="text-neon-400">Set 4 — 100kg × 6</span>
            </p>
            <div className="mt-2 flex gap-1.5">
              {["+15s", "Skip"].map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-onyx-700 bg-onyx-850 px-2 py-1 text-[9px] font-semibold text-iron-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* exercise card */}
        <div className="card-surface rounded-2xl p-3.5">
          <div className="mb-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-neon-400/12 text-[13px]">🏋️</span>
              <div>
                <p className="text-[12px] font-bold text-white">Barbell Bench Press</p>
                <p className="text-[9px] text-iron-500">Flat · Chest / Triceps</p>
              </div>
            </div>
            <span className="rounded-md border border-cyber-400/25 bg-cyber-500/10 px-1.5 py-1 text-[8.5px] font-bold text-cyber-400">
              SWAP
            </span>
          </div>

          <div className="space-y-1.5">
            {sets.map((s, i) => (
              <div
                key={s.n}
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-2.5 py-1.5 transition-colors",
                  s.done ? "border-neon-400/18 bg-neon-400/7" : "border-onyx-600 bg-onyx-850",
                )}
              >
                <span className="w-4 font-mono text-[10px] font-bold text-iron-500">{s.n}</span>
                <span className="font-mono text-[12px] font-bold text-white tabular-nums">{s.w}</span>
                <span className="text-[9px] text-iron-500">kg</span>
                <span className="text-[9px] text-iron-600">×</span>
                <span className="font-mono text-[12px] font-bold text-white tabular-nums">{s.r}</span>
                <span className="ml-auto text-[9px] font-semibold text-iron-500">
                  {s.rpe ? `RPE ${s.rpe}` : "—"}
                </span>
                <span
                  className={cn(
                    "grid h-5 w-5 place-items-center rounded-md",
                    s.done ? "bg-neon-400 text-onyx-950" : "border border-onyx-600 text-onyx-500",
                  )}
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none">
                    <path d="m5 12.5 4.2 4.2L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {[
              { k: "e1RM", v: "124kg", c: "text-neon-400" },
              { k: "Volume", v: "7.4t", c: "text-cyber-400" },
              { k: "PR", v: "+5kg", c: "text-amber-neon" },
            ].map((m) => (
              <div key={m.k} className="rounded-xl border border-onyx-700 bg-onyx-900/60 px-2 py-1.5 text-center">
                <p className="text-[8px] font-bold tracking-wider text-iron-500 uppercase">{m.k}</p>
                <p className={cn("font-mono text-[12px] font-bold", m.c)}>{m.v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* tonnage */}
        <div className="card-surface rounded-2xl p-3.5">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-bold text-white">Session tonnage</span>
            <span className="font-mono font-bold text-neon-400">7,420 / 9,000 kg</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-onyx-750">
            <div className="h-full w-[82%] rounded-full bg-[linear-gradient(90deg,#00a859,#00e676)] shadow-[0_0_14px_rgba(0,230,118,0.6)]" />
          </div>
          <div className="mt-2.5 flex items-end gap-1">
            {[42, 58, 49, 71, 63, 88, 82].map((h, i) => (
              <span
                key={i}
                className={cn(
                  "flex-1 rounded-sm",
                  i > 4 ? "bg-neon-400/80" : "bg-onyx-600",
                )}
                style={{ height: `${h * 0.28}px` }}
              />
            ))}
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

/* ================================================================== *
 * B — AI coach chat
 * ================================================================== */
export function CoachScreen() {
  const msgs = [
    { me: true, t: "Shoulder feels tight. Swap overhead press?" },
    {
      me: false,
      t: "Got it. Landmine Press keeps ~91% anterior delt activation with a neutral, shoulder-friendly path.",
    },
    { me: true, t: "Add it. What about volume?" },
  ];
  const [typed, setTyped] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTyped((t) => (t + 1) % 4), 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <ScreenShell nav={1}>
      <div className="flex h-full flex-col px-4 pt-2">
        <div className="flex items-center gap-2.5 border-b border-onyx-700/70 pb-3">
          <span className="relative grid h-9 w-9 place-items-center rounded-full bg-[linear-gradient(140deg,#00e676,#0066ff)] text-[14px]">
            🧠
            <span className="absolute -right-0 -bottom-0 h-2.5 w-2.5 rounded-full border-2 border-onyx-900 bg-neon-400" />
          </span>
          <div>
            <p className="text-[12.5px] font-bold text-white">Onyx AI Coach</p>
            <p className="text-[9px] text-neon-400">On-device · analysing 42 sessions</p>
          </div>
        </div>

        <div className="no-scrollbar mt-3 flex-1 space-y-2.5 overflow-hidden">
          {msgs.map((m, i) => (
            <div key={i} className={cn("flex", m.me ? "justify-end" : "justify-start")}>
              <p
                className={cn(
                  "max-w-[84%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed",
                  m.me
                    ? "rounded-br-sm bg-[linear-gradient(135deg,#00c765,#00a859)] font-medium text-onyx-950"
                    : "rounded-bl-sm border border-onyx-700 bg-onyx-800 text-iron-300",
                )}
              >
                {m.t}
              </p>
            </div>
          ))}

          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-onyx-700 bg-onyx-800 px-3 py-2.5">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                    typed > d ? "bg-neon-400" : "bg-onyx-500",
                  )}
                />
              ))}
            </div>
          </div>

          {/* AI plan card */}
          <div className="card-surface rounded-2xl p-3">
            <p className="text-[9px] font-bold tracking-[0.16em] text-cyber-400 uppercase">Adjusted block</p>
            <div className="mt-2 space-y-1.5">
              {[
                ["Landmine Press", "4 × 8 @ RPE 8"],
                ["Cable Lateral Raise", "3 × 15 drop-set"],
                ["Face Pull", "3 × 20 · rear delt"],
              ].map(([a, b]) => (
                <div key={a} className="flex items-center justify-between rounded-lg bg-onyx-900/70 px-2.5 py-1.5">
                  <span className="text-[10.5px] font-semibold text-white">{a}</span>
                  <span className="font-mono text-[9px] text-iron-400">{b}</span>
                </div>
              ))}
            </div>
            <div className="mt-2.5 flex gap-1.5">
              <span className="flex-1 rounded-lg bg-neon-400 py-1.5 text-center text-[10px] font-bold text-onyx-950">
                Apply to routine
              </span>
              <span className="rounded-lg border border-onyx-600 px-2.5 py-1.5 text-[10px] font-bold text-iron-300">
                Why?
              </span>
            </div>
          </div>
        </div>

        <div className="no-scrollbar mb-1 flex gap-1.5 overflow-hidden pt-2">
          {["Form cues", "Build PPL", "Deload week?"].map((c) => (
            <span
              key={c}
              className="shrink-0 rounded-full border border-onyx-600 bg-onyx-850 px-2.5 py-1 text-[9.5px] font-semibold text-iron-300"
            >
              {c}
            </span>
          ))}
        </div>
        <div className="mb-2 flex items-center gap-2 rounded-full border border-onyx-700 bg-onyx-850 px-3 py-2">
          <span className="flex-1 text-[10.5px] text-iron-500">Ask your coach anything…</span>
          <span className="grid h-6 w-6 place-items-center rounded-full bg-neon-400 text-onyx-950">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
              <path d="M5 12h13m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </ScreenShell>
  );
}

/* ================================================================== *
 * C — Nutrition + hydration (interactive)
 * ================================================================== */
export function NutritionScreen() {
  const [water, setWater] = useState(1750);
  const goal = 3500;
  const pct = Math.min(1, water / goal);

  const macros = [
    { k: "Protein", v: 168, g: 210, c: "#00e676" },
    { k: "Carbs", v: 244, g: 320, c: "#0066ff" },
    { k: "Fats", v: 61, g: 80, c: "#ff9500" },
  ];

  const R = 38;
  const C = 2 * Math.PI * R;
  const segs = useMemo(() => {
    let offset = 0;
    return macros.map((m) => {
      const frac = (m.v / m.g / 3) * 0.92;
      const seg = { ...m, dash: C * frac, off: -C * offset };
      offset += frac + 0.015;
      return seg;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [C]);

  return (
    <ScreenShell nav={2}>
      <div className="space-y-3 px-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] font-bold tracking-[0.18em] text-amber-neon uppercase">Today · Cut phase</p>
            <h3 className="font-display text-[19px] font-extrabold tracking-tight text-white">Fuel</h3>
          </div>
          <span className="rounded-full border border-onyx-700 bg-onyx-800 px-2 py-1 text-[9px] font-semibold text-iron-300">
            −420 kcal deficit
          </span>
        </div>

        {/* macro wheel */}
        <div className="card-surface flex items-center gap-3 rounded-2xl p-3.5">
          <div className="relative h-[96px] w-[96px] shrink-0">
            <svg viewBox="0 0 96 96" className="h-full w-full -rotate-90">
              <circle cx="48" cy="48" r={R} className="fill-none stroke-onyx-750" strokeWidth="9" />
              {segs.map((s) => (
                <circle
                  key={s.k}
                  cx="48"
                  cy="48"
                  r={R}
                  fill="none"
                  stroke={s.c}
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={`${s.dash} ${C}`}
                  strokeDashoffset={s.off}
                />
              ))}
            </svg>
            <div className="absolute inset-0 grid place-content-center text-center">
              <p className="font-mono text-[17px] leading-none font-extrabold text-white">2,214</p>
              <p className="text-[7.5px] font-bold tracking-[0.14em] text-iron-500">/ 2,640 KCAL</p>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            {macros.map((m) => (
              <div key={m.k}>
                <div className="flex items-center justify-between text-[9.5px]">
                  <span className="font-semibold text-iron-300">{m.k}</span>
                  <span className="font-mono text-iron-400">
                    {m.v}/{m.g}g
                  </span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-onyx-750">
                  <div
                    className="h-full rounded-full transition-[width] duration-1000"
                    style={{ width: `${(m.v / m.g) * 100}%`, background: m.c, boxShadow: `0 0 10px ${m.c}80` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* hydration */}
        <div className="card-surface rounded-2xl p-3.5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-white">💧 Hydration</p>
            <p className="font-mono text-[10px] font-bold text-cyber-400">
              {(water / 1000).toFixed(2)}L / 3.5L
            </p>
          </div>
          <div className="relative mt-2 h-3 overflow-hidden rounded-full bg-onyx-750">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#0066ff,#3d8bff,#00e676)] transition-[width] duration-700 ease-out"
              style={{ width: `${pct * 100}%` }}
            />
            <div
              aria-hidden
              className="absolute inset-y-0 w-full animate-shimmer rounded-full bg-[linear-gradient(100deg,transparent_35%,rgba(255,255,255,0.35)_50%,transparent_65%)] bg-[length:200%_100%]"
            />
          </div>
          <div className="mt-2.5 flex gap-1.5">
            {[250, 500].map((ml) => (
              <button
                key={ml}
                type="button"
                onClick={() => setWater((w) => Math.min(goal, w + ml))}
                className="flex-1 rounded-lg border border-cyber-400/30 bg-cyber-500/10 py-1.5 text-[10px] font-bold text-cyber-400 transition-transform active:scale-95"
              >
                +{ml}ml
              </button>
            ))}
            <button
              type="button"
              onClick={() => setWater(0)}
              className="rounded-lg border border-onyx-600 px-2.5 py-1.5 text-[10px] font-bold text-iron-400 transition-transform active:scale-95"
            >
              Reset
            </button>
          </div>
        </div>

        {/* AI meal */}
        <div className="card-surface rounded-2xl p-3.5">
          <p className="text-[9px] font-bold tracking-[0.16em] text-neon-400 uppercase">AI fills the gap</p>
          <p className="mt-1 text-[10px] leading-snug text-iron-400">
            42g protein &amp; 76g carbs left. Suggested:
          </p>
          <div className="mt-2 space-y-1.5">
            {[
              ["🍗 Chicken & jasmine rice", "512 kcal · 44P"],
              ["🥤 Whey + banana shake", "286 kcal · 28P"],
            ].map(([a, b]) => (
              <div
                key={a}
                className="flex items-center justify-between rounded-lg border border-onyx-700 bg-onyx-900/70 px-2.5 py-1.5"
              >
                <span className="text-[10.5px] font-semibold text-white">{a}</span>
                <span className="font-mono text-[8.5px] text-iron-500">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

/* ================================================================== *
 * D — Leaderboard
 * ================================================================== */
export function LeaderboardScreen() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.3);
  const podium = [
    { p: 2, n: "Mira K.", xp: "14,820", h: 64, medal: "🥈", c: "#a7b0bf" },
    { p: 1, n: "You", xp: "16,340", h: 88, medal: "🥇", c: "#ff9500" },
    { p: 3, n: "Dev R.", xp: "13,110", h: 48, medal: "🥉", c: "#b06a3b" },
  ];
  return (
    <ScreenShell nav={3}>
      <div ref={ref} className="space-y-3 px-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] font-bold tracking-[0.18em] text-amber-neon uppercase">Season 4 · Week 12</p>
            <h3 className="font-display text-[19px] font-extrabold tracking-tight text-white">Iron Ranks</h3>
          </div>
          <span className="rounded-full border border-amber-neon/25 bg-amber-neon/10 px-2 py-1 text-[9px] font-bold text-amber-neon">
            Top 5%
          </span>
        </div>

        {/* podium */}
        <div className="card-surface rounded-2xl p-3.5">
          <div className="flex items-end justify-center gap-2.5">
            {podium.map((p, i) => (
              <div key={p.p} className="flex w-[68px] flex-col items-center">
                <span className="mb-1 text-[15px]">{p.medal}</span>
                <span className="text-[10px] font-bold text-white">{p.n}</span>
                <span className="font-mono text-[8.5px] text-iron-500">{p.xp} XP</span>
                <div
                  className="mt-1.5 w-full rounded-t-lg border-t-2 transition-[height] duration-1000 ease-out"
                  style={{
                    height: visible ? p.h : 0,
                    borderColor: p.c,
                    background: `linear-gradient(180deg, ${p.c}33, ${p.c}0a)`,
                    transitionDelay: `${i * 130}ms`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* xp bar */}
        <div className="card-surface rounded-2xl p-3.5">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-bold text-white">Level 27 · Iron Vanguard</span>
            <span className="font-mono text-neon-400">1,660 XP to L28</span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-onyx-750">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#0066ff,#00e676)] shadow-[0_0_14px_rgba(0,230,118,0.55)] transition-[width] duration-[1400ms] ease-out"
              style={{ width: visible ? "74%" : "0%" }}
            />
          </div>
        </div>

        {/* quests */}
        <div className="space-y-2">
          {[
            { i: "🔥", t: "Consistency Crusher", d: "18/21 days trained", p: 86, c: "#ff9500" },
            { i: "🏋️", t: "Tonnage Titan", d: "84.2t / 100t this month", p: 84, c: "#00e676" },
            { i: "⚡", t: "Overload Streak", d: "6 sessions with +load", p: 60, c: "#0066ff" },
          ].map((q, i) => (
            <div key={q.t} className="card-surface flex items-center gap-2.5 rounded-xl p-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-onyx-900 text-[14px]">{q.i}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[10.5px] font-bold text-white">{q.t}</p>
                <p className="text-[8.5px] text-iron-500">{q.d}</p>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-onyx-750">
                  <div
                    className="h-full rounded-full transition-[width] duration-1000 ease-out"
                    style={{
                      width: visible ? `${q.p}%` : "0%",
                      background: q.c,
                      transitionDelay: `${200 + i * 120}ms`,
                    }}
                  />
                </div>
              </div>
              <span className="font-mono text-[9px] font-bold" style={{ color: q.c }}>
                {q.p}%
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-1.5">
          {["🎖 PR Hunter", "💎 90-Day", "🧊 Deload Pro"].map((b) => (
            <span
              key={b}
              className="flex-1 rounded-lg border border-onyx-700 bg-onyx-850 py-1.5 text-center text-[8.5px] font-bold text-iron-300"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </ScreenShell>
  );
}
