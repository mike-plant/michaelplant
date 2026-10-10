// Old URL -> new URL. Generates meta-refresh stubs (GitHub Pages) and _redirects (Cloudflare).
// Real-estate URLs follow site.realtorSite: empty means michaelplant.realtor isn't live yet,
// so they go to the card page; set it and they 301 to the matching page on the realtor site.
const site = require("./site.json");

const realtor = (path) => (site.realtorSite ? site.realtorSite.replace(/\/$/, "") + path : "/");

const retiredToHome = [
  "/about/", "/about/how-i-work/", "/building/", "/community/", "/contact/", "/faith/", "/now/",
  "/third-places/", "/streetlight/", "/streetlight/audit/", "/streetlight/pricing/",
  "/streetlight/google-looks-for/", "/streetlight/apple-yelp-consistency/", "/streetlight/websites-still-matter/",
];

const realEstate = {
  "/real-estate/": "/",
  "/real-estate/value/": "/",
  "/real-estate/risk/": "/",
  "/real-estate/community/": "/",
  "/real-estate/work/": "/",
  "/real-estate/search/lakewood/": "/lakewood/",
};
["birdtown", "detroit-avenue", "eastern-edge", "gold-coast-clifton", "lakewood-park-western", "madison-avenue"]
  .forEach((n) => { realEstate[`/real-estate/search/lakewood/${n}/`] = `/lakewood/${n}/`; });

// /projects/ is Reclaim's interim page. Once site.reclaimSite is set, it redirects there instead
// (the page itself stops building; see content/projects/projects.11tydata.js).
const reclaim = site.reclaimSite ? [{ from: "/projects/", to: site.reclaimSite }] : [];

module.exports = [
  ...reclaim,
  { from: "/hello/", to: "/connect/" },
  { from: "/books/", to: "https://thewanderinglantern.com" },
  ...retiredToHome.map((from) => ({ from, to: "/" })),
  ...Object.entries(realEstate).map(([from, path]) => ({ from, to: realtor(path) })),
];
