import { useCallback, useEffect, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Beyond from "./components/Beyond";
import Achievements from "./components/Achievements";
import Certifications from "./components/Certifications";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Colleagues from "./components/Colleagues";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import IntroAnimation from "./components/IntroAnimation";
import { useReveal } from "./hooks/useReveal";

/**
 * Set to true to play the robot intro only once per browser tab session
 * instead of on every page load.
 */
const INTRO_ONCE_PER_SESSION = false;

function shouldSkipIntro() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  // ?nointro on the URL bypasses it — handy while editing the rest of the page.
  if (new URLSearchParams(window.location.search).has("nointro")) return true;
  if (INTRO_ONCE_PER_SESSION) {
    try {
      return sessionStorage.getItem("introSeen") === "1";
    } catch {
      return false; // private mode / blocked storage — just play it
    }
  }
  return false;
}

export default function App() {
  const [introDone, setIntroDone] = useState(() => shouldSkipIntro());

  const finishIntro = useCallback(() => {
    setIntroDone(true);
    if (INTRO_ONCE_PER_SESSION) {
      try {
        sessionStorage.setItem("introSeen", "1");
      } catch {
        /* storage unavailable — nothing to remember, no harm */
      }
    }
  }, []);

  // Hold the page still behind the overlay, and start at the top afterwards.
  useEffect(() => {
    document.body.style.overflow = introDone ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introDone]);

  // Section fade-ins wait for the intro so they aren't spent behind it.
  useReveal(introDone);

  return (
    <>
      {!introDone && <IntroAnimation onComplete={finishIntro} />}

      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:text-fg focus:ring-1 focus:ring-accent-500"
      >
        Skip to content
      </a>

      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Beyond />
        <Achievements />
        <Certifications />
        <Services />
        <Testimonials />
        <Colleagues />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
