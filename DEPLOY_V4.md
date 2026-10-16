# Maison Krizsan V4 | deployment

**Current status: local implementation and adapted Chromium checks complete. Live deployment not performed.**

## Fastest update
Use `MAISON_KRIZSAN_V4_CHANGES_ONLY.zip`. Preserve paths when copying into the root of `maisonkrizsan/website`:
- `index.html`
- `work.html`
- `styles.css`
- `script.js`
- `site-blueprint.json`
- `_headers`
- `assets/video/maison-hero-v1.mp4`
- supporting documentation

The 222 existing WebP assets do not change; do not reupload them to deliver this update. Their source paths remain `/assets/webp/batch-01` and `/assets/webp/batch-02`.

If your host deploys from GitHub, commit the updated files to `main` and allow the hosting deployment to complete. The connected GitHub account available to the assistant has read-only permissions on `maisonkrizsan/website`; these changes have **not** been pushed.

## Video behavior
- Real V3 hero still remains behind the video as fallback.
- Optimized, muted H.264 MP4 at `/assets/video/maison-hero-v1.mp4` (about 1.8 MB; original ~3.9 MB).
- JavaScript initiates playback only for motion-capable, visible pages with no data-saver preference.
- If the video fails to load or play, the still photo remains visible.
- Users with reduced-motion preferences see the still photograph without fetching the MP4.
- This motion treatment comes from the **same existing still photo**. It should not be presented as proof of a commissioned property film.

## Live validation before release
1. Check homepage at 390px and 1440px: video visibly moves and the wordmark, service line and CTA remain legible.
2. In Network inspect `/assets/video/maison-hero-v1.mp4` and ensure `200 OK`, `Content-Type: video/mp4` (or a valid media type), and a video response rather than HTML.
3. Check image paths such as `/assets/webp/batch-02/IMG_1566-2560.webp`; must return `image/webp`. **Previous production observations included Cloudflare returning cached `text/html` as 200 for WebP paths; this has not been repaired or live-tested here.** Purge stale Cloudflare image responses when needed. The adjusted `_headers` will prevent year-long browser caching after deployment but alone does not evict already-cached bad responses.
4. Verify `/work` and all navigation targets, mobile menu, photo dialog, responsive images, reduced-motion still image, and Mailto target on actual hosted devices.
5. Check network performance. Field Web Vitals are not available in this local environment. Ensure permissions to publish all media.

## Change history
- Copy and CTA language rewritten around property owner decision-making and clear deliverables.
- Navigation named Studio / Work / Services / Enquire.
- Video introduced as opt-in progressive enhancement over the authentic photo.
- Mobile service and enquiry layouts corrected after screenshot review.
- Work intro clarified while keeping the photo sequence and viewer unchanged.
- WebP cache directives changed from one-year immutable to one-hour revalidation; new video has its own cache header.
