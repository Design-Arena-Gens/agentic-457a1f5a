"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Bloom = {
  id: string;
  name: string;
  description: string;
  frequency: number;
  detune?: number;
  waveform: OscillatorType;
  color: string;
};

const blooms: Bloom[] = [
  {
    id: "mist",
    name: "Mist Bloom",
    description: "Bright shimmer that lifts corners of your mind skyward.",
    frequency: 140,
    detune: 2,
    waveform: "sine",
    color: "from-aurora/60 via-aurora/40 to-transparent"
  },
  {
    id: "ember",
    name: "Ember Veil",
    description: "Warm drone that cushions every slow inhale.",
    frequency: 96,
    detune: -4,
    waveform: "triangle",
    color: "from-blush/60 via-blush/40 to-transparent"
  },
  {
    id: "tide",
    name: "Tide Pulse",
    description: "Rolling pulse that mimics moonlit tidal sway.",
    frequency: 64,
    waveform: "sawtooth",
    color: "from-dusk/60 via-dusk/40 to-transparent"
  }
];

type BloomState = Record<string, boolean>;

export function SoundGarden() {
  const [isPrimed, setIsPrimed] = useState(false);
  const [activeBlooms, setActiveBlooms] = useState<BloomState>({});
  const [energy, setEnergy] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const bloomGainsRef = useRef<Record<string, GainNode>>({});
  const bloomOscillatorsRef = useRef<Record<string, OscillatorNode>>({});

  const shutdownAudio = useCallback(() => {
    const oscillators = Object.values(bloomOscillatorsRef.current);
    const gains = Object.values(bloomGainsRef.current);
    oscillators.forEach((oscillator) => {
      try {
        oscillator.stop();
      } catch {
        // ignore
      }
    });
    gains.forEach((gain) => {
      try {
        gain.disconnect();
      } catch {
        // ignore
      }
    });
    masterGainRef.current?.disconnect();
    audioContextRef.current?.close().catch(() => undefined);
  }, []);

  const ensureContext = useCallback(async () => {
    if (!audioContextRef.current) {
      const AudioClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioClass) {
        throw new Error("Web Audio API unavailable");
      }
      const context = new AudioClass();
      audioContextRef.current = context;
      const master = context.createGain();
      master.gain.value = 0.18;
      master.connect(context.destination);
      masterGainRef.current = master;
    }
    const ctx = audioContextRef.current;
    if (!ctx) return null;
    if (ctx.state === "suspended") {
      await ctx.resume();
    }
    return ctx;
  }, []);

  const toggleBloom = useCallback(
    async (bloom: Bloom) => {
      try {
        const ctx = await ensureContext();
        const master = masterGainRef.current;
        if (!ctx || !master) {
          return;
        }
        setIsPrimed(true);

        setActiveBlooms((prev) => {
          const nextState = { ...prev };
          const isActive = !!prev[bloom.id];

          if (isActive) {
            const gainNode = bloomGainsRef.current[bloom.id];
            const oscillator = bloomOscillatorsRef.current[bloom.id];
            if (gainNode && oscillator) {
              const endTime = ctx.currentTime + 1.4;
              gainNode.gain.cancelScheduledValues(ctx.currentTime);
              gainNode.gain.linearRampToValueAtTime(0.0001, endTime);
              oscillator.stop(endTime + 0.1);
              setTimeout(() => {
                oscillator.disconnect();
                gainNode.disconnect();
                delete bloomGainsRef.current[bloom.id];
                delete bloomOscillatorsRef.current[bloom.id];
              }, 1800);
            }
            delete nextState[bloom.id];
          } else {
            const osc = ctx.createOscillator();
            osc.type = bloom.waveform;
            osc.frequency.setValueAtTime(bloom.frequency, ctx.currentTime);
            if (bloom.detune) {
              osc.detune.setValueAtTime(bloom.detune, ctx.currentTime);
            }

            const gainNode = ctx.createGain();
            gainNode.gain.value = 0.0001;

            osc.connect(gainNode);
            gainNode.connect(master);

            osc.start();
            gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.28, ctx.currentTime + 1.6);

            bloomGainsRef.current[bloom.id] = gainNode;
            bloomOscillatorsRef.current[bloom.id] = osc;
            nextState[bloom.id] = true;
          }

          return nextState;
        });
      } catch (error) {
        console.error(error);
      }
    },
    [ensureContext]
  );

  useEffect(() => {
    const levels = Object.keys(activeBlooms).length;
    setEnergy(levels);
  }, [activeBlooms]);

  useEffect(() => {
    return () => {
      shutdownAudio();
    };
  }, [shutdownAudio]);

  const vibeDescriptor = useMemo(() => {
    if (energy >= 3) return "Lunar tide engaged";
    if (energy === 2) return "Drift state rising";
    if (energy === 1) return "Mist awakening";
    return "Waiting for the first bloom";
  }, [energy]);

  return (
    <section className="relative space-y-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-aurora backdrop-blur-sm">
      <div className="flex flex-col gap-3">
        <h2 className="font-display text-3xl text-white">Sound Garden</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-200/70">
          Tap to layer blooms. Each tone slips into the mix with a gentle fade, creating a
          meditative halo that mirrors your breathing cadence.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {blooms.map((bloom, index) => {
          const isActive = !!activeBlooms[bloom.id];
          return (
            <motion.button
              key={bloom.id}
              onClick={() => toggleBloom(bloom)}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition ${
                isActive ? "border-aurora/60 bg-white/10" : ""
              }`}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="relative z-10 flex flex-col gap-3"
              >
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-200/70">
                  {isActive ? "Blooming" : "Dormant"}
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition ${
                      isActive
                        ? "bg-aurora shadow-[0_0_16px_rgba(34,211,238,0.85)]"
                        : "bg-white/30"
                    }`}
                  />
                </span>
                <span className="font-display text-2xl text-white">{bloom.name}</span>
                <p className="text-sm text-slate-200/60">{bloom.description}</p>
                <div className="flex items-center gap-3 text-xs text-slate-200/50">
                  <span>{Math.round(bloom.frequency)} Hz</span>
                  <span>•</span>
                  <span>{bloom.waveform}</span>
                </div>
              </motion.div>
              <div
                className={`absolute inset-0 opacity-0 transition group-hover:opacity-100 ${
                  bloom.color
                } bg-gradient-to-br`}
              />
              {isActive && (
                <motion.div
                  layoutId="bloom-glow"
                  className="absolute -inset-8 bg-gradient-to-br from-aurora/25 via-aurora/10 to-transparent blur-3xl"
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-xs text-slate-200/60">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-aurora" />
          <span>{vibeDescriptor}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Ambient energy</span>
          <div className="flex gap-1">
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className={`h-2 w-8 rounded-full transition ${
                  energy > index ? "bg-gradient-to-r from-aurora to-dusk" : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
        {!isPrimed && (
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            Tap a bloom to awaken audio
          </span>
        )}
      </div>
    </section>
  );
}
