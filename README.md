# Ribeira Quest

Gamified personal branding site for Christian Bourlier — Technical Solutions Partner. A scroll-driven single-page experience with Three.js scenes, animated reveals, and an admin-controlled palette system.

**Live:** [christianbourlier.com](https://christianbourlier.com)

## Purpose

This site communicates a rare professional combination — data engineering, enterprise sales, and professional poker — through interactive storytelling. Visitors scroll through a quest-style narrative that reveals skills, projects, and approach through animated cards, 3D particle streams, and a final "equation" reveal.

The site doubles as a technical showcase: shader-based river animation, GPU particle systems, scroll-linked ambient streams, and a server-side theme system with zero flash of wrong colors.

## Sections

| Section | Component | What it does |
|---------|-----------|-------------|
| **Hero** | `HeroSection` + `RiverScene` | Animated headline over a GLSL shader river with floating particles. CTA scrolls to Journey. |
| **Journey** | `JourneySection` + `NoteHighway` | Three skill stream cards (Data / Sales / Poker) with click-to-reveal loot boxes. Background has Three.js ambient particle streams that pause on card hover. |
| **Workshop** | `WorkshopSection` + `TypewriterCLI` | Three project cards (OptiMeasure, CacheBash, AI Portal) with a looping terminal typewriter demo. |
| **Boss Fight** | `BossFightSection` + `EquationVisual` + `ArchitectureMap` | Animated equation reveal, SVG architecture flow diagram, and testimonial card. |
| **Footer** | `Footer` | Contact links with hover glow effects. Hidden gear icon links to `/admin`. |

## Tech Stack

- **Framework:** Next.js 16 (App Router, async Server Components)
- **UI:** React 19, Tailwind CSS 4, Framer Motion
- **3D:** Three.js with custom GLSL shaders
- **State:** Zustand (quest progression)
- **Auth:** Auth.js v5 (Google OAuth)
- **Storage:** Vercel Edge Config (palette persistence)
- **Deployment:** Vercel

## Architecture

```
src/
├── app/
│   ├── layout.tsx          # Async — reads palette from Edge Config, injects CSS vars on <html>
│   ├── page.tsx            # Main page composing all sections
│   ├── globals.css         # @theme inline registrations, glassmorphism, scrollbar
│   ├── admin/
│   │   ├── page.tsx        # Auth-gated server component
│   │   └── PaletteGrid.tsx # 8 palette cards with preview + apply
│   └── api/
│       ├── auth/[...nextauth]/route.ts  # Google OAuth handler
│       └── palette/route.ts             # POST to update Edge Config
├── components/
│   ├── hero/               # HeroSection, RiverScene (Three.js shader river)
│   ├── journey/            # JourneySection, NoteHighway (particle streams), StreamCard, LootBox
│   ├── workshop/           # WorkshopSection, ProjectCard, TypewriterCLI
│   ├── bossfight/          # BossFightSection, EquationVisual, ArchitectureMap (SVG)
│   ├── layout/             # Footer, ScrollProgress
│   └── ui/                 # Button, GlowText
├── config/
│   ├── palettes.ts         # 8 palette definitions + types
│   ├── content.ts          # All copy/text content
│   └── theme.ts            # Legacy re-exports (deprecated)
├── lib/
│   ├── auth.ts             # Auth.js config (Google, email restriction)
│   ├── edge-config.ts      # getActivePaletteId() helper
│   ├── palette-context.tsx  # ThemeProvider + usePalette() hook
│   ├── three/
│   │   ├── river-shader.ts  # GLSL vertex/fragment shaders, parameterized colors
│   │   ├── particle-system.ts
│   │   ├── ambient-stream.ts
│   │   └── scene-manager.ts
│   ├── hooks/
│   │   ├── useQuestStore.ts  # Zustand store (phase, reveals, scroll)
│   │   ├── useDeviceType.ts  # Responsive particle counts + pixel ratios
│   │   ├── useReducedMotion.ts
│   │   └── useScrollProgress.ts
│   ├── animations/
│   │   └── scroll-variants.ts  # Framer Motion variants
│   └── utils/
│       └── cn.ts            # clsx + tailwind-merge
└── middleware.ts            # Protects /admin and /api/palette
```

## Palette System

8 color palettes (4 Portuguese heritage, 4 tech aesthetics) controlled from `/admin`. Each palette defines 8 semantic roles:

| Role | Usage |
|------|-------|
| `background` | Page background, section backgrounds |
| `backgroundLight` | Glass cards, hover states, SVG fills |
| `accent` | Headings, links, borders, progress bar |
| `cta` | Buttons, project names, sign-off text |
| `foreground` | Body text, heading text |
| `stream1` | Data stream particles, terminal text |
| `stream2` | Sales stream particles, equation colors |
| `stream3` | Poker stream particles, terminal dots |

**How it works:**

1. `layout.tsx` reads the active palette ID from Vercel Edge Config at request time
2. CSS custom properties (`--background`, `--accent`, etc.) are injected on `<html style="...">`
3. Tailwind `@theme inline` maps these to utility classes (`bg-background`, `text-accent/60`)
4. Client components access hex values and Three.js integers via `usePalette()` context
5. No flash of wrong theme — colors are in the initial HTML response

**Available palettes:** Porto Data Streams, Azulejo Algorithms, Nazare Wavefronts, Pastel de Nata, Autumn AI, Forest Floor, Mediterranean Code, Oceanic Insights.

## Three.js Scenes

**RiverScene** (Hero): A plane geometry with custom GLSL shaders creates a flowing river effect. Vertex shader applies layered sine/cosine wave displacement. Fragment shader mixes deep/light/accent colors with flowing highlights. Two particle systems float above — primary (accent) and secondary (stream1).

**NoteHighway** (Journey): Three ambient particle streams in parallel lanes. Each stream uses the palette's stream colors. Particles drift upward with sinusoidal sway and respond to scroll speed. Streams pause when their corresponding card is hovered.

Both scenes scale particle counts and pixel ratios by device type (mobile/tablet/desktop) and disable entirely when `prefers-reduced-motion` is active, falling back to CSS gradients.

## Local Development

```bash
npm install
cp .env.local.example .env.local  # fill in values (see below)
npm run dev
```

### Environment Variables

| Variable | Source | Purpose |
|----------|--------|---------|
| `GOOGLE_CLIENT_ID` | GCP Console → Credentials | OAuth sign-in |
| `GOOGLE_CLIENT_SECRET` | GCP Console → Credentials | OAuth sign-in |
| `AUTH_SECRET` | `openssl rand -base64 32` | Auth.js session encryption |
| `EDGE_CONFIG` | Vercel Dashboard → Storage | Edge Config connection string |
| `EDGE_CONFIG_ID` | Vercel Dashboard → Storage | Edge Config store ID |
| `VERCEL_API_TOKEN` | Vercel Dashboard → Account → Tokens | Writing to Edge Config |

## Deployment

Hosted on Vercel. Pushes to `main` auto-deploy. All environment variables must be set in the Vercel dashboard across production, preview, and development environments.

## Roadmap

- **Analytics integration** — Track which palette visitors see and section engagement
- **Additional palettes** — Seasonal or event-specific themes
- **CMS for content** — Move copy from `content.ts` to a headless CMS for non-dev editing
- **Blog / writing section** — Long-form content on data engineering, sales, and poker strategy
- **Case studies** — Deep-dive pages for OptiMeasure, CacheBash, and AI Portal with live demos
- **Contact form** — Inline form with serverless function, replacing mailto link
- **Performance monitoring** — Web Vitals dashboard, Three.js frame rate tracking
- **A/B testing** — Test different hero hooks and CTA copy against conversion goals
- **Mobile gestures** — Swipe navigation between sections, haptic feedback on reveals
- **Sound design** — Optional ambient audio tied to scroll position and palette
