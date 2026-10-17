# Maison V8 — Release gates and red-team report

## Verified in this container (not on Cloudflare)

- **787/787 static source checks** passed: 222 WebP file signatures, required files, 74-item photo manifest, page source and local asset references.
- **14 backend tests** passed, using mocked Turnstile and Resend: legacy Resend flow, valid/invalid/expired-equivalent challenge paths, missing token, wrong hostname/action, provider failure, incomplete credential configuration, invalid form data, and honeypot handling. **No real email was sent in these tests.**
- **30 browser layout checks** across six pages × 320/390/768/1440/1920 widths, rendered from actual HTML/CSS in isolated Chromium. No horizontal overflow, uncaught JavaScript errors or missing H1s observed.
- **4 mocked browser form tests**: both homepage and standalone form successfully submitted with challenge disabled, and both submitted with a simulated Turnstile widget/token. None is an actual Siteverify or Resend delivery test.
- Original photographs, video, editorial order, Work page and the existing lightbox preserved.

**Testing limit:** Browser sandbox blocks normal site navigation. Isolated browser screenshots substitute data-URI images for early photographic frames, use fallback system fonts, and cannot certify network delivery, real browser Lighthouse scores, Cloudflare deployment, third-party widget delivery, or real physical-device behavior.

## Production gates: OPEN / UNKNOWN until checked

| Gate | Owner check | Passing evidence |
| --- | --- | --- |
| Git deploy | GitHub + Cloudflare | New commit hash matches the active Pages production deployment |
| No lost leads | Website + Zoho + Resend | Submission on homepage and /enquire reaches Zoho and reply addresses prospect, with a visible confirmation |
| Bot protection | Cloudflare Turnstile | Both keys set, Siteverify enforces hostname/action; invalid tokens rejected without mail |
| Media reliability | Hosting/CDN | `python tests/site_health.py --live https://maisonkrizsan.com` passes, plus full gallery scroll on desktop and iPhone |
| Core Web Vitals | Field analytics | 75th-percentile LCP <=2.5s, INP <=200ms, CLS <=0.1 on mobile and desktop, after enough data exists |
| Motion and accessibility | Physical devices | iPhone Safari, desktop Safari and Chrome; navigation, focus/keyboard lightbox, accessible form labels, reduced-motion behavior |
| Analytics and funnel | Cloudflare/Zoho | Cloudflare Web Analytics enabled and valid; one accepted form email logged as an opportunity in lead sheet |
| Search visibility | Google Search Console | Domain verified, sitemap accepted, pages eligible for indexing |
| Publication rights | Owner | Actual rights for every shown photo/video confirmed; no false implied client commissions |
| Credibility | Owner | Authentic owner photo/bio and any case studies/credits approved by rights holders |
| Film proof | Owner | Genuine film sample provided before implying an animated photo demonstrates filmmaking skill |
| Legal text | Owner/legal review | Privacy, Terms and Accessibility reflect actual live analytics/Turnstile/email processing and rights |

## Issues worth fixing only with new evidence

- **No verified live web-vitals numbers**: do not claim a Lighthouse or Core Web Vitals score from local static tests.
- **No verified film reel or commissioned case-study data in the supplied library**: do not invent it; request real work/credits before presenting it as proof.
- **Cloudflare Web Analytics does not support custom events as of the checked documentation**: traffic + Resend event logs + lead-outcome CSV form the initial measurement stack. A more advanced event pipeline is a later decision only if traffic warrants it.
- **Form abuse protection remains unenforced until the owner enters both Turnstile keys and redeploys**.
- **Repository read-only access** from this chat: changes packaged, not pushed.

## Stop condition

Do not redesign the hero, add decorative animations, or create more service pages before the verified gates are met and real buyer objections justify changes.
