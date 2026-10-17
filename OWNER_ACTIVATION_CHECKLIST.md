# Owner action checklist — exact setup

These steps require your Cloudflare, Google and source-account access. No third party can truthfully complete them from a read-only repository view.

### 1. Deploy

- Upload changed files in the V8 patch to `maisonkrizsan/website` **main** and let Git-connected Cloudflare Pages deploy.
- Open `https://maisonkrizsan.com/api/form-config`. It should return JSON (before security credentials, `turnstileEnabled: false`).
- Make one legitimate test enquiry. Verify it still arrives in Zoho.

### 2. Activate Turnstile

- In Cloudflare dashboard find **Turnstile**, create a new widget named `Maison enquiries`, restrict hostnames to `maisonkrizsan.com` (plus exact preview hostname only if needed).
- In **Workers & Pages → Maison Pages project → Settings → Variables and Secrets → Production**, add the **public site key** as Text variable `TURNSTILE_SITE_KEY` and **private secret** as Secret variable `TURNSTILE_SECRET_KEY`. Do not paste keys into GitHub or this chat.
- Redeploy, then check `/api/form-config`: `turnstileEnabled: true`, `misconfigured: false`.
- Send a real test from the homepage and from `/enquire`; confirm real inbox arrival and Reply-To behavior.
- Verify the form shows an error, not success, when Turnstile can't validate. If it stops all legitimate submissions, remove both new Turnstile variables until resolved; the prior Resend integration should work again after redeploy.

### 3. Enable Web Analytics

- In **Workers & Pages → Maison Pages project → Metrics → Web Analytics**, choose Enable, then redeploy if Cloudflare asks. This is a privacy-oriented pageview/performance tool and **does not record custom commission events**.
- View Maison's traffic paths and performance; use Resend logs/Zoho to count delivered enquiries, and the private lead sheet for qualification and wins.
- Verify and update the Privacy page if the active configuration or data processors differ from its wording.

### 4. WAF abuse limit

- In Cloudflare **Security → WAF → Rate limiting rules** (label varies by plan), create a rule for path `/api/inquiry` and an appropriate rate per IP. If the dashboard supports HTTP method, restrict to POST. Start conservatively (e.g., ~10 per minute) and review logs/false positives.
- Test legitimate submissions after enabling. Turnstile Siteverify remains the core anti-bot check.

### 5. Search / performance / mobile

- Google Search Console: verify `maisonkrizsan.com` by DNS without disturbing existing MX/SPF/DKIM records. Submit `https://maisonkrizsan.com/sitemap.xml` and inspect coverage.
- Open PageSpeed Insights for home, Work and Enquire on both mobile and desktop. Targets at the **75th percentile of field visits**: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1. Distinguish simulated Lighthouse results from real visitor data.
- Test iPhone Safari and desktop Chrome/Safari, especially the former issue where Cloudflare served **HTML instead of WebP** at some image paths.
- From a computer with public network access, run `python tests/site_health.py --live https://maisonkrizsan.com`.

### 6. Proof and legal

- Confirm image and video publication rights. Add one authentic studio portrait/bio and one genuinely commissioned or clearly labeled independent photographic project when authorized.
- Provide a real film sample for a film portfolio. Do not reclassify an image animation as a completed property film.
- Review Privacy/Terms/Accessibility against actual data flows and applicable law. These documents are informational drafts, not a legal opinion.
