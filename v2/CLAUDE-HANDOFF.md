# michaelplant.com — Site Handoff

Current as of **2026-10-06** (branch `claude/zealous-heisenberg-zn6okn`).
For *why* things are the way they are, see `../project-docs/connection-ecosystem-plan.md` (decisions log at the top). For what's left before launch, see `../project-docs/launch-checklist.md`.

## What this is

Michael Plant's personal hub, designed as an **old Lakewood calling card**: one ruled column on paper, an engraved portrait, small-caps display type, Garamond body. It matches the printed card. The physical card's QR points to `/connect/`.

The site is a relationship hub, not a funnel, and it is **small on purpose**: the card page (`/` and `/connect/`), `/projects/` (Reclaim's interim page), `/privacy/`, and `/mike.vcf`. From the card page people can text or save Mike's contact, or go to what he's part of: Houses of Lakewood, The Wandering Lantern, Real Estate (with the brokerage named; opens a text until michaelplant.realtor is live, then links there via `site.realtorSite`), and Reclaim.

On 2026-10-06 everything else was retired (About, Now, Contact, Community, Building, Faith, the real-estate essays) and the Lakewood neighborhood pages moved to `../realtor-site/`, which is now its own small Eleventy site for michaelplant.realtor. The reasoning is in `../project-docs/brand/brand-book.src.html` (the private brand book). **Don't add pages back.** The next thing this site gets is a Houses of Lakewood archive, and only after about 30 posts.

## Stack

- **Eleventy 2.0.1** + Nunjucks; input `src/`, output `_site/`
- `npm run dev` → http://localhost:8080 · `npm run build`
- Deploy: `.github/workflows/deploy.yml` builds `v2/` and publishes to **GitHub Pages on every push to `main`** (custom domain via `src/CNAME`). The planned move to Cloudflare Pages hasn't happened yet. `_redirects` and `_headers` are already generated for it.
- No client framework. One small script: `src/assets/js/cta.js`, shared with the realtor and Reclaim sites.

## Where things live

```
src/
  _data/
    site.json        name, nickname, phone (3 formats), email, portrait, brokerage, realtorSite/reclaimSite switches
    card.json        words on the card page (greeting, about, lead, coffee lines)
    paths.json       "What I'm Part Of" list (title, detail, url, go-label, brokerage flag)
    redirects.js     old URL → new URL (generates meta-refresh stubs AND Cloudflare _redirects); real-estate URLs follow site.realtorSite
  _includes/
    layouts/
      base.njk           HTML shell: fonts, site.css, masthead, footer, mobile contact bar
      card.njk           the calling-card page (home + /connect/)
      page.njk           standard content page (title, body, optional pageCta)
    components/
      footer.njk         fine print: brokerage disclosure (+ logo on real-estate pages), links
      contact-bar.njk    mobile-only Text / Call / Save contact bar
  assets/
    css/site.css     the whole design system (tokens at top)
    js/cta.js        first-touch source + one `cta_click` event for every call/text/email/save click (all 3 sites)
    img/             portrait (webp), vCard photo, OG image, Red 1 logo
  content/
    index.md, connect/        card page (layout: card.njk)
    mike.11ty.js              /mike.vcf (vCard 3.0 with photo)
    privacy/, projects/
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
4. **No forms on any of the three sites** (call/text first). If one is ever added, it must not claim success it didn't achieve, and it needs a consent line before texting anyone back.
5. **The calling card stays personal** (no real-estate wording on the card itself).
6. **NAR mark:** "REALTOR" may appear in a domain/name only combined with Michael's name (hence michaelplant.realtor).

## Forms and leads

- `cta.js` records first touch `{source, campaign, landing}` in localStorage (`?src=`, `utm_source`, referrer, or `calling-card` on `/connect/`).
- Every tel:, sms:, mailto:, .vcf, or `[data-cta]` click fires `cta_click` with `{site, page, action, location, label, source}`. `location` is the element's `data-cta` (hero, bar, end...) or its section. It pushes to `dataLayer`, `gtag`, `plausible`, or `window.MPTrack`, whichever is installed. None is installed yet; that's Mike's call as the analytics person.

## Redirects

Add an entry in `_data/redirects.js`. That makes a meta-refresh page (works on GitHub Pages now) and a 301 line in `_redirects` (Cloudflare later). Current: `/hello/` → `/connect/`; `/books/` → thewanderinglantern.com; retired pages (`/about/`, `/now/`, `/contact/`, `/community/`, `/building/`, `/faith/`, `/third-places/`, `/streetlight/*`) → `/`; every `/real-estate/**` URL → `/` while `site.realtorSite` is empty, and to the matching michaelplant.realtor page (301) once it's set.

## External services

- The Wandering Lantern: https://thewanderinglantern.com
- Email: `me@michaelplant.com` (public)
- Fonts: Google Fonts (Cormorant SC, EB Garamond)

## Content voice

Plain, warm, direct. Short paragraphs. No marketing fluff. Mike writes like he talks: "Seriously. Text me."

## Known gaps

- Houses of Lakewood has no URL (opens a prefilled text).
- No analytics tool installed yet; `me@michaelplant.com` must exist before deploy.
- michaelplant.realtor is built in `../realtor-site/` but not deployed; `site.realtorSite` stays empty until it is.
- `/projects/` should redirect to Reclaim's own site (reclaimhomerepair.com, its own brand) once that exists.
- `site.css` still has a few compatibility tokens for the old neighborhood styles; harmless.
