import { useState } from "react";
import { cn } from "../utils/cn";
import { useReveal } from "../lib/hooks";
import { ArrowIcon, CheckIcon, GhostButton, PrimaryButton, Reveal, SectionHeading } from "./primitives";

const FREE = [
  "Unlimited workout & set logging",
  "Auto rest timer + estimated 1RM",
  "30+ routine templates (PPL, U/L, 5×5)",
  "Macro, calorie & hydration tracking",
  "Volume, tonnage & streak charts",
  "100% offline — no account required",
  "Local-only encrypted data storage",
];

const PRO = [
  "Everything in Free, forever",
  "Post-workout AI review & 10-point scoring",
  "Conversational AI Coach & routine builder",
  "Biomechanical exercise substitution engine",
  "AI meal suggestions for remaining macros",
  "PDF export & executive progress reports",
  "Cross-device encrypted cloud sync",
  "Global leaderboards, quests & seasons",
];

function Row({ t, i, visible, pro }: { t: string; i: number; visible: boolean; pro?: boolean }) {
  return (
    <li
      className="flex items-start gap-3 transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateX(-10px)",
        transitionDelay: `${i * 70}ms`,
      }}
    >
      <span
        className={cn(
          "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
          pro ? "bg-neon-400 text-onyx-950" : "bg-neon-400/15 text-neon-400",
        )}
      >
        <CheckIcon className="h-3 w-3" />
      </span>
      <span className={cn("text-[13.5px] leading-snug", pro ? "text-iron-50" : "text-iron-300")}>{t}</span>
    </li>
  );
}

export default function Pricing() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="relative scroll-mt-24 py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 h-[30rem] w-[54rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,102,255,0.09),transparent)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Zero-Friction Pricing"
          title={
            <>
              The core app is <span className="text-gradient-neon">free forever.</span> No account. No paywall.
            </>
          }
          sub="Log every set, track every macro and chart every trend without paying a cent or creating a login. Upgrade only if you want the AI cloud layer."
        />

        <Reveal delay={80}>
          <div className="mt-9 flex items-center justify-center gap-3">
            <span className={cn("text-[13px] font-semibold", !yearly ? "text-white" : "text-iron-500")}>Monthly</span>
            <button
              type="button"
              onClick={() => setYearly((y) => !y)}
              aria-label="Toggle billing period"
              className={cn(
                "relative h-7 w-13 rounded-full border transition-colors duration-300",
                yearly ? "border-neon-400/40 bg-neon-400/15" : "border-onyx-600 bg-onyx-800",
              )}
              style={{ width: 52 }}
            >
              <span
                className={cn(
                  "absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white transition-all duration-300",
                  yearly ? "left-[26px] bg-neon-400" : "left-[3px]",
                )}
              />
            </button>
            <span className={cn("text-[13px] font-semibold", yearly ? "text-white" : "text-iron-500")}>
              Yearly
              <span className="ml-2 rounded-full border border-neon-400/25 bg-neon-400/10 px-2 py-0.5 text-[10.5px] font-bold text-neon-400">
                Save 40%
              </span>
            </span>
          </div>
        </Reveal>

        <div ref={ref} className="mt-10 grid gap-4 lg:grid-cols-2">
          {/* free */}
          <Reveal>
            <div className="card-surface hover-lift relative h-full overflow-hidden rounded-[28px] p-7 sm:p-9">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.2em] text-iron-500 uppercase">Starter</p>
                  <h3 className="mt-1.5 font-display text-[1.6rem] font-extrabold text-white">Free &amp; Offline</h3>
                </div>
                <span className="rounded-full border border-onyx-700 bg-onyx-850 px-3 py-1.5 text-[11px] font-bold text-iron-400">
                  No card ever
                </span>
              </div>

              <div className="mt-6 flex items-end gap-2">
                <span className="font-display text-[3.4rem] leading-none font-extrabold text-white">$0</span>
                <span className="mb-2 text-[13.5px] text-iron-500">/ forever</span>
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-iron-400">
                Everything a serious lifter needs to train, track and progress — running entirely on your device.
              </p>

              <ul className="mt-7 space-y-3">
                {FREE.map((t, i) => (
                  <Row key={t} t={t} i={i} visible={visible} />
                ))}
              </ul>

              <GhostButton href="#download" size="lg" className="mt-8 w-full">
                Download free <ArrowIcon />
              </GhostButton>
            </div>
          </Reveal>

          {/* pro */}
          <Reveal delay={120}>
            <div className="relative h-full overflow-hidden rounded-[28px] border border-neon-400/30 bg-[linear-gradient(180deg,rgba(0,230,118,0.09),rgba(26,29,36,0.9)_38%,rgba(15,17,21,0.96))] p-7 shadow-[0_0_90px_-45px_rgba(0,230,118,1)] sm:p-9">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-32 -right-24 h-72 w-72 rounded-full bg-neon-400/14 blur-3xl"
              />
              <span className="absolute top-6 right-6 rounded-full bg-[linear-gradient(100deg,#00e676,#00a859)] px-3 py-1.5 text-[10.5px] font-extrabold tracking-wider text-onyx-950 uppercase">
                Most Popular
              </span>

              <div className="relative z-10">
                <p className="text-[11px] font-bold tracking-[0.2em] text-neon-400 uppercase">Onyx Pro · AI Cloud</p>
                <h3 className="mt-1.5 font-display text-[1.6rem] font-extrabold text-white">Full AI Arsenal</h3>

                <div className="mt-6 flex items-end gap-2">
                  <span className="font-display text-[3.4rem] leading-none font-extrabold text-white tabular-nums">
                    ${yearly ? "4" : "7"}
                  </span>
                  <span className="mb-2 text-[13.5px] text-iron-400">
                    / month{yearly && <span className="text-neon-400"> · billed yearly</span>}
                  </span>
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-iron-400">
                  Unlock the AI review engine, conversational coach, swap intelligence and executive PDF reports.
                </p>

                <ul className="mt-7 space-y-3">
                  {PRO.map((t, i) => (
                    <Row key={t} t={t} i={i} visible={visible} pro />
                  ))}
                </ul>

                <PrimaryButton href="#download" size="lg" className="mt-8 w-full">
                  Start 14-day Pro trial <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                </PrimaryButton>
                <p className="mt-3 text-center text-[11.5px] text-iron-500">
                  Cancel anytime · Free tier never expires
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 rounded-2xl border border-onyx-700 bg-onyx-850/50 px-6 py-4 text-[12.5px] text-iron-400 backdrop-blur-md">
            {["🔒 No data ever leaves your device on Free", "🧾 MIT-licensed open source core", "🚫 Zero ads, zero trackers"].map(
              (t) => (
                <span key={t} className="flex items-center gap-2">
                  {t}
                </span>
              ),
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
