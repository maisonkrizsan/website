# MAISON KRIZSAN · The House / 2026

A complete, static, photography-led Maison Krizsan website built around the studio's original Marcellus wordmark and Manrope support type, restrained luxury editorial design, and **74 real client-supplied photographs** converted to 222 responsive WebP assets.

## Deploy

This package is the **site root**, not a framework project. Upload the contents of the ZIP to the root of your GitHub repository; then deploy using your existing GitHub Pages / Netlify / Vercel / static hosting workflow. `index.html` is the homepage and `work.html` is the continuous image archive. No package manager, Node build or API key is required.

- `index.html`: curated eight-frame selection, commissions, studio philosophy and real email CTA.
- `work.html`: all 74 photographs in four chronological-feeling visual chapters on **one page**, with click-to-enlarge dialog and keyboard arrows / Escape / touch swipe.
- `work-2.html`, `work-3.html`: legacy redirects to `work.html`.
- `assets/webp/batch-01` and `batch-02`: exactly 3 resolutions of each image, preserving prior batch paths.
- `styles.css`, `script.js`: design and interactions.
- `image-manifest.json`: original filenames, captions, alt text and responsive paths.
- `assets/maison-social.jpg`, `assets/favicon.svg`: real-photo social preview and simple neutral favicon.
- `sitemap.xml`, `robots.txt`: basic SEO support.
- `site-blueprint.json`, `QA_REPORT.md`: design decisions, testing and release limitations.

## Intentional art direction

- **Typography:** original Marcellus primary display / Maison Krizsan wordmark; Manrope navigation and small labels.
- **Color:** warm paper `#f7f5f0`, near-charcoal `#242520`, muted mineral gray-brown for accent, almost no decorative color.
- **Pacing:** a calm entrance, a single focused statement, asymmetric selected imagery, one dramatic photographic pause, concise services and a strong inquiry finish.
- **Archive:** image-first sequence with minimal captions. No falsely attributed paid hotel clients, invented testimonials, awards or 20-year claims. Captions describe the visible subject only.
- **Reference principle:** Aman's understated imagery, whitespace and experience-led editorial rhythm are inspiration, not a reproduction of Aman's branding, layouts or assets.

## How to update images

All paths are written in the HTML and mapped in `image-manifest.json`. Replacing an image requires supplying the matching `*-960.webp`, `*-1600.webp`, and `*-2560.webp` filenames, or changing the corresponding `<img>` `src` and `srcset` values. For a new photo, update the HTML and alt text; the archive viewer also uses `#photo-data` JSON embedded at the end of `work.html`.

**Do not** change existing filename paths unless you update all references. Preserve the three-resolution srcsets and their **actual pixel widths**.

## Inquiry

The primary commission CTA opens the visitor's configured email client with a prepared message to `studio@maisonkrizsan.com` (address already present on the prior Maison site). It is **not** a fake backend form; there is no third-party lead capture dependency. Confirm that this mailbox receives messages after deploying.

## Publishing checklist

1. Push/deploy the site root.
2. Visit `/`, `/work.html`, `/work-2.html`, `/work-3.html` on your real domain.
3. Send yourself a test message using **Begin a commission** and confirm its arrival.
4. Check Google Font loading (Marcellus and Manrope) in the deployed browser.
5. Confirm every photograph is owned/licensed for publication and property usages are permitted.
6. Test on physical Safari/iPhone and Chrome/Android devices (browser automation covers Chromium; see QA report).

No user tracking or analytics are enabled. This is intentional. Add them only with your consent/privacy requirements.
