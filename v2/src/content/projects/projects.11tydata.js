// Reclaim's interim page. When site.reclaimSite is set, this page stops building
// and _data/redirects.js sends /projects/ to the Reclaim site instead.
module.exports = {
  eleventyComputed: {
    permalink: (data) => (data.site.reclaimSite ? false : "/projects/index.html"),
  },
};
