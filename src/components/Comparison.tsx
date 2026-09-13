import { CheckIcon, Reveal, SectionHeading, XIcon } from "./primitives";

const OLD = [
  ["Cluttered 6-tap menus", "Four screens deep just to log a single working set."],
  ["Mandatory account + login", "Your training data held hostage behind a cloud sign-up."],
  ["Paywalled basic logging", "$12/mo before you can even record a bench press."],
  ["Generic static routines", "The same PDF program sent to 40,000 other people."],
  ["Dead without signal", "Basement gym? Spinning loader and lost sets."],
  ["No feedback loop", "Numbers go in. Nothing useful ever comes out."],
];

const NEW = [
  ["Instant 1-tap set logging", "Weight, reps, RPE and rest timer in a single thumb-press."],
  ["100% offline & private", "Everything stored on-device. No account. No telemetry."],
  ["Free core forever", "Full logging, routines, macros and charts at zero cost."],
  ["AI-adapted programming", "Blocks rewritten around your recovery, gaps and plateaus."],
  ["Works in the deepest basement", "Zero network calls in the critical path. Zero lag."],
  ["Automated overload tracking", "Scored reviews that tell you exactly what to change."],
];

export default function Comparison() {
  return (
    <section className="relative py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,230,118,0.08),transparent)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The Difference"
          title={
            <>
              Your old gym app was built for downloads.{" "}
              <span className="text-gradient-neon">OnyxFit was built for lifters.</span>
            </>
          }
          sub="Same 60 minutes in the gym. Radically different return on them."
        />

        <div className="relative mt-14 grid gap-4 lg:grid-cols-2">
          {/* VS badge */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <span className="grid h-14 w-14 place-items-center rounded-full border border-onyx-600 bg-onyx-900 font-display text-[13px] font-extrabold tracking-widest text-iron-400 shadow-[0_0_50px_-10px_rgba(0,0,0,1)]">
              VS
            </span>
          </div>

          {/* before */}
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-3xl border border-onyx-700 bg-[linear-gradient(180deg,rgba(26,29,36,0.5),rgba(15,17,21,0.7))] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-onyx-600 bg-onyx-850 text-[17px] grayscale">
                  📱
                </span>
                <div>
                  <p className="text-[11px] font-bold tracking-[0.18em] text-iron-500 uppercase">Before</p>
                  <h3 className="font-display text-[19px] font-bold text-iron-300">Traditional gym apps</h3>
                </div>
              </div>

              <ul className="mt-7 space-y-3.5">
                {OLD.map(([t, d], i) => (
                  <li
                    key={t}
                    className="flex gap-3 rounded-2xl border border-onyx-700/60 bg-onyx-900/40 p-3.5"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-red-500/12 text-red-400/90">
                      <XIcon className="h-3 w-3" />
                    </span>
                    <div>
                      <p className="text-[13.5px] font-semibold text-iron-300 line-through decoration-red-400/40">
                        {t}
                      </p>
                      <p className="mt-0.5 text-[12px] leading-snug text-iron-500">{d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* after */}
          <Reveal delay={120}>
            <div className="card-surface relative h-full overflow-hidden rounded-3xl border-neon-400/25 p-6 shadow-[0_0_70px_-40px_rgba(0,230,118,0.9)] sm:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-28 -right-20 h-64 w-64 rounded-full bg-neon-400/12 blur-3xl"
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-neon-400/30 bg-neon-400/10 text-[17px]">
                    ⚡
                  </span>
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.18em] text-neon-400 uppercase">After</p>
                    <h3 className="font-display text-[19px] font-bold text-white">With OnyxFit</h3>
                  </div>
                </div>

                <ul className="mt-7 space-y-3.5">
                  {NEW.map(([t, d], i) => (
                    <li
                      key={t}
                      className="flex gap-3 rounded-2xl border border-neon-400/15 bg-neon-400/5 p-3.5 transition-colors duration-300 hover:border-neon-400/35 hover:bg-neon-400/8"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-neon-400 text-onyx-950">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      <div>
                        <p className="text-[13.5px] font-bold text-white">{t}</p>
                        <p className="mt-0.5 text-[12px] leading-snug text-iron-400">{d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
