"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Reveal } from "@/components/Reveal";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.links.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked — the mailto link remains as fallback */
    }
  };

  const socials = [
    { label: "GitHub", href: siteConfig.links.github, icon: Github },
    { label: "LinkedIn", href: siteConfig.links.linkedin, icon: Linkedin },
    { label: "Email", href: `mailto:${siteConfig.links.email}`, icon: Mail },
  ].filter((item) => item.href);

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="blob-b absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.06] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-24 text-center sm:px-8 sm:py-36">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-faint">
            <span className="mr-3 text-accent">05</span>Contact
          </p>
          <h2 className="font-display text-[clamp(2.6rem,7vw,5.2rem)] leading-[1.05] tracking-tight">
            Let’s build something
            <br />
            <em className="text-accent-bright">useful together.</em>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${siteConfig.links.email}`}
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 font-semibold text-accent-ink transition-colors duration-300 hover:bg-accent-hover"
            >
              <Mail size={18} aria-hidden="true" />
              {siteConfig.links.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
              className="inline-flex h-13 w-13 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {copied ? (
                <Check size={18} className="text-accent" aria-hidden="true" />
              ) : (
                <Copy size={18} aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-4">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            ))}
          </div>

          <p className="max-w-md text-sm text-faint">
            Based in {siteConfig.location}. Currently open to internships, freelance
            work, and collaborations on useful software.
          </p>
        </Reveal>
      </div>

      {/* Toast confirmation */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            role="status"
            className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full border border-accent/40 bg-ink/90 px-5 py-3 text-sm text-fg shadow-xl backdrop-blur"
          >
            <span className="mr-2 text-accent">
              <Check size={15} className="inline" aria-hidden="true" />
            </span>
            Email copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
