module.exports = function (eleventyConfig) {
  // Global data: current year
  eleventyConfig.addGlobalData("currentYear", () => new Date().getFullYear());

  // Passthrough copy
  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/CNAME");

  // Collection: all content pages (exclude drafts)
  eleventyConfig.addCollection("allPages", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/content/**/*.md")
      .filter((page) => !page.data.draft);
  });

  // Collection: pages grouped by context
  eleventyConfig.addCollection("byContext", function (collectionApi) {
    const pages = collectionApi
      .getFilteredByGlob("src/content/**/*.md")
      .filter((page) => !page.data.draft);
    const map = {};
    for (const page of pages) {
      const contexts = page.data.contexts || [];
      for (const ctx of contexts) {
        if (!map[ctx]) map[ctx] = [];
        map[ctx].push(page);
      }
    }
    // Sort each context's pages by date descending
    for (const key of Object.keys(map)) {
      map[key].sort((a, b) => (b.data.date || 0) - (a.data.date || 0));
    }
    return map;
  });

  // Collection: pages grouped by thread
  eleventyConfig.addCollection("byThread", function (collectionApi) {
    const pages = collectionApi
      .getFilteredByGlob("src/content/**/*.md")
      .filter((page) => !page.data.draft);
    const threads = require("./src/_data/threads.json");
    const map = {};

    for (const thread of threads) {
      const threadPages = [];
      for (const pagePath of thread.pages) {
        const found = pages.find((p) => p.url === pagePath);
        if (found) threadPages.push(found);
      }
      map[thread.id] = {
        label: thread.label,
        summary: thread.summary,
        pages: threadPages,
      };
    }
    return map;
  });

  // Collection: context proximity map (co-occurrence of contexts across pages)
  eleventyConfig.addCollection("contextProximity", function (collectionApi) {
    const pages = collectionApi
      .getFilteredByGlob("src/content/**/*.md")
      .filter((page) => !page.data.draft);
    const proximity = {};

    for (const page of pages) {
      const ctxs = page.data.contexts || [];
      // Also count bridges as connections between the page's section and bridge targets
      for (let i = 0; i < ctxs.length; i++) {
        if (!proximity[ctxs[i]]) proximity[ctxs[i]] = {};
        for (let j = 0; j < ctxs.length; j++) {
          if (i !== j) {
            proximity[ctxs[i]][ctxs[j]] = (proximity[ctxs[i]][ctxs[j]] || 0) + 1;
          }
        }
      }
    }
    return proximity;
  });

  // Filter: get neighbors for a context (sorted by connection strength)
  eleventyConfig.addFilter("contextNeighbors", function (proximity, contextKey) {
    const connections = proximity[contextKey] || {};
    return Object.entries(connections)
      .sort((a, b) => b[1] - a[1])
      .map(([key, weight]) => ({ key, weight }));
  });

  // Filter: get bubble-eligible pages for a context
  eleventyConfig.addFilter("bubblePages", function (pages, contextKey) {
    return (pages || [])
      .filter(
        (p) =>
          p.data.bubble &&
          p.data.bubble.eligible &&
          p.data.bubble.contextKey === contextKey
      )
      .sort((a, b) => (b.data.date || 0) - (a.data.date || 0));
  });

  // Filter: get thread info for a page
  eleventyConfig.addFilter("threadInfo", function (byThread, threadId, currentUrl) {
    const thread = byThread[threadId];
    if (!thread) return null;
    const idx = thread.pages.findIndex((p) => p.url === currentUrl);
    return {
      label: thread.label,
      prev: idx > 0 ? thread.pages[idx - 1] : null,
      next: idx < thread.pages.length - 1 ? thread.pages[idx + 1] : null,
    };
  });

  // Filter: check if array includes a value
  eleventyConfig.addFilter("includes", function (arr, value) {
    return (arr || []).includes(value);
  });

  // Filter: limit array
  eleventyConfig.addFilter("limit", function (arr, count) {
    return (arr || []).slice(0, count);
  });

  // Filter: extract up to 2 distinct neighbor context colors from bridges array
  // Skips bridges that point to the same section as the current page
  eleventyConfig.addFilter("neighborColors", function (bridges, currentSection) {
    if (!bridges || !bridges.length) return [];
    const contexts = require("./src/_data/contextDefs.json");
    const sectionMap = {
      "streetlight": "Streetlight",
      "real-estate": "Real Estate",
      "third-places": "Third Places",
      "building": "Building",
    };
    const colors = [];
    for (const bridge of bridges) {
      const segment = (bridge.url || "").replace(/^\//, "").split("/")[0];
      // Skip same-section bridges
      if (currentSection && segment === currentSection) continue;
      const contextKey = sectionMap[segment];
      if (!contextKey) continue;
      const ctx = contexts.find((c) => c.key === contextKey);
      if (ctx && !colors.includes(ctx.color)) {
        colors.push(ctx.color);
        if (colors.length >= 2) break;
      }
    }
    return colors;
  });

  // Filter: resolve a URL to its section's context color
  eleventyConfig.addFilter("sectionColor", function (url) {
    const contexts = require("./src/_data/contextDefs.json");
    const sectionMap = {
      "streetlight": "Streetlight",
      "real-estate": "Real Estate",
      "third-places": "Third Places",
      "building": "Building",
      "now": null,
      "about": null,
    };
    // Extract the first path segment from the URL
    const segment = (url || "").replace(/^\//, "").split("/")[0];
    const contextKey = sectionMap[segment];
    if (!contextKey) return null;
    const ctx = contexts.find((c) => c.key === contextKey);
    return ctx ? ctx.color : null;
  });

  // Filter: extract section slug from a URL (first path segment)
  eleventyConfig.addFilter("urlSection", function (url) {
    return (url || "").replace(/^\//, "").split("/")[0];
  });

  // Filter: resolve page contexts array to context definitions (with color, label, etc.)
  eleventyConfig.addFilter("resolveContexts", function (pageContexts) {
    if (!pageContexts || !pageContexts.length) return [];
    const contexts = require("./src/_data/contextDefs.json");
    const results = [];
    for (const label of pageContexts) {
      const ctx = contexts.find((c) => c.label === label || c.key === label);
      if (ctx) results.push(ctx);
    }
    return results;
  });

  // Filter: fix permalink paths
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
