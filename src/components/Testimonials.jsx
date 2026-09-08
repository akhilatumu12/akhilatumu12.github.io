import Section from "./Section";
import QuoteMarquee from "./QuoteMarquee";
import { testimonials } from "../data/profile";

export default function Testimonials() {
  return (
    <Section
      id="testimonials"
      number="09"
      tone="light"
      eyebrow="Testimonials"
      title={
        <>
          What <span className="text-accent-400">clients say</span>
        </>
      }
      lead="People I have built for — across real estate, capital, startups and academic projects."
    >
      <QuoteMarquee items={testimonials} duration="70s" />
    </Section>
  );
}
