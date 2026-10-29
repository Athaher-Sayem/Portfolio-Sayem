/**
 * Public base path. Mirrors next.config.ts. On Vercel this should be "".
 * Keep the two in sync (or override both from the same env var).
 */
export const BASE_PATH = "/Portfolio-Sayem";

export const withBase = (path: string) =>
  `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
