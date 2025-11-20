"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Phase = "inhale" | "hold" | "exhale" | "idle";

const PHASE_SEQUENCE: Phase[] = ["inhale", "hold", "exhale"];
const DURATIONS: Record<Exclude<Phase, "idle">, number> = {
  inhale: 4,
  hold: 7,
  exhale: 8
};

export function BreathingGuide() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [rounds, setRounds] = useState(0);
  const frameRef = useRef<number>();
  const startedAtRef = useRef<number>();
  const phaseIndexRef = useRef(0);
  const isRunning = phase !== "idle";

  const totalDuration = useMemo(() => {
    if (phase === "idle") return 0;
    return DURATIONS[phase];
  }, [phase]);

  const progress = totalDuration ? Math.min(elapsed / totalDuration, 1) : 0;

  const startSequence = useCallback(() => {
    phaseIndexRef.current = 0;
    setPhase("inhale");
    setElapsed(0);
    startedAtRef.current = performance.now();
  }, []);

  const stopSequence = useCallback(() => {
    setPhase("idle");
    setElapsed(0);
    frameRef.current && cancelAnimationFrame(frameRef.current);
  }, []);

  const advancePhase = useCallback(() => {
    phaseIndexRef.current = (phaseIndexRef.current + 1) % PHASE_SEQUENCE.length;
    const nextPhase = PHASE_SEQUENCE[phaseIndexRef.current];
    setPhase(nextPhase);
    setElapsed(0);
    startedAtRef.current = performance.now();
    if (nextPhase === "inhale") {
      setRounds((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const tick = (timestamp: number) => {
      if (!startedAtRef.current) {
        startedAtRef.current = timestamp;
      }
      const delta = (timestamp - startedAtRef.current) / 1000;
      setElapsed(delta);
      const duration = totalDuration;
      if (duration && delta >= duration) {
        advancePhase();
      } else {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [advancePhase, isRunning, totalDuration]);

  const phaseLabel = phase === "idle" ? "Ready?" : phase.charAt(0).toUpperCase() + phase.slice(1);

  return (
    <section
      id="breathing"
      className="relative flex h-full flex-col justify-between gap-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/[0.04] to-transparent p-8 shadow-aurora backdrop-blur"
    >
      <div className="space-y-4">
        <h2 className="font-display text-3xl text-white">Breath Ritual</h2>
        <p className="text-sm leading-relaxed text-slate-200/70">
          Follow the glowing orb through a 4-7-8 cadence. Complete three rounds to unlock
          deep parasympathetic calm.
        </p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <motion.div
          key={phase}
          animate={{ scale: isRunning ? 1.1 : 1, rotate: isRunning ? 360 : 0 }}
          transition={{ repeat: isRunning ? Infinity : 0, duration: 10, ease: "linear" }}
          className="relative flex h-72 w-72 items-center justify-center"
        >
          <svg className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(34,211,238,0.9)" />
                <stop offset="100%" stopColor="rgba(99,102,241,0.6)" />
              </linearGradient>
            </defs>
            <circle
              cx="50%"
              cy="50%"
              r="46%"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="46%"
              fill="none"
              stroke="url(#strokeGradient)"
              strokeWidth="3"
              strokeDasharray={2 * Math.PI * ((46 / 100) * 144)}
              strokeDashoffset={2 * Math.PI * ((46 / 100) * 144) * (1 - progress)}
              strokeLinecap="round"
              transition={{ ease: "easeInOut", duration: 0.5 }}
            />
          </svg>
          <motion.div
            animate={{
              scale:
                phase === "inhale" ? 1.05 : phase === "hold" ? 1 : phase === "exhale" ? 0.92 : 1,
              opacity: phase === "idle" ? 0.7 : 1,
              boxShadow:
                phase === "idle"
                  ? "0 0 60px rgba(148,163,184,0.25)"
                  : "0 0 110px rgba(99,102,241,0.3)"
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="relative flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-aurora/50 via-blush/40 to-dusk/40 backdrop-blur"
          >
            <span className="font-display text-2xl text-white">{phaseLabel}</span>
            <span className="absolute bottom-6 text-sm text-slate-200/70">
              {phase === "idle" ? "Tap start" : `${Math.max(0, totalDuration - elapsed).toFixed(1)}s`}
            </span>
          </motion.div>
        </motion.div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-200/60">
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => (isRunning ? stopSequence() : startSequence())}
            className="rounded-full border border-white/20 px-4 py-2 font-semibold uppercase tracking-[0.2em] text-white transition hover:border-aurora/60"
          >
            {isRunning ? "Pause" : "Begin Flow"}
          </motion.button>
          <button
            onClick={() => {
              setRounds(0);
              setPhase("idle");
              setElapsed(0);
            }}
            className="rounded-full border border-white/10 px-3 py-2 uppercase tracking-[0.3em] text-white/40 transition hover:border-white/20 hover:text-white/70"
          >
            Reset
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span>Rounds</span>
          <div className="flex gap-1">
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className={`h-2.5 w-8 rounded-full ${
                  rounds > index ? "bg-gradient-to-r from-aurora to-blush" : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span>Cadence</span>
          <span className="font-mono text-white/80">4 • 7 • 8</span>
        </div>
      </div>
    </section>
  );
}
