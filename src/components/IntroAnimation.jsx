import { useEffect, useState } from "react";
import RobotCharacter from "./RobotCharacter";
import { profile } from "../data/profile";
import "../styles/intro-animation.css";

const DURATIONS = {
  enter: 1300, // robot rises in
  greet: 1900, // waves + "Hi!" bubble
  brand: 2600, // name + tagline reveal
  exit: 700, // overlay fades away
};

const WORD_STAGGER_MS = 90;
const LETTER_STAGGER_MS = 55;

function StaggeredWords({ text, startDelay = 0 }) {
  return text.split(" ").map((word, i) => (
    <span
      key={`${word}-${i}`}
      className="intro-jump-word"
      style={{ "--jump-delay": `${startDelay + i * WORD_STAGGER_MS}ms` }}
    >
      {word}
      {i < text.split(" ").length - 1 ? " " : ""}
    </span>
  ));
}

function StaggeredLetters({ text, startDelay = 0 }) {
  return text.split("").map((letter, i) => (
    <span
      key={`${letter}-${i}`}
      className="intro-jump-letter"
      style={{ "--jump-delay": `${startDelay + i * LETTER_STAGGER_MS}ms` }}
    >
      {letter === " " ? " " : letter}
    </span>
  ));
}

export default function IntroAnimation({ onComplete }) {
  const [stage, setStage] = useState("enter");
  const [skippable, setSkippable] = useState(false);

  useEffect(() => {
    // Anyone who asked for less motion skips straight to the site.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }

    const timers = [];
    let elapsed = DURATIONS.enter;
    timers.push(setTimeout(() => setStage("greet"), elapsed));
    elapsed += DURATIONS.greet;
    timers.push(setTimeout(() => setStage("brand"), elapsed));
    elapsed += DURATIONS.brand;
    timers.push(setTimeout(() => setStage("exit"), elapsed));
    elapsed += DURATIONS.exit;
    timers.push(setTimeout(onComplete, elapsed));

    timers.push(setTimeout(() => setSkippable(true), 700));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Let people escape with Esc as well as the button.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onComplete();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onComplete]);

  const showArc = stage !== "enter";
  const showBrand = stage === "brand" || stage === "exit";

  return (
    <div className={`intro-overlay intro-stage-${stage}`} role="presentation">
      <div className="intro-glow intro-glow-a" />
      <div className="intro-glow intro-glow-b" />
      <div className="intro-glow intro-glow-c" />

      {showArc && (
        <svg className="intro-welcome-arc" viewBox="0 0 1000 190" aria-hidden="true">
          <defs>
            <linearGradient id="introArcGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8ddfff" />
              <stop offset="55%" stopColor="#56d4ff" />
              <stop offset="100%" stopColor="#22b8f0" />
            </linearGradient>
            <filter id="introArcGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path id="introArcPath" d="M 30,165 Q 500,15 970,165" fill="none" />
          <text className="intro-welcome-arc-text">
            <textPath href="#introArcPath" startOffset="50%" textAnchor="middle">
              <tspan>Welcome to my </tspan>
              <tspan className="intro-arc-highlight">portfolio</tspan>
            </textPath>
          </text>
        </svg>
      )}

      <div className="intro-stack">
        <div className="intro-speech">Hi! 👋</div>

        <div className="intro-robot">
          <RobotCharacter
            className={
              stage === "enter"
                ? "intro-robot-enter"
                : stage === "greet"
                  ? "is-greeting"
                  : ""
            }
          />
        </div>

        {showBrand && (
          <>
            <div className="intro-brand intro-brand-highlight">
              <span className="intro-brand-mark">{profile.initials}</span>
              <span className="intro-brand-text">
                <StaggeredLetters text={profile.name} />
              </span>
            </div>

            <p className="intro-tagline">
              <StaggeredWords text="AI & Machine Learning Engineer" startDelay={420} />
            </p>
          </>
        )}
      </div>

      {skippable && (
        <button type="button" className="intro-skip" onClick={onComplete}>
          Skip intro →
        </button>
      )}
    </div>
  );
}
