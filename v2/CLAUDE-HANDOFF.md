# michaelplant.com v2 — Handoff Document

## What This Is

A nonlinear personal brand hub built with Eleventy. Not a portfolio or services site — a mind map where visitors explore Michael Plant through interconnected **contexts**, **threads**, and **bridges**. The site should feel like a conversation, not a brochure.

## Tech Stack

- **Eleventy 2.0.1** (static site generator)
- **Nunjucks** (templating)
- **Calendly** (inline embed on /contact/)
- Input: `src/`, Output: `_site/`
- `npm run dev` → `eleventy --serve --incremental`
- `npm run build` → `eleventy`

## Core Concepts

**Contexts** — 3 stable areas of attention, each with a color (Streetlight was retired Sept 2026; Third Places was renamed Community):

| Key | Color | Hex |
|-----|-------|-----|
| Real Estate | Blue | #2B6CB0 |
| Community | Green | #4A8B6E |
| Building | Steel | #7B8FA1 |

Defined in `src/_data/contextDefs.json`. Each page declares 0-2 contexts in front matter.

**Threads** — narrative paths that cross contexts (like subway lines). Defined in `src/_data/threads.json` with ordered page sequences. 6 threads: deals, places-work, community, how-i-work, why-i-care, neighborhoods. (Thread nav is currently commented out in page.njk.)

**Bridges** — curated links at page bottom with human-written "because" rationale. Declared per-page in front matter.

## Navigation Model

There is no traditional nav bar. Navigation happens through:

1. **Beacon** (top-left fixed dot) — context compass. Shows colored dot(s) for current context. Expands to show all 4 contexts. Active context floats to top with larger dot + glow. Context-neutral pages show 4 dots in 2x2 grid.
2. **Bridges** (bottom of content pages) — scattered pill links with "because" explanations and cross-section color indicators.
3. **Thread nav** (bottom of threaded pages) — prev/next within a thread sequence.
4. **Name anchor** ("Michael Plant" top-right fixed link to /) — reorientation.

## File Structure

```
src/
  _data/
    contextDefs.json    # 4 context definitions (key, label, color, icon, description)
    threads.json        # 7 thread definitions with page orderings
    site.json           # Site metadata (title, email, location, social links)
  _includes/
    layouts/
      base.njk          # HTML shell — loads CSS, beacon, name anchor, footer
      home.njk          # Home layout — lede, "right now", context cards grid
      page.njk          # Content layout — context field, hero, body, thread-nav, bridges
    components/
      bubble.njk        # Beacon compass (context dots + expandable map)
      bridges.njk       # Scattered pill links with "because" text
      thread-nav.njk    # Prev/next thread navigation
      footer.njk        # Single-line utility footer
      header.njk        # UNUSED — exists but not included anywhere
  assets/
    css/
      global.css        # Design system, reset, typography, name anchor, footer
      components.css    # Page layout, bridges, thread hints, home page, context cards
      bubble.css        # Beacon styles, context field, page glow, neighbor glow
  content/
    index.md            # Home (layout: home.njk, section: home)
    now/index.md        # What I'm working on right now
    contact/index.md    # Email + Calendly embed
    about/
      index.md          # Personal bio
      how-i-work.md     # Working style, pricing, expectations
    real-estate/
      index.md, value.md, risk.md, community.md, work.md   # Real-estate thinking
      search/lakewood.md + search/lakewood/*.md            # Neighborhood pages (layouts/search-landing.njk)
    community/
      index.md          # Community, The Wandering Lantern, local businesses
    privacy/
      index.md          # Privacy policy
    building/
      index.md          # 20+ years building things
    content.json        # Permalink pattern using fixPermalink filter
```

## Front Matter Convention

```yaml
---
title: "Page Title"
date: 2026-01-28
layout: layouts/page.njk
section: community            # slug, sets data-section on body
contexts:
  - "Community"               # 0-2 labels matching contextDefs
threads:
  - "community"               # 0-3 thread IDs from threads.json
bridges:
  - url: "/real-estate/community/"
    label: "Community and real estate"
    because: "Human rationale for this connection."
bubble:
  eligible: true
  contextKey: "Community"     # which context this page represents in bubble
seo:
  description: "..."
---
```

