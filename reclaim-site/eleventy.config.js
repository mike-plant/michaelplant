// reclaimhomerepair.com: Reclaim Home Repair, Mike Plant's renovation business.
// Shares michaelplant.com's design system (site.css is copied from ../v2 at build time).
// Reclaim-only styles live in src/assets/css/reclaim.css.
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "../v2/src/assets/css/site.css": "assets/css/site.css", "../v2/src/assets/js/cta.js": "assets/js/cta.js" });
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addFilter("dateLabel", (d) =>
    new Date(d).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }));
  eleventyConfig.ignores.add("src/notes/_*.md");

  // Real jobs for one service (or all), newest first, optionally limited.
  eleventyConfig.addFilter("jobsFor", (projects, service, limit) => {
    const list = (projects || []).filter((p) => !service || p.service === service)
      .sort((a, b) => (b.year || 0) - (a.year || 0));
    return limit ? list.slice(0, limit) : list;
  });
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addFilter("monthYear", (d) =>
    new Date(d).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }));

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
