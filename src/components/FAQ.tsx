import { useState } from "react";
import { cn } from "../utils/cn";
import { Reveal, SectionHeading } from "./primitives";

const QA = [
  {
    q: "Does it actually work without internet?",
    a: "Yes — completely. Every core function (set logging, rest timers, 1RM estimation, routines, macro and hydration tracking, charts) runs entirely on-device using a local database. There are zero network calls in the critical training path, so a basement gym with no signal behaves exactly like a fibre connection. Optional Pro cloud features simply queue up and sync the next time you're online.",
    icon: "📴",
  },
  {
    q: "How does the Post-Workout AI Review work?",
    a: "The moment you end a session, OnyxFit analyses your logged sets against your training history: total tonnage vs. the previous four weeks, set-by-set load progression, per-muscle-group volume distribution, average RPE drift and time-under-tension. It returns a score out of 10 alongside three focused diagnostics — progressive overload, muscle balance and recovery window — plus a concrete prescription for the next session. On the Free tier, the scoring runs on-device with a lightweight heuristic model; Pro sends an anonymised summary to the AI cloud for deeper, coach-grade narrative feedback.",
    icon: "🧠",
  },
  {
    q: "Can I build custom PPL or hybrid routines?",
    a: "Absolutely. Start from 30+ built-in templates — Push/Pull/Legs, Upper/Lower, 5×5, full-body, German Volume, bro splits — or build from scratch with a drag-and-drop day builder. Set per-exercise targets, rep ranges, RPE caps, rest intervals and progression rules (linear, double-progression or auto-regulated). You can also describe the routine in plain English to the AI Coach and it will draft the whole mesocycle for you.",
    icon: "🧩",
  },
  {
    q: "How is my privacy protected?",
    a: "By default, nothing leaves your phone. There's no mandatory account, no email capture, no analytics SDK and no ad network. Your training log lives in an encrypted local store you fully own. If you opt into Pro cloud sync, data is end-to-end encrypted in transit and at rest, and you can export everything to JSON/CSV or wipe it permanently with one tap. The core app is MIT-licensed and open source, so you can audit exactly what it does.",
    icon: "🔒",
  },
  {
    q: "What is the biomechanical substitution engine?",
    a: "Each exercise in the library is tagged with primary and secondary muscle involvement, joint action, resistance profile and stability demand. When your machine is occupied — or a joint is cranky — OnyxFit ranks alternatives across dumbbell, barbell, cable, machine and bodyweight modalities by activation match percentage, then swaps it into your live session in one tap while preserving your programmed load progression.",
    icon: "🔄",
  },
  {
    q: "Can I export my data or share progress with a coach?",
    a: "Yes. One tap generates an executive-ready PDF containing volume trends, lift-by-lift 1RM tables, body composition deltas, adherence and streak logs, plus AI coach notes for the next block. Raw exports are available in CSV and JSON, and reports are generated locally so nothing is uploaded unless you choose to share the file.",
    icon: "📄",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 border-t border-onyx-700/60 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Questions, Answered"
          title={
            <>
              Everything you'd ask <span className="text-gradient-neon">before your first set.</span>
            </>
          }
        />

        <div className="mt-12 space-y-3">
          {QA.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 60}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border transition-all duration-400",
                    isOpen
                      ? "border-neon-400/30 bg-[linear-gradient(180deg,rgba(0,230,118,0.06),rgba(26,29,36,0.85))] shadow-[0_0_50px_-32px_rgba(0,230,118,0.9)]"
                      : "border-onyx-700 bg-onyx-850/50 hover:border-onyx-600",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-xl border text-[15px] transition-colors duration-300",
                        isOpen ? "border-neon-400/30 bg-neon-400/10" : "border-onyx-700 bg-onyx-900",
                      )}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={cn(
                        "flex-1 font-display text-[15.5px] font-bold tracking-tight transition-colors duration-300 sm:text-[17px]",
                        isOpen ? "text-white" : "text-iron-200",
                      )}
                    >
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-400",
                        isOpen
                          ? "rotate-45 border-neon-400/40 bg-neon-400/15 text-neon-400"
                          : "border-onyx-600 text-iron-400",
                      )}
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>

                  <div
                    className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 pl-[72px] text-[13.5px] leading-relaxed text-iron-400 sm:px-6 sm:pb-6 sm:pl-[76px] sm:text-[14.5px]">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={140}>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-onyx-700 bg-onyx-850/50 px-6 py-5 backdrop-blur-md sm:flex-row">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyber-500/10 text-[17px]">💬</span>
              <div>
                <p className="text-[14px] font-bold text-white">Still deciding?</p>
                <p className="text-[12.5px] text-iron-500">Open an issue on GitHub — maintainers reply in ~24h.</p>
              </div>
            </div>
            <a
              href="#download"
              className="rounded-full border border-onyx-600 px-5 py-2.5 text-[13px] font-semibold text-iron-200 transition-all hover:border-neon-400/40 hover:text-white"
            >
              Ask a question
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
