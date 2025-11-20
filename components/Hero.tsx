"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center">
      <div className="space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-balance font-display text-5xl font-semibold leading-tight text-white sm:text-6xl"
        >
          Sink into the euphoric hush of{" "}
          <span className="text-transparent bg-gradient-to-r from-aurora via-blush to-dusk bg-clip-text">
            Euuu
          </span>
          , your adaptive sound garden.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          className="max-w-2xl text-lg leading-relaxed text-slate-200/80"
        >
          Explore a living bloom of tones and gradients that respond to your touch. Settle
          into calm breaths, layer lush ambience, and let synesthetic visuals mirror every
          inhale and exhale. Designed to help you unplug, unwind, and rediscover the ritual
          of slow moments.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#experience"
            className="rounded-full bg-gradient-to-r from-aurora via-blush to-dusk px-6 py-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-900 shadow-aurora transition hover:scale-[1.01]"
          >
            Enter the Garden
          </a>
          <a
            href="#breathing"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-slate-100/80 transition hover:border-aurora/60 hover:text-white"
          >
            Guided Breath Session
          </a>
        </motion.div>
        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-30%" }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="grid gap-4 text-sm text-slate-200/60 sm:grid-cols-3"
        >
          <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <span className="block text-xs uppercase tracking-[0.2em] text-aurora/70">
              Adaptive Sound
            </span>
            <span className="mt-2 block font-display text-xl text-white">Generative pads</span>
          </li>
          <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <span className="block text-xs uppercase tracking-[0.2em] text-dusk/70">
              Guided Ritual
            </span>
            <span className="mt-2 block font-display text-xl text-white">
              4-7-8 breathing flow
            </span>
          </li>
          <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <span className="block text-xs uppercase tracking-[0.2em] text-blush/70">
              Visual Bloom
            </span>
            <span className="mt-2 block font-display text-xl text-white">
              Reactive gradients
            </span>
          </li>
        </motion.ul>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="relative h-[380px] overflow-hidden rounded-3xl border border-white/5 bg-white/5 shadow-aurora sm:h-[480px]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.45)_0%,_transparent_45%),radial-gradient(circle_at_bottom,_rgba(236,72,153,0.35)_0%,_transparent_55%)]" />
        <Image
          src="https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=1920&q=80"
          alt="Soft pastel lighting with abstract shapes"
          fill
          className="object-cover mix-blend-soft-light opacity-70"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 bg-gradient-to-t from-midnight via-midnight/40 to-transparent p-6">
          <span className="text-xs uppercase tracking-[0.3em] text-slate-200/70">
            Tonight&apos;s Ritual
          </span>
          <p className="font-display text-2xl text-white">Water Garden: Linger in lunar tides</p>
          <p className="text-sm text-slate-200/70">
            Layer the Mist Bloom pad with the Drift Pulse rhythm to ease into delta calm.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
