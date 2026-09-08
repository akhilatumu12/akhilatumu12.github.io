import { useMemo, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import Section from "./Section";
import { projects, projectFilters } from "../data/profile";

const INITIAL_COUNT = 9;

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(false);

  const matching = useMemo(
    () =>
      filter === "all" ? projects : projects.filter((p) => p.tags.includes(filter)),
    [filter]
  );

  const shown = expanded ? matching : matching.slice(0, INITIAL_COUNT);
  const hidden = matching.length - shown.length;

  const changeFilter = (id) => {
    setFilter(id);
    setExpanded(false);
  };

  return (
    <Section
      id="work"
      number="04"
      tone="dark"
      eyebrow="Selected work"
      title={<>Things I have <span className="text-accent-400">built</span></>}
      lead={`${projects.length} projects spanning machine learning, healthcare AI, data analytics and full-stack web — every one links straight to its source on GitHub.`}
    >
      {/* Filters — plain text switches, not pills */}
      <div
        className="reveal rule mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 pt-5"
        style={{ transitionDelay: "60ms" }}
      >
        {projectFilters.map((f) => {
          const isActive = filter === f.id;
          const count =
            f.id === "all"
              ? projects.length
              : projects.filter((p) => p.tags.includes(f.id)).length;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => changeFilter(f.id)}
              aria-pressed={isActive}
              className={`group inline-flex items-baseline gap-1.5 border-b pb-1 text-sm transition-colors ${
                isActive
                  ? "border-accent-500 text-fg"
                  : "border-transparent text-fg-muted hover:border-fg-subtle hover:text-fg"
              }`}
            >
              {f.label}
              <span
                className={`font-mono text-[11px] tabular-nums ${
                  isActive ? "text-accent-500" : "text-fg-subtle"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {shown.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={i}
            // Cards revealed by "Show more" are shown at once rather than
            // waiting on a scroll — otherwise they land as blank space.
            instant={expanded && i >= INITIAL_COUNT}
          />
        ))}
      </div>

      {hidden > 0 && (
        <div className="reveal mt-8">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="btn-lift group inline-flex items-center gap-2 border border-line px-5 py-2.5 text-sm font-semibold text-fg-muted hover:border-accent-400 hover:text-fg"
          >
            Show {hidden} more {hidden === 1 ? "project" : "projects"}
            <ChevronDown size={14} className="transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      )}

      {expanded && matching.length > INITIAL_COUNT && (
        <div className="reveal mt-8">
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm text-fg-muted transition-colors hover:border-fg-subtle hover:text-fg"
          >
            Show fewer
            <ChevronDown size={14} className="rotate-180" />
          </button>
        </div>
      )}

      <p className="reveal mt-10 text-sm text-fg-subtle">
        More experiments live on{" "}
        <a
          href="https://github.com/akhilatumu12"
          target="_blank"
          rel="noreferrer noopener"
          className="link-underline text-fg-muted"
        >
          GitHub
        </a>
        .
      </p>
    </Section>
  );
}

function ProjectCard({ project, index, instant = false }) {
  const [open, setOpen] = useState(false);
  const isWide = project.featured && index === 0;

  return (
    <article
      className={`card card-hover group relative flex flex-col p-6 ${
        instant ? "" : "reveal"
      } ${isWide ? "md:col-span-2" : ""}`}
      style={instant ? undefined : { transitionDelay: `${(index % 4) * 70}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {project.featured && (
            <span className="font-mono text-[11px] tracking-wide text-accent-500">
              Featured
            </span>
          )}
          <h3
            className={`font-display text-fg ${
              project.featured ? "mt-1.5" : ""
            } ${isWide ? "text-2xl" : "text-xl"}`}
          >
            {project.title}
          </h3>
        </div>

        <div className="flex shrink-0 items-center gap-3 pt-1">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.title} source on GitHub`}
              title="View source"
              className="text-fg-subtle transition-colors hover:text-accent-400"
            >
              <GithubIcon size={17} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.title} live demo`}
              title="Live demo"
              className="text-fg-subtle transition-colors hover:text-accent-400"
            >
              <ArrowUpRight size={17} />
            </a>
          )}
        </div>
      </div>

      <p
        className={`mt-3 text-[15px] leading-relaxed text-fg-muted ${
          isWide ? "max-w-3xl" : ""
        }`}
      >
        {project.blurb}
      </p>

      {project.highlight && (
        <p className="mt-2.5 text-[13px] text-accent-400/90">{project.highlight}</p>
      )}

      {project.detail && (
        <>
          <div
            className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out ${
              open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p
                className={`border-l border-accent-500/40 pl-4 text-sm leading-relaxed text-fg-muted ${
                  isWide ? "max-w-3xl" : ""
                }`}
              >
                {project.detail}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mt-4 inline-flex w-fit items-center gap-1.5 text-[13px] text-fg-subtle transition-colors hover:text-fg"
          >
            {open ? "Show less" : "How it works"}
            <ChevronDown
              size={13}
              className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </button>
        </>
      )}

      <p className="mt-5 font-mono text-[11px] leading-relaxed text-fg-subtle">
        {project.stack.join("  ·  ")}
      </p>
    </article>
  );
}
