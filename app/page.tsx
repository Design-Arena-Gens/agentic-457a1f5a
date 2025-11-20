import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Pillars } from "@/components/Pillars";
import { SoundGarden } from "@/components/SoundGarden";
import { Testimonials } from "@/components/Testimonials";

const BreathingGuide = dynamic(
  () => import("@/components/BreathingGuide").then((m) => m.BreathingGuide),
  { ssr: false }
);
const NoiseCanvas = dynamic(
  () => import("@/components/NoiseCanvas").then((m) => m.NoiseCanvas),
  { ssr: false }
);

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent">
      <Suspense fallback={null}>
        <NoiseCanvas />
      </Suspense>
      <div className="relative z-10 flex min-h-screen flex-col gap-24 px-6 pb-24 pt-24 sm:px-12 lg:px-24">
        <header className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-300/80">
            Euuu Sound Lab
            <span className="h-2 w-2 rounded-full bg-aurora shadow-[0_0_12px_rgba(34,211,238,0.85)]" />
          </span>
          <div className="flex items-center gap-3 text-sm text-slate-300/70">
            <span className="rounded-full bg-aurora/15 px-3 py-1 text-aurora">Beta</span>
            <Link
              href="#experience"
              className="rounded-full border border-white/20 px-4 py-1.5 text-slate-200 transition hover:border-aurora/60 hover:text-white"
            >
              Experience the Flow
            </Link>
          </div>
        </header>

        <Hero />
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-16">
            <SoundGarden />
            <Pillars />
          </div>
          <Suspense fallback={null}>
            <BreathingGuide />
          </Suspense>
        </div>

        <section id="experience" className="space-y-12">
          <ExperienceTimeline />
          <Testimonials />
        </section>

        <Footer />
      </div>
    </main>
  );
}
