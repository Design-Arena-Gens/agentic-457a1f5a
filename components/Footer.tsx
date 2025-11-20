export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-slate-200/50 sm:flex-row">
      <span>© {new Date().getFullYear()} Euuu Sound Lab — Drip into quiet.</span>
      <div className="flex items-center gap-4">
        <a
          href="mailto:hello@euuu.studio"
          className="uppercase tracking-[0.3em] text-white/40 transition hover:text-white/80"
        >
          Reach out
        </a>
        <a
          href="https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO"
          target="_blank"
          rel="noreferrer"
          className="uppercase tracking-[0.3em] text-white/40 transition hover:text-white/80"
        >
          Evening mix
        </a>
      </div>
    </footer>
  );
}
