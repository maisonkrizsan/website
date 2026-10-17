# V10 Red-Team and QA Report

## New buyer-ready outcomes
- Explicit **focused property shoot** and **complete property story** descriptions on the homepage.
- A shareable `/commission` page with visually curated actual portfolio studies, founder identity, planning process, and `/#enquire` CTA.
- Four-page linked PDF in `assets/maison-commission-portfolio.pdf` that buyers can share internally.
- Work gallery provides direct enquiry **and** links to the commission presentation.
- The original homepage form and `/enquire` remain intact. Resend/Turnstile code and all existing photography are preserved.

## Local tested checks (adapted Chromium)
- 4 HTML destinations (`index`, `work`, `commission`, `enquire`) at 320 / 390 / 768 / 1024 / 1440 / 1920 = **24 combinations**, all with no detected horizontal overflow or JavaScript page errors.
- 222 existing WebP source assets are preserved. No initial viewport broken images in the rendered browser checks. Lazy images were not all scrolled to completion on the full Work gallery.
- Existing suite: `python tests/site_health.py` => **836/836 checks passed**. `node tests/backend.test.mjs` => **14 mocked backend tests passed**; no real send in the current run.
- PDF: four pages; verified by rendering with pdfium, visual review and text extraction. About 1.5 MB, with functional link annotations.
- The adapted browser test used a local asset responder and fallback fonts, not a real Cloudflare-hosted browser session.

## Factual and commercial safeguards
- Portfolio imagery is labeled **independent photographic studies**, not invented paid case studies. The source archive is user-provided.
- Actual film reel unavailable, so no film examples or unsupported delivery claims were fabricated.
- Final image counts, timelines, fees and commercial rights are defined per written proposal, not invented as fixed packages.

## Not verified / requires real evidence
1. This V10 code has not been committed to GitHub or deployed. Repo connector remains read-only.
2. Live Cloudflare response for new `/commission` route, PDF MIME, font loading and mobile Safari remains unknown.
3. New live Resend submission, Turnstile settings, and performance measurements remain unverified for V10. A real prior-version inbox test exists.
4. Property photo/portrait publication rights, verified client context and actual filmed hospitality casework remain unverified.
5. Commercial conversion lift is a hypothesis, not a measured outcome. This needs relevant buyer sessions and qualified enquiry data.

## Next experiment (external validation)
Send the commission portfolio to five qualified hospitality decision-makers and ask whether they understand what they could commission and what would stop them from doing so. Track visits -> qualified enquiries -> agreed proposals -> paid commissions. Use objections to inform the next modification; do not redesign based on taste alone.
