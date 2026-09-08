import { Quote } from "lucide-react";

/** "Ram Prasad Ravula" → "RR" */
function initials(name) {
  const parts = name
    .replace(/^[A-Z]\.\s*/, "")
    .replace(/\.$/, "")
    .trim()
    .split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
}

function Card({ item, duplicate = false }) {
  return (
    <figure
      className="card flex w-[19rem] shrink-0 flex-col p-6 sm:w-[22rem]"
      aria-hidden={duplicate || undefined}
    >
      <Quote size={20} className="text-accent-400" />

      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-fg-muted">
        {item.quote}
      </blockquote>

      <figcaption className="rule mt-5 flex items-center gap-3 pt-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-400/12 text-[13px] font-semibold text-accent-400">
          {initials(item.name)}
        </span>
        <span className="min-w-0">
          <span className="block text-[15px] font-medium text-fg">{item.name}</span>
          <span className="block truncate text-[13px] text-fg-subtle">
            {[item.role, item.location].filter(Boolean).join(" · ")}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * One continuous row of quotes. The list renders twice and the track shifts by
 * exactly half its width, so the loop closes with no visible seam. The second
 * copy is hidden from screen readers. Hovering pauses it so a quote can be read.
 *
 * `reverse` runs the row left-to-right — used to set the two quote sections
 * moving in opposite directions.
 */
export default function QuoteMarquee({ items, reverse = false, duration = "70s" }) {
  const shown = items.filter((i) => i.quote?.trim());
  if (shown.length === 0) return null;

  return (
    <div className="reveal marquee-hover-pause mt-10 flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]">
      <div
        className={`${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } flex shrink-0 items-stretch gap-4 pr-4`}
        // Inline, so it wins over the shorthand in the animation class.
        style={{ animationDuration: duration }}
      >
        {shown.map((item) => (
          <Card key={item.name} item={item} />
        ))}
        {shown.map((item) => (
          <Card key={`${item.name}-loop`} item={item} duplicate />
        ))}
      </div>
    </div>
  );
}
