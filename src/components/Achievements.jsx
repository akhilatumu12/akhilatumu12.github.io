import Section from "./Section";
import { achievements } from "../data/profile";

export default function Achievements() {
  return (
    <Section
      id="achievements"
      number="06"
      tone="dark"
      eyebrow="Recognition"
      title={<>Competitions &amp; <span className="text-accent-400">awards</span></>}
      lead="Competition wins and national-level hackathons in the AI & ML track."
    >
      <ol className="mt-10">
        {achievements.map((item, i) => (
          <li
            key={item.title}
            className="reveal rule grid gap-x-10 gap-y-3 py-7 sm:grid-cols-[3rem_1fr]"
            style={{ transitionDelay: `${(i % 3) * 70}ms` }}
          >
            <span className="font-mono text-xs text-accent-500 tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-start">
              <div>
                <h3 className="font-display text-xl text-fg">{item.title}</h3>
                <p className="mt-0.5 text-sm text-accent-400">{item.org}</p>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fg-muted">
                  {item.detail}
                </p>
              </div>

              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full border border-line object-cover sm:w-52"
                />
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
