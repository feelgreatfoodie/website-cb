# Christian Bourlier — Personal Branding Website

## Quick Context
Next.js 16 single-page portfolio site for Christian Bourlier, positioning as a **Technical Solutions Partner**. Dark-themed, gamified UX with 3D hero, multi-palette system, and glassmorphism design language.

## Commands
```bash
npm run dev          # Local dev server
npx tsc --noEmit     # Type check
npx eslint src/      # Lint (0 errors, 0 warnings as of Feb 2026)
npx vitest           # Unit tests
npx playwright test  # E2E tests
```

## Architecture

### Stack
- **Framework**: Next.js 16, App Router, TypeScript
- **Styling**: Tailwind CSS 4 with CSS custom properties for palette system
- **3D**: Three.js (hero river scene, NoteHighway particles)
- **Animation**: Framer Motion
- **State**: Zustand (quest state, reduced motion)
- **Auth**: NextAuth v5 (admin dashboard), `SessionProvider` via `SessionWrapper.tsx`
- **AI**: Gemini 2.0 Flash via `@google/generative-ai` (chatbot + problem solver); falls back to `MockProvider` if `GOOGLE_AI_API_KEY` not set
- **Analytics**: GA4 (geo-aware consent — opt-out default, GDPR-only banner)
- **API**: Google Sheets (contact form), Medium RSS (blog posts), `/api/chat` (AI), `/api/analytics` (mock MVP)
- **CI**: GitHub Actions (lint, typecheck, test, build)

### Section Order (single page)
1. Hero — 3D river scene, headline, CTA, visitor-intent messaging
2. Journey — Three stream cards (Data/Sales/Poker) with skill reveals + career timeline
3. Competencies — Radial hub SVG
4. Open To — 4 role cards
5. Workshop — Project cards (click-to-unfurl previews, LiveStatusBadge) + video demos
6. Boss Fight — Testimonial carousel (tap-to-pause, progress indicator), equation reveal, architecture map
7. Implementation — Skills pills + GCP cert badges + PipelineDemo
8. Writing — Medium blog cards (fetched via RSS)
9. One-Sheeter — PDF preview + download (themed print styles)
10. Contact — Integrated Problem Solver + contact form → Google Sheets

### Additional Routes
- `/admin` — Palette management + analytics dashboard (auth-gated)
- `/experience` — Persona picker (Recruiter/Client/Collaborator) — built but not linked in nav

### Key Patterns

**Palette System**: 8 themes stored in `src/config/palettes.ts`. CSS vars set on `<html>`, switchable at runtime via `ThemeProvider`. User choice persisted to localStorage.

**Dynamic Imports**: All below-fold sections loaded via `next/dynamic` in `BelowFold.tsx` with gradient loading placeholders to reduce initial bundle.

**Glassmorphism**: `.glass` utility class in `globals.css` — semi-transparent bg with backdrop-blur and accent border.

**Cookie Consent (Geo-Aware)**: Opt-out by default for most visitors. GDPR regions (detected via `Intl.DateTimeFormat` timezone) see a slim consent banner requiring opt-in. `useAnalyticsToggle()` hook powers the "Analytics Settings" link in the footer. Analytics helpers (`trackEvent`, `reportWebVitals`) gracefully no-op when `window.gtag` is undefined.

**AI Chatbot + Problem Solver**: `ChatWidget` (floating) and integrated `ProblemSolver` (in Contact section) both call `/api/chat`. Rate limited at 15 req/hr/IP in production. System prompt in `src/lib/ai/provider.ts` contains full LinkedIn career history. Requires `GOOGLE_AI_API_KEY` env var for Gemini; falls back to canned regex `MockProvider`.

**LiveStatusBadge**: Shows project status (Concept/In Development/Beta/Live) + progress bar on Workshop cards. Config in `src/config/live-status.ts`.

**Toast Notifications**: `ToastProvider` wraps the app. Use `useToast()` hook from any client component. Auto-dismiss after 2.5s.

**Service Worker**: `public/sw.js` — network-first for navigation, cache-first for static assets. Registered via inline script in layout.

