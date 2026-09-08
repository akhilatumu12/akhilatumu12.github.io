import * as si from "simple-icons";
import {
  Binary,
  BrainCircuit,
  ChartColumn,
  ChartSpline,
  Cloud,
  Code2,
  Cpu,
  Database,
  Eye,
  Filter,
  Fingerprint,
  Grid2x2Check,
  KeyRound,
  Layers,
  Languages,
  MessageSquareCode,
  Network,
  Plug,
  Rocket,
  ScanSearch,
  Search,
  Smartphone,
  Sparkles,
  Waypoints,
  Wand2,
} from "lucide-react";
import { asset } from "../lib/asset";

/**
 * Brand glyph for a technology name, drawn from simple-icons.
 *
 * Icon keys do not match the display labels (Next.js → siNextdotjs), so the
 * mapping below is explicit.
 */
const ICONS = {
  // Frontend
  "React": "siReact",
  "React 19": "siReact",
  "React.js": "siReact",
  "Next.js": "siNextdotjs",
  "TypeScript": "siTypescript",
  "JavaScript": "siJavascript",
  "JavaScript (ES6+)": "siJavascript",
  "HTML5": "siHtml5",
  "CSS3": "siCss",
  "Tailwind CSS": "siTailwindcss",
  "Bootstrap": "siBootstrap",
  "Vite": "siVite",
  "React Router": "siReactrouter",

  // Backend
  "Node.js": "siNodedotjs",
  "Express": "siExpress",
  "Express.js": "siExpress",
  "Python": "siPython",
  "FastAPI": "siFastapi",
  "Flask": "siFlask",

  // Data
  "PostgreSQL": "siPostgresql",
  "MySQL": "siMysql",
  "SQLite": "siSqlite",
  "SQLite3": "siSqlite",
  "Pandas": "siPandas",
  "NumPy": "siNumpy",
  "Plotly": "siPlotly",

  // ML
  "TensorFlow": "siTensorflow",
  "PyTorch": "siPytorch",
  "Scikit-learn": "siScikitlearn",
  "scikit-learn": "siScikitlearn",
  "Keras": "siKeras",
  "OpenCV": "siOpencv",
  "Hugging Face": "siHuggingface",
  "Transformers": "siHuggingface",

  // Tools
  "Git": "siGit",
  "Git & GitHub": "siGithub",
  "GitHub": "siGithub",
  "Docker": "siDocker",
  "Streamlit": "siStreamlit",
  "Jupyter": "siJupyter",
  "Google Colab": "siGooglecolab",
  "Postman": "siPostman",
  "Render": "siRender",
  "Vercel": "siVercel",
  "Anaconda": "siAnaconda",

  // Available in simple-icons under a different name than the label
  "C": "siC",
  "Apache Kafka": "siApachekafka",
};

/**
 * Official logos that simple-icons does not carry — pulled from devicon (MIT)
 * and served from public/icons. These are full-colour SVGs drawn as <img>, so
 * they keep their own brand colours rather than inheriting text colour.
 *
 * To add another: drop the SVG in public/icons and map the skill name here.
 */
const FILE_ICONS = {
  "Java": asset("/icons/java-original.svg"),
  "VS Code": asset("/icons/vscode-original.svg"),
  "Heroku": asset("/icons/heroku-original.svg"),
  "Matplotlib": asset("/icons/matplotlib-original.svg"),
  "Apache Kafka": asset("/icons/apachekafka-original.svg"),
};

/**
 * Concepts (Machine Learning, RAG, EDA…) have no brand mark by definition, so
 * they get a symbolic glyph. Each carries its own colour so the grid reads as
 * colourful rather than a wall of grey outlines.
 */
const AI = "#a78bfa";
const VISION = "#22d3ee";
const LANG = "#34d399";
const DATA = "#fbbf24";
const SEC = "#fb7185";
const NET = "#38bdf8";
const SHIP = "#fb923c";

