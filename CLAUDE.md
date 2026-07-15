# CLAUDE.md

This file provides guidance to Claude Code and any delegated subagents working in this repository. **Read this entire file before starting any task in this project — including PR creation, doc research, code changes, and reviews.**

## Primary Goal: SEO Optimization

**Every code change, content edit, PR description, and recommendation must be evaluated against its SEO impact.** This is the single most important objective for this project. When in doubt between two approaches, always choose the one that is better for search engine discoverability, crawlability, and ranking.

This applies to all contexts:
- **Main Claude sessions** — apply SEO rules (below) to every file touched
- **Subagents (pr-helper, doc-scanner, etc.)** — when summarizing changes or researching, surface SEO implications; flag anything that could hurt rankings
- **Reviews and PR descriptions** — call out SEO wins, regressions, or gaps explicitly

## Project Overview

Corporate B2B marketing website for **Longtex Rubber Industry Co., Ltd.**, a Thailand-based manufacturer of extruded natural rubber threads. The site is a product catalog and technical reference hub targeting international B2B buyers.

- **Deployed at:** `https://gavin-sre.github.io/longtex-rubber/`
- **Repository:** `gavin-sre/longtex-rubber` on GitHub Pages

## Tech Stack

- **Framework:** Astro 5 (static site generator — no React, no server-side rendering)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite` plugin (NOT the traditional `tailwind.config.js`)
- **Carousel:** Embla Carousel 8 (used in `ProductSection.astro`)
- **i18n:** Astro built-in i18n routing (`en`/`th`/`zh`) + custom translation dictionaries in `src/i18n/`
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

`Layout.astro` is the single shared shell — pages pass `title`, `description`, `keywords`, and `lang` (plus optional `ogImage`) as props (`lang` defaults to the URL-derived locale; `ogImage` defaults to `rubber-tapping.jpg`). It owns all `<head>` content: meta tags, `hreflang` alternates + `x-default`, `og:locale` / `og:locale:alternate`, Open Graph, Twitter card, JSON-LD (Organization schema), Google Fonts preload, and Google Analytics. It also sets `<html lang>` from `hreflangMap[lang]`. Pages can inject extra head content (e.g. per-page JSON-LD) via `<slot name="head" />`.

Base URL is dynamic: `import.meta.env.BASE_URL` at runtime, controlled by `BASE_PATH` env var in CI (GitHub Actions sets it to `/longtex-rubber/`). Every internal link and asset reference must use:

```astro
const baseUrl = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
// then: `${baseUrl}image.jpg`  or  href={`${baseUrl}products/`}
```

### Internationalization (i18n)

The site ships in three locales: `en` (default), `th`, `zh`. Astro's built-in i18n is configured in `astro.config.mjs` with `prefixDefaultLocale: true` and `redirectToDefaultLocale: true`, so **every** URL is locale-prefixed (`/en/`, `/th/`, `/zh/`). Root/unprefixed paths (`/`, `/about/`, etc.) redirect to their `/en/` equivalents.

All i18n logic lives in `src/i18n/`:
- **`locales.ts`** — the `locales` tuple, `defaultLocale`, `localeNames`/`localeShortNames`, `hreflangMap` (`zh` → `zh-CN`), `ogLocaleMap`, and the `isLocale()` guard.
- **`utils.ts`** — `useTranslations(lang)` returns the dictionary (use as `t.section.key`); `getLangFromUrl(url)` reads the active locale; `localizePath(lang, "products/")` builds an internal link for a known path; `getLocalizedPath(lang, currentUrl)` maps the current page to the same page in another locale (used by the language switcher). All of these already account for `baseUrl`.
- **`ui/en.ts`, `ui/th.ts`, `ui/zh.ts`** — the translation dictionaries. `en.ts` exports the `UIDict` type; the other two must stay structurally identical. Per-page SEO strings (`title`, `description`, `keywords`) live under each page's `seo` key in these dictionaries — **not** hardcoded in pages.

**When adding or changing user-facing text or SEO metadata, update all three dictionaries.** Never hardcode copy in a page/component; pull it from `t`.

### Pages & Routing

All pages live under `src/pages/[lang]/` and export `getStaticPaths()` returning the three locales, so each page is statically generated once per locale. `Astro.params.lang` is the active locale.

- `[lang]/index.astro` — Homepage with hero, About snippet, product card grid, applications infographic, certifications, contact CTA
- `[lang]/products.astro` — Full product catalog; each product rendered via `ProductSection.astro` with spec table + Embla carousel
- `[lang]/reference.astro` — Technical specification tables via `ReferenceSpecTable.astro`
- `[lang]/about.astro` — Company history and team

### Key Components

Locale-aware components take a `lang: Locale` prop and resolve copy via `useTranslations(lang)`.

- **`Header.astro`** — Sticky top nav; takes `lang`, builds locale-prefixed nav links with `localizePath`, renders the logo and `LanguageSwitcher`.
- **`Footer.astro`** — Site footer; takes `lang`, pulls address/copyright from the dictionary.
- **`LanguageSwitcher.astro`** — `<details>`-based locale dropdown; uses `getLocalizedPath` to link to the current page in each locale and sets `hreflang` on each link.
- **`ProductCard.astro`** — Homepage product highlight card; props `title`, `imageSrc`, `imageAlt`, `href`.
- **`ProductSection.astro`** — Takes `id`, `title`, `images[]`, `tableHeaderRow1`, `tableHeaderRow2`, `tableRows` props. Renders a merged-header `<table>` then an Embla carousel below it. Set `placeholder=true` for a coming-soon state with no table/carousel.
- **`ProductApplications.astro`** — Applications infographic on the homepage; takes `lang`.
- **`Button.astro`** — Shared link/button; props include `href`, `variant`, `size`.
- **`ScrollReveal.astro`** — Wraps any content in a `<div class="scroll-reveal">` driven by an IntersectionObserver. Accepts a `delay` prop (ms). Respects `prefers-reduced-motion`.
- **`ScrollToTop.astro`** — Floating back-to-top control; takes `lang` for its label.
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

`astro.config.mjs` configures `@astrojs/sitemap` with i18n awareness (locale map `en`/`th`/`zh-CN`) and custom priorities via `serialize`:
- Locale homepages (`/en/`, `/th/`, `/zh/`): 1.0, `/products`: 0.9, `/reference`: 0.8, others: 0.7
- A `filter` drops the non-localized root URL so only locale-prefixed pages are indexed.

## SEO Rules — Always Apply

These are non-negotiable. Apply them to every file you touch or create.

### Meta Tags & Head

- Every page must pass `title`, `description` (and ideally `keywords`) to `Layout.astro`; these live in each locale's `seo` dictionary key, not inline
- Title format: `[Page Topic] | Longtex — [Differentiator]`, 50–60 characters
- Description: 150–160 characters, keyword-rich, describes the specific page content
- `og:image` must always be set — default to `rubber-tapping.jpg` (1200×630px) relative to `siteOrigin`
- `og:site_name` must be `"Longtex Rubber Industry Co., Ltd."`
- Canonical URL is derived from `Astro.url` — never hardcode it
- **Localized SEO is automatic in `Layout.astro`:** `hreflang` alternates for all locales + `x-default`, and `og:locale` / `og:locale:alternate`. Keep these intact and ensure every page renders in all three locales so the alternates resolve.

### Structured Data (JSON-LD)

- **Organization schema** is in `Layout.astro` — present on every page
- **Product schema** must appear on product detail sections (in `ProductSection.astro`) — not yet implemented
- **BreadcrumbList schema** must appear on all non-homepage pages — not yet implemented
- **WebSite schema** must appear on the homepage only — not yet implemented
- Use `set:html={JSON.stringify({...})}` pattern for Astro JSON-LD injection
- Inject per-page JSON-LD through the `<slot name="head">` slot in `Layout.astro`
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

- All internal links must be locale-aware: use `localizePath(lang, "products/")` for known paths or `getLocalizedPath(lang, Astro.url)` for the current page in another locale. These helpers already include the `baseUrl` prefix — do not hand-concatenate locale segments.
- Raw asset references (images, etc.) still use the `baseUrl` prefix directly.
- `trailingSlash: 'always'` — every link must end with `/`.
- No duplicate content — canonical URLs must resolve to exactly one URL per page, and each locale variant is deduped via `hreflang`.

### Performance (Core Web Vitals)

- **LCP < 2.5s:** Google Font woff2 is preloaded in Layout.astro — keep it
- **CLS < 0.1:** Every image must have `width` and `height`; no layout-shifting animations above fold without `prefers-reduced-motion` guards
- **INP < 200ms:** Minimize JavaScript; keep Embla Carousel as-is; no heavy hydration
- Google Analytics `<script async>` is acceptable — `async` prevents render-blocking

### Content & Keywords

All copy lives in the `src/i18n/ui/*.ts` dictionaries. When adding or editing content or keywords, update `en.ts`, `th.ts`, and `zh.ts` together and keep the target keywords below reflected in the English source (translations should preserve intent, not keyword-stuff).

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
