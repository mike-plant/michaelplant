// vCard for "Save to contacts" (/mike.vcf). vCard 3.0 for the widest iOS/Android support.
class VCard {
  data() {
    return { permalink: "/mike.vcf", eleventyExcludeFromCollections: true };
  }
  render({ site }) {
    const esc = (s) => String(s || "").replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\;");
    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${esc(site.lastName)};${esc(site.firstName)};;;`,
      `FN:${esc(site.author)}`,
      `NICKNAME:${esc(site.nickname)}`,
      `TEL;TYPE=CELL,VOICE:${site.phoneE164}`,
      `EMAIL;TYPE=INTERNET:${site.email}`,
      `URL:${site.url}`,
      `ADR;TYPE=HOME:;;;${esc(site.city)};${esc(site.region)};;USA`,
      `NOTE:${esc("We met — michaelplant.com")}`,
      "END:VCARD",
    ];
    return lines.join("\r\n") + "\r\n";
  }
}
module.exports = VCard;
