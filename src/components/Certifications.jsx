import { BadgeCheck, Presentation } from "lucide-react";
import Section from "./Section";
import { certifications, workshops, interests } from "../data/profile";

export default function Certifications() {
  return (
    <Section
      id="certifications"
      number="07"
      tone="light"
      eyebrow="Training & interests"
      title={<>Certifications &amp; <span className="text-accent-400">interests</span></>}
      lead="Structured training and industry events I have taken part in, and the directions I keep pulling my own work towards."
    >
      <div className="mt-10 grid gap-x-12 gap-y-12 lg:grid-cols-3">
        {/* Certifications */}
        <div>
          <h3 className="reveal text-sm font-medium text-fg-subtle">Certifications</h3>
          <ul className="mt-4">
            {certifications.map((cert, i) => (
              <li
                key={cert.title}
                className="reveal rule flex items-start gap-3.5 py-4"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <BadgeCheck size={17} className="mt-0.5 shrink-0 text-accent-500" />
                <div>
                  <p className="text-[15px] font-medium text-fg">{cert.title}</p>
                  <p className="mt-0.5 text-[13px] text-fg-subtle">{cert.org}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Workshops & events — attendance, kept out of Achievements */}
        <div>
          <h3 className="reveal text-sm font-medium text-fg-subtle">
            Workshops &amp; events
          </h3>
          <ul className="mt-4">
            {workshops.map((item, i) => (
              <li
                key={item.title}
                className="reveal rule flex items-start gap-3.5 py-4"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <Presentation size={17} className="mt-0.5 shrink-0 text-accent-500" />
                <div>
                  <p className="text-[15px] font-medium text-fg">{item.title}</p>
                  <p className="mt-0.5 text-[13px] text-fg-subtle">{item.org}</p>
                  {item.note && (
                    <p className="mt-1.5 text-[13px] leading-relaxed text-fg-muted">
                      {item.note}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas of interest */}
        <div>
          <h3 className="reveal text-sm font-medium text-fg-subtle">
            Areas of interest
          </h3>
          <ul className="mt-4">
            {interests.map((item, i) => (
              <li
                key={item.label}
                className="reveal rule py-4"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <p className="text-[15px] font-medium text-fg">{item.label}</p>
                <p className="mt-0.5 text-[13px] leading-relaxed text-fg-subtle">
                  {item.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
