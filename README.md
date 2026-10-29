# Portfolio Sayem

A modern, static portfolio for **Md. Athaher Sayem Fahim** — full-stack developer.

**Live site:** https://athaher-sayem.github.io/Portfolio-Sayem/

## What’s inside

- `index.html` — single page portfolio: hero, selected work with filters, design-gallery link, about, experience, contact.
- `resume.html` — print-friendly résumé page.
- `assets/` — self-hosted font, portrait, gallery screenshot, social card, styles, and interaction script.
- `.github/workflows/pages.yml` — builds and deploys the static site to GitHub Pages from `main`.

## Local preview

```bash
python -m http.server 8000 --directory .
# open http://127.0.0.1:8000/
```

## Performance & honesty notes

- No framework or CDN dependency: one font woff2, two small webp images, one CSS file, one deferred JS file.
- Project visuals are **original concept illustrations**, not production screenshots.
- Project summaries reflect the owner’s CV. Private repositories are described without linking their code; the public design gallery link is clearly labeled as a preview collection, not a live product deployment.

## Tests

```bash
python -m pytest tests/test_portfolio.py
```

Covers no-JS content, filtering, case-study dialog, mobile navigation, responsive layout at 320–1440 px, asset integrity, and size budgets.
