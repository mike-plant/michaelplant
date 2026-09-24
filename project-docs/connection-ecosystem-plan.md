# michaelplant.com — Connection Ecosystem Architecture & Plan

Source: *Michael Plant Personal Connection Ecosystem BRD v1.1* (Sept 2026), reconciled against what is in this repo today.

---

## 0. Decisions log

**2026-09-24**
- **Streetlight: retire it as a service.** Remove the pricing and audit pages and redirect `/streetlight/*` → `/community/`. Keep one short paragraph in Community about helping Lakewood businesses (e.g. ULBA members) get found. That's neighborly help and relationship-building with local owners who are referral sources, not a product line. Fold **Building** into About.
- **Hosting: Cloudflare** (Pages + Functions + R2 + Turnstile + Web Analytics). Expected cost: $0 on free tiers plus ~$10/yr per domain registered at cost.
- **Real estate moves to its own domain** (see §3a). That clears the brokerage-prominence problem off the personal hub.
- **Public email:** not `michael@michaelplant.com` (reads repetitive). Personal: `hi@michaelplant.com` or `mike@michaelplant.com`. Real estate: a mailbox on the new real-estate domain.
- **CRM:** BoldTrail is disliked. Use it only for what the brokerage requires (IDX/MLS feed, anything Red 1 mandates). Run both pipelines (Reclaim + real estate) in one lightweight CRM behind the `/api/intake` function. Choose after confirming what Red 1 requires to live in BoldTrail.

**2026-09-24: Red 1 answers**
- **Brokerage display text: "Red 1 Realty".** That's the name the brokerage uses publicly and on michaelplant.red1realty.com. The logo (`public/images/redone-realty-logo.png`) reads "RED ONE REALTY". Rule (A) requires the name as licensed, so check the text against the Ohio eLicense lookup before launch.
- **A separate real-estate domain is allowed.** Send Red 1 the domain and page templates for sign-off before launch.
- **A personal card with no real-estate wording doesn't need the brokerage name.** The card stays personal.
- **Nothing has to stay in BoldTrail.** The CRM choice is open. **Listing search:** at launch, keep linking out to the existing Red 1/BoldTrail agent search, which is free and already MLS-compliant. Only add our own IDX feed later if search traffic justifies it; that needs an IDX vendor plus broker sign-off on the MLS IDX agreement.

**2026-09-24: domain, email, CRM**
- **Real-estate domain: `michaelplantrealtor.com`.** NAR's membership-marks rules allow REALTOR® in a domain only when it's combined with the member's own name. `lakewoodrealtor.com` and `westsideclevelandrealtor.com` (a geographic term plus REALTOR) are not permitted for individual members. It also matches the existing `michaelplantrealtor@gmail.com`. Requires active NAR membership.
- **Public email: `hi@michaelplant.com`.** Create it with Cloudflare Email Routing (free) forwarding to Gmail *before* the site deploys.
- **CRM: HubSpot.** Site forms post straight to the HubSpot Forms API (no server needed). Set the portal ID + form GUIDs in `v2/src/_data/site.json`.

**Phase 0: done on branch** (see git log): Streetlight retired with redirects, Third Places → Community, Fair Housing rewrite of neighborhood "fit" sections, brokerage display on real-estate pages, `/privacy/`, honest form fallback + HubSpot wiring + first-touch source capture, threads fixed, Next.js archived to `legacy-nextjs/`, `.next/` untracked.

**Phase 1: built on branch.** `/connect/` (QR target; `/hello/` redirects there), connect hero reused at the top of the home page, `/mike.vcf`, text/call buttons, five intent paths from `v2/src/_data/paths.json`, a mobile text/call/save bar on every other page, `/projects/` (text-photos intake until Phase 2), `/faith/` (**placeholder copy; Michael to rewrite**), click-event hooks (`data-event`) ready for analytics, and a card QR in `project-docs/card/`. Styling lives in `v2/src/assets/css/connect.css` and is expected to be redesigned. Portrait: set `site.portrait` once the engraved portrait exists (the MP monogram shows until then).

