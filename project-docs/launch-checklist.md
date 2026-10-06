# Launch checklist

What has to happen before this branch goes live and the cards get printed. Owner = Michael unless noted.

## Before merging to `main` (merging deploys the site)
- [ ] **Create `me@michaelplant.com`** (e.g. Cloudflare Email Routing → Gmail). The site and the card both use it.
- [ ] **Verify licensed name** on Ohio eLicense matches "Michael Plant" and the brokerage display "Red 1 Realty". If not, update `site.author` / `site.brokerage.name` in `v2/src/_data/site.json`.
- [ ] **Update `/now/`** (`v2/src/content/now/index.md`). It still says January 2026.
- [ ] Decide on **Faith & Life**: leave it unpublished, or write it and remove `permalink: false` from `v2/src/content/faith/index.md` (and add it to `_data/paths.json`).
- [ ] Send the **Houses of Lakewood** group link → `url` in `_data/paths.json` (until then "Join the group" opens a text).
- [ ] *(Optional now, needed for leads)* **HubSpot:** create two forms (buyer, report) with fields firstname, email, phone, message. Put the Portal ID and form GUIDs in `site.hubspot`.

## Cards
- [ ] Use **`project-docs/card/MICHAEL_PLANT_card_url-qr.pdf`**, not the original designer file (its QR is clipped and won't scan).
- [ ] After the site is live: order a **printed proof** and scan it with an iPhone and an Android phone → it should open the Connect page, and "Save my contact" should work.

## Real-estate domain (Phase 3)
- [ ] Confirm active **NAR membership** (required to use "REALTOR" in the domain).
- [ ] Register **michaelplantrealtor.com**.
- [ ] Send Red 1 the domain and page templates for **sign-off**.

## Hosting move (when Phase 2 needs it)
- [ ] Create a Cloudflare account; move DNS for michaelplant.com; connect Cloudflare Pages to the repo (build `npm run build`, root `v2`, output `_site`). `_redirects` and `_headers` are already generated.
- [ ] Turn off the GitHub Pages workflow once Cloudflare is serving.

## Decisions still open
- Reclaim: own domain, or stay at michaelplant.com/projects/?
- Whether the Lakewood neighborhood pages keep the IDX link-out or get an IDX feed later.
