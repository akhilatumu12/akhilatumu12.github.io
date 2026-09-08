# Akhila Tumu — Portfolio

A single-page portfolio built with **React 19 + Vite + Tailwind CSS v4** —
alternating black and white bands, bold sans type and a blue accent.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

```bash
npm run build     # production build into dist/
npm run preview   # preview the production build locally
```

## Editing your content

**Everything you would want to change lives in one file: [`src/data/profile.js`](src/data/profile.js).**
No component edits needed for normal updates.

| What | Where in `profile.js` |
|---|---|
| Name, roles, tagline, location, contact links | `profile` |
| The four headline numbers | `stats` |
| Project cards (title, blurb, detail, stack, links) | `projects` |
| Filter tabs above the project grid | `projectFilters` |
| Skill groups and their items | `skillGroups` |
| Strengths line in the About section | `professionalSkills` |
| Internship timeline entries | `experience` |
| Degrees, institutions and scores | `education` |
| Hackathon wins and recognition (with optional photos) | `achievements` |
| Certification list | `certifications` |
| Areas-of-interest list | `interests` |
| Scrolling tech strip under the hero | `marqueeItems` |

### Adding your achievement photos

Each entry in `achievements` has an `image` field, empty by default. To show a photo:

1. Put the image in `public/achievements/` (create the folder), e.g.
   `public/achievements/drdo-hackathon.jpg`
2. Set the field on that achievement:

```js
image: "/achievements/drdo-hackathon.jpg",
```

The row then shows the photo beside the text. Leave `image: ""` for a text-only
entry. Landscape images around 600×400 sit best at that width.

### Two projects have no repo link

`Real-Time Malicious Profile Detection` and `StartupSphere` are on your résumé but have
no matching public GitHub repository, so their cards render without a source button.
Add a `repo:` URL when you publish them.

### Adding a project

Append an object to the `projects` array:

```js
{
  title: "Project name",
  blurb: "One or two sentences on what it does.",
  detail: "The longer story, shown when someone clicks 'How it works'.",
  stack: ["React", "FastAPI"],
  tags: ["ai", "health"],       // any of: "ai" | "health" | "data" | "web"
  repo: "https://github.com/...",
  demo: "",                     // optional live URL
  highlight: "",                // optional italic one-liner
  featured: false,              // true adds a "Featured" label
}
```

The first `featured` project renders full width; the rest are a two-column grid.
Filter counts and the "Show N more" button update automatically — the grid shows
9 projects until expanded.

### Your photo

The portrait sits in the About section. It lives at `public/akhila-tumu.jpg` (900×900) with a lighter
`public/akhila-tumu@0.5x.jpg` (450×450) that phones download instead. To swap it,
replace both files keeping the same names, or point `profile.photo` /
`profile.photoSmall` somewhere else. Set `photo: ""` to remove it — About falls
back to a single full-width column automatically.

Use a square image; it is cropped to a square frame either way.

### Résumé

`public/resume.pdf` is already in place, so the hero's **Download CV** button works. Replace
that file whenever you update your CV, or point `profile.resumeUrl` elsewhere
(e.g. a Google Drive link).

## The robot intro

On load, a full-screen overlay plays a short greeting: a floating robot rises in,
waves, says "Hi! 👋", then the arced *Welcome to my portfolio* headline and your
name resolve before it fades into the site. Roughly 6.5 seconds end to end.

| Piece | File |
|---|---|
| Stage sequencing, arc text, name reveal | [`src/components/IntroAnimation.jsx`](src/components/IntroAnimation.jsx) |
| Overlay, arc, speech bubble, brand styles | [`src/styles/intro-animation.css`](src/styles/intro-animation.css) |
| The robot SVG itself | [`src/components/RobotCharacter.jsx`](src/components/RobotCharacter.jsx) |
| Float, blink, antenna sway, arm wave | [`src/styles/robot-character.css`](src/styles/robot-character.css) |

**Ways to skip it:** the *Skip intro* button (appears after 0.7 s), the <kbd>Esc</kbd>
key, or adding `?nointro` to the URL — handy while you are editing the rest of the page.
It also skips automatically for anyone using "reduce motion".

**Adjust the timing** via `DURATIONS` at the top of `IntroAnimation.jsx` — `enter`,
`greet`, `brand` and `exit`, all in milliseconds.

**Play it only once per visit** instead of on every page load: set
`INTRO_ONCE_PER_SESSION = true` in [`src/App.jsx`](src/App.jsx). It then remembers via
`sessionStorage`, so it plays once per browser tab.

**Reuse the robot elsewhere.** It is a standalone component:

```jsx
import RobotCharacter from "./components/RobotCharacter";

<div style={{ width: 160 }}>
  <RobotCharacter className="is-waving-loop" />
</div>
```

It idles on its own (floating, blinking, antennae swaying, chest pulsing). Add
`is-greeting` to wave twice, or `is-waving-loop` to keep waving.

## Design notes

**Alternating black and white bands with a blue accent.** Each section declares
`tone="dark"` or `tone="light"`; the tone sets CSS variables and every
`text-fg` / `bg-card` / `border-line` inside inverts automatically, so a section
can be moved between bands by changing one word.

Section order and bands: Hero (black) → About (white) → Skills (black) →
Journey (white) → Projects (black) → Beyond (white) → Contact (black).

- **Palette** lives in [`src/index.css`](src/index.css). The `.tone-dark` and
  `.tone-light` blocks hold the `--s-*` values for each band. Note both blocks
  must re-declare the `--color-*` tokens — a custom property resolves its
  `var()` references where it is *declared*, so declaring them only on `:root`
  locks them to the dark values.
- **Type** is Inter throughout — headings use `.font-display` (weight 800,
  tight tracking) so they read bold and professional; JetBrains Mono is kept
  for numerals and technical labels.
- **Surfaces are flat** — `.card` is a solid panel with a real 1px border, and
  `.rule` is the hairline dividing blocks.
- **Skill icons** come from the local `simple-icons` package via
  [`TechIcon`](src/components/TechIcon.jsx); anything without a brand mark
  falls back to a monogram so every chip stays aligned.
- **Float effect**: `.animate-float` with a per-element `--float-delay`, used
  by the hero tech cluster so the tiles never bob in lockstep.
- **Sections are numbered** (`01`, `02`, …) via the `number` prop on
  [`Section`](src/components/Section.jsx), above a hairline rule.
- Sections fade in on scroll via an `IntersectionObserver` in
  [`src/hooks/useReveal.js`](src/hooks/useReveal.js). Anything with the `reveal`
  class participates; stagger it with an inline `transitionDelay`. Two
  timer-based failsafes guarantee content is never left invisible if the
  observer fails to report.
- Everything respects `prefers-reduced-motion` — animations and the typing
  effect switch off.
- GitHub and LinkedIn marks are local SVGs in
  [`src/components/BrandIcons.jsx`](src/components/BrandIcons.jsx), because
  `lucide-react` v1 dropped brand icons.

## Deploying

The build output is fully static — any host works.

**Netlify / Vercel** — connect the repo; build command `npm run build`, publish directory `dist`.

**GitHub Pages** — if you deploy to `https://<user>.github.io/<repo>/`, set the repo path as
the base in [`vite.config.js`](vite.config.js) first:

```js
base: '/<repo-name>/',
```

Then build and publish `dist/`. If you deploy to a custom domain or a
`<user>.github.io` root repo, leave `base: '/'` as it is.
