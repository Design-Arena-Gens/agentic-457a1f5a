"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Arrival",
    caption: "Settle into a softer tempo",
    detail:
      "Dim your screen, slip on headphones, and invite a glass of water beside you. The garden responds to your ease."
  },
  {
    title: "Breath Sync",
    caption: "Guided 4-7-8 ritual",
    detail:
      "Follow the luminous orb through three rounds. Notice shoulders fall, jaw unclench, and pulse steady."
  },
  {
    title: "Bloom Layering",
    caption: "Craft your soundscape",
    detail:
      "Blend blooms to sculpt warmth. Shift between Mist, Ember, and Tide to match the energy you long for."
  },
  {
    title: "Release",
    caption: "Float in the resonance",
    detail:
      "Stay as long as you crave. When ready, exhale gratitude and archive a note of how your mind now feels."
  }
];

export function ExperienceTimeline() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-2">
        <h3 className="font-display text-2xl text-white">Experience Flow</h3>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-200/70">
          Let the garden pace your evening wind-down. Each step is designed to usher you
          gently from stimulation to steady serenity.
        </p>
      </header>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm shadow-aurora/20 sm:grid-cols-[0.35fr_1fr]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
          >
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-aurora/60">
                Step {index + 1}
              </span>
              <h4 className="font-display text-xl text-white">{step.title}</h4>
              <span className="text-sm text-slate-200/60">{step.caption}</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-200/70">{step.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
