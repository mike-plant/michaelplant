module.exports = function (eleventyConfig) {
  // Global data: current year
  eleventyConfig.addGlobalData("currentYear", () => new Date().getFullYear());

  // Passthrough copy
  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/assets/pdf");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/lakewood-concepts");

  // Paired shortcodes for content formatting
  eleventyConfig.addPairedShortcode("callout", function (content, type) {
    const cls = type ? `callout callout-${type}` : "callout";
    return `<div class="${cls}">\n${content}\n</div>`;
  });

  eleventyConfig.addPairedShortcode("pullquote", function (content) {
    return `<div class="pull-quote">\n${content}\n</div>`;
  });

  eleventyConfig.addPairedShortcode("keytakeaway", function (content) {
    return `<div class="key-takeaway">\n<h3 class="key-takeaway-heading">At a glance</h3>\n${content}\n</div>`;
  });

  // Filter: fix permalink paths (used by src/content/content.json)
  eleventyConfig.addFilter("fixPermalink", function (stem) {
    if (stem === "/index" || stem === "/") return "/index.html";
    if (stem.endsWith("/index")) {
      return stem.replace(/\/index$/, "/index.html");
    }
    return stem + "/index.html";
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
