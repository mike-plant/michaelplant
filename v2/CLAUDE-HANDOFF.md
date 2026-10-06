# michaelplant.com — Site Handoff

Current as of **2026-10-06** (branch `claude/zealous-heisenberg-zn6okn`).
For *why* things are the way they are, see `../project-docs/connection-ecosystem-plan.md` (decisions log at the top). For what's left before launch, see `../project-docs/launch-checklist.md`.

## What this is

Michael Plant's personal hub, designed as an **old Lakewood calling card**: one ruled column on paper, an engraved portrait, small-caps display type, Garamond body. It matches the printed card. The physical card's QR points to `/connect/`.

The site is a relationship hub, not a funnel. From the card page, people can text or save Mike's contact, or go to what he's part of: Houses of Lakewood, The Wandering Lantern, Real Estate (with Red 1 Realty), and Reclaim (home projects).

## Stack

- **Eleventy 2.0.1** + Nunjucks; input `src/`, output `_site/`
- `npm run dev` → http://localhost:8080 · `npm run build`
- Deploy: `.github/workflows/deploy.yml` builds `v2/` and publishes to **GitHub Pages on every push to `main`** (custom domain via `src/CNAME`). The planned move to Cloudflare Pages hasn't happened yet. `_redirects` and `_headers` are already generated for it.
- No client framework. One small script: `src/assets/js/lead.js`.

## Where things live

```
src/
  _data/
    site.json        name, nickname, phone (3 formats), email, portrait, brokerage, HubSpot IDs
    card.json        words on the card page (greeting, about, lead, coffee lines)
    paths.json       "What I'm Part Of" list (title, detail, url, go-label, brokerage flag)
    redirects.json   old URL → new URL (generates meta-refresh stubs AND Cloudflare _redirects)
  _includes/
    layouts/
      base.njk           HTML shell: fonts, site.css, masthead, footer, mobile contact bar
      card.njk           the calling-card page (home + /connect/)
      page.njk           standard content page (title, body, optional pageCta, Keep Reading)
      search-landing.njk Lakewood neighborhood pages: lead form, report gate, listings link-out
    components/
      footer.njk         fine print: brokerage disclosure (+ logo on real-estate pages), links
      bridges.njk        "Keep Reading" ruled list from front-matter `bridges`
      contact-bar.njk    mobile-only Text / Call / Save contact bar
  assets/
    css/site.css     the whole design system (tokens at top)
    css/search.css   neighborhood-page forms; only loaded on section: real-estate
    js/lead.js       first-touch source capture, HubSpot submit, data-event click hook
    img/             portrait (webp), vCard photo, OG image, Red 1 logo
  content/
    index.md, connect/        card page (layout: card.njk)
    mike.11ty.js              /mike.vcf (vCard 3.0 with photo)
    about/, now/, contact/, privacy/, building/, community/, projects/
    real-estate/              essays + search/lakewood(.md|/*.md) neighborhood guides
    faith/                    UNPUBLISHED placeholder (permalink: false)
  redirects/                  stub pages, _redirects, _headers generators
  lakewood-concepts/          ULBA mockup (noindex; belongs in its own repo eventually)
```

## Front matter

```yaml
---
title: "Page Title"
date: 2026-10-06
layout: layouts/page.njk
section: real-estate        # drives masthead/footer brokerage + loads search.css
bridges:                    # optional "Keep Reading" list
  - url: "/real-estate/risk/"
    label: "Risk and restraint"
    because: "One-line reason to click."
pageCta:                    # optional
  text: "Ready to look at neighborhoods?"
  url: "/real-estate/search/lakewood/"
  label: "Explore Lakewood"
seo:
  description: "..."
  ogImage: "/assets/img/..."   # optional; defaults to site.ogImage
---
```

Layout flags (set in a layout's or page's front matter): `hideMasthead`, `hideContactBar`, `wide` (wider sheet for long guides).

## Rules that must hold (compliance and trust)

1. **Real-estate pages show the brokerage at equal prominence** (Ohio OAC 1301:5-1-02). Any page with `section: real-estate` gets "Michael Plant | Red 1 Realty" in the masthead at the same size, plus the logo and disclosure in the footer. **Every** page footer carries the one-line disclosure. Don't add a real-estate page without `section: real-estate`.
2. **Fair Housing.** Describe neighborhoods by property and lifestyle (lot size, transit, noise, renovation, price), never by who lives there or should live there (no "families", "diversity", "retirees", "safe", etc.). "Fit" sections are framed as "A good match if you want…".
3. **Faith and personal conversations are never tracked or put in a CRM.** No `data-event` attributes on faith content.
4. **Forms never claim success they didn't achieve.** Without HubSpot configured, the buyer form shows an email/text fallback.
5. **The calling card stays personal** (no real-estate wording on the card itself).
6. **NAR mark:** "REALTOR" may appear in a domain/name only combined with Michael's name (hence michaelplantrealtor.com).

## Forms and leads

- `lead.js` stores first-touch `{source, campaign, landing}` in localStorage (`/connect/` = `calling-card`) and the last chosen intent in sessionStorage. Both are appended to form submissions.
- HubSpot: fill `site.hubspot.portalId` and `site.hubspot.forms.buyer` / `.report` with form GUIDs. Each HubSpot form needs fields `firstname`, `email`, `phone`, `message`. Submissions use the public Forms API v3 (no secret needed).
- `data-event="..."` elements call `window.MPTrack(name, props)` if an analytics script defines it. Nothing is defined yet.

## Redirects

Add `{ "from": "/old/", "to": "/new/" }` to `_data/redirects.json`. That makes a meta-refresh page (works on GitHub Pages now) and a 301 line in `_redirects` (Cloudflare later). Current: `/hello/` → `/connect/`, `/third-places/` and `/streetlight/*` → `/community/`, `/books/` → thewanderinglantern.com.

## External services

- Calendly embed on `/contact/` (https://calendly.com/michaelplant)
- Listing search links out to the Red 1 / BoldTrail agent site (`site.agentSite`)
- The Wandering Lantern: https://thewanderinglantern.com
- Emails: `me@michaelplant.com` (public); `michaelplantrealtor@gmail.com` (neighborhood form fallback, `search.contactEmail`)
- Fonts: Google Fonts (Cormorant SC, EB Garamond)

## Content voice

Plain, warm, direct. Short paragraphs. No marketing fluff. Mike writes like he talks: "Seriously. Text me."

## Known gaps

- `/now/` still says January 2026.
- `/faith/` placeholder, unpublished.
- Houses of Lakewood has no URL (opens a prefilled text).
- HubSpot IDs empty; `me@michaelplant.com` must exist before deploy.
- Real-estate pages still live on michaelplant.com; the move to michaelplantrealtor.com is Phase 3.
- `real-estate/index.md` and `real-estate/value.md` largely duplicate each other (to consolidate).
