# Pre-launch checklist

One list for all three sites (michaelplant.com, michaelplant.realtor, reclaimhomerepair.com) and everything around them. Work top to bottom; each section unlocks the next. The same list, with tick boxes, is the Pre-launch checklist chapter of the Go-to-Market Playbook.

## 1. Accounts and identity
- [ ] **Create `me@michaelplant.com`** (Cloudflare Email Routing → Gmail). The card and sites use it.
- [ ] **Confirm your licensed name** on Ohio eLicense matches "Michael Plant" and "Red 1 Realty".
- [ ] **Confirm you own reclaimhomerepair.com** (assumed). michaelplant.realtor is yours.
- [ ] **Decide the public email** for the realtor site (now `michaelplantrealtor@gmail.com`) and for Reclaim (now `me@michaelplant.com`).
- [ ] **Fix the live michaelplant.realtor template now**, in NAR's builder:
  - delete the sample testimonials (Adam K, Marry G., Craig R.)
  - change the phone from (614) 585-9020 to 216.217.6362
  - add "Red 1 Realty" next to your name
- [ ] Keep **NAR membership** active (a .realtor domain requires it).

## 2. Reclaim basics
- [ ] **Lakewood contractor registration.** Put the number in `registration` in `reclaim-site/src/_data/site.json`, then set `"show": true` on `registered` in `credentials.json`.
- [ ] **Keep a current certificate of insurance** ready to send. "Fully insured" is already on the site.
- [ ] **Line up two or three references** who will take a call. "References on request" is already on the site.
- [ ] **Decide on EPA RRP (lead-safe) certification.** Paid work that disturbs paint on pre-1978 houses generally requires it.
- [ ] **Confirm Reclaim's towns** (`towns` in `reclaim-site/src/_data/site.json`; now Lakewood, Rocky River, Fairview Park, Bay Village, Westlake, Cleveland's west side neighborhoods) and the realtor area (`areasServed` in `realtor-site/src/_data/site.json`; includes Lorain and Medina counties).
- [ ] **Pull your Zillow numbers:** 12 months of spend and closings, by zip code. That's your cost per closing to beat, and it shows which outer areas to test first.
- [ ] **Check the price ranges** on each service page against your real jobs.
- [ ] **BBB: skip accreditation for now.** It needs 6+ months in business, a quote from BBB Greater Cleveland (third-party estimate: about $485 to $510 a year plus a $75 application fee), and a B rating or better. If a free profile exists, link to it in plain text. Never show the seal unless accredited; Ohio's consumer protection law treats an unearned seal as deceptive.
- [ ] **Say "registered" and "insured," never "licensed."** Ohio has no state license for home improvement work, and claiming one you don't have is deceptive under ORC 1345.02.

## 3. Proof (the sites look empty without it)
- [ ] **Before / during / after photos** from 2 or 3 real jobs, with the owner's OK. See `reclaim-site/PROJECTS.md` and the Field Kit.
- [ ] **First reviews.** Ask every past client and Reclaim customer for a Google review, with written comments if they're willing. Aim for 10 per profile.
- [ ] **Real reviews quoted on the sites,** with permission (`reviews.json` on Reclaim and realtor).
- [ ] **Homes you've helped with** (`realtor-site/src/_data/homes.json`). Needs written client consent and your own photos. Say "sold" only where you were the listing or buyer's agent.

