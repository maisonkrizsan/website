# Maison Krizsan V4 | QA report

## Tested and passed
- The user-provided video is 10 seconds, H.264, 1280x720, 24 fps with AAC audio. Delivered optimization: H.264, 1280x720, silent, MP4 fast-start, ~1.8 MB.
- All 222 responsive WebP files from the V3 package decoded with Pillow; no failures.
- The still hero is in source markup and behind the progressive-enhancement video; remains present without JavaScript.
- 12 adapted Chromium render checks: home and Work at 320, 390, 768, 1024, 1440, 1920. Zero JS errors, zero horizontal overflow in tested first viewport, and cover images present.
- Home-page optimized MP4 played in adapted browser; successful videoWidth=1280, currentTime advances, video visible.
- On reduced-motion testing, video `src` remained unset; still photo loaded.
- On simulated video source failure, video stayed invisible and still photo loaded.
- Mobile menu open / Escape-close tested at 390.
- Work image viewer open / Escape-close tested at 390.
- Desktop and mobile hero, studio, services and enquiry screenshot review. Fixed cramped services and long CTA wrap on mobile.
- Existing real-photo gallery source order and image library retained.

## Test environment and limitations
- Ordinary http://127.0.0.1 and file:// navigation was blocked in the available Chromium environment by `ERR_BLOCKED_BY_ADMINISTRATOR`.
- Consequently, the visual / interaction checks were performed via Playwright `set_content` with CSS/JS embedded and authentic local media embedded as data URLs, not through a network-served site. **This is an adapted simulation, not proof that Cloudflare returns correct headers on the live domain.**
- Google Fonts could not be verified online; screenshots show fallback display type. Validate actual Marcellus/Manrope on deployment.
- No mobile-device hardware test, production Lighthouse, Core Web Vitals, real lead submission/inbox round trip or live video CDN test.
- The previously observed Cloudflare Content-Type problem for a Batch 2 WebP response is an open production issue; this package does not prove it fixed.
- Publication rights, property/client identity, film reel evidence and any commercial performance claims remain unverified.

## Release decision
**Ready for preview deployment, not production-certified.** Proceed to hosted media response QA and editorial acceptance before declaring the live site complete.
