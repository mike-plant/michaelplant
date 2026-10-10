# reclaimhomerepair.com

Reclaim Home Repair: exterior repair for Lakewood's older houses, owned and run by Mike Plant. It's one of three sites in one family. All three share `../v2/src/assets/css/site.css` (paper, ink, Cormorant SC + EB Garamond). Reclaim's only difference is the dutchman-patch mark, and the cedar patch is the only color in the family.

```bash
cd reclaim-site
npm install
npm run dev     # http://localhost:8082
```

## How it's built to convert
Owner-operated contractors win on being visible and on answering the phone. The site's job is to confirm "he's legit" and get a call or text:
- **Calls and texts first.** Call and Text-photos buttons are on the first screen of every page, the phone number is in the masthead, and a Call / Text / Email bar stays fixed at the bottom on phones. There are no forms.
- **The promise:** "I answer my own phone. If I miss you, I call back the same day." Only keep it if it stays true.
- **Price ranges** on every service page. They're labeled as planning ranges, not quotes.
- **Proof** fills in as it exists:
  - `src/_data/projects.json`: before and after photos.
  - `src/_data/reviews.json`: real reviews, quoted with permission.
  - `site.registration`, `site.insurance`, and `site.rrp` in `src/_data/site.json`.
  - Empty sections don't show. Never add placeholder or invented proof.

## Pages
- `/`: the main page.
- `/porches/`, `/trim-and-rot/`, `/stairs-and-railings/`: one page per service. Don't make city-swapped copies; Google treats those as doorway pages.
- `/go/porch/`: campaign page for ads, yard-sign QR codes, and leave-behinds. It carries `noindex` and is left out of the sitemap.
- `/privacy/`, `/sitemap.xml`, `/robots.txt` (all crawlers allowed).

## Rules
- **Mentioning real estate:** use "Mike Plant | Red 1 Realty" at the same size (Ohio OAC 1301:5-1-02), and always say Reclaim is Mike's company and nobody is expected to use it (NAR Standard 6-1).
- **Lead-safe certification:** only claim EPA RRP certification once it's real (set `site.rrp`).
- **Same name, address, and phone** as the Google Business Profile, Yelp, Apple, and Bing.

## Launch
1. Confirm you own `reclaimhomerepair.com`. It's assumed, not verified.
2. Lakewood contractor registration and insurance: fill `registration`, `insurance` in `site.json`.
3. Deploy (Cloudflare Pages, root `reclaim-site`, build `npm run build`, output `_site`).
4. Set `reclaimSite` in `../v2/src/_data/site.json`. The card's Reclaim link switches over, and `/projects/` redirects to the new site.
