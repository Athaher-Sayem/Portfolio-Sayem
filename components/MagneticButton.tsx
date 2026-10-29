"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Primary CTAs with a subtle magnetic pull. The label translates a few
 * pixels toward the cursor (spring-loaded); clicking stays reliable.
 * Desktop-only curation is handled inside the handler (pointer granularity).
 */
export function MagneticButton({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: "primary" | "ghost";
  children: ReactNode;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18 });
  const springY = useSpring(y, { stiffness: 260, damping: 18 });
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (event: React.MouseEvent) => {
    const matchFine = window.matchMedia("(pointer: fine)");
    const matchReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!matchFine.matches || matchReduced.matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    variant === "primary"
      ? "bg-accent text-ink hover:bg-accent/90"
      : "border border-line text-fg hover:border-accent hover:text-accent";

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 font-semibold transition-colors ${base}`}
    >
      {children}
    </motion.a>
  );
}
