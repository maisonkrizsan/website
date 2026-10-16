# MAISON KRIZSAN | V3 Curatorial Rebuild

Photo-led, editorial, static HTML/CSS/JS website. The V3 update corrects the photo hierarchy using the original **real** image archive, particularly Batch 1. No artificial hotel imagery.

## What to upload

Deploy the **contents** of this ZIP at the website's publish root. Keep `index.html`, `work.html`, `_redirects`, `styles.css`, `script.js` and `assets/` siblings. Upload the full `assets/webp/` tree: two batches, 222 responsive WebP files. Don't upload the ZIP inside an extra parent folder.

## Primary files

- `index.html`: homepage, Batch 1 photo 20 hero.
- `work.html`: continuous Work page, Batch 1 photo 7 hero, followed by strongest architecture; 74 distinct originals each displayed exactly once in Work including cover.
- `PHOTO_ORDER.json`: current picture selection and order by internal IDs.
- `image-manifest.json`: ID to actual source file path and alt text.
- `PHOTO_EDITORIAL_AUDIT.md`: evidence, aesthetic rationale and honest limitations.
- `QA_REPORT.md`: tested versus untested release gates.

## Route and asset safety

`/work` uses host clean-URL behavior for the `work.html` file. DO NOT add `/work → /work.html` redirects when using Cloudflare Pages. Legacy `/work-2` and `/work-3` redirect only to `/work`. Images use absolute paths such as `/assets/webp/batch-01/destination-20-1600.webp`, so clean URLs cannot change asset resolution.

Check production responses for `/`, `/work`, `/assets/webp/batch-01/destination-20-1600.webp`, `/assets/webp/batch-01/destination-07-1600.webp`, and a Batch 2 image. They must return actual HTML/WebP, not a 404 HTML fallback. The email link goes to `studio@maisonkrizsan.com` but delivery is not verified here.

## Next creative edit

Photo IDs in `PHOTO_ORDER.json` correspond to the 74 photographs shown in the `image-manifest.json`. To change any featured photo without rebuilding the website from scratch, a developer can replace the corresponding `<img>` element with the correct three source paths, or regenerate the sections from the manifest. Maintain truthful provenance and responsive widths.
