"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Star, GitFork } from "lucide-react";
import type { Project } from "@/lib/types";
import { siteConfig } from "@/data/siteConfig";

/**
 * Project card with a spotlight that follows the cursor inside the card,
 * plus a springy 3D tilt (max ~5°, transform-only). The spotlight uses CSS
 * custom properties — no per-frame React updates. The card is an <article>;
 * all actions are real, keyboard-focusable links.
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [5, -5]), {
    stiffness: 220,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-5, 5]), {
    stiffness: 220,
    damping: 18,
  });

  const onMove = (event: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    mx.set(x);
    my.set(y);
    ref.current?.style.setProperty("--mx", `${x * 100}%`);
    ref.current?.style.setProperty("--my", `${y * 100}%`);
  };

  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const title = project.name.replace(/-/g, " ");
  const previewHref = siteConfig.galleryPreviews.includes(project.name)
    ? `${siteConfig.links.gallery}showcases/${project.name}/index.html`
    : null;

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.07 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-accent/50"
    >
      {/* Cursor spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx,50%) var(--my,50%), var(--accent-soft), transparent 70%)",
        }}
      />

      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-xs text-faint">
          {String(index + 1).padStart(2, "0")}
        </span>
        {project.featured && (
          <span className="rounded-full border border-accent/40 bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent">
            Featured
          </span>
        )}
      </div>

      <h3 className="font-display text-2xl tracking-tight text-fg">{title}</h3>

      <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-relaxed text-muted">
        {project.description || "No description provided in the repository."}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted">
        {project.language && (
          <span className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: project.languageColor }}
              aria-hidden="true"
            />
            {project.language}
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <Star size={14} className="text-faint" aria-hidden="true" />
          {project.stargazers_count}
        </span>
        <span className="flex items-center gap-1.5">
          <GitFork size={14} className="text-faint" aria-hidden="true" />
          {project.forks_count}
        </span>
        <span className="ml-auto font-mono text-xs text-faint">
          {project.lastUpdatedLabel}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4">
        <a
          href={project.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg transition-colors hover:text-accent"
        >
          Open repo <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        {project.homepage && (
          <a
            href={project.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            Live demo
          </a>
        )}
        {previewHref && (
          <a
            href={previewHref}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-xs text-faint underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            Design preview ↗
          </a>
        )}
      </div>
    </motion.article>
  );
}
