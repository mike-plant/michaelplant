# CLAUDE.md

The site is the Eleventy project in `v2/`. Read `v2/CLAUDE-HANDOFF.md` before changing anything. It has the file map, the front-matter fields, and the rules below in more detail.

- Build/verify: `cd v2 && npm install && npm run build` (deploys happen on push to `main`).
- Content and settings are data-driven: `v2/src/_data/site.json` (identity, contact, brokerage, HubSpot), `card.json` (card page words), `paths.json` ("What I'm Part Of"), `redirects.json`.
- Design system: `v2/src/assets/css/site.css` ("old Lakewood calling card": paper, ink, Cormorant SC + EB Garamond, ruled single column). Match it; don't reintroduce the old beacon/context-color UI.
- `legacy-nextjs/` is archived. Don't build there.

## Non-negotiables
1. Any real-estate page uses `section: real-estate` so the masthead shows "Michael Plant | Red 1 Realty" at equal size and the footer shows the logo (Ohio OAC 1301:5-1-02).
2. Fair Housing: describe places by property and lifestyle, never by who lives there (no "families", "diversity", "retirees", "safe"…).
3. No tracking (`data-event`) or CRM capture on faith/personal content.
4. Forms must not show success unless the submission actually went through.
5. Changing a URL means adding an entry to `_data/redirects.json`.
6. The printed card's QR encodes `https://michaelplant.com/connect`. That URL must keep working forever.

Decisions and their reasons: `project-docs/connection-ecosystem-plan.md` (decisions log at top). Open to-dos: `project-docs/launch-checklist.md`.
