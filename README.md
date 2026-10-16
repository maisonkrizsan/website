# MAISON KRIZSAN | Editorial rebuild V2

Static HTML/CSS/JS photography and film studio website. Root-level GitHub/Netlify-ready project. Keep all files and `/assets/` together when deploying. `index.html` is the homepage and `work.html` is one continuous photography collection. The two legacy work URLs redirect to the single gallery.

**Designed around the real provided image library:** 74 distinct photographs, 222 WebP variants in `assets/webp/batch-01` and `assets/webp/batch-02`.

## Files

- `index.html`, `work.html`: final authored pages.
- `styles.css`, `script.js`: design and accessible interaction.
- `image-manifest.json`: 74 real image IDs, paths, responsive variant filenames and alternative text; file IDs are not publicly displayed.
- `PHOTO_EDITORIAL_AUDIT.md`, `PHOTO_EDIT_DECISIONS.json`: editorial selection reasoning, hero alternatives and ordering.
- `site-blueprint.json`: creative and delivery facts, assumptions and open release gates.
- `QA_REPORT.md`: honest verified/untested QA state.
- `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`, `assets/`: deployment infrastructure and visuals.

## Preview

Run `python3 -m http.server 8080` in this directory, then open `http://localhost:8080/` locally. No build step, CMS, tracking or external JS libraries required. The primary CTAs open an email to `studio@maisonkrizsan.com` (actual inbox receipt not independently tested). Font stylesheet loads Marcellus and Manrope via Google Fonts, with fallback typefaces if unavailable.

## Before deployment

Confirm image rights, true-font appearance on deployed host, full native Work scroll and mobile-device behavior, email receipt and site performance. The real source photo archive has **no verified accompanying film reel**; service description should not be mistaken for an existing film portfolio.
