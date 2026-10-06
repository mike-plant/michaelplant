// vCard for "Save my contact" (/mike.vcf). vCard 3.0 for the widest iOS/Android support.
const fs = require("fs");
const path = require("path");

// Fold long lines at 75 octets per RFC 2426 (continuation lines start with a space).
function fold(line) {
  const out = [];
  while (line.length > 75) {
    out.push(line.slice(0, 75));
    line = " " + line.slice(75);
  }
  out.push(line);
  return out.join("\r\n");
}

class VCard {
  data() {
    return { permalink: "/mike.vcf", eleventyExcludeFromCollections: true };
  }
  render({ site }) {
    const esc = (s) => String(s || "").replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\;");
    const photoPath = path.join(__dirname, "..", "assets", "img", "vcard-photo.jpg");
    const photo = fs.existsSync(photoPath) ? fs.readFileSync(photoPath).toString("base64") : "";
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
      photo ? `PHOTO;ENCODING=b;TYPE=JPEG:${photo}` : null,
      "END:VCARD",
    ].filter(Boolean);
    return lines.map(fold).join("\r\n") + "\r\n";
  }
}
module.exports = VCard;
