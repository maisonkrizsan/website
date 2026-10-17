# MAISON KRIZSAN — V8 Release Hardening

**Purpose:** Harden the existing commission-ready Maison website. This is **not** a redesign and does not replace the original photographic edit, hero video, or the working Resend mail delivery.

## What has been implemented

1. Cloudflare Turnstile integration on the homepage form and the dedicated `/enquire` form, with **mandatory server-side Siteverify** after activation. Token hostname and action are checked, and failures cannot trigger email delivery. The secret is server-side only.
2. An `/api/form-config` endpoint that gives the browser only the public Turnstile site key. Credentials are not hard-coded. Existing submissions continue working while Turnstile is unconfigured.
3. Fail-closed handling for partially configured Turnstile secrets. Rejected or unavailable verification offers the email alternative rather than a false confirmation.
4. Security response headers and targeted non-immutable cache headers, while preserving media behavior.
5. Honest studio identity (“led by Mark Krizsan”) and factual `Organization` structured data. No fictional clients, testimonials, revenue claims, or film proof.
6. Automated image integrity checks and a GitHub Actions workflow. All 222 WebP variants are checked by header; all source paths used in HTML are checked; live-mode checks detect `200 text/html` being served as an image.
7. A lead pipeline CSV and operating checklist so enquiries can progress toward paid commissions.

## Required activation (not completed here)

1. Upload the **changes-only** ZIP to the **root** of `maisonkrizsan/website`, preserving `functions/api/form-config.js`, `functions/api/inquiry.js`, `enquire.js`, `styles.css`, both updated form pages, and `.github/workflows/site-qa.yml`. **Do not reupload all the photos just to make these changes.**
2. Wait for the Git-connected Cloudflare Pages build to deploy. Submit a legitimate test while no Turnstile keys are configured. The existing Resend flow should still work.
3. Create a Cloudflare Turnstile widget for hostname `maisonkrizsan.com`. In **Pages → Settings → Variables and Secrets → Production**, add `TURNSTILE_SITE_KEY` as Text and `TURNSTILE_SECRET_KEY` as Secret. **Add both.** Redeploy.
4. Open `https://maisonkrizsan.com/api/form-config`. Confirm `turnstileEnabled: true`, `misconfigured: false`. This response intentionally shows the **public** site key and must never show the secret.
5. Test a valid form submission on `/` and `/enquire`. Confirm Resend's email log and the Zoho inbox. Also confirm missing/expired challenge tokens do **not** send mail.
6. Enable Cloudflare Web Analytics under the Maison Pages project **Metrics → Web Analytics → Enable**. Deploy again if required. This measures visitors and web performance, but **does not support custom conversion events**; use Resend email delivery and the lead log for enquiries/qualified opportunities. Update the privacy notice to accurately describe the deployed analytics once enabled.
7. Add a WAF rate-limiting rule targeting `/api/inquiry`, tuned to legitimate enquiry traffic and your plan's available fields. Start with an approximately 10-requests-per-minute-per-IP threshold, then review false positives. Avoid blocking important site pages.
8. In Google Search Console, verify the domain, submit `https://maisonkrizsan.com/sitemap.xml`, and check indexed pages. No fabricated local address is required or recommended.
9. Complete the **live production gates** in `RELEASE_GATES_V8.md` before calling the site production-approved.

**Read `RELEASE_GATES_V8.md` for exact evidence requirements and limits.**
