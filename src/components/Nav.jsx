import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Menu, X, Mail } from "lucide-react";
import RobotCharacter from "./RobotCharacter";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { profile } from "../data/profile";
import { useActiveSection } from "../hooks/useReveal";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Journey" },
  { id: "work", label: "Projects" },
  { id: "beyond", label: "Beyond" },
  { id: "achievements", label: "Awards" },
  { id: "services", label: "Services" },
  { id: "testimonials", label: "Clients" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");

  const ids = useMemo(() => links.map((l) => l.id), []);
  useActiveSection(ids, setActive);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/12 bg-[#08090b]/92 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-24 max-w-[88rem] items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="group flex items-center gap-2.5"
          aria-label={`${profile.name} — back to top`}
        >
          <span className="grid h-9 w-9 place-items-center bg-[#56d4ff] font-display text-sm text-[#08090b]">
            {profile.initials}
          </span>
          <span className="hidden text-[15px] font-bold tracking-tight text-white sm:block">
            {profile.name}
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 xl:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                  active === link.id
                    ? "text-[#56d4ff]"
                    : "text-white/70 hover:text-[#56d4ff]"
                }`}
              >
                {link.label}
                {active === link.id && (
                  <span className="absolute inset-x-3.5 -bottom-px h-px bg-[#56d4ff]" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 sm:flex">
            <IconLink href={profile.contact.github} label="GitHub">
              <GithubIcon size={17} />
            </IconLink>
            <IconLink href={profile.contact.linkedin} label="LinkedIn">
              <LinkedinIcon size={17} />
            </IconLink>
            <IconLink href={`mailto:${profile.contact.email}`} label="Email">
              <Mail size={17} />
            </IconLink>
          </div>

          {/* Mascot stands beside the button at full height and keeps waving.
              It cannot sit on top of the button — the header is pinned to the
              top of the viewport, so anything above it gets clipped. */}
          <div className="hidden items-center gap-2.5 xl:flex">
            <span className="relative rounded-full bg-white px-3 py-1.5 text-[13px] font-bold whitespace-nowrap text-[#08090b] shadow-lg">
              Hi! 👋
              {/* tail pointing at the robot */}
              <span
                aria-hidden="true"
                className="absolute top-1/2 -right-1 h-2.5 w-2.5 -translate-y-1/2 rotate-45 bg-white"
              />
            </span>

            <span aria-hidden="true" className="w-14 shrink-0">
              <RobotCharacter className="is-waving-loop" />
            </span>

            <a
              href="#contact"
              className="group btn-lift btn-shine inline-flex items-center gap-2 bg-gradient-to-r from-[#56d4ff] to-[#22b8f0] px-5 py-2.5 text-sm font-semibold text-[#08090b] shadow-[0_0_20px_-4px_rgba(86,212,255,0.55)] hover:from-[#8ddfff] hover:to-[#56d4ff]"
            >
              Get in touch
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          {/* Below xl the desktop CTA is gone, so the mascot stands next to
              the menu button instead. */}
          <span aria-hidden="true" className="w-12 shrink-0 xl:hidden">
            <RobotCharacter className="is-waving-loop" />
          </span>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center border border-white/25 text-white/80 transition-colors hover:text-white xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/12 bg-[#08090b]/98 backdrop-blur-md xl:hidden">
          <ul className="mx-auto max-w-[88rem] px-5 py-3">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 text-[15px] font-semibold text-white/70 transition-colors hover:text-[#56d4ff]"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2 flex gap-2 border-t border-white/12 px-3 pt-4 pb-2">
              <IconLink href={profile.contact.github} label="GitHub">
                <GithubIcon size={18} />
              </IconLink>
              <IconLink href={profile.contact.linkedin} label="LinkedIn">
                <LinkedinIcon size={18} />
              </IconLink>
              <IconLink href={`mailto:${profile.contact.email}`} label="Email">
                <Mail size={18} />
              </IconLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function IconLink({ href, label, children }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className="grid h-9 w-9 place-items-center text-white/60 transition-colors hover:text-[#56d4ff]"
    >
      {children}
    </a>
  );
}
