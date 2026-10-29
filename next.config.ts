import type { NextConfig } from "next";

/**
 * The site publishes to GitHub Pages under /Portfolio-Sayem/.
 * On Vercel (own domain) the base path should be empty — VERCEL env is set there.
 */
const basePath = process.env.VERCEL ? "" : "/Portfolio-Sayem";

const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default config;
