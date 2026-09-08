import { Briefcase, GraduationCap } from "lucide-react";
import Section from "./Section";
import { experience, education } from "../data/profile";

/**
 * Work and study are merged into one chronological path so the section reads
 * as a single journey rather than two separate lists.
 */
const milestones = [
  ...experience.map((item) => ({
    kind: "work",
    period: item.period,
    title: item.role,
    org: item.org,
    body: item.summary,
    tags: item.tags,
  })),
  ...education.map((edu) => ({
    kind: "study",
    period: edu.period,
    title: edu.degree,
    org: edu.org,
    score: edu.score,
    body: edu.note,
    tags: [],
  })),
];

export default function Experience() {
  return (
    <Section
      id="experience"
      number="03"
      tone="light"
      eyebrow="My journey"
      title={
        <>
          My <span className="text-accent-400">journey</span> so far
        </>
      }
      lead="Two AI internships and a CSE degree in progress — the path from first lines of Java to shipping AI products."
    >
      <ol className="mt-12">
        {milestones.map((m, i) => {
          const Icon = m.kind === "work" ? Briefcase : GraduationCap;
          const isCurrent = i === 0;
          const isLast = i === milestones.length - 1;

          return (
            <li
              key={m.title + m.org}
              className="reveal grid grid-cols-[2.75rem_1fr] gap-x-4 sm:grid-cols-[9rem_2.75rem_1fr] sm:gap-x-6"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              {/* Period — its own column from sm up, inline on mobile */}
              <div className="hidden pt-1 text-right font-mono text-xs text-fg-subtle sm:block">
                {m.period || "—"}
              </div>

              {/* The rail: a marker on a line that runs to the next milestone */}
              <div className="relative flex justify-center">
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute top-9 bottom-0 w-px bg-line"
                  />
                )}
                <span
                  aria-hidden="true"
                  className={`relative z-10 grid h-9 w-9 place-items-center rounded-full border transition-colors ${
                    isCurrent
                      ? "border-accent-400 bg-accent-400 text-white"
                      : "border-line bg-surface text-fg-subtle"
                  }`}
                >
                  <Icon size={15} />
                </span>
                {isCurrent && (
                  <span
                    aria-hidden="true"
                    className="absolute top-0 h-9 w-9 animate-ping rounded-full bg-accent-400/25"
                  />
                )}
              </div>

              {/* Milestone */}
              <div className="pb-12">
                <p className="font-mono text-xs text-fg-subtle sm:hidden">
                  {m.period || "—"}
                </p>

                <h3 className="font-display mt-1 text-xl text-fg sm:mt-0">
                  {m.title}
                  {isCurrent && (
                    <span className="ml-3 align-middle border border-accent-400/50 px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-accent-400 uppercase">
                      Now
                    </span>
                  )}
                </h3>

                <p className="mt-1 text-sm text-accent-400">
                  {m.org}
                  {m.score && (
                    <span className="ml-3 font-mono text-xs text-fg-muted">
                      {m.score}
                    </span>
                  )}
                </p>

                {m.body && (
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fg-muted">
                    {m.body}
                  </p>
                )}

                {m.tags.length > 0 && (
                  <p className="mt-3 font-mono text-[11px] text-fg-subtle">
                    {m.tags.join("  ·  ")}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
