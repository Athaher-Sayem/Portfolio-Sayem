"use client";

import { useEffect, useRef } from "react";

/**
 * Soft accent glow that follows the pointer. Desktop-only (pointer: fine)
 * and fully disabled under prefers-reduced-motion. Updates via transform
 * (translate3d) on a single fixed layer — cheap and compositor-friendly.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const matchFine = window.matchMedia("(pointer: fine)");
    const matchReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!matchFine.matches || matchReduced.matches) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${event.clientX - 180}px, ${
          event.clientY - 180
        }px, 0)`;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-90 w-90 rounded-full opacity-40 blur-3xl [mask-image:radial-gradient(circle,#000_30%,transparent_70%)] lg:block"
      style={{
        background:
          "radial-gradient(circle, var(--accent) 0%, transparent 65%)",
      }}
    />
  );
}
