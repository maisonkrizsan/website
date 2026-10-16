# Maison Krizsan: emergency deployment correction (2026-10-16)

## Root causes addressed

1. Removed the redirect loop: the previous `_redirects` file pointed `/work` back to `/work.html`, while Cloudflare Pages natively redirects `/work.html` to `/work`.
2. Converted site media, script, icon and CSS references to root-absolute paths (e.g. `/assets/webp/batch-02/IMG_1494-1600.webp`). This prevents assets resolving against `/work/` on hosts that add trailing slashes.
3. Retained the 222 real responsive WebP variants and all 74 photographs.

## Deployment invariant

**The contents of this ZIP must be deployed at the website's publish ROOT.** `index.html`, `work.html`, `_redirects`, `styles.css`, `script.js`, and the `assets/` directory must be siblings. Avoid nested copies such as `/MAISON_KRIZSAN_V2_DEPLOY_HOTFIX/assets` or a second `/batch-02` at repository root.

These sample URLs should respond with HTTP 200 and `Content-Type: image/webp`:

- `https://maisonkrizsan.com/assets/webp/batch-02/IMG_1494-1600.webp`
- `https://maisonkrizsan.com/assets/webp/batch-02/IMG_0816-1791704243-1600.webp`
- `https://maisonkrizsan.com/assets/webp/batch-02/IMG_1250-1791706031-1600.webp`

Routes: `https://maisonkrizsan.com/` (200), `https://maisonkrizsan.com/work` (200), `https://maisonkrizsan.com/work.html` (one redirect maximum to `/work`, then 200 on Cloudflare).

## Verification boundary

This package was verified offline and via a local HTTP server. The live host is not accessible to this environment, so production image paths and redirect behavior have not been confirmed after deployment. A full deploy with all assets is still required if the host is missing them. There are no invented placeholder photographs.
