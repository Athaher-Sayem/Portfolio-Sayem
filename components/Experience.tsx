"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, GraduationCap, Trophy } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 45%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading index="04" eyebrow="Journey" title="Experience &" accent="milestones." />

      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Experience timeline */}
        <div ref={timelineRef} className="relative pl-8">
          {/* Draw-in line */}
          <motion.div
            aria-hidden="true"
            className="absolute left-0 top-1 bottom-1 w-px origin-top bg-line"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute left-0 top-1 bottom-1 w-px origin-top bg-accent"
          />

          <div className="mb-8 flex items-center gap-2.5">
            <Briefcase size={16} className="text-accent" aria-hidden="true" />
            <h3 className="text-sm font-semibold uppercase tracking-widest text-faint">
              Experience
            </h3>
          </div>

          <div className="space-y-10">
            {siteConfig.experience.map((item, index) => (
              <Reveal key={`${item.company}-${index}`}>
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-8 top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-bg"
                  />
                  <p className="font-mono text-xs text-faint">{item.period}</p>
                  <h4 className="mt-1.5 font-display text-xl tracking-tight">{item.role}</h4>
                  <p className="text-sm text-accent">{item.company}</p>
                  <ul className="mt-3 space-y-2 text-sm text-muted">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Education + achievements */}
        <div>
          <div className="mb-8 flex items-center gap-2.5">
            <GraduationCap size={16} className="text-accent" aria-hidden="true" />
            <h3 className="text-sm font-semibold uppercase tracking-widest text-faint">
              Education
            </h3>
          </div>

          <div className="space-y-4">
            {siteConfig.education.map((entry) => (
              <Reveal key={entry.degree}>
                <div className="rounded-3xl border border-line bg-surface p-5 transition-colors hover:border-accent/40">
                  <p className="font-mono text-xs text-faint">{entry.period}</p>
                  <h4 className="mt-1.5 font-display text-lg tracking-tight">{entry.degree}</h4>
                  <p className="text-sm text-muted">{entry.school}</p>
                  {entry.note && (
                    <span className="mt-2.5 inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                      {entry.note}
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mb-6 mt-10 flex items-center gap-2.5">
            <Trophy size={16} className="text-accent" aria-hidden="true" />
            <h3 className="text-sm font-semibold uppercase tracking-widest text-faint">
              Achievements
            </h3>
          </div>

          <div className="space-y-3">
            {siteConfig.achievements.map((achievement, index) => (
              <Reveal key={achievement.label} delay={index * 0.05}>
                <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
                  <p className="text-sm font-medium text-fg">{achievement.label}</p>
                  <p className="font-mono text-xs text-faint">{achievement.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
