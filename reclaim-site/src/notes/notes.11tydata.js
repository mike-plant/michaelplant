// Articles ("notes"): the longer version of a Fix or Leave It post.
// Add a .md file here with title, date, service (porches | trim-and-rot | stairs-and-railings), and description.
// Files with `draft: true` don't build.
module.exports = {
  layout: "layouts/note.njk",
  tags: ["notes"],
  eleventyComputed: {
    permalink: (data) => (data.draft ? false : `/notes/${data.page.fileSlug}/`),
    eleventyExcludeFromCollections: (data) => !!data.draft,
  },
};