## 1. Where things stand today

The repo holds **two different websites**:

| | `v2/` (Eleventy) | repo root (Next.js) |
|---|---|---|
| Status | **Live** at michaelplant.com via GitHub Pages (`.github/workflows/deploy.yml` builds `v2/`) | Not deployed. Earlier real-estate-only concept |
| Positioning | Nonlinear personal hub: 4 "contexts" (Streetlight, Real Estate, Third Places, Building), threads, bridges, beacon nav | "Cleveland real estate: Sell • Invest • Retirement" |
| Pages | ~26 built pages: home, about, how-i-work, now, contact (Calendly), Streetlight ×6, Real Estate philosophy ×5, Lakewood neighborhood search ×7, Third Places, Building, ULBA mockup | `/sell/lakewood`, `/sell/west-park`, `/sell/cleveland`, calculators (Home Sale, Deal Analyzer), planned DSCR/BRRR/retirement |
| Forms | Buyer "narrow it down" form + gated market-report PDFs, all `mailto:` fallback (no backend) | Google Places autocomplete (API key in untracked `.env.local`) |

**Recommendation: build the new ecosystem on `v2/` (Eleventy).** It's live, it has the content and voice, it's static-first, and it fits the BRD's "system works without the LLM" rule. Retire the Next.js app. Carry forward only its *ideas*: the `/sell/*` seller pages, the calculators (as small vanilla-JS widgets), the brokerage-logo header treatment, and the planned privacy/disclaimer pages.

---

## 2. Conflicts between the BRD and what exists

### C1. Paths don't match contexts (biggest structural conflict)
| BRD path | Existing v2 context | Gap |
|---|---|---|
| Connect with Mike | — (contact page only) | **Missing.** No `/connect`, vCard, text or call links. `site.json` has a phone number that is never shown |
| Home Projects → Reclaim | — | **Missing entirely** |
| Real Estate | Real Estate | Exists, but it covers philosophy and buyer search. BRD is **seller-first** |
| Books & Community → Wandering Lantern | Third Places | Mostly aligned. Rename/reframe |
| Faith & Life | — | **Missing entirely** |
| — | **Streetlight** | **Not in the BRD at all.** 6 pages, pricing, active service |
| — | **Building** | Not in the BRD. It's biography, not a path |

**Decision needed (D1): what happens to Streetlight?** Recommendation: keep its pages live and indexed, drop it from the primary intent router, and make it reachable from About → "Other work" and the footer. If it grows, give it its own domain later (the BRD allows a domain "when it represents a real brand"). Fold **Building** into About as background rather than keeping it as a path.

### C2. Navigation philosophy
v2 was built as a "mind map, not a brochure": no nav bar, beacon compass, discovery through bridges. The BRD wants the opposite above the fold: portrait, **Save contact / Text / Call**, and "What can I help with?" with five obvious buttons.
**Resolution:** use both, with separate jobs.
- `/connect` (QR target) and the home page above the fold are **task-first**: obvious buttons, no puzzle.
- The beacon, threads and bridges stay as the **exploration layer** on content pages below the fold.
- Add a persistent, small **Text / Call** affordance on mobile (BRD: "always preserve a one-tap path").

