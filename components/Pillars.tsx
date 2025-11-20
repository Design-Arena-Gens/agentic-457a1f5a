"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    title: "Intentional Stillness",
    description:
      "Guided rituals inspired by 4-7-8 breathing to slow pulse and quiet mental drift.",
    highlight: "Breath-led prompts"
  },
  {
    title: "Synesthetic Flow",
    description:
      "Visual gradients and phosphene particles respond to your breath pacing and audio mix.",
    highlight: "Reactive visuals"
  },
  {
    title: "Curated Warmth",
    description:
      "Every tone is layered with gentle curves and fades for a velvety ambient experience.",
    highlight: "Soft-edged sound"
  }
];

export function Pillars() {
  return (
    <section className="space-y-6">
      <h3 className="font-display text-2xl text-white">The Euuu ritual</h3>
      <div className="grid gap-5 sm:grid-cols-3">
        {pillars.map((pillar, index) => (
          <motion.div
            key={pillar.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-200/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h4 className="font-display text-xl text-white">{pillar.title}</h4>
            <p className="mt-3 text-sm leading-relaxed">{pillar.description}</p>
            <span className="mt-4 inline-block text-xs uppercase tracking-[0.3em] text-aurora/60">
              {pillar.highlight}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
