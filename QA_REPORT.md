# MAISON KRIZSAN | V3 Evidence-based QA report

**Release status: design iteration packaged for preview, NOT a verified live deployment.**

## What changed and why

- Replaced weak homepage hero (fireplace) with Batch 1 sunlit chandelier rotunda / monumental atmospheric light (`destination-20`).
- Replaced weak Work hero (arched window) with Batch 1 sculptural chandelier and double arched windows (`destination-07`).
- Recurated first impression to place architectural scale, coastal context, dusk arrival and modern sculptural forms before generic room/detail imagery.
- Kept every original photograph exactly once on the Work page, including cover, and preserved all 222 responsive WebP variants.
- Kept explicit photography / film / visual direction copy and direct email inquiry; no invented property/client names.
- Kept corrected host-relative paths and avoided the inverse `/work` redirect that caused a Cloudflare Pages loop.

## Actual passed checks

- **Static**: every image `src` and `srcset` destination referenced in homepage and Work exists inside the package. Descriptors match WebP actual pixel widths. 74 unique Work images represented: one Work cover and 73 interactive gallery elements. The archive remains on one page.
- **Visual**: actual Chromium screenshots reviewed for homepage hero at 390×844 and 1440×900, selected images in the viewport, first Work image, first Work pair, and **final Work hero** at 390×844 and 1440×900. Visual evaluation is editorial judgment, not owner approval.
- **Browser layout**: no horizontal overflow and no JavaScript page errors in the adapted browser test at 320, 390, 768, 1024 and 1440 for homepage and Work, and 1920 for homepage. V3 full Work at 1920 was **not completed**, due to test harness timeout/memory overhead.
- **Final Work build browser interaction**: at 390 and 1440, the new cover image decoded; lightbox opened, ArrowRight changed image, Escape closed and focus returned to its opener. The mobile menu opened/closed via Escape. No JavaScript page errors in the tested scenarios.
- **Routing/static**: examined `_redirects`; no `/work → /work.html` inverse. All references point from domain root (`/assets/..`, `/styles.css`, `/script.js`); legacy `work-2` / `work-3` targets normalized to `/work`.

## Limitations that matter

- **Direct browser HTTP and file navigation** were blocked by this execution environment. Browser screenshots and interactions used actual HTML/CSS/JS with the local original WebP bytes embedded as data URLs. This is an adapted browser test, not a live-host test. On-screen typography used the available serif/sans fallback; Google-hosted Marcellus/Manrope could not be verified over network here.
- **Real host not verified**: URLs, actual Cloudflare/Netlify routing, uploaded `assets/` completeness, MIME types, cache behavior, DNS, forms/mailbox and analytics require preview/live deployment.
- **Performance not verified**: no real-host LCP, INP, CLS, mobile network throttling or real device screenshots. Fetch priority and lazy loading inherited from baseline; no claimed Web Vitals.
- **Rights/provenance not verified**: no verified named-property client engagements, publication rights, commissioned history or a proof film reel in the source files.
- **Art direction**: strongest available images selected after human-style visual review; owner aesthetic approval remains open. We cannot responsibly describe it as perfect or production-ready without that external acceptance.

## Shipping checklist

Deploy the entire ZIP contents at the host publish root, not nested under another folder. Verify `/`, `/work`, `/assets/webp/batch-01/destination-20-1600.webp`, `/assets/webp/batch-01/destination-07-1600.webp` and `/assets/webp/batch-02/IMG_1494-1600.webp` return HTML or actual `image/webp` as expected. Then review with Google Fonts loaded at desktop/mobile, click every navigation link, and confirm contact email delivery. Re-run real-host performance checks and review copyright permissions before replacing the current production site.
