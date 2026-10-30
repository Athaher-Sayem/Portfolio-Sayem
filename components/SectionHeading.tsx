import { Reveal } from "@/components/Reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
}: {
  index: string;
  eyebrow: string;
  title: string;
  accent?: string;
}) {
  return (
    <Reveal className="mb-12 flex flex-col gap-5 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-faint">
          <span className="mr-3 text-accent">{index}</span>
          {eyebrow}
        </p>
        <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] leading-tight tracking-tight">
          {title} {accent ? <em className="text-accent-bright">{accent}</em> : null}
        </h2>
      </div>
    </Reveal>
  );
}
