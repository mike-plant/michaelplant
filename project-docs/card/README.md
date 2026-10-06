# Calling card

## ⚠️ The original print file's QR does not scan

`MICHAEL_PLANT_2.pdf` (the designer file) has two problems on the back:

1. **The QR is clipped.** The PDF draws the QR image inside a clipping box narrower than the image, so the right ~16% of the code is cut off on the printed card. A render of the card back doesn't decode at any resolution (150–600 dpi). Only the raw embedded image decodes.
2. **It encodes a contact card, not a URL.** The data is a vCard (name, cell, "Lakewood, OH"). No website, no email, it can't be updated after printing, and there's no way to know who scanned it. The BRD calls for a permanent URL.

## Corrected file

`MICHAEL_PLANT_card_url-qr.pdf` is the same design with the back QR replaced by a complete code for **https://michaelplant.com/connect**: ink color #1f1c18, 1.17 in square, full quiet zone inside the border. Verified to decode at 150 and 300 dpi. The front is unchanged.

That page offers "Save my contact" (with the engraved portrait as the contact photo), so people still get the one-tap contact save, plus your site.

Also here: `connect-qr.svg` / `connect-qr.png` (black, standalone) if the printer wants the code on its own.

## Before ordering
1. Deploy the site so `/connect/` is live.
2. Get a **printed proof** and scan it with an iPhone and an Android phone.
3. Don't let the printer or any tool restyle the code.
