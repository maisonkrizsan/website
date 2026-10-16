# Maison Krizsan — V6 Editorial Motion & Commission Journey

**Status:** Browser-reviewed local release candidate; NOT deployed or production-verified.

This package preserves the Maison photography edit, original wordmark, Marcellus/Manrope typography, 74 photographs, responsive WebPs, and existing hero video. It replaces the V5.2 scroll-writing JavaScript, introduces CSS-native scroll choreography on selected frames, provides two Work-page commission invitations, and adds a responsive `/enquire` page.

## Site architecture
- `/` → `index.html` — cinematic hero and studio services.
- `/work` → `work.html` — continuous photographic archive, clear early and mid-scroll commission invitations.
- `/enquire` → `enquire.html` — project form + immediate email alternative.
- `POST /api/inquiry` → `functions/api/inquiry.js` — Cloudflare Pages Function. It validates, then sends via Resend once configured.
- Existing `/privacy`, `/terms`, `/accessibility` pages retained and linked.

**Deploy:** Read `DEPLOY_V6.md` before publishing. The form's API is intentionally *not* marked operational until Resend secrets, verified sending domain, Git-based Pages Functions deployment and an actual received test email have been confirmed.

## Key preservation contracts
- Do not delete or move `assets/webp/batch-01`, `assets/webp/batch-02`, or `assets/video`.
- Keep the original 74-photo order unless separately approved.
- Still photography and original video are authentic user-provided materials; copyright/publication permission must be confirmed separately.
- No scroll-jacking, no generic parallax library, no CSS-hidden content when animation fails.
