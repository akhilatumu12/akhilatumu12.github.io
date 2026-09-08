import Section from "./Section";
import TechIcon from "./TechIcon";
import { skillGroups } from "../data/profile";

export default function Skills() {
  return (
    <Section
      id="skills"
      number="02"
      tone="dark"
      eyebrow="Toolkit"
      title={<>What I <span className="text-accent-400">work with</span></>}
      lead="The stack I build with, from model training through to deployment."
    >
      <dl className="mt-10">
        {skillGroups.map((group, i) => (
          <div
            key={group.title}
            className="reveal rule grid gap-x-10 gap-y-4 py-7 sm:grid-cols-[14rem_1fr]"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <dt>
              <span className="text-[15px] font-medium text-fg">
                {group.title}
              </span>
              <p className="mt-1 text-[13px] leading-relaxed text-fg-subtle">
                {group.blurb}
              </p>
            </dt>

            <dd className="flex flex-wrap gap-2 self-start">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="group inline-flex items-center gap-2.5 border border-line bg-card py-1.5 pr-3.5 pl-1.5 text-[13px] text-fg-muted transition-colors hover:border-accent-500/60 hover:text-fg"
                >
                  {/* Logo sits in its own tile so the brand colour reads
                      against the chip rather than fighting the text. */}
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[3px] bg-surface text-fg-subtle">
                    <TechIcon name={skill} size={16} />
                  </span>
                  {skill}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