### C3. Real-estate positioning
- **BRD:** practical homeowner judgment, seller-first, Lakewood focus, pre-listing walkthrough.
- **v2:** values essays plus a buyer neighborhood search.
- **Next.js:** seller pages plus DSCR/BRRR/**self-directed IRA** investing.

**Resolution:** keep the essays as the "proof of thinking" layer and the neighborhood pages as the buyer path. Build the BRD seller pages as the new core. **Drop the retirement/IRA path**: it isn't in the BRD and it's advice-adjacent with regulatory exposure. Fold DSCR/BRRR into a single `/invest/` page.

**Duplication:** `real-estate/index.md` and `real-estate/value.md` repeat the same essay almost word for word ("Quick money is loud…"). That breaks the repo's own rule ("If a paragraph could live on more than one page, it probably doesn't belong on either"). Consolidate them.

### C4. URL strategy
The BRD proposes `/sell/*`, `/buy/lakewood`, `/invest`, `/home-value`, `/projects`, `/books`, `/connect`. Existing buyer pages live at `/real-estate/search/lakewood/**` and have been indexed since Feb 2026.
**Resolution:** add `/sell/*`, `/invest/` and `/home-value/` as new top-level campaign URLs. Keep the neighborhood URLs where they are. Make `/buy/lakewood/` a redirect to `/real-estate/search/lakewood/`. **GitHub Pages cannot do server redirects** (see T1).

### C5. Contact identity is inconsistent
There are three emails in play: `msplant@gmail.com` (site.json, contact, how-i-work), `michael@michaelplant.com` (handoff doc), and `michaelplantrealtor@gmail.com` (search forms). The phone number appears nowhere on the site.
The BRD rule that the card must stay valid even when downstream workflows change argues for a **domain-owned email** (`michael@michaelplant.com`) as the public identity, with real-estate email set per brokerage rules (**D2**).

### C6. "Community" scope
Third Places mixes three things: the Lantern (a business), men's community (personal), and Lakewood. The ULBA mockup (`lakewood-concepts/`) is a separate organization's site.
**Resolution:**
- `/community/` becomes the "Books & Community" path page. It links out to the Lantern, and `/books/` redirects to thewanderinglantern.com.
- Men's community fits more naturally under **Faith & Life** or `/community/`. Your call (**D3**).
- Move the ULBA mockup to its own repo/deploy, or mark it `noindex`. It shouldn't be part of Michael's identity site.

---

## 3. Gaps and risks on the live site (fix first)

1. **🔴 Brokerage disclosure missing.** The BRD (§6.4) says Ohio requires the brokerage name on every viewable page of a real-estate-services website, at least as prominent as Michael's name. Live v2 pages advertise buyer representation and link to IDX search, but "Red 1 Realty" appears only in hidden `<meta>` descriptions. The Next.js version had the logo; v2 lost it. `public/images/redone-realty-logo.png` exists. Confirm the exact display name with Red 1 (BRD open item).
2. **🔴 Fair Housing steering language.** The neighborhood pages have "Who it tends to fit / doesn't fit" sections that use protected-class-adjacent descriptors, e.g. "People who value diversity", "comfortable with density and diversity" (birdtown, eastern-edge) and "Families needing clear school boundary certainty" (familial status). Rewrite these around property and lifestyle attributes (lot size, transit, noise, renovation appetite) and get Red 1 review.
3. **🟠 Lead capture silently loses leads.** With no `leadEndpoint`, the buyer form opens `mailto:` and shows "Thanks" right away. Nothing is sent if the visitor has no mail app configured, which is common on mobile. The market-report gate "captures" name/email and discards them.
4. **🟠 `/privacy/` 404s.** It's linked from every page's footer. Forms collect PII without a privacy page.
5. **🟡 Broken thread references.** `threads.json` points to `/real-estate/investors/` and `/real-estate/portfolio/`, which don't exist. Real-estate pages declare thread IDs (`lasting value`, `judgment`, `restraint`, `risk`, `quality`, …) that aren't defined, so thread-nav renders nothing. `CLAUDE-HANDOFF.md` lists pages that don't exist.
6. **🟡 Repo hygiene.** 44 `.next/` build files are committed. There are three dead `HomeSaleAnalyzer-*` variants and five `Cross-node stubs … copy N.md` files. `Now` was last updated January 2026.
7. **No analytics of any kind.** The BRD's measurement needs (§10) start from zero.

---

## 3a. Ohio advertising rule: what it requires and how the architecture handles it

The source is [OAC 1301:5-1-02](https://codes.ohio.gov/ohio-administrative-code/rule-1301:5-1-02). This is my reading of the rule, not legal advice. Red 1's broker is responsible for supervising your advertising and has the final say.

| Rule | Text (paraphrased closely) |
|---|---|
| (B) Equal prominence | Brokerage name displayed **at least in equal prominence** with the salesperson's name in all advertising, **including websites** the licensee owns or controls |
| (D) Every page | All internet advertising of real-estate services must show the brokerage name on **every viewable web page**. A page includes the part that scrolls below the screen. Outdated info must be fixed within 14 days |
| (A) Name | Use your name exactly as it appears on your license |
| (H) Advertising | Anything that makes properties or services known to the public: websites, social media, blogs, email, signs, **business cards** |
| (I) Exception | Private communication requested by a client or prospect is not advertising |
| Carve-out | You're not in violation on platforms you don't control that don't let you set name size (Zillow, etc.) |

**Can it just go in the footer?**
- **Rule (D):** a footer does satisfy it, because the footer is part of the page even below the fold.
- **Rule (B):** a footer does not satisfy it on michaelplant.com. "Michael Plant" is the site's name, the header anchor and the domain, so a small footer brokerage line is not *equal prominence*.
- **So:** on michaelplant.com, footer-only doesn't work. On a separate real-estate site, it can work. There, "Michael Plant | Red 1 Realty" sits together in the header at the same size (plus the logo), and the footer carries the full brokerage disclosure. That is a single line of layout, not a design burden.

**Architecture that follows from this:**
1. **Real-estate domain.** All buyer/seller/investor pages (`/sell/*`, neighborhood pages, `/invest`, `/home-value`, proof) live there. The layout is co-branded on every page. Ask Red 1 for the logo and exact brokerage display name. Also ask whether BoldTrail can serve IDX search under that domain; otherwise keep linking out to the BoldTrail search as now.
2. **michaelplant.com (hub)** doesn't advertise real-estate services. The "Buying or selling?" intent button links out to the real-estate domain, and wherever real estate is mentioned the hub says "Michael Plant, Red 1 Realty" in the same text size. Also put a brokerage line in the hub's global footer. It costs nothing and covers the edge case.
3. **Calling card.** Rule (H) names business cards. If the card mentions real estate anywhere, the brokerage name must appear at equal prominence. **Recommended:** the card stays personal (name, Lakewood, phone, QR, connection prompt) with no real-estate wording, which matches the BRD's "not four miniature ads" direction. Confirm this with Red 1.
4. **Existing Lakewood neighborhood pages** move to the real-estate domain, with 301 redirects from the old michaelplant.com URLs (Cloudflare `_redirects`) so search rankings carry over.

**Choosing the domain:** the BRD warns against keyword-stuffed domains. Pick something brand-like and speakable that's permanent even if you change brokerages, e.g. `plant.homes`, `mikeplanthomes.com` or `plantrealty…`. The brokerage name should *not* be in the domain. Availability not checked.

**For Red 1 (one email):** exact display name + logo files; whether a separate agent domain is allowed and whether they need to approve it; whether a personal card without real-estate wording needs the brokerage; what, if anything, must stay in BoldTrail.

---

## 4. Gaps in the BRD itself

| Gap | Why it matters | Proposed answer |
|---|---|---|
| **Hosting/back end not addressed** | Photo uploads, CRM routing, redirects and an LLM endpoint all need more than GitHub Pages | See T1 |
| **Form spam / abuse** | A public photo-upload endpoint attracts junk | Cloudflare Turnstile + size/type limits |
| **Homeowner photo & address retention** | Photos plus an address are sensitive | 12-month retention on declined leads, private bucket, stated in privacy page |
| **Texting compliance** | A business texting number (BRD open item) triggers A2P 10DLC registration and TCPA consent | Card/`/connect` uses `sms:` to Michael's own phone (person-initiated, no consent issue). Any automated texting is out of MVP |
| **Reclaim trust markers** | Homeowners check registration and insurance | Show Lakewood contractor registration and insurance status on Reclaim pages, where applicable |
| **Fair Housing** | BRD covers license advertising, not steering | Add to §11 guardrails and the Red 1 review checklist |
| **Accessibility & performance** | The QR scan lands on a phone, often outdoors or on a slow connection | `/connect` < 50 KB, no third-party JS, WCAG AA contrast, tap targets ≥ 44px |
| **Content ownership/cadence** | The site already has stale pages | Monthly "Now" update; quarterly proof-library review |
| **Streetlight & Building** | Existing lines of work the BRD doesn't mention | D1 above |
| **vCard hosting (open item)** | — | Static `/mike.vcf` on michaelplant.com. Answers the open item at zero cost |
| **QR source attribution** | BRD wants `source=calling-card` but also a short QR URL | The **path is the tag**: `/connect` only receives card traffic. First-touch source/landing page is stored in `sessionStorage` and attached to every form payload. No query string needed on the card |

---

## 5. Target information architecture

```
michaelplant.com
├── /                        Hub: portrait, "Hey, I'm Mike", Save/Text/Call, 5 intent buttons, "Right now"
├── /connect/                QR target (permanent). Same above-the-fold as /, trimmed, source=calling-card
│   /hello/                  → redirect to /connect/ (covers the open decision both ways)
├── /mike.vcf                vCard
│
├── /projects/               Home Projects → Reclaim (redirect to Reclaim domain once decided, else hosted here)
│   ├── /projects/request/   Photo-first intake
│   └── /projects/{porches-decks,railings,exterior-trim-rot,doors,pre-sale-punch-list}/
│
├── /real-estate/            Real estate hub (brokerage-branded layout on everything below)
│   ├── /real-estate/how-i-think/   consolidated values essay (merge index+value), risk, community, work
│   └── /real-estate/search/lakewood/**   existing buyer neighborhood pages (URLs unchanged)
├── /sell/lakewood/                  seller hub
├── /sell/before-you-renovate/
├── /sell/pre-listing-walkthrough/   primary seller conversion
├── /sell/repairs-before-selling/
├── /sell/older-homes/
├── /buy/lakewood/           → redirect to /real-estate/search/lakewood/
├── /invest/                 small investor / value-add (absorbs DSCR/BRRR ideas)
├── /home-value/             valuation CTA → walkthrough request
├── /proof/                  case studies, before/after, reviews (labeled by real location)
│
├── /community/              Books & Community (Lakewood, third places, ULBA link, men's community?)
│   /third-places/           → redirect to /community/
├── /books/                  → redirect to thewanderinglantern.com
│
├── /faith/                  Faith & Life: conversation, resources, coffee. No CRM, no scoring
│
├── /about/                  bio + Building history + "Other work" → Streetlight
├── /streetlight/**          unchanged, de-emphasized (D1)
├── /now/  /contact/
└── /privacy/  /disclosures/ (brokerage + construction separation)
```

### Content model changes
- **Replace `contextDefs.json` with `paths.json`** (key, label, color, intent prompt, destination, `commercial: true|false`, `layout`). The home and `/connect` intent buttons, the beacon and analytics all read from this one file.
  - **Colors:** Real Estate blue, Community green and Streetlight amber stay. Add colors for Reclaim, Faith and Connect.
- **Page front matter gets `path:`** in place of `contexts:`. Keep `contexts` as an alias during migration so bridges and neighborColors keep working.
- **New `layouts/real-estate.njk`** extends `page.njk` and **always** renders the brokerage block in the header and footer. Every page under `/real-estate/`, `/sell/`, `/buy/`, `/invest/` and `/home-value/` must use it. A build check fails if one doesn't.
- **Fix `threads.json`.** Define the thread IDs the pages use, or remove them; remove the dead URLs.

---

## 6. Technical architecture

### T1. Hosting
GitHub Pages can't do redirects, form handling, file uploads or functions.
**Recommendation (D4): move hosting to Cloudflare Pages.** It's free, keeps the same Eleventy build, and adds `_redirects`, Pages Functions (form/intake API and later the LLM concierge), R2 for photos, Turnstile for spam and Web Analytics.
**Alternative:** Netlify, which has similar features (built-in Forms with uploads) but tighter free limits.

**If you stay on GitHub Pages:** meta-refresh redirect stubs plus a third-party form tool (Tally/Jotform) for uploads. Workable, but attribution is weaker.

### T2. One intake endpoint, routed by path
`POST /api/intake` (a Pages Function) validates, checks Turnstile, and attaches `{first_touch_source, first_landing_page, path, page_url}`.

| `path` | Destination | CRM? |
|---|---|---|
| `connect` | Email/notify Michael | No (contact only if Michael adds them) |
| `project` | CRM pipeline "Reclaim": lead → qualified → site visit → quote → won/lost → completed → review. Photos → private R2 | Yes |
| `real-estate` | CRM pipeline "Real Estate": inquiry → nurture → consult → active → closed | Yes (brokerage-compliant) |
| `community` | Email Michael | No |
| `faith` | **Email to Michael only. Never CRM, never analytics beyond a page view** | **No** |

CRM choice is still open (**D5**). Recommendation: pick one that handles two pipelines and a webhook/API cheaply (e.g. HubSpot free, Folk, or Follow Up Boss if Red 1 already provides it). The endpoint isolates that choice, so switching later means editing one function.

### T3. Analytics
- Cloudflare Web Analytics (or Plausible), no cookies, no banner.
- Custom events: `save_contact`, `text_click`, `call_click`, `intent_select:{path}`, `form_submit:{path}`. **No per-person tracking on faith pages.**
- Monthly dashboard (BRD §10): start with a Google Sheet fed from the CRM and analytics exports. Build a real dashboard only once it's needed.

### T4. LLM concierge (Phase 5, unchanged from the BRD)
A Pages Function calling the Claude API, grounded only in an `approved-answers/` content folder in this repo. It's labeled as an assistant with a Text/Call button always visible, and it escalates on pastoral, pricing, legal, negotiation and contract topics. Logs record intent and source only, never message bodies from faith conversations. The site is fully functional with it switched off.

---

## 7. Build plan

Phases follow the BRD's MVP sequence, with a **Phase 0** for fixes to the live site.

### Phase 0: Fix the live site (days, not weeks)
- [ ] Add a brokerage block to all real-estate pages (and the global footer until Red 1 rules on scope) → **needs D6**
- [ ] Rewrite the neighborhood "fits / doesn't fit" sections to remove protected-class language; send them to Red 1 for review
- [ ] Add `/privacy/`
- [ ] Replace `mailto:` form handling with a real endpoint (Formspree/Tally is fine as a stopgap until T1); fix the report gate
- [ ] Fix `threads.json` and the undefined thread IDs; update `CLAUDE-HANDOFF.md`
- [ ] Unify the public email (D2); surface the phone number
- [ ] Repo cleanup: untrack `.next/`, delete dead component variants and duplicate stubs, archive the Next.js app to a branch or `legacy/`

### Phase 1: Connect layer (unblocks card printing)
- [ ] `paths.json` content model; migrate `contextDefs`
- [ ] `/connect/` + `/hello/` redirect: portrait, Save to Contacts (`/mike.vcf`), Text (`sms:`), Call (`tel:`), five intent buttons. Two taps to a saved contact
- [ ] New home above the fold (same component); "Right now" and exploration below
- [ ] Mobile sticky Text/Call
- [ ] First-touch source capture script
- [ ] Hosting move (T1) and `_redirects`: `/books`, `/third-places`, `/buy/lakewood`, `/hello`
- [ ] **Generate the QR from the live `/connect/` URL, print a proof, scan it on iOS and Android** → card goes to print

### Phase 2: Reclaim
- [ ] `/projects/` hub + 3–5 service pages (porch/deck, railings, trim/rot, doors, pre-sale punch list)
- [ ] Photo-first intake: address, project type, photos (mobile camera), timing, optional budget. Clear "what we don't take" copy so low-fit work is easy to decline
- [ ] Private R2 photo storage + intake → Reclaim CRM pipeline
- [ ] Decide the Reclaim domain (D7); `/projects/` either hosts or redirects

### Phase 3: Real-estate engine
- [ ] `layouts/real-estate.njk` with the brokerage block + build check
- [ ] `/sell/lakewood/`, `/sell/before-you-renovate/`, `/sell/pre-listing-walkthrough/` (walkthrough request form)
- [ ] Consolidate the values essays; relink the neighborhood pages
- [ ] `/proof/` scaffold: case-study template (problem → judgment → action → outcome, **real location labeled**)
- [ ] Past-client import into the CRM; review-request template; Google Business Profile check
- [ ] **Red 1 approval of templates before launch**

### Phase 4: Measurement
- [ ] Analytics events live; CRM stages match BRD §10; monthly report template
- [ ] Verify: every commercial lead shows path + first-touch source

### Phase 5: LLM concierge (after traffic exists)
- [ ] Approved-answers corpus → `/api/concierge` → widget below the buttons, feature-flagged

### Phase 6: Scale
- [ ] `/sell/repairs-before-selling/`, `/sell/older-homes/`, `/invest/`, `/home-value/`
- [ ] $300 paid-search test, only after Phase 3 + 4 are live

---

## 8. Decisions needed from Michael

| # | Decision | Recommendation |
|---|---|---|
| D1 | Streetlight's place (and Building) | ✅ Retire; redirect to /community/; Building → About |
| D2 | Public email + phone for the card | ✅ `hi@michaelplant.com` + direct cell via `sms:`/`tel:` |
| D3 | Where men's community lives | Faith & Life, if it's discipleship-shaped; otherwise Community |
| D4 | Hosting | ✅ Cloudflare |
| D5 | CRM | ✅ HubSpot |
| D6 | Exact brokerage name/logo; approval of separate RE domain | ✅ "Red 1 Realty" + logo; domain allowed, templates go to Red 1 for sign-off |
| D11 | Real-estate domain name | ✅ michaelplantrealtor.com |
| D7 | Reclaim domain & public brand name | Separate domain for SEO, `/projects/` redirects to it |
| D8 | `/connect` vs `/hello` | `/connect` canonical, `/hello` redirect, so both work forever |
| D9 | Seller offer name | "Lakewood Pre-Listing Walkthrough" (plain, searchable) |
| D10 | Fate of Next.js calculators | Port Home Sale Analyzer to `/sell/`, drop the rest for now |

## 9. Acceptance criteria mapping (BRD §13)

| BRD criterion | Satisfied by |
|---|---|
| Scan → saved contact in ≤ 2 taps | Phase 1 `/connect` + `/mike.vcf` |
| Text/call without AI | Phase 1 buttons + sticky bar; concierge optional |
| Photo project submission from mobile | Phase 2 intake + R2 |
| Seller walkthrough request from a Lakewood page | Phase 3 `/sell/pre-listing-walkthrough/` |
| Brokerage/Ohio prominence | Phase 0 block + Phase 3 enforced layout + Red 1 sign-off |
| Path + source on every commercial lead | T2 payload + Phase 4 verification |
| Works without LLM | Concierge feature-flagged, Phase 5 |
| Card survives downstream change | Card encodes only `michaelplant.com/connect`; all routing lives in `paths.json` + `_redirects` |
