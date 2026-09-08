import Section from "./Section";
import { beyond } from "../data/profile";

export default function Beyond() {
  return (
    <Section
      id="beyond"
      number="05"
      tone="light"
      eyebrow="Beyond the code"
      title={<>Beyond <span className="text-accent-400">key skills</span></>}
      lead="Leading a team, and moving into research — the parts of the work that are not a line on a tech stack."
    >
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {beyond.map((item, i) => (
          <article
            key={item.title}
            className="reveal card card-hover flex flex-col p-7"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span className="font-mono text-xs text-accent-500 tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display mt-3 text-2xl text-fg">{item.title}</h3>
            <p className="mt-1 text-sm text-accent-400">{item.org}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
              {item.detail}
            </p>

            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="mt-5 w-full border border-line object-cover"
              />
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
