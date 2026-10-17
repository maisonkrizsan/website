# Deploy Maison V9

## Recommended update
Upload the **contents** of `MAISON_KRIZSAN_V9_UPDATE.zip` at the existing GitHub repository root (`maisonkrizsan/website`, branch `main`). Preserve relative paths. This update includes V8 hardening files too, so it safely upgrades an older V7 deployment without losing the enquiry backend.

Upload the `assets/studio/` directory **inside** existing `assets/`, not beside it. Verify the two exact URLs after Cloudflare deploy:

- `/assets/studio/mark-krizsan-portrait-720.webp`
- `/assets/studio/mark-krizsan-portrait-1200.webp`

Do not overwrite `assets/webp/` or `assets/video/` unnecessarily; the update archive does not contain them.

## Smoke checks after deploying
1. On desktop and phone, `/` loads and `Studio` leads to `/#founder`.
2. Founder portrait appears on each device; both photographic notes load with correct captions.
3. From `/work`, choose `Meet the studio` and verify the same destination.
4. Work gallery and hero film still load; image viewer works.
5. On the homepage, submit a new **real test** enquiry and confirm arrival in Zoho. Do not assume earlier tests validate the new deployment.
6. If enabled, verify Cloudflare Turnstile challenge, and verify a fake/bot request cannot be accepted.
7. Check responsive crop in actual iPhone Safari and desktop Chrome.

## Important blockers
ChatGPT has *read-only* GitHub access (`pull: true`, `push: false`) to the Maison repository. The current build has **not** been pushed or deployed. No fresh live-site QA is represented by the local browser tests.
