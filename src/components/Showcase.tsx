import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { CheckIcon, Reveal, SectionHeading } from "./primitives";
import { CoachScreen, LeaderboardScreen, LoggerScreen, NutritionScreen, PhoneFrame } from "./PhoneScreens";

const TABS = [
  {
    id: "logger",
    label: "Workout Logger",
    icon: "🏋️",
    tone: "neon",
    title: "Log a Push / Pull / Legs session without breaking tempo",
    body: "Tap a set, it's saved. The rest timer fires automatically, tonnage accumulates live, and your estimated 1RM recalculates every single rep — no menus, no friction, no signal required.",
    bullets: [
      "Auto rest timer with haptic + audio cue",
      "Live estimated 1RM (Epley & Brzycki)",
      "Per-set RPE and warm-up detection",
      "Plate-math calculator built into the keypad",
    ],
    screen: <LoggerScreen />,
  },
  {
    id: "coach",
    label: "AI Coach Chat",
    icon: "🧠",
    tone: "cyber",
    title: "A conversational coach that rebuilds your routine on the fly",
    body: "Describe a niggle, a time crunch or a plateau. Onyx reads your last 42 sessions, rewrites the block, explains the biomechanics, and pushes it straight into tomorrow's workout.",
    bullets: [
      "Natural-language routine builder",
      "Form cues & tempo prescriptions",
      "Injury-aware exercise filtering",
      "Explains every recommendation — tap 'Why?'",
    ],
    screen: <CoachScreen />,
  },
  {
    id: "fuel",
    label: "Nutrition & Water",
    icon: "💧",
    tone: "amber",
    title: "Hit your macro wheel and hydration goal on autopilot",
    body: "An animated macro wheel shows exactly where you are against calories, protein, carbs and fats. Quick-log water with +250ml / +500ml taps and let AI fill the remaining gap with real meals.",
    bullets: [
      "Interactive macro wheel & deficit tracker",
      "One-tap hydration logging + reminders",
      "AI meal suggestions for remaining macros",
      "Bulk, cut and recomp presets",
    ],
    screen: <NutritionScreen />,
  },
  {
    id: "ranks",
    label: "Leaderboard & Badges",
    icon: "🏆",
    tone: "amber",
    title: "Turn consistency into a game you actually want to win",
    body: "Earn XP for every logged session, climb the seasonal podium, and chase weekly quests. Streaks, badges and rank percentiles keep you walking into the gym on the days motivation doesn't.",
    bullets: [
      "Seasonal XP podium — gold, silver, bronze",
      "Weekly quests & streak multipliers",
      "Rank percentile vs. global lifters",
      "Collectible milestone badges",
    ],
    screen: <LeaderboardScreen />,
  },
] as const;

export default function Showcase() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setActive((a) => (a + 1) % TABS.length), 8000);
    return () => clearInterval(id);
  }, [auto]);

  const t = TABS[active];
  const toneText = {
    neon: "text-neon-400",
    cyber: "text-cyber-400",
    amber: "text-amber-neon",
  } as const;

  return (
    <section
      id="ai-coach"
      className="relative scroll-mt-24 overflow-hidden border-y border-onyx-700/60 bg-[linear-gradient(180deg,rgba(10,12,15,0.9),rgba(15,17,21,0.55))] py-20 sm:py-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0 opacity-50 [mask-image:radial-gradient(60%_60%_at_50%_40%,#000,transparent)]" />
        <div className="absolute top-1/3 left-1/2 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,102,255,0.12),transparent)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Live Product Tour"
          tone="cyber"
          title={
            <>
              Four screens. <span className="text-gradient-neon">One relentless system.</span>
            </>
          }
          sub="Switch between the core surfaces of OnyxFit. Everything below is a real, interactive rendering of the app — tap around."
        />

        {/* tab bar */}
        <Reveal delay={80}>
          <div className="no-scrollbar mx-auto mt-12 flex max-w-3xl gap-1.5 overflow-x-auto rounded-2xl border border-onyx-700 bg-onyx-850/60 p-1.5 backdrop-blur-xl">
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActive(i);
                  setAuto(false);
                }}
                className={cn(
                  "relative flex flex-1 shrink-0 items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-[12.5px] font-semibold whitespace-nowrap transition-all duration-300 sm:text-[13.5px]",
                  active === i
                    ? "bg-onyx-750 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_24px_-14px_rgba(0,0,0,0.9)]"
                    : "text-iron-400 hover:bg-onyx-800/60 hover:text-white",
                )}
              >
                <span className="text-[15px]">{tab.icon}</span>
                {tab.label}
                {active === i && (
                  <span className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-transparent via-neon-400 to-transparent" />
                )}
              </button>
            ))}
          </div>
        </Reveal>

        {/* panel */}
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div key={t.id} className="panel-in order-2 lg:order-1">
            <span
              className={cn(
                "font-mono text-[11px] font-bold tracking-[0.2em] uppercase",
                toneText[t.tone as keyof typeof toneText],
              )}
            >
              0{active + 1} / 04
            </span>
            <h3 className="mt-3 font-display text-[1.7rem] leading-[1.12] font-extrabold tracking-tight text-balance text-white sm:text-[2.15rem]">
              {t.title}
            </h3>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-iron-400">{t.body}</p>

            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {t.bullets.map((b, i) => (
                <li
                  key={b}
                  className="stagger-in flex items-start gap-2.5 rounded-xl border border-onyx-700/80 bg-onyx-850/50 px-3.5 py-3 text-[13px] text-iron-300 backdrop-blur-sm"
                  style={{ animationDelay: `${120 + i * 80}ms` }}
                >
                  <span className="mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-neon-400/15 text-neon-400">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex gap-1.5">
                {TABS.map((tb, i) => (
                  <button
                    key={tb.id}
                    type="button"
                    aria-label={`Show ${tb.label}`}
                    onClick={() => {
                      setActive(i);
                      setAuto(false);
                    }}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      active === i ? "w-8 bg-neon-400" : "w-1.5 bg-onyx-600 hover:bg-onyx-500",
                    )}
                  />
                ))}
              </div>
              <span className="text-[11.5px] text-iron-500">
                {auto ? "Auto-rotating · click to take control" : "Manual mode"}
              </span>
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 hidden rounded-[56px] border border-onyx-700/60 bg-onyx-850/30 backdrop-blur-sm sm:block"
              />
              <PhoneFrame key={t.id}>{t.screen}</PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
