# Sample: Micro-Area Page

This is what a micro-area markdown file would look like.
Below is the actual file you'd place at:
`src/content/real-estate/search/lakewood/birdtown.md`

---

```markdown
---
title: "Birdtown — Lakewood, OH"
date: 2026-02-09
layout: layouts/search-landing.njk
section: real-estate
contexts:
  - "Real Estate"
search:
  display: "Birdtown"
  pak: "city:g30_dpmu481c"
  contactEmail: "michaelplantrealtor@gmail.com"
  campaign: "lakewood-birdtown"
  parent: "/real-estate/search/lakewood/"
  reports:
    - label: "February 2026"
      file: "/assets/pdf/birdtown-feb-2026.pdf"
    - label: "January 2026"
      file: "/assets/pdf/birdtown-jan-2026.pdf"
bridges:
  - url: "/real-estate/search/lakewood/"
    label: "Back to Lakewood overview"
    because: "See how Birdtown fits into the bigger picture."
  - url: "/real-estate/search/lakewood/gold-coast/"
    label: "Gold Coast"
    because: "A different feel — compare the two."
bubble:
  eligible: true
  contextKey: "Real Estate"
seo:
  description: "Birdtown, Lakewood OH — affordable, walkable, and full of character. Understand the streets and blocks before you search. Michael Plant, Red 1 Realty."
---

Birdtown is Lakewood's most affordable and most underestimated neighborhood.

## What defines Birdtown

Named for its bird-themed street names — Quail, Robin, Plover, Hird — Birdtown sits in the western half of Lakewood, roughly between Madison and Detroit south of the Metroparks. The housing stock skews toward smaller singles and well-kept doubles, many built in the 1920s and 1930s.

It's quieter than the Detroit Avenue corridor, more residential than downtown Lakewood, and significantly more affordable than Gold Coast. For buyers who want to be in Lakewood without stretching their budget, Birdtown is often the answer.

## Who Birdtown tends to fit

- First-time buyers looking for a walkable city at a lower price point
- Investors targeting duplexes with solid rental income
- People who want proximity to the Metroparks and lake without paying lakefront prices
- Buyers willing to renovate — there are good bones at fair prices here

## What to watch for

Some blocks are quieter than others. The streets closer to Madison can feel busier; the interior blocks (Robin, Quail) tend to be calmer. Parking varies — some properties have garages, many don't. Condition matters a lot in this price range.

## Market snapshot

Birdtown typically sees faster turnover on well-priced doubles. Singles in good condition move quickly too, especially under $200k. Inventory is usually tighter here than in other parts of Lakewood because owners tend to hold.
```

---

## How the front matter fields work

| Field | Purpose |
|-------|---------|
| `search.display` | City/area name shown in the form and page |
| `search.pak` | IDX search code (same as Lakewood for now — filters by city) |
| `search.contactEmail` | Where the lead form sends |
| `search.campaign` | BoldTrail audience tag — unique per area |
| `search.parent` | Link back to hub page (used for breadcrumbs later) |
| `search.reports` | Monthly RPR PDFs — listed newest first |
| `bridges` | Cross-links to hub and sibling areas |
| `seo.description` | Unique meta description per area |

## URL structure

File at `src/content/real-estate/search/lakewood/birdtown.md` becomes:
`/real-estate/search/lakewood/birdtown/`

## Adding a new area

Copy this file, change:
1. `title` — area name
2. `search.display` — area name
3. `search.campaign` — unique tag
4. `search.reports` — area-specific PDFs
5. `bridges` — links to siblings and hub
6. `seo.description` — unique description
7. Markdown body — area-specific content

## PDF reports

Upload PDFs to `src/assets/pdf/` and reference them in `search.reports`.
The layout will render a "Market Reports" section with download links.
