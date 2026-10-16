# MAISON KRIZSAN V7 — Conversion architecture red team and QA

## Strategic finding

The V6 homepage had no project form. Every enquiry action navigated away to `/enquire`, creating an unnecessary step for a visitor who had already seen the offer and was ready to send a brief. The dedicated enquiry page remains valuable for visitors coming from the continuous Work archive.

## Decisions implemented

1. Homepage `#enquire` now contains the complete project form, with clear introduction and direct email alternative. No separate page is necessary to enquire from the homepage.
2. All homepage enquiry actions now target `#enquire`. Work continues linking to the dedicated `/enquire` page. Both locations post to the same `/api/inquiry` endpoint and share one client script.
3. Removed the diagonal Unicode arrow `↗` from the form button and relevant Work/enquiry links because some mobile renderers turn it into an oversized colorful glyph. Main submit button is plain text.
4. Clear labels above each field, with Required/Optional indicators; the textarea and location/timing remain intact. This reduces uncertainty rather than adding new fields.
5. Mobile version keeps the heading and invitation centered while the form itself remains left-aligned for reading and entry. Desktop retains the editorial large-title composition with a pale form panel in the dark commission area.
6. Hero video, poster fallback, 74 Work photographs, 222 responsive WebPs, viewer and editorial footer preserved.

## Actual automated tests

- Isolated Chromium using the actual HTML/CSS/JS with locally inlined images and a mocked network, at 320, 390, 440, 768, 1024, 1440 and 1920px for **home, Work and enquiry**: 21 page/viewport checks. No horizontal overflow or JavaScript page errors.
- Browser interactions: homepage form present exactly once, mobile navigation opens/closes, homepage enquiry links point to `#enquire`, Work link points to `/enquire`.
- Browser form submission: success, provider rejection and network-failure states checked on **both** homepage and dedicated page, six tests. False-positive success not shown on failure; pre-filled email alternative appears.
- Cloudflare Pages Function tested with mocked Resend: accepts correctly formed enquiry, rejects missing data, rejects invalid origin, returns a truthful 503 with absent secrets, handles email-provider failure, rejects GET.
- Checked JavaScript syntax, JSON blueprint, all internal links/asset references in local source, and the presence of all 222 WebP images; no broken local references found.
- Visual inspection of actual 390px and 1440px rendered closing section, embedded form and submit area; 320px also screenshot-reviewed. See evidence ZIP.

## Remaining risks / release gates

**BLOCKING FOR REAL ENQUIRY DELIVERY:** Cloudflare Pages Function must actually be deployed, and production `RESEND_API_KEY` and `RESEND_FROM` (a verified sender) must be configured. Do not consider a form operational until a real test submission arrives at `studio@maisonkrizsan.com` and the reply path has been checked. The UI honestly provides a fallback if delivery cannot be confirmed. The backend's provider acknowledgement does not prove inbox delivery.

**OTHER RELEASE UNKNOWNs:** Live Cloudflare HTTP routing/image content types after deployment; actual brand fonts and physical iOS/Safari; privacy/legal accuracy against real operational practices; publication rights; actual contact/commission conversion; actual motion aesthetics and runtime performance on physical devices. Automated layouts alone cannot validate those.

**Risk worth addressing after launch:** Bot/rate-limit protections and analytics events for clicks, form starts, form submits and successful inbox-confirmed submissions. Do not add heavy tracking/consent complexity until a real analytics decision is made.

## Next reality-changing action

Replace the specified files from the change ZIP at the repository root. Confirm `/` contains the form and `/work` still navigates to `/enquire`. Then configure/verify Resend and send a complete real test enquiry on both routes. Do not claim an operational funnel based only on mocked tests.
