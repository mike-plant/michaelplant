# michaelplant.com

Michael Plant's personal site: a calling-card hub for Lakewood, Ohio (houses, The Wandering Lantern, real estate with Red 1 Realty, and Reclaim home projects).

## Run it

```bash
cd v2
npm install
npm run dev     # http://localhost:8080
```

Pushing to `main` deploys `v2/` to GitHub Pages (`.github/workflows/deploy.yml`).

## Map

| Path | What |
|---|---|
| `v2/` | **The site** (Eleventy). Start with `v2/CLAUDE-HANDOFF.md`. |
| `project-docs/connection-ecosystem-plan.md` | Architecture plan from the BRD, decisions log, phases |
| `project-docs/launch-checklist.md` | What's left before launch / card printing |
| `project-docs/card/` | Print-ready card PDF with the working QR, standalone QR files |
| `project-docs/design/` | Design reference (the calling-card HTML mock) |
| `legacy-nextjs/` | Archived earlier Next.js concept (never deployed) |
| `agents/`, `project-docs/project-plan.md`, `sitemap-*.md` | Notes from the earlier Next.js effort; historical |
