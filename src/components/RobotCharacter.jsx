import { useId } from "react";
import "../styles/robot-character.css";

/**
 * The portfolio mascot. Idles continuously (float, blink, antenna sway,
 * chest pulse); add `is-greeting` to make the right arm wave once, or
 * `is-waving-loop` to keep it waving.
 *
 * The gradient and filter ids are made unique per instance. With fixed ids,
 * several robots on one page all declare the same ones, every `url(#…)`
 * resolves to whichever appears first, and when that instance unmounts — as
 * the intro overlay does — the survivors lose their fills and render black.
 */
function RobotCharacter({ className = "" }) {
  const uid = useId().replace(/:/g, "");
  const head = `head-${uid}`;
  const body = `body-${uid}`;
  const glow = `glow-${uid}`;
  const soft = `soft-${uid}`;

  return (
    <svg
      className={`robot-character ${className}`}
      viewBox="0 0 300 360"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Friendly robot mascot waving hello"
    >
      <defs>
        <linearGradient id={head} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F6F1E7" />
          <stop offset="100%" stopColor="#DDD3C2" />
        </linearGradient>
        <linearGradient id={body} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EFE9DC" />
          <stop offset="100%" stopColor="#CFC4B0" />
        </linearGradient>
        <radialGradient id={glow} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#56d4ff" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#22b8f0" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#22b8f0" stopOpacity="0" />
        </radialGradient>
        <filter id={soft} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* grounding shadow — breathes opposite the float so it reads as hovering */}
      <ellipse
        className="robot-shadow"
        cx="150"
        cy="330"
        rx="62"
        ry="13"
        fill="rgba(16, 15, 11, 0.5)"
      />

      <g className="robot-float">
        {/* ambient glow behind the character */}
        <circle cx="150" cy="170" r="125" fill={`url(#${glow})`} />

        {/* LEFT ARM — idle sway */}
        <g className="robot-arm robot-arm-left">
          <rect
            x="34"
            y="196"
            width="66"
            height="26"
            rx="13"
            fill={`url(#${body})`}
            stroke="#22b8f0"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
        </g>

        {/* RIGHT ARM — this is the one that waves */}
        <g className="robot-arm robot-arm-right">
          <rect
            x="200"
            y="196"
            width="66"
            height="26"
            rx="13"
            fill={`url(#${body})`}
            stroke="#22b8f0"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
        </g>

        {/* ANTENNAE — slightly different timings so they don't move in lockstep */}
        <g className="robot-antenna robot-antenna-left">
          <line x1="118" y1="76" x2="109" y2="38" stroke="#C6BBA8" strokeWidth="5" strokeLinecap="round" />
          <circle cx="109" cy="33" r="7" fill="#F6F1E7" stroke="#22b8f0" strokeWidth="2.5" filter={`url(#${soft})`} />
        </g>
        <g className="robot-antenna robot-antenna-right">
          <line x1="182" y1="76" x2="191" y2="38" stroke="#C6BBA8" strokeWidth="5" strokeLinecap="round" />
          <circle cx="191" cy="33" r="7" fill="#F6F1E7" stroke="#56d4ff" strokeWidth="2.5" filter={`url(#${soft})`} />
        </g>

        {/* TORSO */}
        <rect x="88" y="190" width="124" height="120" rx="54" fill={`url(#${body})`} />
        <rect x="118" y="208" width="64" height="76" rx="22" fill="#E8DCC8" />
        <circle className="robot-chest-glow" cx="150" cy="246" r="15" fill="#22b8f0" filter={`url(#${soft})`} />

        {/* NECK */}
        <rect x="137" y="180" width="26" height="18" fill="#E2D9C8" />

        {/* HEAD */}
        <rect x="82" y="66" width="136" height="120" rx="44" fill={`url(#${head})`} />

        {/* FACE PLATE */}
        <rect x="100" y="98" width="100" height="64" rx="24" fill="#1c1a14" />

        {/* EYES */}
        <g className="robot-eyes">
          <rect x="121" y="117" width="20" height="25" rx="8" fill="#7fe3ff" filter={`url(#${soft})`} />
          <rect x="159" y="117" width="20" height="25" rx="8" fill="#7fe3ff" filter={`url(#${soft})`} />
        </g>

        {/* SMILE */}
        <path
          d="M137,151 Q150,160 163,151"
          stroke="#8ddfff"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export default RobotCharacter;
