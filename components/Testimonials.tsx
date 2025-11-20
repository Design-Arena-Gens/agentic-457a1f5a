"use client";

import { motion } from "framer-motion";

const quotes = [
  {
    name: "Naomi, visual poet",
    quote:
      "Euuu has become my twilight ritual. The blooms feel tender, almost like the app is breathing with me."
  },
  {
    name: "Jonah, ambient producer",
    quote:
      "Layering Mist and Tide gives me a tidepool hum that sends me straight into creative flow. It's a sonic sanctuary."
  },
  {
    name: "Priya, yoga guide",
    quote:
      "My students melt into the breath sequence. The visuals paint exactly the soft energy I want in class."
  }
];

export function Testimonials() {
  return (
    <section className="space-y-8">
      <h3 className="font-display text-2xl text-white">Whispers from the garden</h3>
      <div className="grid gap-6 sm:grid-cols-3">
        {quotes.map((quote, index) => (
          <motion.blockquote
            key={quote.name}
            className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-200/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.55, delay: index * 0.1 }}
          >
            <p className="text-sm leading-relaxed">“{quote.quote}”</p>
            <footer className="text-xs uppercase tracking-[0.3em] text-white/50">
              {quote.name}
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
