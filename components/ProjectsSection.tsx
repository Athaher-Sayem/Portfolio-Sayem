"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCw, ExternalLink, Star, GitFork, FolderOpen } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { fetchGitHubProjects } from "@/lib/github";
import type { ProjectsState, Project } from "@/lib/types";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";

function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-line bg-surface p-6">
      <div className="shimmer mb-4 h-4 w-24 rounded-full" />
      <div className="shimmer mb-3 h-7 w-3/4 rounded-lg" />
      <div className="shimmer mb-2 h-3 w-full rounded-full" />
      <div className="shimmer mb-6 h-3 w-2/3 rounded-full" />
      <div className="flex items-center justify-between">
        <div className="shimmer h-3 w-20 rounded-full" />
        <div className="shimmer h-3 w-14 rounded-full" />
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [state, setState] = useState<ProjectsState>({ status: "loading" });
  const [reloadKey, setReloadKey] = useState(0);
  const mounted = useRef(true);

  const load = useCallback(async () => {
    setState({ status: "loading" });
    const controller = new AbortController();
    try {
      const { projects, source } = await fetchGitHubProjects(controller.signal);
      if (!mounted.current) return;
      setState(
        source === "snapshot"
          ? { status: "fallback", projects, note: "Live GitHub fetch unavailable — showing build-time snapshot." }
          : { status: "ok", projects },
      );
    } catch (error) {
      if (!mounted.current) return;
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Unable to load projects",
      });
    }
    return () => controller.abort();
  }, []);

  useEffect(() => {
    mounted.current = true;
    load();
    return () => {
      mounted.current = false;
    };
  }, [load, reloadKey]);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading index="03" eyebrow="Selected work" title="Things I’ve built" accent="and shipped." />

      <div className="grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {state.status === "loading" &&
            Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SkeletonCard />
              </motion.div>
            ))}

          {(state.status === "ok" || state.status === "fallback") &&
            state.projects.map((project: Project, index: number) => (
              <motion.div key={project.id} layout>
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* States */}
      {state.status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex flex-col items-center gap-4 rounded-3xl border border-line bg-surface px-6 py-12 text-center"
        >
          <FolderOpen size={28} className="text-faint" aria-hidden="true" />
          <p className="max-w-md text-muted">
            Couldn’t load projects from GitHub right now.{" "}
            <button
              type="button"
              onClick={() => setReloadKey((key) => key + 1)}
              className="inline-flex items-center gap-1.5 font-semibold text-accent"
            >
              <RefreshCw size={14} aria-hidden="true" /> Try again
            </button>
          </p>
        </motion.div>
      )}

      {state.status === "fallback" && (
        <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-faint">
          <RefreshCw size={13} className="text-accent" aria-hidden="true" />
          {state.note}
        </p>
      )}

      {(state.status === "ok" || state.status === "fallback") &&
        state.projects.length === 0 && (
          <p className="mt-6 rounded-3xl border border-line bg-surface px-6 py-12 text-center text-muted">
            No public projects to show — your GitHub repos are either all private or
            archived.
          </p>
        )}

      <a
        href={`https://github.com/${siteConfig.githubUsername}?tab=repositories`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-accent"
      >
        View all repositories on GitHub
        <ExternalLink size={14} aria-hidden="true" />
      </a>

      <p className="mt-3 flex items-center gap-1.5 text-xs text-faint">
        <Star size={12} aria-hidden="true" /> Data pulled live from the GitHub API,
        cached for an hour, with stars and last-updated times.
      </p>
    </section>
  );
}
