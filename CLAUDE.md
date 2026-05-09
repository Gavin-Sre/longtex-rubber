# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Corporate B2B marketing website for **Longtex Rubber Industry Co., Ltd.**, a Thailand-based manufacturer of extruded natural rubber threads. The site is a product catalog and technical reference hub targeting international B2B buyers.

- **Deployed at:** `https://gavin-sre.github.io/longtex-rubber/`
- **Repository:** `gavin-sre/longtex-rubber` on GitHub Pages

## Primary Goal: SEO Optimization

**Every code change must be evaluated against its SEO impact.** This is the single most important objective for this project. When in doubt between two approaches, always choose the one that is better for search engine discoverability, crawlability, and ranking.

## Tech Stack

- **Framework:** Astro 5 (static site generator — no React, no server-side rendering)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite` plugin (NOT the traditional `tailwind.config.js`)
- **Carousel:** Embla Carousel 8 (used in `ProductSection.astro`)
- **Package manager:** pnpm
- **Deployment:** GitHub Pages via GitHub Actions

## Dev Commands

```bash
pnpm dev        # start dev server
pnpm build      # production build
pnpm preview    # preview built output
pnpm check      # TypeScript / Astro type-check
```

## Architecture

### Layout & Base URL

`Layout.astro` is the single shared shell — every page passes `title`, `description`, `ogImage` as props. It owns all `<head>` content: meta tags, Open Graph, Twitter card, JSON-LD (Organization schema), Google Fonts preload, and Google Analytics.

Base URL is dynamic: `import.meta.env.BASE_URL` at runtime, controlled by `BASE_PATH` env var in CI (GitHub Actions sets it to `/longtex-rubber/`). Every internal link and asset reference must use:

```astro
const baseUrl = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
// then: `${baseUrl}image.jpg`  or  href={`${baseUrl}products/`}
```

### Pages & Routing

- `index.astro` — Homepage with hero, About snippet, product card grid, applications infographic, certifications, contact CTA
- `products.astro` — Full product catalog; each product rendered via `ProductSection.astro` with spec table + Embla carousel
- `reference.astro` — Technical specification tables via `ReferenceSpecTable.astro`
- `about.astro` — Company history and team

### Key Components

- **`ProductSection.astro`** — Takes `id`, `title`, `images[]`, `tableHeaderRow1`, `tableHeaderRow2`, `tableRows` props. Renders a merged-header `<table>` then an Embla carousel below it. Set `placeholder=true` for a coming-soon state with no table/carousel.
- **`ScrollReveal.astro`** — Wraps any content in a `<div class="scroll-reveal">` driven by an IntersectionObserver. Accepts a `delay` prop (ms). Respects `prefers-reduced-motion`.
- **`Section.astro`** — Layout wrapper for page sections; accepts `id`, `title`, `alt` (dark background variant), `wide`, `center` props.
- **`ReferenceSpecTable.astro`** — Static technical reference table for the reference page.

### Theming

Tailwind v4 theme tokens live in `src/styles/global.css` under `@theme`:

```css
--color-bg: #0f1419
--color-surface: #1a2332
--color-text: #e6edf3
--color-text-muted: #8b9cb3
--color-accent: #3b82f6
--font-sans: "Plus Jakarta Sans", ...
```

Use these token names as Tailwind classes (`bg-bg`, `text-text-muted`, `text-accent`, etc.). Do not add raw hex colors in components.

### Sitemap

`astro.config.mjs` configures `@astrojs/sitemap` with custom priorities:
- Homepage: 1.0, `/products/`: 0.9, `/reference/`: 0.8, others: 0.7

## SEO Rules — Always Apply

These are non-negotiable. Apply them to every file you touch or create.

### Meta Tags & Head

- Every page must pass `title`, `description`, and `ogImage` to `Layout.astro`
- Title format: `[Page Topic] | Longtex — [Differentiator]`, 50–60 characters
- Description: 150–160 characters, keyword-rich, describes the specific page content
- `og:image` must always be set — default to `rubber-tapping.jpg` (1200×630px) relative to `siteOrigin`
- `og:site_name` must be `"Longtex Rubber Industry Co., Ltd."`
- Canonical URL is derived from `Astro.url` — never hardcode it

### Structured Data (JSON-LD)

- **Organization schema** is in `Layout.astro` — present on every page
- **Product schema** must appear on product detail sections (in `ProductSection.astro`) — not yet implemented
- **BreadcrumbList schema** must appear on all non-homepage pages — not yet implemented
- **WebSite schema** must appear on the homepage only — not yet implemented
- Use `set:html={JSON.stringify({...})}` pattern for Astro JSON-LD injection
- Validate new schemas with Google Rich Results Test

### Sitemap & Crawlability

- `site` in `astro.config.mjs` is `'https://gavin-sre.github.io/longtex-rubber'` (no trailing slash) — do not change
- `trailingSlash: 'always'` is set — all internal links must end with `/`
- `public/robots.txt` exists — keep it referencing the sitemap

### Images

- **Never** use `loading="lazy"` on the LCP/hero image (first above-fold image per page)
- **Always** use `fetchpriority="high"` on the single LCP image per page
- **Always** set explicit `width` and `height` on every `<img>` tag to prevent CLS
- Use the Astro `<Image>` component from `astro:assets` for all non-hero images — auto-generates WebP + `srcset`
- Alt text must be descriptive and keyword-relevant — never leave empty on product images
- Carousel images in `ProductSection.astro` currently use `alt=""` — fill these in when images are finalized

### URLs & Routing

- All internal links must include `baseUrl` prefix (see Architecture section above)
- No duplicate content — canonical URLs must resolve to exactly one URL per page

### Performance (Core Web Vitals)

- **LCP < 2.5s:** Google Font woff2 is preloaded in Layout.astro — keep it
- **CLS < 0.1:** Every image must have `width` and `height`; no layout-shifting animations above fold without `prefers-reduced-motion` guards
- **INP < 200ms:** Minimize JavaScript; keep Embla Carousel as-is; no heavy hydration
- Google Analytics `<script async>` is acceptable — `async` prevents render-blocking

### Content & Keywords

**Tier 1 — Core (high volume):**
- "rubber thread manufacturer Thailand"
- "natural latex rubber thread supplier"
- "extruded rubber thread"

**Tier 2 — Application-specific:**
- "food grade rubber thread for textiles"
- "silicone coated rubber thread wholesale"
- "talcum rubber thread export"

**Tier 3 — Technical spec (highest B2B conversion):**
- "rubber thread count 30 elongation 680%"
- "natural latex thread ISO certified"
- "rubber thread Thailand OEM supplier"

## Code Style

- Default to writing **no comments** — only comment when the WHY is non-obvious
- Tailwind utility classes only — no custom CSS unless Tailwind cannot achieve it
- Astro components are the default — do not introduce React/Vue/Svelte unless explicitly requested
- Keep components single-responsibility

## Known SEO Gaps (Priority Order)

Remaining issues to fix proactively when working in nearby files:

1. Carousel images in `ProductSection.astro` have `alt=""` — needs descriptive alt text per image
2. Product images in `ProductSection.astro` use plain `<img>` — should use Astro `<Image>` for WebP
3. **Product JSON-LD schema** missing from `ProductSection.astro`
4. **BreadcrumbList JSON-LD schema** missing from non-homepage pages
5. **WebSite JSON-LD schema** missing from homepage
6. `og:image` in Layout resolves relative to `siteOrigin` — confirm the fallback image (`rubber-tapping.jpg`) is 1200×630

## Validation Checklist

After making SEO-related changes, verify with:
- **PageSpeed Insights** — target 90+ on both mobile and desktop
- **Google Rich Results Test** — validate all JSON-LD schemas
- **Google Search Console** — submit sitemap after any new pages
- **Facebook OG Debugger** — verify og:image renders correctly
- **LinkedIn Post Inspector** — B2B audience is primarily LinkedIn
