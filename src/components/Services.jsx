import {
  ArrowRight,
  BrainCircuit,
  ChartColumn,
  Eye,
  GraduationCap,
  LayoutGrid,
  MessageSquareCode,
  Server,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Section from "./Section";
import TechIcon from "./TechIcon";
import { services, servicePromises } from "../data/profile";

const ICONS = {
  brain: BrainCircuit,
  eye: Eye,
  message: MessageSquareCode,
  layout: LayoutGrid,
  server: Server,
  chart: ChartColumn,
  graduation: GraduationCap,
};

/** Tint per service — a coloured tile keeps the grid from reading as six identical cards. */
const ACCENTS = {
  violet: { fg: "text-[#a78bfa]", bg: "bg-[#a78bfa]/12", ring: "ring-[#a78bfa]/25" },
  cyan: { fg: "text-[#22d3ee]", bg: "bg-[#22d3ee]/12", ring: "ring-[#22d3ee]/25" },
  emerald: { fg: "text-[#34d399]", bg: "bg-[#34d399]/12", ring: "ring-[#34d399]/25" },
  sky: { fg: "text-[#38bdf8]", bg: "bg-[#38bdf8]/12", ring: "ring-[#38bdf8]/25" },
  amber: { fg: "text-[#fbbf24]", bg: "bg-[#fbbf24]/12", ring: "ring-[#fbbf24]/25" },
  rose: { fg: "text-[#fb7185]", bg: "bg-[#fb7185]/12", ring: "ring-[#fb7185]/25" },
  teal: { fg: "text-[#2dd4bf]", bg: "bg-[#2dd4bf]/12", ring: "ring-[#2dd4bf]/25" },
};

const PROMISE_ICONS = [Zap, ShieldCheck, Sparkles];

export default function Services() {
  return (
    <Section
      id="services"
      number="08"
      tone="dark"
      eyebrow="Services"
      title={
        <>
          What I <span className="text-accent-400">build</span> for you
        </>
      }
      lead="End-to-end AI and software work — from a model that has to be right, to the interface someone uses it through."
    >
      {/* Promise bar */}
      <ul className="reveal mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
        {servicePromises.map((promise, i) => {
          const Icon = PROMISE_ICONS[i % PROMISE_ICONS.length];
          return (
            <li key={promise} className="flex items-center gap-2 text-sm text-fg-muted">
              <Icon size={15} className="text-accent-400" />
              {promise}
            </li>
          );
        })}
      </ul>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const Icon = ICONS[service.icon] ?? BrainCircuit;
          const a = ACCENTS[service.accent] ?? ACCENTS.sky;

          return (
            <article
              key={service.title}
              className="reveal card card-hover group flex flex-col p-6"
              style={{ transitionDelay: `${(i % 3) * 70}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`grid h-12 w-12 place-items-center rounded-xl ring-1 ${a.bg} ${a.fg} ${a.ring}`}
                >
                  <Icon size={22} strokeWidth={1.9} />
                </span>
                <span className="font-mono text-xs text-fg-subtle tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="font-display mt-5 text-xl text-fg">{service.title}</h3>

              <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-fg-muted">
                {service.blurb}
              </p>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {service.tech.map((t) => (
                  <li
                    key={t}
                    className="inline-flex items-center gap-1.5 border border-line px-2 py-1 text-[12px] text-fg-muted"
                  >
                    <TechIcon name={t} size={13} />
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      {/* Close with the obvious next step */}
      <div className="reveal mt-9">
        <a
          href="#contact"
          className="btn-lift group inline-flex items-center gap-2.5 bg-accent-400 px-6 py-3.5 text-sm font-semibold text-[#08090b] hover:bg-accent-300"
        >
          Start a conversation
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </Section>
  );
}
