# Maison Krizsan - V10 Commission-Ready Portfolio

This repository contains the Maison Krizsan static website, 74 distinct original photographs in 222 responsive WebP variants, the cinematic homepage hero, the founder-led Studio presentation, a **shareable commission portfolio** and the existing Cloudflare/Resend enquiry backend.

## Core visitor journeys
- `/` - cinematic homepage, real-photo proof, specific service formats, **full embedded enquiry form**.
- `/work` - 74-photo editorial gallery with early direct enquiry and commission-portfolio links.
- `/commission` - shareable buyer presentation: proof, two ways to commission, scope, process, founder and direct enquiry.
- `/assets/maison-commission-portfolio.pdf` - four-page presentation for internal decision-makers.
- `/enquire` - dedicated form alternative for Work-page visitors.

## Deployment
See `DEPLOY_V10.md` before uploading to the Cloudflare Pages-linked GitHub repository. V10 does **not** require new Resend credentials or a change to existing working form logic.

## Validation
Run `python tests/site_health.py` and `node tests/backend.test.mjs` locally. Read `QA_V10.md` for the adapted browser results and outstanding release gates.

## Truth policy
The included photographs are independent portfolio studies, not represented as paid client projects. Pricing, guaranteed outputs, results, logos and testimonials are intentionally omitted until evidenced and approved. Publication rights and film proof remain external gates.
