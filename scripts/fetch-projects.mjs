/**
 * Build-time snapshot refresher.
 *
 * Runs automatically before `next build` (see package.json "prebuild").
 * Fetches the public repos once, writes public/data/projects.json so the
 * portfolio always has honest data to render — even when the client-side
 * GitHub API call fails or hits a rate limit. The snapshot is committed.
 */
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/data/projects.json");
const USERNAME = process.env.GITHUB_USERNAME || "Athaher-Sayem";
const TOKEN = process.env.GITHUB_TOKEN || "";

const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "portfolio-sayem-build",
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

try {
  const res = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`,
    { headers },
  );
  if (!res.ok) {
    throw new Error(`GitHub API responded ${res.status}`);
  }
  const repos = await res.json();
  await mkdir(dirname(OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(repos, null, 2));
  console.log(`[snapshot] wrote ${repos.length} repos → ${OUT}`);
} catch (error) {
  console.warn(
    `[snapshot] fetch failed (${error instanceof Error ? error.message : error}); keeping existing snapshot.`,
  );
  process.exit(0); // never block the build on a missing network
}
