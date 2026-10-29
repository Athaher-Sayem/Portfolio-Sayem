"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { MagneticButton } from "@/components/MagneticButton";

/** Word-by-word reveal for the headline lines. */
const lineVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

function WordLine({ line }: { line: string }) {
  const words = line.split(" ");
  return (
    <motion.span
      variants={lineVariants}
      initial="hidden"
      animate="visible"
      className="block"
      aria-label={line}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordVariants}
          className={`mr-[0.22em] inline-block ${
            i === 0 && line.includes("useful") ? "text-accent" : ""
          }`}
          aria-hidden="true"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-36 sm:pt-44">
      {/* Atmosphere: low-opacity gradient blobs + dot grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="blob-a absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-accent/[0.07] blur-3xl" />
        <div className="blob-b absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-indigo-500/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--line) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse 70% 55% at 60% 20%, #000 20%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 55% at 60% 20%, #000 20%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2"
        >
          <span className="pulse-dot h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          <span className="text-sm text-muted">{siteConfig.availability}</span>
        </motion.div>

        <h1 className="font-display text-[clamp(3rem,9.5vw,7rem)] leading-[1.02] tracking-tight">
          <WordLine line={siteConfig.heroLine1} />
          <WordLine line={siteConfig.heroLine2} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
        >
          {siteConfig.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="#projects" variant="primary">
            View Work <ArrowDown size={17} aria-hidden="true" />
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Get in Touch <ArrowRight size={17} aria-hidden="true" />
          </MagneticButton>
          <span className="flex items-center gap-2 text-sm text-faint">
            <Sparkles size={14} aria-hidden="true" />
            {siteConfig.tagline}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
