import { Logo } from "./primitives";

const COLUMNS = [
  {
    t: "Product",
    links: [
      ["Features", "#features"],
      ["AI Coach", "#ai-coach"],
      ["Nutrition", "#nutrition"],
      ["Leaderboard", "#leaderboard"],
      ["Progress Reports", "#progress"],
      ["Pricing", "#pricing"],
    ],
  },
  {
    t: "Training",
    links: [
      ["PPL Hypertrophy", "#features"],
      ["Upper / Lower", "#features"],
      ["5×5 Strength", "#features"],
      ["Body Recomposition", "#nutrition"],
      ["Calisthenics", "#features"],
      ["Deload Protocols", "#ai-coach"],
    ],
  },
  {
    t: "Resources",
    links: [
      ["FAQ", "#faq"],
      ["GitHub Repo", "#"],
      ["Changelog", "#"],
      ["Privacy Policy", "#"],
      ["Terms of Use", "#"],
      ["MIT License", "#"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-onyx-700/70 bg-[linear-gradient(180deg,rgba(11,13,17,0.6),rgba(8,9,12,1))]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-[13.5px] leading-relaxed text-iron-500">
              The AI-powered gym companion for serious lifters. Offline-first, privacy-absolute, and relentlessly
              focused on progressive overload.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-onyx-700 bg-onyx-850/70 px-3.5 py-2 text-[12px] font-semibold text-iron-300">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
                  <path d="M13.2 1.5 4.3 10.4l2.9 2.9 5.9-5.9h5.7L13.2 1.5Z" fill="#44d1fd" />
                  <path d="M13.2 22.5 8.4 17.7l4.8-4.8h5.7l-5.7 5.7 2.6 2.6-2.6 1.3Z" fill="#00a859" />
                  <path d="m7.2 13.3 2.9-2.9 2.9 2.9-2.9 2.9-2.9-2.9Z" fill="#00e676" />
                </svg>
                Built with Flutter &amp; Riverpod
              </span>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full border border-onyx-700 bg-onyx-850/70 px-3.5 py-2 text-[12px] font-semibold text-iron-300 transition-all hover:border-neon-400/35 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
                  <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.1c-3.2.7-3.88-1.37-3.88-1.37-.53-1.35-1.3-1.71-1.3-1.71-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>
                GitHub
              </a>
            </div>

            <div className="mt-6 flex gap-2.5">
              {[
                ["X", "M18.9 2H22l-7 8 8.2 12h-6.4l-5-7.3L6 22H3l7.5-8.6L2.6 2H9l4.5 6.7L18.9 2Z"],
                ["Reddit", "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm5 9.2c0 3-2.2 4.8-5 4.8s-5-1.8-5-4.8c0-.6.2-1.1.6-1.5-.1-.3-.1-.6 0-.9.5-1.3 2.3.3 2.3.3a8 8 0 0 1 4.2 0s1.8-1.6 2.3-.3c.1.3.1.6 0 .9.4.4.6.9.6 1.5Z"],
                ["Discord", "M19.5 5.3A16 16 0 0 0 15.6 4l-.3.5a13 13 0 0 1 3.4 1.7 12 12 0 0 0-10.6 0A13 13 0 0 1 11.6 4l-.3-.5a16 16 0 0 0-3.9 1.3C4.5 9.3 3.7 13.2 4.1 17a16 16 0 0 0 4.9 2.5l.9-1.4a10 10 0 0 1-1.6-.8l.4-.3a11.4 11.4 0 0 0 9.7 0l.4.3c-.5.3-1 .6-1.6.8l.9 1.4a16 16 0 0 0 4.9-2.5c.5-4.5-.8-8.4-2.5-11.7ZM9.7 14.8c-.9 0-1.7-.9-1.7-1.9s.8-1.9 1.7-1.9 1.7.9 1.7 1.9-.7 1.9-1.7 1.9Zm4.6 0c-.9 0-1.7-.9-1.7-1.9s.8-1.9 1.7-1.9 1.7.9 1.7 1.9-.7 1.9-1.7 1.9Z"],
              ].map(([l, d]) => (
                <a
                  key={l}
                  href="#"
                  aria-label={l}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-onyx-700 bg-onyx-850/70 text-iron-400 transition-all hover:-translate-y-0.5 hover:border-neon-400/35 hover:text-neon-400"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                    <path d={d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.t}>
                <p className="text-[11px] font-bold tracking-[0.2em] text-iron-500 uppercase">{col.t}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map(([l, h]) => (
                    <li key={l}>
                      <a
                        href={h}
                        className="text-[13.5px] text-iron-400 transition-colors hover:text-neon-400"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-onyx-700/70 pt-7 sm:flex-row">
          <p className="text-[12.5px] text-iron-600">
            © {new Date().getFullYear()} OnyxFit. Released under the{" "}
            <a href="#" className="text-iron-400 underline decoration-onyx-600 underline-offset-2 hover:text-neon-400">
              MIT License
            </a>
            .
          </p>
          <div className="flex items-center gap-5 text-[12.5px] text-iron-600">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-blip rounded-full bg-neon-400" />
              All systems offline-ready
            </span>
            <a href="#" className="transition-colors hover:text-neon-400">
              Privacy
            </a>
            <a href="#top" className="transition-colors hover:text-neon-400">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
