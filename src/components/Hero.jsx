import { useEffect, useState } from "react";
import { ArrowRight, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import TechIcon from "./TechIcon";
import { profile, stats, marqueeItems } from "../data/profile";

// Hand-placed so the cluster reads as arranged rather than evenly gridded.
const FLOATING = [
  { name: "PyTorch", top: "0%", left: "34%", size: 78, delay: "0s" },
  { name: "React", top: "16%", left: "0%", size: 66, delay: "-1.4s" },
  { name: "TensorFlow", top: "22%", left: "68%", size: 70, delay: "-2.6s" },
  { name: "Python", top: "44%", left: "26%", size: 92, delay: "-0.7s" },
  { name: "FastAPI", top: "60%", left: "2%", size: 62, delay: "-3.1s" },
  { name: "OpenCV", top: "56%", left: "70%", size: 66, delay: "-1.9s" },
  { name: "PostgreSQL", top: "80%", left: "38%", size: 60, delay: "-2.2s" },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Types a word out, holds, deletes it, moves to the next. */
function useTypedRole(roles) {
  const [index, setIndex] = useState(0);
  // With reduced motion we skip the animation entirely and just show the first role.
  const [text, setText] = useState(() => (prefersReducedMotion() ? roles[0] : ""));
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const current = roles[index % roles.length];
    const done = text === current;

    let delay = deleting ? 34 : 62;
    if (done && !deleting) delay = 2100; // hold the full word
    if (deleting && text === "") delay = 220;

    const timer = setTimeout(() => {
      if (!deleting) {
        if (done) setDeleting(true);
        else setText(current.slice(0, text.length + 1));
      } else {
        if (text === "") {
          setDeleting(false);
          setIndex((i) => (i + 1) % roles.length);
        } else {
          setText(current.slice(0, text.length - 1));
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, roles]);

  return text;
}

// Widest role by character count — reserves the line height so the page never
// jumps as shorter roles type in and out.
const longestRole = profile.roles.reduce(
  (longest, role) => (role.length > longest.length ? role : longest),
  ""
);

export default function Hero() {
  const typed = useTypedRole(profile.roles);

  return (
    <section
      id="top"
      className="tone-dark bg-surface text-fg relative pt-28 pb-0 sm:pt-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_auto] lg:gap-10">
          <div>
        {/* Availability pill */}
        <p className="reveal inline-flex items-center gap-2.5 border border-accent-400/40 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.14em] text-accent-400 uppercase">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-400" />
          </span>
          {profile.availability}
        </p>

        <h1
          className="reveal font-display mt-7 max-w-4xl text-[2.9rem] leading-[1.02] text-balance sm:text-6xl lg:text-7xl"
          style={{ transitionDelay: "70ms" }}
        >
          Building AI systems that solve{" "}
          <span className="text-accent-400">real world problems</span>
        </h1>

        <div
          className="reveal relative mt-6 text-xl sm:text-2xl"
          style={{ transitionDelay: "110ms" }}
        >
          <span className="invisible" aria-hidden="true">
            {profile.name} — {longestRole}
          </span>
          <span className="absolute inset-0 text-fg-muted">
            <span className="text-fg">{profile.name}</span>
            <span className="text-fg-subtle"> — </span>
            {typed}
            <span className="animate-caret ml-0.5 font-light text-accent-400">|</span>
            <span className="sr-only">{profile.roles.join(", ")}</span>
          </span>
        </div>

        <p
          className="reveal mt-7 max-w-xl text-[17px] leading-[1.7] text-fg-muted text-pretty"
          style={{ transitionDelay: "160ms" }}
        >
          {profile.tagline}
        </p>

        {/* Primary actions */}
        <div
          className="reveal mt-9 flex flex-wrap items-center gap-3"
          style={{ transitionDelay: "200ms" }}
        >
          <a
            href="#work"
            className="btn-lift group inline-flex items-center gap-2.5 bg-accent-400 px-6 py-3.5 text-sm font-semibold text-[#08090b] hover:bg-accent-300"
          >
            View my work
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </a>
          <a
            href={profile.resumeUrl}
            download
            className="btn-lift inline-flex items-center gap-2.5 border border-line px-6 py-3.5 text-sm font-semibold text-fg hover:border-accent-400 hover:text-accent-300"
          >
            <Download size={16} />
            Download CV
          </a>
        </div>

        {/* Social */}
        <div
          className="reveal mt-8 flex items-center gap-3"
          style={{ transitionDelay: "240ms" }}
        >
          <span className="text-sm text-fg-subtle">Connect with me</span>
          {[
            { icon: GithubIcon, href: profile.contact.github, label: "GitHub" },
            { icon: LinkedinIcon, href: profile.contact.linkedin, label: "LinkedIn" },
            { icon: Mail, href: `mailto:${profile.contact.email}`, label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              {...(href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
              className="btn-lift grid h-10 w-10 place-items-center border border-line text-fg-muted hover:border-accent-400 hover:text-accent-400"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
          </div>

          {/* Floating tech cluster — fills the space the portrait used to
              occupy. Each tile drifts on its own delay so it never bobs
              as one block. */}
          <div
            className="reveal hidden lg:block"
            style={{ transitionDelay: "220ms" }}
            aria-hidden="true"
          >
            <div className="relative h-[24rem] w-[22rem]">
              <span className="animate-float-slow absolute inset-8 rounded-full bg-accent-400/10 blur-3xl" />
              {FLOATING.map(({ name, top, left, size, delay }) => (
                <span
                  key={name}
                  className="animate-float absolute grid place-items-center border border-line bg-card text-fg-muted shadow-lg shadow-black/30"
                  style={{
                    top,
                    left,
                    width: size,
                    height: size,
                    "--float-delay": delay,
                  }}
                >
                  <TechIcon name={name} size={size * 0.44} />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Headline numbers */}
        <dl
          className="reveal mt-12 grid grid-cols-2 border-t border-l border-line sm:grid-cols-4"
          style={{ transitionDelay: "280ms" }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="border-r border-b border-line px-5 py-6">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="font-display block text-3xl text-accent-400 sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-[13px] leading-snug text-fg-subtle">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Tech marquee */}
      <div
        aria-hidden="true"
        className="reveal rule relative mt-14 flex overflow-hidden py-3.5 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
        style={{ transitionDelay: "320ms" }}
      >
        <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="font-mono text-[13px] whitespace-nowrap text-fg-subtle"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
