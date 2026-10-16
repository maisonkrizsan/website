# MAISON V5.2 MOTION PROOF — ACTUAL VERIFICATION

Status: Locally tested motion patch, NOT deployed. Source: V5.1 (including mobile footer alignment fix). No service-copy rewrites or new route/redirects.

## Passed in headless Chromium with isolated inline-asset harness
- Six opted-in images in Home and six in Work, all tagged in code.
- At 390 and 1440 pixels, scroll caused numeric changes in computed CSS transform on first opted-in photograph. Exact before/after transforms logged in test_results.json.
- No horizontal overflow or JavaScript page errors at 390 / 1440 in scroll tests, and at 320 / 760 / 1024 / 1920 in additional homepage checks.
- prefers-reduced-motion: reduce disabled effects (computed image transform `none`) in both pages.
- Simulated navigator.connection.saveData=true disabled motion in both pages.
- Work dialog opens, ArrowRight event handled, Escape closes (adapted browser check).
- Visual before/after screenshots at 390/1440 included.

## Testing limitations
- Local `http://127.0.0.1` navigation is blocked by the testing browser policy; the harness used Playwright `page.set_content` with inline CSS/JS and local WebP data URIs for selected images. These are adapted browser renders, not genuine hosted responses.
- Fonts fetched from Google CDN, Cloudflare headers/cache, real iOS Safari, physical mobile hardware, film playback and p75 web-vitals NOT reverified by this narrow patch.
- Motion effectiveness and actual conversion improvement have NOT been measured on users. No claim of either.
- If the user prefers stationary images, remove the opt-in data attributes and JS motion block; static content remains.

## Source file contract
Only overwrite these four root files in an existing V5.1 deployment: index.html, work.html, styles.css, script.js. DO NOT delete or relocate /assets/. This patch carries no WebP assets or video.