## 4. Content (so there's something to find)
- [ ] **Three pinned posts** on Houses of Lakewood: "Hey, I'm Mike," your best Fix or Leave It, and a real project.
- [ ] **Six more posts** from the Field Kit routine (the insulation job and Leslie's framing are a start).
- [ ] **First two Fix or Leave It notes** on Reclaim's site, written from voice memos (`reclaim-site/src/notes/`).
- [ ] **Refresh the realtor site's Lakewood market numbers** (from Feb 2026) and the school boundary note.

## 5. Profiles (where people and AI tools look)
- [ ] Google Business Profile: **Reclaim** (Carpenter, service area, address hidden).
- [ ] Google Business Profile: **agent**, after Red 1 answers the naming and address questions (Playbook, Ask Red 1). Add every true service (Seller's agent, Buyer's agent, Pre-listing walkthrough, Price opinion, Older homes), booking link to michaelplant.realtor/sell, and real photos. Then set `reviewUrl` and `profiles.googleBusinessProfile` in `realtor-site/src/_data/site.json`.
- [ ] Same for Reclaim's profile: set `reviewUrl` and `profiles` in `reclaim-site/src/_data/site.json`. The short links michaelplant.realtor/review and reclaimhomerepair.com/review then go straight to the review form.
- [ ] **Referral network profiles** you qualify for, after Red 1 approves (Realtor.com ReadyConnect, HomeLight first). Same name, photo, and phone on each.
- [ ] **YouTube channel** under the same name. Upload Fix or Leave It videos as Shorts.
- [ ] Apple Business Connect, Bing Places (import from Google), Yelp (claim, never ask for reviews), Nextdoor, Lakewood Chamber directory.
- [ ] Zillow, Realtor.com, Homes.com agent profiles: same photo, same phone, link to michaelplant.realtor.
- [ ] **Same name, address, and phone everywhere.**
- [ ] Print **review QR cards** for closings and finished jobs.

## 6. Tracking (set up before any traffic)
- [ ] **Analytics on all three sites.** GA4 is free; add its snippet to each `base.njk`. `cta.js` already sends `cta_click` with site, page, action, location, and source.
- [ ] **Mark `cta_click` as a key event** in GA4 and build audiences now: site visitors, people who clicked call or text. Building is free. Google won't serve ads to an audience until it reaches 100 active users in 30 days.
- [ ] **Meta Pixel** on Reclaim and the realtor site (free). Build custom audiences: site visitors, video viewers, Instagram and Facebook engagers. Ads need about 100 matched people. When you run ads, Meta treats both home repair and real estate as Housing: 15-mile minimum radius, no ZIP targeting, no lookalikes. Custom audiences still work.
- [ ] **HubSpot free CRM** as the follow-up list (1,000 contacts and 2 users free): people you know, Reclaim leads, walkthroughs. Its free ad tool only syncs 2 simple website-visitor audiences and can't sync contact lists (that starts at Starter), so build audiences in Meta and Google directly. Skip the HubSpot tracking code; with no forms, it can't tie visits to people.
- [ ] **Missed-call text-back** (Quo, about $15/mo) before any paid ads.
- [ ] **Test every button on a real iPhone and a real Android:** Text me, Call, Save contact, the bar at the bottom. Pre-typed text sometimes drops on iOS, and that's OK as long as the text opens to you.
- [ ] **Turn on Cloudflare Crawler Hints** for each site (it sends IndexNow pings to Bing, which ChatGPT search draws on).
- [ ] **Write the box gutters note and a full "what to fix before selling" article** from voice memos, to close the gaps in the AI answer map.
- [ ] **Bing Webmaster Tools and Google Search Console** for all three sites; submit each sitemap.
- [ ] **Set up the AI desk:** a Claude Project with `project-docs/ai/claude-project-instructions.md`, plus a note-taker (Fireflies, Otter, or Read AI, about $10 to $20 a month) for follow-up calls.
- [ ] **Start the monthly AI prompt log** (Playbook, AI answers).

## 7. Compliance
- [ ] **Send Red 1 the email** in the Playbook's Ask Red 1 chapter:
  - Google profile naming
  - office address
  - realtor site sign-off
  - Reclaim disclosure
  - homes page consent
  - price-opinion wording
- [ ] **Confirm the walkthrough promise** on `/sell/`: free, about an hour, no obligation to list.
- [ ] **Keep the same-day callback promise true,** or change the line on the sites.

## 8. Go live, in this order
1. **michaelplant.com:** merge to `main` (deploys to GitHub Pages).
2. **Cards:** print a proof of `project-docs/card/MICHAEL_PLANT_card_url-qr.pdf` (not the designer file; its QR is clipped). Scan it on iPhone and Android: Connect page opens, Save my contact works.
3. **reclaimhomerepair.com:** Cloudflare Pages, root `reclaim-site`, build `npm run build`, output `_site`. Then set `reclaimSite` in `v2/src/_data/site.json` and redeploy michaelplant.com.
4. **michaelplant.realtor,** after Red 1 signs off:
   - Set up Cloudflare Pages with root `realtor-site`.
   - At Google Domains, point `www` (now a CNAME to `s.multiscreensite.com`) and the bare domain at Cloudflare.
   - Turn off the NAR builder site.
   - Set `realtorSite` in `v2/src/_data/site.json` and redeploy michaelplant.com.
5. **Hosting move for michaelplant.com,** when convenient: move it to Cloudflare Pages too and turn off the GitHub Pages workflow. `_redirects` and `_headers` are already generated.

## 9. After launch
- [ ] **Local Services Ads** for Reclaim (Handyman / Carpenters).
- [ ] **Local Services Ads for real estate** (seller's agent service type) once the agent profile has 10+ reviews. Set a weekly budget and track each lead to a walkthrough.
- [ ] **ChatGPT Ads test:** sign up at ads.openai.com. $100 to $150 a month for 2 months, Reclaim first (Lakewood-area ZIPs, to `/go/porch?utm_source=chatgpt`), then real estate (Cleveland metro area, to `/go/walkthrough?utm_source=chatgpt`, service-level only).
- [ ] **Microsoft Advertising:** import the Google campaigns and add a logo extension so ads can show in Copilot.
- [ ] **Check whether Apple Maps ads are live** in Apple Business.
- [ ] **Meta retargeting test,** $10 to $20 a day, to `/go/porch`.
- [ ] **Review at post 30:** what got saved, shared, or texted about.
- [ ] **Turn the best posts into notes and pages.**

## Still open
- Whether the Lakewood neighborhood pages keep the IDX link-out or get an IDX feed later.
