import Section from "./Section";
import QuoteMarquee from "./QuoteMarquee";
import { colleagues } from "../data/profile";

export default function Colleagues() {
  return (
    <Section
      id="colleagues"
      number="10"
      tone="light"
      eyebrow="Peer feedback"
      title={
        <>
          What colleagues &amp; <span className="text-accent-400">teammates say</span>
        </>
      }
      lead="The people I have shared a team, a deadline or a standup with."
    >
      {/* Runs the opposite way to the client row above, so the two read as
          separate sections rather than one long scroll. */}
      <QuoteMarquee items={colleagues} reverse duration="62s" />
    </Section>
  );
}
