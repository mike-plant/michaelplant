// michaelplant.realtor: Mike's real-estate site.
// The design system is shared with michaelplant.com: site.css and the portrait are copied
// from ../v2 at build time, so the two sites can't drift apart. Add realtor-only styles to
// src/assets/css/realtor.css.
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "../v2/src/assets/css/site.css": "assets/css/site.css",
    "../v2/src/assets/js/cta.js": "assets/js/cta.js",
    "../v2/src/assets/img/michael-plant-portrait.webp": "assets/img/michael-plant-portrait.webp",
    "../v2/src/assets/img/red1-realty-logo.png": "assets/img/red1-realty-logo.png",
    "../v2/src/assets/img/og-michael-plant.jpg": "assets/img/og-michael-plant.jpg",
  });
  eleventyConfig.addPassthroughCopy("src/assets/css/realtor.css");
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
