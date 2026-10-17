# Deploy Maison V10 to GitHub + Cloudflare Pages

**No new secrets are required.** Preserve existing Resend production configuration and Cloudflare Pages Functions in the repository.

1. In the connected `maisonkrizsan/website` repository, apply the contents of the V10 changes-only ZIP **at repo root**, preserving `assets/`, `.github/`, and `tests/` paths. The full ZIP is a backup and alternate deployment source.
2. Check changed files before commit: `index.html`, `work.html`, `commission.html`, other footer-enabled HTML pages, `styles.css`, `sitemap.xml`, `site-blueprint.json`, `README.md`, test script, and the PDF in `assets/`.
3. Commit to the production branch only after reviewing the changes. Cloudflare Pages should automatically build via Git integration. Do not use Cloudflare drag-and-drop for a repo containing Pages Functions.
4. Verify these routes return HTML with HTTP 200: `/`, `/work`, `/commission`, `/enquire`. Verify `/assets/maison-commission-portfolio.pdf` returns **application/pdf** and downloads correctly.
5. Check `https://maisonkrizsan.com/#enquire` opens the embedded form and that all `/commission` links work from homepage, Work, and footer.
6. Test the complete mobile and desktop site on physical Safari/Chrome, including real photographs (especially Batch 2), WebP MIME responses, lightbox, original hero video, navigation and reduced motion.
7. Run one new **real** submitted enquiry through the homepage. Confirm delivery in Zoho and replying to the real submitter email. Do not submit fake production leads without labeling them clearly as tests.
8. Confirm publication rights for all photographed properties and portrait. Validate the legal notice against real vendors/operations.
9. Measure Core Web Vitals and actual commission conversion before claiming improvement.

**Known permissions:** This assistant has read-only GitHub access and did not deploy the new version.
