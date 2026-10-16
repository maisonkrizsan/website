# Maison Krizsan V5 — Update instructions

**Website repository:** `maisonkrizsan/website`. Connected GitHub access was read-only when last checked; this work has not been pushed.

## Recommended fast update
Use the **V5 CHANGES ONLY** ZIP in GitHub's root directory. Replace:

- `index.html`
- `work.html`
- `styles.css`
- `site-blueprint.json`
- `sitemap.xml`
- `README.md`

And add:

- `privacy.html`
- `terms.html`
- `accessibility.html`
- `QA_V5.md`
- `V5_COPY_AND_LEGAL_NOTES.md`
- `DEPLOY_V5.md`

No WebP, movie, manifest or JS files need to be re-uploaded to apply V5. Preserve `_redirects` and `_headers` from V4. The footer's `/work` link uses Cloudflare's clean HTML route. Don't re-add an inverse redirect that creates a loop.

## Verify on deployed site
1. Check original MP4 still plays at homepage with the original still behind it.
2. Check all three new policy URLs and their footer links (no 404 or HTML fallback).
3. Check large MAISON KRIZSAN footer on 390px and 1440px.
4. Confirm the inline CTA in What We Do opens `/#enquire`.
5. Confirm Enquire opens the intended email, then test that a real message reaches the inbox.
6. Ensure the earlier Cloudflare image/content-type failure has been resolved separately (image responses must actually be `image/webp`).
7. Review privacy representations against your actual live plugins, email provider, Cloudflare settings and business/legal details before treating as approved legal text.

**Note:** A simple static site does not inherently require a Terms of Service page or a cookie-consent banner. We include Terms for clarity of portfolio usage and enquiries, not as a claim of mandatory law. The privacy page is drafted to describe this shipped code only. No unverified company registration, fake client list, or fabricated legal promises.
