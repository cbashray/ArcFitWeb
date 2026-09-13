import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { Reveal, SectionHeading } from "./primitives";

type T = {
  q: string;
  n: string;
  r: string;
  tag: string;
  stat: string;
  statLabel: string;
  initials: string;
  tone: "neon" | "cyber" | "amber";
};

const DATA: T[] = [
  {
    q: "The post-workout AI review caught that my rear delts were 30% under-volumed for six straight weeks. I fixed it in one block and my overhead press finally moved again. No human coach was telling me that for free.",
    n: "Marcus Vale",
    r: "Competitive Powerlifter · 6 yrs",
    tag: "Powerlifting",
    stat: "+22kg",
    statLabel: "Bench 1RM in 14 weeks",
    initials: "MV",
    tone: "neon",
  },
  {
    q: "My gym is in a basement with zero signal. Every other app I tried dropped sets or froze mid-session. OnyxFit has never lost a single rep — it doesn't even know the internet exists while I'm training.",
    n: "Priya Raghavan",
    r: "Casual gym-goer · 18-month streak",
    tag: "Body Recomposition",
    stat: "−9.4kg",
    statLabel: "Fat lost, lean mass held",
    initials: "PR",
    tone: "cyber",
  },
  {
    q: "Prep season is brutal on the mind. Having macros, hydration and training scored in one place — plus a PDF I can send my coach every Sunday — cut my admin time from two hours a week to about four minutes.",
    n: "Tobias Lindqvist",
    r: "Classic Physique Competitor",
    tag: "Bodybuilding",
    stat: "4 min",
    statLabel: "Weekly check-in admin",
    initials: "TL",
    tone: "amber",
  },
  {
    q: "The 1-tap exercise swap is the killer feature. Peak hour, squat rack gone, and it hands me a Bulgarian split squat progression at 94% activation match. I never stand around waiting anymore.",
    n: "Danielle Cross",
    r: "Hybrid Athlete · CrossTraining",
    tag: "Calisthenics",
    stat: "96%",
    statLabel: "Session completion rate",
    initials: "DC",
    tone: "neon",
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setI((v) => (v + 1) % DATA.length), 7000);
    return () => clearInterval(id);
  }, [auto]);

  const go = (n: number) => {
    setAuto(false);
    setI((v) => (v + n + DATA.length) % DATA.length);
  };

  const toneRing = {
    neon: "from-neon-400/25 to-cyber-500/10 text-neon-400",
    cyber: "from-cyber-500/25 to-neon-400/10 text-cyber-400",
    amber: "from-amber-neon/25 to-neon-400/10 text-amber-neon",
  } as const;

  return (
    <section className="relative overflow-hidden border-y border-onyx-700/60 bg-[linear-gradient(180deg,rgba(10,12,15,0.9),rgba(15,17,21,0.5))] py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[26rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,230,118,0.1),transparent)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Athlete Reviews"
          title={
            <>
              Lifters don't do hype. <span className="text-gradient-neon">They do numbers.</span>
            </>
          }
          sub="2,140+ reviews across the App Store and Google Play, averaging 4.9 stars."
        />

        {/* carousel */}
        <Reveal delay={80}>
          <div className="relative mt-14">
            <div className="overflow-hidden rounded-[28px]">
              <div
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(-${i * 100}%)` }}
              >
                {DATA.map((t) => (
                  <article key={t.n} className="w-full shrink-0 px-1">
                    <div className="card-surface relative overflow-hidden rounded-[28px] p-7 sm:p-10">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full bg-neon-400/8 blur-3xl"
                      />
                      <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                        <div>
                          <div className="flex items-center gap-2">
                            {Array.from({ length: 5 }).map((_, s) => (
                              <svg key={s} viewBox="0 0 24 24" className="h-4 w-4 fill-amber-neon" aria-hidden>
                                <path d="m12 2 2.9 6.2 6.8.9-5 4.7 1.3 6.8L12 17.4 6 20.6l1.3-6.8-5-4.7 6.8-.9z" />
                              </svg>
                            ))}
                            <span className="ml-2 rounded-full border border-onyx-700 bg-onyx-850 px-2.5 py-1 text-[10.5px] font-bold tracking-wider text-iron-400 uppercase">
                              {t.tag}
                            </span>
                          </div>

                          <blockquote className="mt-5 font-display text-[19px] leading-[1.5] font-medium text-balance text-iron-50 sm:text-[23px]">
                            <span className="mr-1 text-neon-400">“</span>
                            {t.q}
                            <span className="ml-0.5 text-neon-400">”</span>
                          </blockquote>

                          <div className="mt-7 flex items-center gap-3.5">
                            <span
                              className={cn(
                                "grid h-12 w-12 place-items-center rounded-2xl border border-onyx-600 bg-gradient-to-br font-display text-[15px] font-extrabold",
                                toneRing[t.tone],
                              )}
                            >
                              {t.initials}
                            </span>
                            <div>
                              <p className="text-[14.5px] font-bold text-white">{t.n}</p>
                              <p className="text-[12.5px] text-iron-500">{t.r}</p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-3xl border border-onyx-700 bg-onyx-900/60 px-7 py-6 text-center lg:w-[220px]">
                          <p className="font-display text-[2.5rem] leading-none font-extrabold text-gradient-neon">
                            {t.stat}
                          </p>
                          <p className="mt-2.5 text-[12px] leading-snug text-iron-400">{t.statLabel}</p>
                          <div className="mt-4 h-px w-full bg-onyx-700" />
                          <p className="mt-4 text-[11px] tracking-wider text-iron-600 uppercase">Verified in-app</p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* controls */}
            <div className="mt-7 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous review"
                className="grid h-10 w-10 place-items-center rounded-full border border-onyx-600 bg-onyx-850/70 text-iron-300 transition-all hover:border-neon-400/40 hover:text-white active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                  <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="flex gap-1.5">
                {DATA.map((d, k) => (
                  <button
                    key={d.n}
                    type="button"
                    aria-label={`Review ${k + 1}`}
                    onClick={() => {
                      setAuto(false);
                      setI(k);
                    }}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      i === k ? "w-8 bg-neon-400" : "w-1.5 bg-onyx-600 hover:bg-onyx-500",
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next review"
                className="grid h-10 w-10 place-items-center rounded-full border border-onyx-600 bg-onyx-850/70 text-iron-300 transition-all hover:border-neon-400/40 hover:text-white active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