## Eleventy Config (eleventy.config.js)

**Collections:**
- `allPages` — all non-draft markdown content
- `byContext` — pages grouped by context label, sorted by date
- `byThread` — pages organized by thread ID with label/summary
- `contextProximity` — co-occurrence map of contexts across pages

**Filters:**
- `resolveContexts` — converts context label array to full definition objects
- `neighborColors` — extracts bridge destination colors (skips same-section)
- `sectionColor` — URL → context color lookup
- `urlSection` — extracts first path segment from URL
- `threadInfo` — returns prev/next pages within a thread
- `includes` — array.includes helper
- `limit` — array.slice helper
- `fixPermalink` — normalizes paths to /index.html

**Important:** Data file is `contextDefs.json` (not `contexts.json`) to avoid collision with page-level `contexts` front matter. Eleventy auto-loads data files as global variables by filename.

## CSS Architecture

Three files loaded in order: `global.css` → `components.css` → `bubble.css`

**Design tokens** (CSS custom properties in `:root`):
- Colors: `--color-bg` (#faf9f7), `--color-text` (#2c2c2c), `--color-text-muted` (#6b6b6b), `--color-border` (#e0ddd8)
- Context colors: `--color-real-estate`, `--color-community`, `--color-building`
- Spacing: `--space-xs` (0.5rem) through `--space-2xl` (4rem)
- Layout: `--max-width` (720px), `--radius` (6px)
- Font: Inter with system fallbacks

**Visual system:**
- Each section page gets a subtle top gradient in its context color (4% opacity)
- Beacon pulse glows with section color
- Bridge pills have colored left borders for cross-section links
- Context field: large context name behind page header at 3% opacity
- Neighbor glow: bottom-of-page gradient from bridge destination colors

**Responsive:** Single breakpoint at 640px. Grid collapses, beacon/anchor resize.

## Content Voice

Declarative. Economical. Fact-based. No marketing fluff, no "I believe" repetition, no bold-heading-as-list formatting. Short paragraphs. Scannable blocks. Michael's voice is direct and practical — "I'd rather show my math" not "I'm passionate about transparency."

## Real-estate compliance (Ohio OAC 1301:5-1-02)

Any page with `section: real-estate` automatically shows "Michael Plant | Red 1 Realty" in the name anchor (equal prominence) and the brokerage logo + disclosure in the footer. All other pages carry a one-line brokerage note in the footer. Brokerage details live in `site.brokerage` in `_data/site.json`. Real-estate pages are planned to move to michaelplantrealtor.com.

## Forms and lead capture

`src/assets/js/lead.js` records first-touch source/landing page (localStorage) and submits forms to HubSpot (Forms API v3) when `site.hubspot.portalId` and the form GUIDs are set in `_data/site.json`. Until then, the buyer form shows an honest fallback (prefilled email / text) instead of claiming success, and market reports download directly with no gate.

## Redirects

`_data/redirects.json` generates meta-refresh stubs (work on GitHub Pages) and a Cloudflare Pages `_redirects` file.

## Known State

- Header component exists but is intentionally unused
- Calendly embed on /contact/ loads external widget JS
- "What's next" CTA blocks were planned but deferred — page bottoms already have bridges + thread nav; adding more felt heavy. Inline CTAs in markdown (Book a call / email links) handle conversion on key pages instead.
- The name anchor is positioned top-right but the CSS has a comment showing how to move it left-of-beacon if preferred

## Pages With Inline CTAs (in markdown body)

- `/about/how-i-work/` — "Book a call" Calendly + email link

## External Services

- **Calendly:** https://calendly.com/michaelplant (inline embed on /contact/)
- **RED1 Realty agent site:** https://michaelplant.red1realty.com/
- **The Wandering Lantern:** https://thewanderinglantern.com
- **Email:** hi@michaelplant.com (public), michaelplantrealtor@gmail.com (real-estate forms)
