import { siteConfig, languageColors } from "@/data/siteConfig";
import type { GitHubRepo, Project } from "@/lib/types";

const SNAPSHOT_PATH = "/data/projects.json";
const CACHE_KEY = "pf:github-repos:v1";
const CACHE_TTL_MS = 60 * 60 * 1000; // revalidate every 1 hour

/** Relative time like GitHub's: "3 weeks ago". */
export function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const seconds = Math.max(1, Math.floor((Date.now() - then) / 1000));
  const units: Array<[string, number]> = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [label, span] of units) {
    if (seconds >= span) {
      const n = Math.floor(seconds / span);
      return `${n} ${label}${n > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
}

export function normalizeProjects(raw: GitHubRepo[]): Project[] {
  const visible = raw.filter(
    (repo) =>
      !repo.fork &&
      !repo.archived &&
      !siteConfig.exclude.includes(repo.name),
  );
  const rank = (repo: GitHubRepo) => {
    const featured = siteConfig.featured.includes(repo.name);
    const stars = repo.stargazers_count;
    const pushed = new Date(repo.pushed_at).getTime();
    return { featured, stars, pushed };
  };
  // Featured first → stars → most recently pushed.
  const sorted = [...visible].sort((a, b) => {
    const ra = rank(a);
    const rb = rank(b);
    if (ra.featured !== rb.featured) return ra.featured ? -1 : 1;
    if (ra.stars !== rb.stars) return rb.stars - ra.stars;
    return rb.pushed - ra.pushed;
  });
  return sorted.slice(0, 6).map((repo) => ({
    ...repo,
    featured: siteConfig.featured.includes(repo.name),
    languageColor:
      (repo.language && languageColors[repo.language]) || "#6b7280",
    lastUpdatedLabel: relativeTime(repo.pushed_at),
  }));
}

/** Embedded snapshot (refreshed at build time by scripts/fetch-projects.mjs). */
export async function readSnapshot(): Promise<GitHubRepo[]> {
  const res = await fetch(SNAPSHOT_PATH, { cache: "no-store" });
  if (!res.ok) throw new Error("Snapshot unavailable");
  return res.json();
}

interface CacheEntry {
  t: number;
  payload: GitHubRepo[];
}

function readCache(): GitHubRepo[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry;
    if (Date.now() - entry.t > CACHE_TTL_MS) return null;
    return entry.payload;
  } catch {
    return null;
  }
}

function writeCache(payload: GitHubRepo[]) {
  try {
    const entry: CacheEntry = { t: Date.now(), payload };
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    /* storage full/blocked — non-fatal */
  }
}

/**
 * Fetch live GitHub repos with graceful degradation:
 * fresh cache → network → stale cache → committed snapshot.
 * Network path has a hard timeout so a slow API never blocks paint.
 */
export async function fetchGitHubProjects(
  signal?: AbortSignal,
): Promise<{ projects: Project[]; source: string }> {
  const cached = readCache();
  if (cached) return { projects: normalizeProjects(cached), source: "cache" };

  const timeout = AbortSignal.timeout(6000);
  const combined = signal
    ? AbortSignal.any([signal, timeout])
    : timeout;

  try {
    const res = await fetch(
      `https://api.github.com/users/${siteConfig.githubUsername}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        signal: combined,
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const data = (await res.json()) as GitHubRepo[];
    writeCache(data);
    return { projects: normalizeProjects(data), source: "github" };
  } catch (error) {
    // Serve stale cache, then the build-time snapshot.
    if (cached) return { projects: normalizeProjects(cached), source: "cache" };
    const snapshot = await readSnapshot();
    return { projects: normalizeProjects(snapshot), source: "snapshot" };
  }
}
