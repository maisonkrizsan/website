# Maison Krizsan V11 / Consolidation QA

## Changes
- Removed additional `/commission` marketing page and related PDF from the distributable website.
- Moved the two useful project scopes inside the existing `How a commission works` section; no extra standalone formats section.
- Replaced unclear hero line with `Photography & film for hotels, residences and destinations.`
- Removed promotional links to `/commission` from footer and Work page; Work links to `/enquire`.
- Added static Cloudflare Pages redirects from the former portfolio paths to the merged section.

## Automated source checks
- `python tests/site_health.py`: 800/800 passed (222 WebP variants, 74 originals, page and asset references).
- `node tests/backend.test.mjs`: 14/14 passed with mocked service responses, preserving Resend and optional Turnstile behavior.

## Adapted browser tests
- 21 responsive render checks at widths 320, 390, 440, 768, 1024, 1440 and 1920, for home, Work and Enquire.
- Zero observed horizontal overflow, JavaScript page errors or obsolete `/commission` links.
- Verified exactly one homepage process section and one homepage form, clear new hero wording, and existing Work enquiry links.
- Mobile menu open/close, Work lightbox open/close, and browser-mocked enquiry success passed.
- Screenshots were captured in isolated Chromium with fallback fonts; actual Marcellus rendering and real service workers/Cloudflare routing were NOT certified.

## Remaining live release tests
1. Deploy new files and remove old `commission.html` plus `assets/maison-commission-portfolio.pdf` from GitHub.
2. Check `/commission` and `/commission.html` redirect to `/#ways-to-work` without loops.
3. Inspect actual mobile Safari and desktop Chrome/Brave for font and layout consistency.
4. Confirm all formerly broken image variants respond `image/webp`, not `text/html`.
5. Send a real production enquiry to `studio@maisonkrizsan.com` and verify receipt.

## Operational note
Prior separate `/enquire` page remains intentionally available to visitors coming from Work, while the homepage contains the full enquiry form. No new form endpoints or credentials are introduced.
