/**
 * Editorial section shell: a numbered hairline rule, a serif title, and a
 * lead paragraph set narrow.
 *
 * `tone` picks the band — "dark" (black) or "light" (white). The tone class
 * sets the --s-* variables, so every `text-fg` / `border-line` / `bg-card`
 * inside inverts on its own.
 */
export default function Section({
  id,
  number,
  eyebrow,
  title,
  lead,
  tone = "dark",
  children,
  className = "",
}) {
  return (
    // Padding is per-section, so adjacent sections stack theirs — keep it
    // modest or the gap between two sections doubles into dead space.
    <section
      id={id}
      className={`tone-${tone} bg-surface text-fg scroll-mt-20 py-14 sm:py-20 ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <header>
          <div className="reveal rule flex items-baseline gap-4 pt-5">
            {number && (
              <span className="font-mono text-xs text-accent-500 tabular-nums">
                {number}
              </span>
            )}
            {eyebrow && (
              <span className="text-xs tracking-wide text-fg-subtle">{eyebrow}</span>
            )}
          </div>

          <h2
            className="reveal font-display mt-5 max-w-3xl text-[2.1rem] leading-[1.12] text-balance text-fg sm:text-5xl"
            style={{ transitionDelay: "60ms" }}
          >
            {title}
          </h2>

          {lead && (
            <p
              className="reveal mt-4 max-w-2xl text-[16px] leading-relaxed text-fg-muted text-pretty"
              style={{ transitionDelay: "120ms" }}
            >
              {lead}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
