"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Languages, GraduationCap } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { withBase } from "@/lib/base";

const quickFacts = [
  { icon: MapPin, label: "Based in", value: siteConfig.location },
  { icon: Languages, label: "I speak", value: siteConfig.languages },
  {
    icon: GraduationCap,
    label: "Currently",
    value: "CSE @ DIU, Dhaka",
  },
];

export function About({ publicRepoCount }: { publicRepoCount: number }) {
  const yearsCoding = new Date().getFullYear() - siteConfig.startedCodingYear;

  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="mb-12">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-faint">
          <span className="mr-3 text-accent">01</span>About
        </p>
        <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] leading-tight tracking-tight">
          A builder’s mindset, <em className="text-accent">a learner’s curiosity.</em>
        </h2>
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        {/* Portrait frame */}
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <div className="group relative overflow-hidden rounded-3xl border border-line bg-surface">
            <div
              className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(360px at 50% 0%, var(--accent-soft), transparent 70%)",
              }}
            />
            <Image
              src={withBase("/sayem.webp")}
              alt={`Portrait of ${siteConfig.name}`}
              width={720}
              height={880}
              priority
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute bottom-4 left-4 z-20 rounded-full border border-line bg-ink/80 px-4 py-2 text-xs text-fg backdrop-blur">
              {siteConfig.role}
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {quickFacts.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3"
              >
                <Icon size={16} className="text-accent" aria-hidden="true" />
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-faint">{label}</p>
                  <p className="text-sm text-fg">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-lg leading-relaxed text-muted">
              I’m <strong className="text-fg">{siteConfig.name}</strong> — a full-stack
              engineer who cares about the whole arc of a product: understanding the
              problem, shaping the data, building a reliable API, and making the final
              interface feel effortless.
            </p>
            <p className="mt-5 leading-relaxed text-muted">
              The projects on this page span commerce platforms, news pipelines, RAG
              document chat systems, and ML experiments. Most are completely self-directed
              — built to learn, documented to teach, and shipped to be used.
            </p>
            <p className="mt-5 leading-relaxed text-muted">
              When I’m not engineering, I’m helping other students learn programming,
              networking, and algorithms as a lab teaching assistant — because the best
              way to deepen your own understanding is to explain it to someone else.
            </p>
          </Reveal>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 border-y border-line py-8">
            <motion.div className="text-center sm:text-left">
              <Counter value={yearsCoding} suffix="+" />
              <p className="mt-1 text-sm text-muted">Years coding</p>
            </motion.div>
            <motion.div className="text-center sm:text-left">
              <Counter value={publicRepoCount} />
              <p className="mt-1 text-sm text-muted">Public repos</p>
            </motion.div>
            <motion.div className="text-center sm:text-left">
              <Counter value={siteConfig.achievements.length} />
              <p className="mt-1 text-sm text-muted">Notable achievements</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
