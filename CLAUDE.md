# CLAUDE.md

The site is the Eleventy project in `v2/`. Read `v2/CLAUDE-HANDOFF.md` before changing anything. It has the file map, the front-matter fields, and the rules below in more detail.

- Build/verify: `cd v2 && npm install && npm run build` . Cloudflare Pages builds all three sites from the `claude/zealous-heisenberg-zn6okn` branch (projects `michaelplant` → `v2`, `reclaim` → `reclaim-site`, `realtor` → `realtor-site`; build `npm run build`, output `_site`, `NODE_VERSION=20`). Pushing to that branch deploys. When it's merged to `main`, switch each project's production branch to `main`.
- Content and settings are data-driven: `v2/src/_data/site.json` (identity, contact, brokerage, realtorSite/reclaimSite switches), `card.json` (card page words), `paths.json` ("What I’m Part Of"), `redirects.js`.
- Design system: `v2/src/assets/css/site.css` ("old Lakewood calling card": paper, ink, Cormorant SC + EB Garamond, ruled single column). Match it; don't reintroduce the old beacon/context-color UI.
- `legacy-nextjs/` is archived. Don't build there.

## Non-negotiables
1. michaelplant.com stays small: card page, `/connect`, `/projects`, `/privacy`, vCard. **It never mentions real estate** (no link, no brokerage line); real estate lives only on michaelplant.realtor. Real-estate pages don't live here. They're in `realtor-site/` (michaelplant.realtor). Reclaim lives in `reclaim-site/` (reclaimhomerepair.com). All three are separate Eleventy sites sharing `v2/src/assets/css/site.css`. One family, so change the shared stylesheet with all three in mind. If one ever must, it uses `section: real-estate` so the masthead shows "Michael Plant | Red 1 Realty" at equal size (Ohio OAC 1301:5-1-02).
2. Fair Housing: describe places by property and lifestyle, never by who lives there (no "families", "diversity", "retirees", "safe"…).
3. No tracking (`data-event`) or CRM capture on faith/personal content.
4. No forms (call/text first). Every CTA is tracked by the shared `v2/src/assets/js/cta.js`; keep one event shape across all three sites.
5. Changing a URL means adding an entry to `_data/redirects.js`.
6. The printed card's QR encodes `https://michaelplant.com/connect`. That URL must keep working forever.

## One goal per site (CTA rules)
| Site | The one primary action | Secondary |
|---|---|---|
| michaelplant.com | Text me (pre-filled "Hi Mike, it's ") | Save contact, Call |
| michaelplant.realtor | Book a free walkthrough (sms, `site.cta`) | Call; buyers: the Lakewood guide / "Text me about Lakewood" on guide pages |
| reclaimhomerepair.com | Text me a photo (`site.cta`) | Call |

- **Only the primary action is a filled button.** Everything else is outlined or a text link.
- **Where it goes:** on the first phone screen, again after the proof (`cta-block`), and in the phone bar's filled, double-width cell.
- **Show the number as text too,** since `sms:` links do nothing on desktop.
- **Tag every CTA** with `data-cta="hero|mid|end|..."`. `cta.js` handles the tracking.

## Answer pages (for people and AI assistants)
- Answer first: a question as the heading, then a direct one- or two-sentence answer, then details. Use `faq` front matter (`{ q, a }`); it renders visible Q&A plus FAQPage markup.
- Set `updated` on answer pages for the "By Mike Plant · Updated" line.
- Each site has an `/about/` facts page; keep it in sync with the Google profiles.
- Only facts and opinions Mike has given. Never invent prices, reviews, or credentials.

Brand direction, voice, and what to publish: `project-docs/brand/brand-book.src.html`. Go-to-market plan, research, and checklist: `project-docs/brand/playbook.src.html`. Job-site photo, video, and voice-memo kit: `project-docs/brand/fieldkit.src.html`. AI desk (Claude Project instructions): `project-docs/ai/claude-project-instructions.md`. Decisions and their reasons: `project-docs/connection-ecosystem-plan.md` (decisions log at top). Open to-dos: `project-docs/launch-checklist.md`.
