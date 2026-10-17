# MAISON KRIZSAN | V11 — One clear path to a commission

A photograph-led hospitality and architectural photography studio website. V11 **removes the separate Commission Portfolio page and PDF**, and consolidates two engagement options into the existing “How a commission works” section on the homepage.

## Pages
- `/` — cinematic homepage, Work highlights, founder, services, how commissions work, live enquiry form
- `/work` — continuous photographic portfolio with direct enquiry links
- `/enquire` — existing dedicated form for visitors entering from Work
- Privacy, Terms, Accessibility — existing informational pages

## Deployment
Add the files in `MAISON_KRIZSAN_V11_SIMPLIFIED_PATCH.zip` and delete the retired `commission.html` and `assets/maison-commission-portfolio.pdf` from the repository. `_redirects` maps previous `/commission` URLs into the homepage. Preserve Cloudflare secrets and existing Functions.

## QA
Run `python tests/site_health.py` and `node tests/backend.test.mjs`; then inspect all page paths and form delivery on the actual Cloudflare host. Source checks are not a substitute for live deployment acceptance.
