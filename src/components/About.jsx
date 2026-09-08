import Section from "./Section";
import { profile, professionalSkills } from "../data/profile";

const lanes = [
  {
    title: "AI & Machine Learning",
    body: "My career focus. Computer vision, NLP, deep learning and Generative AI — from data preprocessing and feature engineering through to trained, deployed models.",
  },
  {
    title: "Full-Stack Development",
    body: "React.js frontends on FastAPI and Node backends, with REST APIs, JWT authentication, role-based access and PostgreSQL behind them.",
  },
  {
    title: "Problem Solving & Learning",
    body: "A continuous learner and fast skill-adapter — most of what I know came from building something I had not built before, then shipping it.",
  },
];

export default function About() {
  return (
    <Section
      id="about"
      number="01"
      tone="light"
      eyebrow="About"
      title={<>Turning ideas into <span className="text-accent-400">intelligent systems</span></>}
      lead="A CSE student and aspiring ML developer, building AI that makes a measurable difference in healthcare, industry and education."
    >
      {/* Portrait sits with the bio it belongs to, rather than in the hero */}
      <div className="mt-10 grid gap-x-14 gap-y-10 lg:grid-cols-[auto_1fr] lg:items-start">
        {profile.photo && (
          <figure className="reveal relative mx-auto w-56 sm:w-64 lg:mx-0 lg:w-[19rem]">
            <div className="overflow-hidden border border-line bg-card">
              <img
                src={profile.photo}
                srcSet={
                  profile.photoSmall
                    ? `${profile.photoSmall} 450w, ${profile.photo} 900w`
                    : undefined
                }
                sizes="(min-width: 1024px) 19rem, 16rem"
                width={900}
                height={900}
                alt={`${profile.name} — ${profile.roles[0]}`}
                className="aspect-square w-full object-cover"
              />
            </div>
            <span
              aria-hidden="true"
              className="absolute -bottom-2 -left-2 h-8 w-8 border-b border-l border-accent-400"
            />
          </figure>
        )}

        <div className="space-y-5">
          {profile.about.map((para, i) => (
            <p
              key={i}
              className="reveal text-[17px] leading-[1.8] text-fg-muted text-pretty"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {para}
            </p>
          ))}

          {/* Professional strengths — a plain set line, not chips */}
          <p className="reveal rule pt-5 text-sm leading-relaxed text-fg-muted">
            <span className="text-fg-subtle">Also: </span>
            {professionalSkills.join(" · ")}
          </p>
        </div>
      </div>

      {/* The three lanes, as a numbered list across the full width */}
      <dl className="mt-12 grid gap-x-10 sm:grid-cols-3">
        {lanes.map((lane, i) => (
          <div
            key={lane.title}
            className="reveal rule py-6"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <dt className="flex items-baseline gap-3">
              <span className="font-mono text-[11px] text-accent-500 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px] font-medium text-fg">{lane.title}</span>
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-fg-muted">{lane.body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
