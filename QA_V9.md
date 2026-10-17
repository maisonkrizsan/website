# Maison V9 · Truthful release report

## Changes implemented
- Founder-led Studio section on homepage, between selected photography and commission services.
- User-provided black-and-white portrait optimized to 720px and 1200px WebP, retaining original crop/content. No AI alteration.
- Two independent observational photographic notes from original library: Batch 1 `destination-14` and Batch 2 `IMG_1647`.
- Studio navigation now targets `/#founder`; older `/#studio` anchor remains in the What We Do section.
- Work page links to the Studio after its early commission invitation.
- No fake named client commissions, film reel, awards, statistics or testimonials.
- All other V8 image, form, Turnstile, Resend, QA and media functionality preserved.

## Checks actually executed
- `python tests/site_health.py`: **796/796 checks passed**.
- `node --test tests/backend.test.mjs`: **14 mocked backend security tests passed**, no real mail sent.
- Isolated Chromium renders: homepage at 320, 390, 760, 1024, 1440 and 1920 pixels; new portrait and both original photographic-study images loaded; no horizontal overflow; no page errors.
- Additional homepage and Work regressions at 390/1440 pixels: new Studio anchors, homepage form presence, mobile menu open/close, Work photo gallery count, lightbox open/Escape close; passed.
- Visual comparison reviewed: full Studio at 390 and 1440; no headline truncation and considered image crops.

## Gated, not claimed to be done
- No push or deployment: connected GitHub token for `maisonkrizsan/website` is **read-only**.
- No true-font, real Safari/iPhone or live Cloudflare response test in this environment; isolated renders used fallback fonts.
- No public image/property publication permissions independently verified (the user supplied photographs and portrait).
- No real portfolio film, new client engagement, signed permission or testimonial exists in this release.
- Owner should still confirm V8 Turnstile settings, production image delivery and real enquiry routing after deployment.

## Release decision
**READY FOR PREVIEW DEPLOYMENT**, not production-approved until actual-device visual approval and live-site smoke tests pass.
