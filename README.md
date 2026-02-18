# Ribeira Quest

Gamified personal branding site for Christian Bourlier — Solutions Architect & Data Engineer. A scroll-driven single-page experience with Three.js scenes, animated reveals, palette-matched one-sheeter downloads, a visitor-facing palette switcher, and SEO optimized for recruiter discoverability.

**Live:** [christianbourlier.com](https://christianbourlier.com)

## Purpose

This site communicates a rare professional combination — data engineering, enterprise sales, and professional poker — through interactive storytelling. Visitors scroll through a quest-style narrative that reveals skills, projects, and approach through animated cards, 3D particle streams, and a final "equation" reveal.

The site doubles as a technical showcase: shader-based river animation, GPU particle systems, scroll-linked ambient streams, and a server-side theme system with zero flash of wrong colors.

## Sections

| Section | Component | What it does |
|---------|-----------|-------------|
| **Header** | `Header` | Sticky glass header with contact icons, section nav, and palette switcher dropdown. |
| **Hero** | `HeroSection` + `RiverScene` | Animated headline over a GLSL shader river with floating particles. CTA scrolls to Journey. |
| **Journey** | `JourneySection` + `NoteHighway` | Three skill stream cards (Data / Sales / Poker) with click-to-reveal loot boxes. Background has Three.js ambient particle streams. |
| **Competencies** | `CompetencyHubSection` + `RadialHub` | Animated SVG radial hub-and-spoke diagram with 6 core competencies orbiting a center node. Scales naturally via `viewBox` on all screen sizes. |
| **Open To** | `OpenToSection` + `RoleCard` | 4 glass cards for target roles (Solutions Architect, AI/ML Solutions Engineer, TAM, AI Strategist) with "what I bring" pill tags. |
| **Workshop** | `WorkshopSection` + `TypewriterCLI` | Three project cards (OptiMeasure, CacheBash, AI Portal) with a looping terminal typewriter demo. |
| **Boss Fight** | `BossFightSection` + `TestimonialCarousel` | Animated equation reveal, SVG architecture flow diagram, and 6-testimonial auto-advancing carousel with LinkedIn recommendations. |
| **Implementation** | `ImplementationSection` + `SkillPill` + `CertBadge` | 16 category-colored skill pills (language/cloud/data/ai) and GCP certification badges (PDE, PCA). |
| **One-Sheeter** | `OneSheeterSection` + `PDFPreview` | Palette-matched PDF download with thumbnail preview. Serves the correct one-sheeter for the active palette from `/public/onesheets/`, with PNG previews in `/public/onesheet-previews/`. |
| **Contact** | `ContactSection` | Glass-card contact form (Name, Email, Phone, LinkedIn, Company, Message). Submissions POST to `/api/contact` and append to a Google Sheet via service account. |
| **Writing** | `WritingSection` | Latest Medium blog posts fetched at build time, displayed as glass cards with publication dates. |
| **Footer** | `Footer` | Signature animation reveal (10% larger on mobile), section nav (sans redundant Contact/One-Sheeter), contact links (stacked on mobile, inline on desktop), download CTA, and hidden admin gear icon. |

## Tech Stack

- **Framework:** Next.js 16 (App Router, async Server Components)
- **UI:** React 19, Tailwind CSS 4, Framer Motion
- **3D:** Three.js with custom GLSL shaders
- **State:** Zustand (quest progression, section tracking, download state)
- **Auth:** Auth.js v5 (Google OAuth for admin)
- **Storage:** Vercel Edge Config (admin palette), localStorage (visitor palette)
- **Deployment:** Vercel

## Architecture

```
src/
├── app/
│   ├── layout.tsx          # Async — reads palette from Edge Config, injects CSS vars, SEO metadata + JSON-LD
│   ├── page.tsx            # Main page composing all sections + easter eggs
│   ├── globals.css         # @theme inline registrations, glassmorphism, scrollbar
│   ├── manifest.ts         # PWA web manifest (generates /manifest.webmanifest)
│   ├── robots.ts           # robots.txt generation
│   ├── sitemap.ts          # sitemap.xml generation
│   ├── not-found.tsx       # Custom 404 page
│   ├── opengraph-image.tsx # Dynamic OG image (edge runtime, 1200×630)
│   ├── twitter-image.tsx   # Dynamic Twitter/LinkedIn card image (edge runtime, 1200×630)
│   ├── admin/
│   │   ├── page.tsx        # Auth-gated server component
│   │   └── PaletteGrid.tsx # 8 palette cards with preview + apply
│   └── api/
│       ├── auth/[...nextauth]/route.ts  # Google OAuth handler
│       ├── contact/route.ts             # POST form submissions → Google Sheets
│       └── palette/route.ts             # POST to update Edge Config
├── components/
│   ├── hero/               # HeroSection, RiverScene (Three.js shader river)
│   ├── journey/            # JourneySection, NoteHighway (particle streams), StreamCard (with inline skill tags)
│   ├── competencies/       # CompetencyHubSection, RadialHub (animated SVG)
│   ├── opento/             # OpenToSection, RoleCard (glass cards + pill tags)
│   ├── workshop/           # WorkshopSection, ProjectCard, TypewriterCLI
│   ├── bossfight/          # BossFightSection, EquationVisual, ArchitectureMap, TestimonialCarousel
│   ├── implementation/     # ImplementationSection, SkillPill, CertBadge
│   ├── download/           # OneSheeterSection, PDFPreview
│   ├── contact/            # ContactSection (form → Google Sheets)
│   ├── layout/             # Header, Footer, ScrollProgress
│   └── ui/                 # Button, GlowText, KonamiOverlay, CursorTrail
├── config/
│   ├── palettes.ts         # 8 palette definitions + types
│   ├── content.ts          # All copy/text content (hero, journey, competencies, openTo, workshop, bossfight, implementation, oneSheeter, contact, footer)
│   ├── onesheet-map.ts     # Palette ID → PDF path + preview path mapping
│   └── theme.ts            # Legacy re-exports (deprecated)
├── lib/
│   ├── auth.ts             # Auth.js config (Google, email restriction)
│   ├── edge-config.ts      # getActivePaletteId() helper
│   ├── palette-context.tsx  # ThemeProvider + usePalette() hook + client-side switching
│   ├── three/
│   │   ├── river-shader.ts  # GLSL vertex/fragment shaders, parameterized colors
│   │   ├── particle-system.ts
│   │   ├── ambient-stream.ts
│   │   └── scene-manager.ts
│   ├── hooks/
│   │   ├── useQuestStore.ts    # Zustand store (phase, reveals, scroll, sections visited, download)
│   │   ├── useKonami.ts        # Konami code keydown listener
│   │   ├── useDeviceType.ts    # Responsive particle counts + pixel ratios
│   │   ├── useReducedMotion.ts
│   │   └── useScrollProgress.ts
│   ├── animations/
│   │   └── scroll-variants.ts  # Framer Motion variants
│   └── utils/
│       └── cn.ts            # clsx + tailwind-merge
└── middleware.ts            # Protects /admin and /api/palette
```

## Palette System

8 color palettes (4 Portuguese heritage, 4 tech aesthetics) with two control layers:

- **Admin control:** `/admin` panel updates Vercel Edge Config (sets the server-rendered default)
- **Visitor control:** Header palette switcher persists selection to `localStorage` and applies instantly

Each palette defines 8 semantic color roles:

| Role | Usage |
|------|-------|
| `background` | Page background, section backgrounds |
| `backgroundLight` | Glass cards, hover states, SVG fills |
| `accent` | Headings, links, borders, progress bar |
| `cta` | Buttons, project names, download CTA |
| `foreground` | Body text, heading text |
| `stream1` | Data stream particles, language skill pills |
| `stream2` | Sales stream particles, cloud skill pills |
| `stream3` | Poker stream particles, data skill pills |

**How it works:**

1. `layout.tsx` reads the active palette ID from Vercel Edge Config at request time
2. CSS custom properties (`--background`, `--accent`, etc.) are injected on `<html style="...">`
3. Tailwind `@theme inline` maps these to utility classes (`bg-background`, `text-accent/60`)
4. Client components access hex values and Three.js integers via `usePalette()` context
5. On mount, `ThemeProvider` checks `localStorage` for a visitor override and applies it
6. Palette switches update CSS variables, React context, and `localStorage` simultaneously
7. No flash of wrong theme — server-rendered colors load first, visitor override applies on hydration

**Available palettes:** Nazaré Wavefronts (dark) and Pastel de Nata (light).

## One-Sheeter System

8 palette-matched PDF one-sheeters are served from `/public/onesheets/`, each with a PNG thumbnail preview in `/public/onesheet-previews/`. The download section displays a 3D-tilted preview image above the CTA button, with a glow effect underneath. The download button automatically selects the correct PDF based on the active palette. Both PDF and preview mappings are defined in `src/config/onesheet-map.ts`.

## SEO & Discoverability

Optimized for recruiter and hiring-manager searches targeting Solutions Architect, Data Engineer, AI/ML Engineer, and Technical Account Manager roles.

- **Metadata:** Title and description front-load all target job titles within Google's 160-char snippet length. 18 keywords covering role titles, GCP certifications, and key technologies.
- **Canonical URL:** `alternates.canonical` prevents duplicate-content signals.
- **JSON-LD:** `@graph` with Person and WebSite schemas. Person includes `jobTitle` array (5 roles), `hasCredential` (GCP PDE + PCA certs), `hasOccupation` (Solutions Architect, Data Engineer with US location + skills), and 19 `knowsAbout` terms. Cross-referenced via `@id` anchors.
- **Social cards:** OpenGraph (`siteName`, `locale`, explicit `images` with dimensions) and Twitter `summary_large_image` card. Dynamic image generation via edge runtime (both `opengraph-image.tsx` and `twitter-image.tsx`).
- **PWA manifest:** `manifest.ts` generates `/manifest.webmanifest` with SEO-optimized name, palette-matched colors, and favicon.
- **Heading hierarchy:** Clean H1 → H2 → H2 chain with no gaps (CompetencyHubSection fixed from `<p>` to `<h2>`).

## Easter Eggs

- **Konami Code** (up up down down left right left right B A): Triggers a fullscreen "CHEAT CODE ACTIVATED" overlay with particle burst and rainbow scrollbar for 5 seconds.
- **Signature Animation:** Footer signature image reveals left-to-right with a `clip-path` animation on scroll into view. Falls back to static on `prefers-reduced-motion`.
- **Cursor Trail:** Desktop-only accent-colored dot trail following the cursor using `requestAnimationFrame`. Hidden on touch devices and reduced motion.

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
| `GOOGLE_CLIENT_ID` | GCP Console | OAuth sign-in (admin) |
| `GOOGLE_CLIENT_SECRET` | GCP Console | OAuth sign-in (admin) |
| `AUTH_SECRET` | `openssl rand -base64 32` | Auth.js session encryption |
| `EDGE_CONFIG` | Vercel Dashboard | Edge Config connection string |
| `EDGE_CONFIG_ID` | Vercel Dashboard | Edge Config store ID |
| `VERCEL_API_TOKEN` | Vercel Dashboard | Writing to Edge Config |
| `GOOGLE_SHEETS_CLIENT_EMAIL` | GCP Console | Service account email for Sheets API |
| `GOOGLE_SHEETS_PRIVATE_KEY` | GCP Console | Service account private key (escaped newlines) |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | Google Sheets URL | Spreadsheet ID for contact form submissions |

## Deployment

Hosted on Vercel. Pushes to `main` auto-deploy. All environment variables must be set in the Vercel dashboard across production, preview, and development environments.

## Mobile Responsiveness

All sections are fully responsive with a mobile-first approach using Tailwind breakpoint utilities:

- **Typography:** Headings scale from `text-2xl` (mobile) through `sm:text-3xl` to `md:text-4xl` (desktop). Hero headline scales from `text-3xl` to `lg:text-7xl`.
- **Spacing:** Section padding uses `py-16 sm:py-24`, horizontal padding uses `px-4 sm:px-6`. Gaps and margins scale proportionally at each breakpoint.
- **Cards:** Glass cards use `p-4 sm:p-6` padding. Skill pills use smaller text and padding on mobile.
- **Header:** Touch-friendly icon targets (`h-10 w-10` on mobile, auto on desktop). Palette switcher dropdown uses `w-[calc(100vw-2rem)]` to fit mobile screens.
- **Cert badges:** Scale from `h-24 w-24` to `sm:h-32 sm:w-32`.
- **Section heights:** `min-h-[70vh] sm:min-h-screen` prevents excessive scrolling on mobile.
- **Radial hub:** SVG `viewBox` scales naturally across all screen sizes. Uses `useInView` on a wrapper `<div>` (not `whileInView` on SVG children) for reliable IntersectionObserver on mobile browsers.
- **PDF preview:** Uses `useInView` ref for reliable viewport detection on mobile (same pattern as RadialHub).
- **Testimonial carousel:** Touch swipe left/right (50px threshold) navigates between testimonials. Auto-advance pauses on hover.
- **Footer:** Contact links use `text-xs` on mobile for clean two-line wrapping, `text-sm` inline with pipes on desktop. Signature is 10% larger on mobile (`h-[6.6rem]` / `max-w-[22rem]`) vs original `h-24` / `max-w-xs`.

## Roadmap

- **Additional palettes** — Seasonal or event-specific themes
- **CMS for content** — Move copy from `content.ts` to a headless CMS for non-dev editing
- **Blog / writing section** — Long-form content on data engineering, sales, and poker strategy
- **Case studies** — Deep-dive pages for OptiMeasure, CacheBash, and AI Portal with live demos
- ~~**Contact form** — Inline form with serverless function, replacing mailto link~~ (shipped)
- **Performance monitoring** — Web Vitals dashboard, Three.js frame rate tracking
- ~~**Mobile gestures** — Swipe navigation between sections, haptic feedback on reveals~~ (testimonial swipe shipped)
- **Haptic feedback** — Vibration on card reveals and section transitions (mobile)
- **Sound design** — Optional ambient audio tied to scroll position and palette
