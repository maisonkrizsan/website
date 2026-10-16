# Deploy V7 on top of V6

Use `MAISON_KRIZSAN_V7_CHANGES_ONLY.zip` to replace files **at the repo root**, without creating an extra folder.

Modified: `index.html`, `styles.css`, `enquire.html`, `work.html`, `site-blueprint.json`.
Included again so the setup is complete: `enquire.js`, `_routes.json`, `functions/api/inquiry.js`.

Homepage `#enquire` now contains the complete form. Homepage navigation and CTAs point to the in-page section; Work still points to the standalone `/enquire` URL. This is intentional and not a redirect loop.

Host: Cloudflare Pages with Functions support. Verify the deployment logs show `functions/api/inquiry.js` included. Set project secrets `RESEND_API_KEY` and `RESEND_FROM`, with a sender/domain verified in Resend. Optional `INQUIRY_TO` defaults to `studio@maisonkrizsan.com`. Do not publish keys in GitHub. A live test should verify the message was received, not just that the API responded 200.

If email integration is not configured, the form provides a prefilled `mailto:` alternative. This is not equivalent to a working server-submitted form.

Verify `https://maisonkrizsan.com/#enquire` and `https://maisonkrizsan.com/enquire`, including mobile and desktop, plus a direct WebP HTTP request to ensure images still return `image/webp` rather than cached HTML.

The user account linked to this conversation currently has read-only permission on `maisonkrizsan/website`; no push or production deployment has been performed.
