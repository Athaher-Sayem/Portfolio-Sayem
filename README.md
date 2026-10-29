# Portfolio Sayem

A modern, dark-first single-page portfolio for **Md. Athaher Sayem Fahim** — built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion and lucide-react. Project data is pulled **live from the GitHub API** with graceful fallback.

**Live site:** https://athaher-sayem.github.io/Portfolio-Sayem/

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + CSS variables |
| Motion | Framer Motion (`MotionConfig reducedMotion="user"`) |
| Icons | lucide-react |
| Fonts | `next/font` — Instrument Serif (display) + Inter (body) |
| Data | GitHub REST API (client-side) with 1h localStorage cache + build-time snapshot |

## Starter structure

```
├── app/
│   ├── layout.tsx          # metadata, fonts, theme bootstrap, JSON-LD
│   ├── page.tsx            # assembles sections in order
│   ├── globals.css         # Tailwind v4 theme + design tokens + keyframes
│   └── resume/page.tsx     # print-friendly résumé
├── components/
│   ├── SiteNav.tsx         # sticky blur nav, active-section underline, mobile menu
│   ├── Hero.tsx            # word-by-word headline, floating blobs, status pill
│   ├── MagneticButton.tsx  # cursor-magnetic primary CTA
│   ├── CursorGlow.tsx      # accent glow following the pointer (desktop only)
│   ├── About.tsx           # portrait frame, quick facts, animated counters
│   ├── Skills.tsx          # infinite marquee + grouped chips
│   ├── ProjectsSection.tsx # fetch states, skeletons, error/empty fallbacks
│   ├── ProjectCard.tsx     # 3D tilt + cursor spotlight card
│   ├── Experience.tsx      # timeline with draw-in line
│   ├── Contact.tsx         # mailto + copy-to-clipboard toast
│   ├── Reveal.tsx          # shared scroll-reveal variants
│   └── PrintButton.tsx
├── data/siteConfig.ts      # ★ EDIT THIS: name, links, featured repos, accent
├── lib/
│   ├── github.ts           # fetch + normalize + caching + fallback
│   └── types.ts
├── public/data/projects.json  # committed snapshot (refreshed at build time)
├── scripts/fetch-projects.mjs # prebuild snapshot refresher
└── tests/e2e_portfolio.py     # Playwright suite (run with pytest)
```

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → out/ (runs snapshot refresh first)
npm run typecheck
python -m pytest tests/e2e_portfolio.py   # requires built out/
```

## How the project data works

1. On load, a request goes to
   `GET https://api.github.com/users/Athaher-Sayem/repos?sort=updated&per_page=100`.
2. Forked, archived, and excluded repos are filtered; featured repos sort first,
   then stars, then last push; the top 6 render.
3. The result is cached in localStorage for **1 hour** (fresh cache → network →
   stale cache → committed snapshot).
4. If GitHub is unreachable, the site falls back to `public/data/projects.json`
   (captured at build time) and shows a small notice.

## Editing your info

Everything you’re likely to change lives in **`data/siteConfig.ts`**:

- Name, role, tagline, bio, location
- Email / GitHub / LinkedIn / X / resume links
- `featured` — repo names to pin first
- `exclude` — repo names to hide
- `galleryPreviews` — repos that also have a public design preview
- `accent` — your accent hex (used everywhere via CSS variables)
- Skills, tech marquee, experience, education, achievements

### Swapping the accent color

Change the hex in one place:

1. `data/siteConfig.ts` → `accent: "#D4FF4F"` (used for runtime substrate).
2. `app/globals.css` → `--accent`, `--accent-soft`, plus the light-mode
   `--accent` / `--accent-soft` values under `html.light`.

The `--accent` variables drive all buttons, underlines, dots, glow layers and
hover states — no component edits needed.

## Deployment

### GitHub Pages (current)

`.github/workflows/pages.yml` builds and publishes the static export to the
existing `https://athaher-sayem.github.io/Portfolio-Sayem/` automatically on
every push to `main`.

### Vercel (alternative)

1. Push this repo to GitHub.
2. In Vercel → **Add New Project** → import `Portfolio-Sayem`.
3. Framework preset **Next.js** is auto-detected; keep defaults.
4. Deploy — no environment variables are required. Live data flows straight
   from the public GitHub API (Vercel’s serverless functions are not needed
   for this static export).

### Notes

- The build calls the GitHub API once to refresh the snapshot; set
  `GITHUB_TOKEN` as a build env var to unlock higher rate limits for that step
  (optional).
- With `output: "export"`, all routes are pre-rendered; the GitHub fetch is a
  progressive enhancement on top of the snapshot.

## Accessibility & performance

- Skip-to-content link, semantic landmarks, heading hierarchy, visible focus
  rings, keyboard-navigable menu and cards.
- Dark/light theme persisted to localStorage, honouring `prefers-color-scheme`.
- All motion respects `prefers-reduced-motion: reduce` (transform animations
  disabled; opacity-only fades kept).
- Transform/opacity-only animation; self-hosted fonts; two small images; no
  external CDNs. E2E suite covers 375–1920 px, console errors, failed
  responses, and interaction states.
