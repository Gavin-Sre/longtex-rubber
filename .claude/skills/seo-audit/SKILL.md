---
name: seo-audit
description: Audits uncommitted changes (or a specified file) against this project's SEO rules from CLAUDE.md. Reports concrete issues with file:line citations and a fix for each. Use before committing, opening a PR, or when reviewing Astro components for SEO regressions.
---

# SEO Audit

Audit the user's uncommitted changes (or a file they specify) against the SEO rules defined in this project's `CLAUDE.md`. Report concrete issues, not generic advice.

## How to run

1. **Check `CLAUDE.md` first.** The SEO rules are the source of truth. Re-read the "SEO Rules — Always Apply" section before auditing — they may have been updated since you last looked.

2. **Get the scope.**
   - If the user passed a file path as `$ARGUMENTS`, audit that file.
   - Otherwise run `git status` and `git diff` and audit every modified or new `.astro` file.

3. **Audit each file against this checklist.** For every issue found, report `file:line` + the rule violated + a one-line fix.

## Checklist

### Meta & Head (Layout.astro consumers — pages)
- [ ] Page passes `title`, `description`, `ogImage` to `Layout.astro`
- [ ] Title is 50–60 characters and follows `[Page Topic] | Longtex — [Differentiator]`
- [ ] Description is 150–160 characters, keyword-rich, page-specific (not duplicated across pages)
- [ ] `ogImage` is set (defaults to `rubber-tapping.jpg`)
- [ ] No hardcoded canonical — derived from `Astro.url`

### JSON-LD (structured data)
- [ ] **Homepage only** — `WebSite` schema present (currently missing — flag as gap)
- [ ] **Non-homepage pages** — `BreadcrumbList` schema present (currently missing — flag as gap)
- [ ] **Product sections** — `Product` schema in `ProductSection.astro` (currently missing — flag as gap)
- [ ] All schemas use `set:html={JSON.stringify({...})}` pattern

### Images
- [ ] LCP/hero image has `fetchpriority="high"` and **no** `loading="lazy"`
- [ ] All `<img>` tags have explicit `width` and `height` (CLS prevention)
- [ ] Non-hero images use Astro `<Image>` from `astro:assets` (not plain `<img>`)
- [ ] All product/content images have descriptive, keyword-relevant `alt` text — never `alt=""` on product images

### URLs & Routing
- [ ] All internal `href`s use `${baseUrl}` prefix — never hardcoded `/` or `/longtex-rubber/`
- [ ] All internal hrefs end with `/` (trailingSlash: 'always' is set)
- [ ] No anchor-only links to sections that should be standalone pages (e.g. `#about` should link to `/about/`)

### Performance
- [ ] No new heavy JavaScript or hydrated frameworks introduced (React/Vue/Svelte)
- [ ] No layout-shifting animations above the fold without `prefers-reduced-motion` guards

### Content & Keywords
- [ ] New headings, descriptions, and alt text use Tier 1/2/3 keywords from CLAUDE.md naturally — flag any heading that's vague (e.g. "Our Products" → "Natural Rubber Thread Products | Thailand")

### Theming & Code Style
- [ ] No raw hex colors — uses theme tokens (`text-text-muted`, `bg-bg`, `text-accent`, etc.)
- [ ] No comments unless the WHY is non-obvious

## Report format

Output exactly this structure. No preamble, no padding.

```
## SEO Audit — <file or "uncommitted changes">

### Issues (N)
1. **<file>:<line>** — <rule violated>
   Fix: <one-line change>

### Gaps (existing, not introduced by this diff)
- **<file>** — <known SEO gap from CLAUDE.md "Known SEO Gaps">

### Wins
- <anything in the diff that improves SEO — e.g. new descriptive alt text, schema added, image dimensions added>

### Verdict
<PASS / PASS WITH GAPS / FAIL — one sentence why>
```

If there are no issues: report `### Issues (0)` and skip to Wins + Verdict.

## Rules of engagement

- **Read files before reporting.** Never claim a rule violation without verifying the file content.
- **Cite real lines.** `Header.astro:21`, not "somewhere in Header.astro".
- **Distinguish issues vs gaps.** Issues are problems the current diff introduces or could fix. Gaps are pre-existing items from CLAUDE.md's "Known SEO Gaps" section — list them but don't block on them.
- **No padding.** Skip "great work!", "let me audit this for you", or summary paragraphs.
