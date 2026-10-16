# Maison Krizsan | Editorial rebuild V2 | QA & release state

**Status: staged build / pending final visual and live deployment gates.** No claim of production approval.

## What changed

- Replaced the prior coastal-residences homepage hero with source image 39 (warm, firelit interior), chosen after a five-image, two-breakpoint hero comparison.
- Replaced the Work cover with source image 47 (arched interior).
- Re-edited the top homepage photographic story around architecture, interior atmosphere, lighting, distinct spatial subjects and crop survival.
- Kept original Marcellus/Manrope identity and real source photos. No generated portfolio imagery.
- Added explicit audience and offer language immediately in the hero, and substantive copy about photographic coverage, film, visual direction, intended uses and what the project conversation includes.
- Preserved all 74 distinct original photographs on one continuous Work page (one cover + 73 gallery items).
- Kept archive numbers, file IDs and labels off the public page. Removed `Explore all 74 photographs`.

## Observed tests (adapted browser environment)

- Chromium/Playwright render with the genuine 960px WebP imagery embedded in HTML, CSS and JS at **320, 390, 768, 1024, 1440, 1920px**, homepage and Work. **12/12** widths reported no horizontal overflow, no JS page errors, and full-height cover geometry.
- At **390px**, mobile menu open / Escape close passed. Work lightbox opened, next image responded to ArrowRight, Escape closed and focus returned to opener.
- At 390px and 1440px, actual viewport screenshots of hero, first gallery, services, studio copy, process, and contact were captured and manually reviewed. The new hero's wordmark and description remain readable over an actual photograph at both widths. Side-by-side proofs of five hero alternatives are included.
- All **222 responsive WebP files** parsed with Pillow's image validation, and the markup's srcset width descriptors matched actual image widths; zero missing declared source assets.
- Work HTML has 73 gallery buttons with 73 unique source images; plus one distinct cover = 74 source originals represented once.
- Existing keyboard lightbox and mobile menu code is preserved. Native scroll and reduced-motion CSS remain in place.

## What was not proven

- The **end-to-end complete lazy-scroll browser check** of the entire V2 Work archive exceeded the automated test time window; all file existence/decoding and declared widths were verified independently. A complete Work-page native scrolling check remains to be repeated before calling it production-approved. (The earlier site's complete-gallery scroll passed, but that is not proof of V2 performance.)
- This adapted Playwright browser environment cannot reach normal HTTP/HTTPS host dependencies. **Google Fonts were not loaded** during screenshot capture, so the rendered review uses the CSS fallback serif and sans fonts. The actual Marcellus visual effect on a live host is a release gate, not a pass.
- Live mailbox delivery was not tested; `mailto:` target is `studio@maisonkrizsan.com` as specified in the original source. DNS/mail provider delivery must be confirmed separately.
- Live hosting, actual mobile iOS/Android, responsive data-transfer/network timings, real-world LCP/CLS/INP and cross-browser visual metrics are not yet verified.
- Image usage rights, client/property attributions and film samples are not independently evidenced. No fake credits were added.

## Red-team critique still open

The photography is stronger, but the existing library still mixes architecture commissions, travel views and some weaker detail photographs. The first edit now places stronger hospitality imagery up front, but a property-specific series with verified provenance would outperform the archive-style grouping. The Marcellus rendering and actual owner visual approval remain blocking aesthetic criteria. The clearest proof deficit is **film**: the site describes film service, but no playable film sample exists in supplied assets. Add real film evidence when available rather than inventing a reel.

## Next release action

Deploy the contained root-level files and `assets/` directory to a **preview URL**, compare true-font desktop and mobile screenshots, review the entire native Work scroll and source-image publication rights, and check that an enquiry email arrives. Publish to the live domain only after those checks pass.