const CONCEPT_ICONS = {
  // AI / ML
  "Machine Learning": [BrainCircuit, AI],
  "Deep Learning": [Layers, AI],
  "Neural Networks": [Network, AI],
  "Computer Vision": [Eye, VISION],
  "Generative AI": [Sparkles, AI],
  "NLP": [Languages, LANG],
  "LLMs": [MessageSquareCode, LANG],
  "RAG": [Search, LANG],
  "CNN": [Grid2x2Check, VISION],
  "YOLO": [ScanSearch, VISION],
  "Prompt Engineering": [Wand2, AI],
  "Model Deployment": [Rocket, SHIP],

  // Data work
  "Data Preprocessing": [Filter, DATA],
  "Feature Engineering": [Waypoints, DATA],
  "EDA": [ChartSpline, DATA],
  "Seaborn": [ChartColumn, DATA],
  "Power BI": [ChartColumn, DATA],
  "Tableau": [ChartColumn, DATA],
  "ChromaDB": [Database, DATA],
  "FAISS": [Database, DATA],
  "SQL": [Database, DATA],

  // Backend
  "RESTful APIs": [Plug, NET],
  "API Integration": [Plug, NET],
  "JWT Auth": [KeyRound, SEC],
  "RBAC": [Fingerprint, SEC],

  // Misc
  "Responsive Design": [Smartphone, NET],
  "Binary": [Binary, DATA],
  "Code": [Code2, NET],
  "Compute": [Cpu, SHIP],
  "Cloud": [Cloud, NET],
};

/** Relative luminance of a `RRGGBB` hex, per WCAG. */
function luminance(hex) {
  const channels = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

/** Mix a hex toward white. `amount` is 0 (unchanged) to 1 (white). */
function lighten(hex, amount) {
  const mixed = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16);
    return Math.round(c + (255 - c) * amount);
  });
  return `#${mixed.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

/**
 * Logos are drawn on a near-black tile, and plenty of brands are officially
 * dark — Next.js and Vercel are pure black, Pandas and NumPy are deep navy.
 * Rather than throw the brand colour away, lift it toward white just far
 * enough to be legible. True blacks land on a light grey, which is how those
 * marks are normally shown on dark anyway; coloured ones keep their hue.
 */
const MIN_LUMINANCE = 0.3;

/**
 * A few marks are registered as pure black in simple-icons, which the lift
 * above turns into a washed-out grey. Two different fixes apply:
 *
 *  - Render's logo is black but the brand runs on a signature teal, so use it.
 *  - Vercel, Next.js, GitHub and Express are monochrome by design and have no
 *    brand colour at all. Crisp white is how they are meant to appear on a
 *    dark ground — far better than the muddy grey the lift produced.
 */
const BRAND_OVERRIDES = {
  siRender: "#46e3b7",
  siVercel: "#ffffff",
  siNextdotjs: "#ffffff",
  siGithub: "#ffffff",
  siExpress: "#ffffff",
};

function brandColor(icon, key) {
  if (BRAND_OVERRIDES[key]) return BRAND_OVERRIDES[key];
  if (!icon?.hex) return "currentColor";

  let hex = icon.hex;
  for (let amount = 0; amount <= 0.9; amount += 0.05) {
    hex = lighten(icon.hex, amount);
    if (luminance(hex.slice(1)) >= MIN_LUMINANCE) break;
  }
  return hex;
}

export default function TechIcon({ name, size = 16, className = "", brand = true }) {
  // A local full-colour SVG wins over everything else.
  const file = FILE_ICONS[name];
  if (file) {
    return (
      <img
        src={file}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        loading="lazy"
        className={className}
        style={{ width: size, height: size, objectFit: "contain" }}
      />
    );
  }

  const key = ICONS[name];
  const icon = si[key];

  if (icon) {
    return (
      <svg
        role="img"
        aria-hidden="true"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={brand ? brandColor(icon, key) : "currentColor"}
        className={className}
      >
        <path d={icon.path} />
      </svg>
    );
  }

  const concept = CONCEPT_ICONS[name];
  if (concept) {
    const [Glyph, color] = concept;
    return (
      <Glyph
        size={size}
        strokeWidth={1.9}
        color={color}
        className={className}
        aria-hidden="true"
      />
    );
  }

  // Nothing matched — a letter still keeps the row aligned.
  return (
    <span
      aria-hidden="true"
      className={`inline-grid place-items-center font-mono leading-none ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.62 }}
    >
      {name.trim().charAt(0).toUpperCase()}
    </span>
  );
}
