# MAISON V6 — Verification report

Date: 16 October 2026. Local implementation only. No claim of production readiness.

## Source observations
- User-provided screen recording duration: 11.7 seconds at 3024 × 1964. The V5.2 motion had continuously varying image zoom, producing little coherent visible movement within the fixed gallery layout.
- V5.2 motion code used a scroll-driven requestAnimationFrame loop to update `--maison-zoom` and `--maison-drift` on up to six images per page.
- Official Framer Scroll Transforms/Scroll Speed tutorials and Motion's scroll-linked documentation informed an alternative: move an oversized photo inside a clipped frame, using the frame's viewport progress as its timeline. Paired photos reveal gently, once as they enter.

## Implementation and fixes
- Removed V5.2 scroll event/RAF mutation loop.
- Implemented CSS `view-timeline-name` on image **frame** and `animation-timeline` on the photo. Initial attempt used `animation-timeline: view()` on the image and remained visually stationary because overflow clipping became the nearest scroll container. Caught with actual computed transform test and fixed.
- Verified first Work cinematic image transforms changed from `translateY ≈ 0px` to `translateY ≈ +12.1px` over a 480px scroll at 1440px. A separate nine-position test confirmed an approximately −23.5px to +23.5px bounded range during its complete viewport passage, with a fixed 1.105 overscan.
- Mobile uses smaller overscan/drift; static fallback if CSS ScrollTimeline unsupported. Reduced-motion test computed `animationName: none`.
- Video hero unchanged and still has authentic photographic fallback.
- Work invitation after cover and midway through opening work, to `/enquire`.
- Dedicated accessible form with direct email alternative. Cloudflare Pages Function is fail-closed when RESEND keys missing and never claims completion after a failed provider request.
- Updated privacy language to disclose on-site forms and possible email-delivery provider. Changed WebP cache response policy to short-lived revalidation (live CDN cache purge still separate).

## Browser layout and interaction tests
- Isolated Chromium `page.set_content` with inline original CSS/JS and embedded genuine WebPs (not a real hosted website).
- Pages: Home, Work, Enquire; widths 320, 390, 768, 1440, 1920 = 15 combinations. No measured document horizontal overflow or JS page exceptions.
- Work lightbox open and Escape close passed at 390px.
- Enquire form validation and unconfigured send fallback passed at 390px.
- Reduced motion static imagery confirmed at 1440px.
- Actual scroll-linked transform progression confirmed after fixing view timeline scope.
- API mocked tests passed: unconfigured=503, invalid=400, accepted=200, rejected=502. No real Resend account/network call made.

## Not yet verified
- Actual font-host rendering and mobile physical Safari (older Safari may show static imagery).
- Cloudflare Pages Functions deployed from GitHub and configured with RESEND secrets.
- Receipt of an actual project enquiry (must be manually tested end to end).
- Real user/perceived motion quality, actual conversion lift, full photo CDN HTTP responses, p75 field Web Vitals, legal compliance and photo rights.
- All 74 images loading when the real site is served. Prior production issue remains a separate release gate.

## Release verdict
**Locally tested build / not approved for production** until the Cloudflare function, email, WebP MIME responses, actual font rendering and buyer acceptance gates pass.
