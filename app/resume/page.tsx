import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import { PrintButton } from "@/components/PrintButton";

export const metadata: Metadata = {
  title: `Résumé — ${siteConfig.name}`,
  description: `Résumé of ${siteConfig.name}, ${siteConfig.role}.`,
};

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
      <div className="rounded-3xl border border-line bg-surface p-7 sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-6 border-b border-line pb-6">
          <div>
            <h1 className="font-display text-3xl tracking-tight">{siteConfig.name}</h1>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {siteConfig.role}
            </p>
          </div>
          <div className="text-left font-mono text-xs leading-relaxed text-muted sm:text-right">
            <p>{siteConfig.location}</p>
            <p>{siteConfig.links.email}</p>
            <p>+880 1775692383</p>
            <p>github.com/{siteConfig.githubUsername}</p>
          </div>
        </div>

        <section className="mt-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-faint">
            Profile
          </h2>
          <p className="text-sm leading-relaxed text-muted">
            {siteConfig.bio} Currently studying Computer Science & Engineering at
            Daffodil International University while building and shipping real
            applications.
          </p>
        </section>

        <section className="mt-9">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-faint">
            Experience
          </h2>
          <div className="space-y-6">
            {siteConfig.experience.map((item) => (
              <article key={item.company}>
                <p className="font-mono text-xs text-faint">{item.period}</p>
                <h3 className="mt-1 font-semibold text-fg">{item.role}</h3>
                <p className="text-sm text-accent">{item.company}</p>
                <ul className="mt-2 space-y-1.5 text-sm text-muted">
                  {item.points.map((point) => (
                    <li key={point}>· {point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-9">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-faint">
            Education
          </h2>
          <div className="space-y-5">
            {siteConfig.education.map((entry) => (
              <article key={entry.degree}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-fg">{entry.degree}</h3>
                  <span className="font-mono text-xs text-faint">{entry.period}</span>
                </div>
                <p className="mt-0.5 text-sm text-muted">{entry.school}</p>
                {entry.note && (
                  <p className="mt-1 text-xs text-faint">{entry.note}</p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-9">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-faint">
            Skills
          </h2>
          <div className="space-y-3">
            {Object.entries(siteConfig.skills).map(([group, items]) => (
              <div key={group} className="flex flex-wrap gap-2 text-sm">
                <span className="w-24 shrink-0 font-semibold text-fg">{group}</span>
                <span className="text-muted">{items.join(" · ")}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-9">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-faint">
            Achievements
          </h2>
          <ul className="space-y-2 text-sm text-muted">
            {siteConfig.achievements.map((achievement) => (
              <li key={achievement.label}>
                · {achievement.label} — {achievement.detail}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 border-t border-line pt-6 text-center">
          <PrintButton />
        </div>
      </div>
    </main>
  );
}
