# Maison Krizsan V5.1 | Mobile Closing Layout Fix

**Purpose:** Center the mobile commission closing section and final site footer, preventing the mobile enquiry CTA/arrow from crowding the viewport edge. No desktop styles or copy changed. No motion effects have been added in this patch; they remain design options for review.

## Installation

Replace the existing `styles.css` at the root of the Maison website repository with the supplied `styles.css`. Do not delete existing images, videos, HTML files, scripts or policy pages. This patch is for the V5 site source; it is not a replacement for earlier V3/V4 releases.

## Code change

One final CSS block under `/* V5.1 | Mobile close */` applies only to screens up to 760px. Centers contact kicker, headline, explanatory paragraph, link, email row and notices. Sets mobile CTA font sizing and arrow gap with safe viewport fit. Centers the lower footer directory, stacked brand wordmark, and bottom utility row. Desktop styles unchanged.

## Verification

Automated adapted Chromium style tests at 320, 390, 440, 760 and 1440px on both the homepage and Work page: passed horizontal overflow and the mobile CTA-edge checks; headline horizontally centered. Visual screenshots saved separately. These tests used isolated HTML/CSS with local inline styles, which avoids a restricted local-navigation environment. Google Fonts were unavailable, so screenshots used fallback typefaces; repeat visual testing with the deployed Marcellus font on actual iOS Safari and Android Chrome. No live Cloudflare deployment performed.

## Larger improvements worth evaluating (not included in this patch)

1. Limit moving image treatment to 5–8 significant frames, approximately 3–4% push-in while scrolling; leave archive grid and lightbox static.
2. Make Work-page commission contact visible by the end of the first curated edit, not only after the full archive.
3. Replace the mailto-only commission channel with a tested, accessible, branded 4–5-field enquiry form, while retaining the email fallback. Do not claim it sends until the backend is connected and a round-trip is tested.
4. Resolve any live Cloudflare responses incorrectly returning HTML rather than image/webp. The PHP/HTML fallback problem is a separate release blocker; CSS changes cannot fix it.
