# michaelplant.realtor

Mike's real-estate site. It uses the same calling-card look as michaelplant.com, and every page shows **Michael Plant | Red 1 Realty** at equal size, with the brokerage logo and disclosure in the footer (Ohio OAC 1301:5-1-02).

```bash
cd realtor-site
npm install
npm run dev     # http://localhost:8081
```

## Pages
- `/`: who Mike is as a Realtor. How I can help: Buying, Selling, New listings (by text).
- `/lakewood/` plus six neighborhood guides. These moved from michaelplant.com/real-estate/search/lakewood/ and already have the Fair Housing rewrite. Each guide ends with a text-first "Narrow it down with me" block.
- `/sell/`: the pre-listing walkthrough offer.
- `/privacy/`

## Rules
- **Shared design.** `site.css` and the portrait/logo are copied from `../v2/src/assets/` at build time. Don't fork them. Realtor-only styles go in `src/assets/css/realtor.css`.
- **Text first.** No lead forms. Listings come from MLS saved searches Mike sets up after a text, not from the Red 1 agent page.
- **Fair Housing.** Describe places by property and lifestyle, never by who lives there.
- **Reclaim.** Mention it only with the disclosure that it's Mike's company and nobody is expected to use it.

## Launch
See `../project-docs/launch-checklist.md` → "Real-estate site". In short:
1. Fix or retire the NAR template site currently on the domain (see the checklist).
2. Get Red 1 sign-off.
3. Deploy (Cloudflare Pages, root `realtor-site`, build `npm run build`, output `_site`).
4. Set `realtorSite` in `../v2/src/_data/site.json` to `https://michaelplant.realtor`. That one switch repoints the card's Real Estate link and all old michaelplant.com real-estate URLs.
