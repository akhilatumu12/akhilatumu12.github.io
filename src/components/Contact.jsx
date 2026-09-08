import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { profile } from "../data/profile";

export default function Contact() {
  const { email, github, linkedin, phone } = profile.contact;

  const channels = [
    { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    { icon: LinkedinIcon, label: "LinkedIn", value: profile.name, href: linkedin },
    { icon: GithubIcon, label: "GitHub", value: "akhilatumu12", href: github },
    ...(phone
      ? [
          {
            icon: Phone,
            label: "Phone",
            value: phone,
            href: `tel:${phone.replace(/\s/g, "")}`,
          },
        ]
      : []),
    { icon: MapPin, label: "Location", value: profile.location, href: "" },
  ];

  return (
    <section
      id="contact"
      className="tone-dark bg-surface text-fg scroll-mt-20 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="reveal rule flex items-baseline gap-4 pt-5">
          <span className="font-mono text-xs text-accent-500 tabular-nums">11</span>
          <span className="text-xs tracking-wide text-fg-subtle">Get in touch</span>
        </div>

        <div className="mt-9 grid gap-x-14 gap-y-12 lg:grid-cols-[1fr_1.05fr]">
          {/* Direct contact */}
          <div>
            <h2 className="reveal font-display text-[2.4rem] text-balance sm:text-5xl">
              Let&apos;s <span className="text-accent-400">work together</span>
            </h2>

            <p className="reveal mt-5 max-w-md text-[16px] leading-relaxed text-fg-muted text-pretty">
              I am open to internships, entry-level roles and research
              collaborations in AI and machine learning. Reach me directly, or
              send a message below.
            </p>

            <ul className="mt-9">
              {channels.map((c, i) => {
                const Icon = c.icon;
                const external = c.href.startsWith("http");
                const inner = (
                  <>
                    <span className="grid h-10 w-10 shrink-0 place-items-center border border-line text-accent-400">
                      <Icon size={16} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] tracking-[0.14em] text-fg-subtle uppercase">
                        {c.label}
                      </span>
                      <span className="mt-0.5 block truncate text-[15px] text-fg">
                        {c.value}
                      </span>
                    </span>
                  </>
                );

                return (
                  <li
                    key={c.label}
                    className="reveal rule"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    {c.href ? (
                      <a
                        href={c.href}
                        {...(external
                          ? { target: "_blank", rel: "noreferrer noopener" }
                          : {})}
                        className="group flex items-center gap-4 py-4 transition-colors hover:text-accent-300"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 py-4">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <MessageForm to={email} />
        </div>
      </div>
    </section>
  );
}

/**
 * There is no backend behind this site, so rather than pretend to POST
 * somewhere, the form composes a pre-filled email and hands it to the
 * visitor's mail client. Nothing they typed is lost.
 */
function MessageForm({ to }) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = (data.get("name") || "").trim();
    const from = (data.get("email") || "").trim();
    const subject =
      (data.get("subject") || "").trim() || `Portfolio enquiry from ${name}`;
    const message = (data.get("message") || "").trim();

    const body = [`From: ${name} <${from}>`, "", message].join("\n");
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full border border-line bg-surface px-4 py-3 text-[15px] text-fg placeholder:text-fg-subtle focus:border-accent-400 focus:outline-none";
  const label = "block text-[11px] tracking-[0.14em] text-fg-subtle uppercase";

  return (
    <form onSubmit={handleSubmit} className="reveal card p-6 sm:p-8">
      <h3 className="font-display text-2xl text-fg">Send a message</h3>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="cf-name">
            Name <span className="text-accent-400">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={`mt-2 ${field}`}
          />
        </div>
        <div>
          <label className={label} htmlFor="cf-email">
            Email <span className="text-accent-400">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={`mt-2 ${field}`}
          />
        </div>
      </div>

      <div className="mt-5">
        <label className={label} htmlFor="cf-subject">
          Subject
        </label>
        <input
          id="cf-subject"
          name="subject"
          placeholder="What is it about?"
          className={`mt-2 ${field}`}
        />
      </div>

      <div className="mt-5">
        <label className={label} htmlFor="cf-message">
          Message <span className="text-accent-400">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={6}
          placeholder="Tell me about the role or the problem you are solving..."
          className={`mt-2 resize-y ${field}`}
        />
      </div>

      <button
        type="submit"
        className="btn-lift mt-6 inline-flex w-full items-center justify-center gap-2.5 bg-accent-400 px-6 py-3.5 text-sm font-semibold text-[#08090b] hover:bg-accent-300"
      >
        <Send size={16} />
        Send message
      </button>

      <p className="mt-3 text-center text-[12px] text-fg-subtle" aria-live="polite">
        {sent
          ? "Your email app should have opened with the message ready to send."
          : "Opens in your email app with everything filled in."}
      </p>
    </form>
  );
}
