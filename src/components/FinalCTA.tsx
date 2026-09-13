import { useMemo } from "react";
import gymBg from "../assets/gym-ambient.jpg";
import { ArrowIcon, Eyebrow, Reveal, StoreBadge } from "./primitives";

/* Deterministic decorative QR-style matrix (visual only). */
function QRMatrix({ size = 25 }: { size?: number }) {
  const cells = useMemo(() => {
    let seed = 20260214;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    const grid: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

    const inFinder = (r: number, c: number) => {
      const zones = [
        [0, 0],
        [0, size - 7],
        [size - 7, 0],
      ];
      return zones.some(([zr, zc]) => r >= zr - 1 && r <= zr + 7 && c >= zc - 1 && c <= zc + 7);
    };

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (inFinder(r, c)) continue;
        grid[r][c] = rnd() > 0.52;
      }
    }

    // finder patterns
    const drawFinder = (zr: number, zc: number) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          const edge = r === 0 || r === 6 || c === 0 || c === 6;
          const core = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          grid[zr + r][zc + c] = edge || core;
        }
      }
    };
    drawFinder(0, 0);
    drawFinder(0, size - 7);
    drawFinder(size - 7, 0);

    // alignment pattern
    const ar = size - 9;
    const ac = size - 9;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        const edge = r === 0 || r === 4 || c === 0 || c === 4;
        grid[ar + r][ac + c] = edge || (r === 2 && c === 2);
      }
    }

    // timing lines
    for (let i = 8; i < size - 8; i++) {
      grid[6][i] = i % 2 === 0;
      grid[i][6] = i % 2 === 0;
    }

    return grid;
  }, [size]);

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full" shapeRendering="crispEdges" aria-hidden>
      <rect width={size} height={size} fill="#ffffff" />
      {cells.map((row, r) =>
        row.map((on, c) =>
          on ? <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill="#0b0d11" /> : null,
        ),
      )}
    </svg>
  );
}

export default function FinalCTA() {
  return (
    <section id="download" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      {/* ambient radial glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-[46rem] w-[80rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,230,118,0.2),rgba(0,102,255,0.09)_55%,transparent)] blur-3xl" />
        <div className="grid-lines absolute inset-0 opacity-60 [mask-image:radial-gradient(55%_55%_at_50%_50%,#000,transparent)]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[34px] border border-neon-400/22 bg-[linear-gradient(160deg,rgba(26,29,36,0.92),rgba(11,13,17,0.96))] p-8 shadow-[0_60px_120px_-60px_rgba(0,230,118,0.55)] backdrop-blur-2xl sm:p-12 lg:p-16">
            {/* inner glow edges */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.16] mix-blend-luminosity [mask-image:linear-gradient(to_left,rgba(0,0,0,0.9),transparent_70%)]"
              style={{ backgroundImage: `url(${gymBg})` }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-400/60 to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-neon-400/12 blur-3xl"
            />

            <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.25fr_auto]">
              <div className="text-center lg:text-left">
                <Eyebrow tone="neon">🚀 Free · Offline · No account</Eyebrow>

                <h2 className="mt-6 font-display text-[2.1rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance text-white sm:text-[3rem] lg:text-[3.4rem]">
                  Ready to Build Your{" "}
                  <span className="text-gradient-neon">Strongest Physique?</span>
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-pretty text-iron-400 lg:mx-0">
                  Install OnyxFit, open it in the gym and log your first set within ten seconds. No sign-up, no
                  onboarding maze, no credit card — just the iron and a coach that never stops paying attention.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  <StoreBadge store="apple" />
                  <StoreBadge store="google" />
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-[12.5px] text-iron-500 lg:justify-start">
                  {["⚡ 14 MB install", "🔒 Zero telemetry", "★ 4.9 from 2,140 lifters"].map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>

              {/* QR */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div
                    aria-hidden
                    className="absolute -inset-4 animate-pulse-glow rounded-3xl bg-[radial-gradient(closest-side,rgba(0,230,118,0.4),transparent)] blur-xl"
                  />
                  <div className="relative rounded-3xl border border-onyx-600 bg-white p-3.5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]">
                    <div className="h-[168px] w-[168px] overflow-hidden rounded-xl">
                      <QRMatrix />
                    </div>
                    {/* center logo chip */}
                    <span className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl border-[3px] border-white bg-onyx-900">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                        <path
                          d="M4 9v6M7 7.5v9M17 7.5v9M20 9v6M7 12h10"
                          stroke="#00e676"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <p className="max-w-[190px] text-center text-[12.5px] leading-snug text-iron-400">
                  Scan to install <span className="font-semibold text-white">OnyxFit</span> straight to your phone
                </p>
                <a
                  href="#top"
                  className="group inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-neon-400 transition-colors hover:text-neon-400/80"
                >
                  or explore the web demo
                  <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
