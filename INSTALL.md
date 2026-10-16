# Maison V5.2 Motion Experiment — Install

**Previous delivery V5.1 was a footer CSS fix, NOT image animation.** This patch is actual image motion.

Replace exactly four root files in the current V5.1 project:
- `index.html`
- `work.html`
- `styles.css`
- `script.js`

Keep `assets/`, including all WebP folders and the hero video, unchanged. No dependencies. New opt-in attributes `data-cinema="slow"` mark exactly 6 images in each page. CSS and JS activate only with normal motion/data preferences and when images are near the viewport.

Testing: `QA_MOTION.md`, `test_results.json`, `test_extra_results.json`. `MAISON_SCROLL_MOTION_PROOF.mp4` is an actual browser-rendered short scroll capture with the selected photo tracked within its frame. Preview is for inspection only and is not uploaded to the site.

Production deployment not done. Existing unrelated Cloudflare image response issues still need separate verification.
