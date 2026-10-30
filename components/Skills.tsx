"use client";

import { siteConfig } from "@/data/siteConfig";
import { Reveal } from "@/components/Reveal";

/** Infinite marquee row — pauses on hover, disabled under reduced motion via CSS. */
function Marquee() {
  const items = [...siteConfig.techMarquee, ...siteConfig.techMarquee];
  return (
    <div
      className="marquee relative overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max items-center gap-10">
        {items.map((tech, index) => (
          <span
            key={`${tech}-${index}`}
            className="flex items-center gap-10 font-display text-2xl text-muted"
          >
            {tech}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-faint">
            <span className="mr-3 text-accent">02</span>Stack
          </p>
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] leading-tight tracking-tight">
            Tools I reach for <em className="text-accent-bright">every day.</em>
          </h2>
        </div>
      </Reveal>

      <Reveal className="mb-10">
        <Marquee />
      </Reveal>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(siteConfig.skills).map(([group, items]) => (
          <Reveal key={group}>
            <div className="h-full rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-accent/40">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-xl tracking-tight">{group}</h3>
                <span className="font-mono text-xs text-faint">
                  {String(items.length).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-line bg-soft px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-fg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
