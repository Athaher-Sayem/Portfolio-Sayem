"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Light/dark toggle. Persists to localStorage and honours the system
 * preference on first visit (the inline bootstrap handles first paint).
 */
export function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem("pf:theme");
    const initial =
      stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(initial);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
    window.localStorage.setItem("pf:theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      onClick={() => setDark((value) => !value)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:text-accent"
    >
      {dark ? <Moon size={17} aria-hidden="true" /> : <Sun size={17} aria-hidden="true" />}
    </motion.button>
  );
}
