# V11 consolidation, decisions and release gates

## Removed
- Separate `/commission` portfolio page and downloadable portfolio PDF, both rejected by the site owner.
- Large standalone homepage “Ways to work together” panel and its redundant commission-page link.
- Footer and Work page links promoting the retired portfolio.
- V10-only CSS for the removed page.

## Preserved
- Hero film and authentic still fallback.
- Original Maison wordmark and Marcellus identity.
- All 74 originals in 222 responsive WebP versions.
- Founder section, photographic studies, Work gallery, animations, accessibility, privacy, enquiry form, Turnstile and Resend integrations.
- Existing `/enquire` route for Work-page buyers (homepage includes the full form).

## Rewritten
- Hero supporting line: “Photography & film for hotels, residences and destinations.”
- One integrated “How a commission works” section containing two brief project types, straightforward scoping information and a direct enquiry link.

## Required manual GitHub operations
- Upload new or replacement `index.html`, `work.html`, `enquire.html`, `privacy.html`, `terms.html`, `accessibility.html`, `styles.css`, `_redirects`, `sitemap.xml`, `README.md`, and `tests/site_health.py`.
- Delete `commission.html` and `assets/maison-commission-portfolio.pdf` from the repository. ZIP extraction by itself cannot delete files already committed to GitHub.
- Redeploy Pages; verify redirects, asset MIME types, and one live enquiry delivered to Zoho.

## Acceptance
No `/commission` promotions or PDF links; no duplicate commissioning sections; straightforward hero positioning; Work direct enquiries; mobile and desktop layouts without overflow; submit form retains existing integration.