### File Organization
```
src/
  app/            # Pages, layout, globals, API routes, error boundaries
    admin/        # Admin dashboard (page.tsx, AdminTabs.tsx, PaletteGrid.tsx)
    api/          # chat/, analytics/, contact/, presence/ routes
    experience/   # Persona picker route (page.tsx, layout.tsx)
  components/
    admin/        # AnalyticsDashboard
    hero/         # HeroSection, RiverScene, CanvasErrorBoundary, AvailabilityPill*, MetricsBar*
    journey/      # JourneySection, StreamCard, NoteHighway, Timeline
    competencies/ # CompetencyHubSection, RadialHub
    opento/       # OpenToSection, RoleCard
    workshop/     # WorkshopSection, ProjectCard, TypewriterCLI, VideoCard, ProductSandbox*
    bossfight/    # BossFightSection, TestimonialCarousel, EquationVisual
    implementation/ # ImplementationSection, CertBadge, PipelineDemo
    writing/      # WritingSection, BlogCard
    download/     # OneSheeterSection, PDFPreview
    contact/      # ContactSection (integrated Problem Solver)
    experience/   # ExperienceFlow*, PersonaPicker*
    layout/       # Header, Footer, SessionWrapper, ScrollProgress, BelowFold, WebVitals
    ui/           # Button, GlowText, CursorTrail, KonamiOverlay, ScrollToTop, CookieConsent, Toast, ChatWidget, SmartCTA, LiveStatusBadge
  config/         # content.ts, palettes.ts, onesheet-map.ts, live-status.ts, timeline.ts
  lib/
    ai/           # provider.ts (GeminiProvider + MockProvider + system prompt)
    hooks/        # useReducedMotion, useActiveSection, useQuestStore, useEngagementTracker, useLiveStatus, useVisitorIntent, etc.
    three/        # SceneManager, river-shader, particle-system, ambient-stream
    analytics.ts  # trackEvent wrapper
    web-vitals.ts # CWV reporting to GA4
    medium.ts     # RSS feed parser
    palette-context.tsx
  types/          # gtag.d.ts
```
\* = built but not yet wired into the live site

## Anti-Patterns to Avoid

1. **Never use `<img>` — always `Next/Image`**. This project enforces the `@next/next/no-img-element` ESLint rule. Use `unoptimized` prop for external URLs (YouTube, Medium CDN).

2. **Never call `setState` inside `useEffect`** for initialization. Use lazy state initializers: `useState(() => getInitialValue())`. The ESLint rule `react-hooks/set-state-in-effect` catches this.

3. **Never create arrays/objects in component body that are useCallback/useEffect deps**. Move them inside the callback or wrap in `useMemo`. Example: `streamColors` was recreated every render causing NoteHighway to re-init.

4. **Keep `text-[Xpx]` >= 11px**. Below that fails readability on low-DPI screens. The previous `text-[10px]` and `text-[9px]` were bumped to `text-[11px]`.

5. **Keep text opacity >= `/50` for content, `/60` for interactive elements**. Lower values fail WCAG AA contrast on dark backgrounds.

6. **Don't hide sections on data fetch failure**. Show ghost/placeholder cards instead (see `WritingSection` fallback pattern). Keep nav anchors and CTAs always accessible.

7. **Gate analytics behind consent**. Never load GA scripts unconditionally. Use `CookieConsent.tsx` geo-aware pattern — GDPR regions require opt-in, others opt-out.

8. **Next.js 16 uses `proxy.ts`, not `middleware.ts`**. Creating `middleware.ts` will 404 the entire site if `proxy.ts` already exists. Always use `proxy.ts` for request interception.

9. **`useToast()` returns the function directly**, not `{ addToast }`. Destructuring will break.

10. **Framer Motion `height: 0 → auto` with `overflow-hidden`** clips delayed child animations. Prefer simple opacity fades for containers with staggered children.

## Accessibility Checklist
- [x] Skip link ("Skip to main content")
- [x] `aria-label` + `aria-expanded` on all toggle buttons
- [x] Focus trapping in mobile menu
- [x] `prefers-reduced-motion` respected + manual toggle
- [x] Focus-visible ring on all interactive elements
- [x] Semantic heading hierarchy (h1 in hero, h2 per section)
- [x] Alt text on all images
- [x] `aria-live="polite"` on toast container
- [x] `role="region"` + `aria-roledescription="carousel"` on testimonials
- [x] Carousel: tap-to-pause (mobile), spacebar toggle, pause/play icon
- [x] Admin: `role="tablist"` + `aria-selected` on tab buttons

## SEO
- JSON-LD: Person, WebSite, BreadcrumbList, 3x Review schemas
- Open Graph + Twitter Card meta
- Sitemap, robots.txt, canonical URL
- Preconnect: YouTube, ytimg, Medium CDN
