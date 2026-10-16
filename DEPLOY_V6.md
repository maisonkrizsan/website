# DEPLOY V6 — ACTION REQUIRED

## 1. Site files

Prefer the **V6 changes-only ZIP** when updating an existing V5.2 repo, as it does not re-upload the photo library. It includes `index.html`, `work.html`, `enquire.html`, `styles.css`, `script.js`, `enquire.js`, the new `functions/api/inquiry.js`, `_routes.json`, `_headers`, `privacy.html`, `terms.html`, `accessibility.html`, `sitemap.xml`, and `site-blueprint.json`.

Do **not** upload only the HTML files. Do not delete `assets/`. The video remains at `assets/video/maison-hero-v1.mp4` in the original V4/V5 package.

## 2. Confirm Cloudflare Pages deployment mode

Cloudflare Pages Functions are deployed from the root `functions/` directory when connected to a Git repository (or deployed through Wrangler). Cloudflare documentation states dashboard drag-and-drop Direct Upload does not support Functions. If you're not on Git-connected Pages/Workers or if your output directory is different, this specific server handler will not deploy automatically. Confirm the platform before assuming it works.

## 3. Connect the form to actual email delivery

- Create a Resend account and verify your chosen sending domain via the required DNS records.
- Add **encrypted environment secrets** in Cloudflare Pages project settings for Production (and Preview if testing):
  - `RESEND_API_KEY` = a private API key. **Never put it in GitHub**.
  - `RESEND_FROM` = an address on your verified sending domain (for example `Maison Krizsan <commissions@maisonkrizsan.com>` ONLY if that sender has been verified).
  - `INQUIRY_TO` = `studio@maisonkrizsan.com` (or the inbox you actually monitor).
- Redeploy after saving environment values.
- Confirm `GET /api/inquiry` responds with the API's JSON 405 rather than the site HTML. This proves the Function is deployed.
- Submit a real project test, verify it reaches the intended inbox, reply to it, and check spam delivery. Test a failed-send condition too; the form must show the email alternative, never a false success.
- Use Cloudflare WAF rate limiting or Turnstile if spam appears. The bundled code includes a honeypot and validations, but they are not a substitute for mature bot protection.

**Until those steps pass, prospective clients can use the direct `mailto:studio@maisonkrizsan.com` option on the enquiry page.** The main form will safely refuse to confirm an unconfigured send.

## 4. Cloudflare image issue

Separate from this V6 release: earlier production DevTools screenshots showed **HTTP 200 `text/html`** returned for a WebP image request instead of `image/webp`. If that still occurs, inspect the Cloudflare route/asset deployment and purge contaminated cache entries. The V6 `_headers` changes WebP caching from one-year `immutable` to one-hour `must-revalidate` for easier future updates. This change is not proof the old cached responses were purged.

## 5. Release gate

Verify on the *live URL*: `/`, `/work`, `/enquire`, privacy pages, the actual MP4, and selected `batch-01`/`batch-02` WebPs (response content-type `image/webp`). Inspect 390/1440 screenshots with the real Marcellus font on actual browsers. Test reduced motion. Confirm no failed image requests, form delivery and receipt, menu, lightbox, links and mobile overflow. Privacy and terms language still require verification against actual data-handling practices and legal review.

**GitHub repository permissions in this session: read-only. No live changes were pushed.**
