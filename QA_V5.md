# MAISON KRIZSAN V5 — Verification and release gates

**Status:** Packaged for GitHub preview; NOT live-deployed or certified production-ready. 16 October 2026.

## Changes verified in source
- Hero video and original real photo fallback unchanged from V4. Location microcopy removed from homepage hero. Location and availability remain in footer.
- What We Do heading now states the offering explicitly; commercial-use body copy and `Discuss a commission` CTA point to the existing inquiry section.
- Services, commission process, and closing copy rewritten for buyer clarity. The project enquiry still uses a prefilled mailto link, not a fictitious contact backend.
- Footer navigation and statement wordmark integrated into Home and Work; privacy, terms and accessibility pages created and linked from both.
- `sitemap.xml` updated with all five routes.
- No image names or publication attributions invented.

## Tests actually completed
- Static file audit: **222/222 WebP files found**, existing MP4 present, HTML references resolve within ZIP, all internal URLs resolve in file tree, no `href="#"` placeholders.
- 6 viewport widths **320, 390, 768, 1024, 1440, 1920** on both Home and Work in adapted headless Chromium render.
- No horizontal overflow, including corrected 320px inquiry CTA; no page JavaScript errors in adapted renders.
- Home hero, services, inquiry and footer screenshots inspected at 390 and 1440. Desktop logo occupies the width in one line; mobile logo stacks.
- Mobile nav open/close/Escape. Work gallery dialog open, Next via arrow key, Escape close, focus return. Gallery retains 73 inline images plus hero.
- Three legal/information pages rendered at 390, correct headings, working HTML links in package, no overflow.

## Important limitations
- Local browser sandbox blocked **all normal HTTP and file URL navigation** (`ERR_BLOCKED_BY_ADMINISTRATOR`). Playwright screenshots were created with `set_content`, locally embedded styles/scripts, and the authentic photo/video assets as available. They show CSS layout and interactions, **not successful CDN/network hosting** or the final Google-hosted Marcellus font rendering. Network delivery and embedded image retrieval are not certified.
- The existing production Cloudflare behavior returning `text/html` for some WebP requests is **NOT fixed or tested** by this copy/footer revision. That deployment bug requires separate resolution.
- No legal counsel has reviewed the privacy, terms or accessibility content. Their descriptions must be reconciled with actual hosting/CDN, email handling, analytics/cookies, and licensing practices before publishing.
- Actual qualified enquiries, live mail delivery, measured conversion uplift, full gallery lazy loading on production, field Core Web Vitals, physical iOS/Android, and image rights remain unverified.

## Release criteria
Preview deploy → check 390 and 1440 font/layout → verify `/`, `/work`, `/privacy.html`, `/terms.html`, `/accessibility.html`, MP4 and both WebP batches via real response Content-Type → send and receive inquiry email → owner/legal review → publish.
