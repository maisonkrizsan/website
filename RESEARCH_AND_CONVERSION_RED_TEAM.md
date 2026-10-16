# MAISON KRIZSAN — LUXURY EXPERIENCE & CONVERSION ARCHITECTURE
Date: October 16, 2026
Scope: Strategic red-team + limited, implemented motion experiment. This is not a complete conversion redesign or live launch.

## The answer in one sentence
The site already creates desire; its next constraint is the bridge from stunning work to a confident commission request. Motion can strengthen immersion, but it is not the main conversion lever.

## Verified reference observations vs inference

**Colville-Walker / Aman** (https://colville-walker.com/work/aman-branding-identity-development-and-expansion): Their documented Aman work emphasizes evolved brand standards, photography/film art direction, a revised content strategy, and painstaking page-by-page art direction for digital. OBSERVED primary-source project description. INFERENCE for Maison: no default template or automatic motion on every frame; curate transitions intentionally.

**Matter of Form / Aman** (https://www.matterofform.com/work/aman): This firm's account describes rationalizing large image libraries, unifying digital platforms, adding storytelling modules, and integrating booking infrastructure while retaining the brand's restraint. OBSERVED self-reported case study. INFERENCE: image immersion works best when choices and actions are organized, not bolted on.

**Amanzoe live content** (https://www.aman.com/resorts/amanzoe , https://www.aman.com/resorts/amanzoe/gallery): Multiple concrete offerings (rooms/villas, dining, wellness, experiences) receive tailored media, actionable links and distinct destination information. Gallery offers grid/single presentation. OBSERVED page structure. INFERENCE: Maison should connect imagery to commissionable deliverables and provide an enquiry path at the point of conviction.

**The Retreat / Journey** (https://www.journey.travel/case-studies/the-retreat): A vendor-reported hotel redesign linked luxury storytelling and simplified reservations. Its claimed results are specific to that client and are not a forecast for Maison. OBSERVED self-reported case study.

**KOBU inquiry** (https://kobu.co/work-with-us): Collects name/email, project type, company, budget and timeline (some optional) and a project brief, with an expectation-setting note. OBSERVED live inquiry layout. INFERENCE: a shorter Maison-specific project form could reduce the effort of writing a fresh email; implement only after a verified delivery endpoint exists.

**Motion architecture** (https://web.dev/articles/rendering-performance ; https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline/view ; https://web.dev/articles/prefers-reduced-motion): `transform` and `opacity` are generally preferable to layout properties; scroll-timeline support is uneven, so lightweight JS can remain an appropriate fallback; reduced-motion requests deserve respect. OBSERVED developer documentation.

## Red-team of current V5.1 source

1. Home: cinematic hero -> what we do -> 12-image selected photography sequence -> service list -> process -> contact. The general order is sensible. Not a complete redesign candidate.
2. Work: hero -> short intro -> 73 gallery images across editorial segments -> final contact. There is a textual offer in the intro, but the page offers NO contextual direct enquiry link until the bottom. Header is `position:absolute` and disappears once the hero scrolls away. High-priority friction.
3. Public credibility: source archive has actual photographs, but there are no grounded paid-client names, property-specific case studies, film reel, or validated outcomes. Do not fabricate them. Replace only when verified proof exists.
4. Commission destination: existing `mailto:` link asks visitor to form a message outside the site. Success cannot be measured as a submitted inquiry with the current implementation; no fake forms or confirmation screens.
5. V5.1 photographic motion: NONE. Its previous changes-only ZIP was the mobile footer CSS only, so the user's observation that photos did not move is correct.
6. Image density: 74 photos retained on one continuous Work page, as requested. The opening act is selected, but the later volume could make a buyer lose the strongest impressions. Preserve the archive; strengthen the decision path before asking the user to remove photos.

## Three directions (genuinely different)

**A — Quiet editorial refinement (lowest risk, 1–2 sessions)**
- Scroll-responsive 4–6% push-in + tiny drift on the handful of signature images; all other photographs remain still.
- Add an elegant one-line commission invitation between the opening Work act and the long archive.
- Preserve current pages, content and native scrolling.
- Advantage: feels alive, minimum technical/business risk.
- Limitation: enquiry still email-dependent.

**B — Curated commission journey (recommended for business outcome)**
- Everything in A, plus an actual commission intake interface with name, email, property/brand, scope, timeline, and optional budget/brief, backed by a verified message-delivery endpoint.
- The form should be absent until it's functional. Continue to show direct email.
- Reframe the early Work pause as an opportunity: "Planning imagery for a property? Discuss a commission" without an intrusive modal.
- Primary metric: qualified completed enquiries, not scroll depth or aesthetic self-ratings.
- Limitation: requires back-end/third-party service and privacy audit.

**C — Cinematic stories, fewer anonymous frames (high-production, riskier)**
- Organize Work into 3–5 verified commission/project stories with real property name, role, deliverables and context, each with a photo essay / film segment.
- Add project-to-commission contextual navigation and chapter transitions.
- Advantage: much stronger commercial proof if permissions and projects exist.
- Limitations: cannot implement honestly from unverified image library alone; production and maintenance effort.

## Recommended page anatomy

**Homepage:** (1) Full-frame video and explicit positioning + Enquire. (2) Short service positioning with direct CTA. (3) 4–6 hero-grade images in designed rhythm. (4) One quiet 1–2 sentence connection from images to commercial use. (5) More signature images. (6) Three real service scopes. (7) Commission process and CTA. (8) Closing invitation and legible footer. Avoid another manifesto.

**Work:** (1) cover. (2) 12–18 signature frames as an opening act. (3) a tasteful, single commission invitation with a button, NOT a popup. (4) continuation of the existing 74-image continuous archive. (5) final enquiry invitation. Stop forcing visitors to reach image 74 to find an action.

## Motion contract implemented in this patch

- Mark exactly 6 images on Home and 6 on Work. Targets chosen from current early signature edit, rather than applying movement indiscriminately.
- Scroll progress controls scale ~1.047–1.079 mobile / 1.058–1.103 desktop and vertical drift by ~13/22 px across a full entry/exit cycle. The resulting change during a short 360px scroll is smaller by design.
- Updates occur only during scroll/resize/visibility and only for near-viewport targets via IntersectionObserver. No continuous animation timer or smooth-scrolling library.
- Existing hover zoom remains; on cinema images, hover adds 1.4% on top of the current scroll state.
- Motion disabled for prefers-reduced-motion and data-saving modes. Static photographs remain visible without JS.
- Video hero remains unchanged and separately governed by its existing playback/fallback logic.

## Recommended next falsifiable test

First deploy the motion patch to a preview environment, not directly to a critical public site. Independently check desktop Brave/Chrome, physical mobile iOS/Android, and reduced-motion; confirm selected images move without jank or cropped subjects. Then build a contextual midway Work CTA (no form until backend verified), track CTA clicks and qualified enquiries. Compare before/after against the same traffic source; with low traffic, seek qualitative feedback from 5 target hospitality buyers instead of claiming a conversion-rate uplift.
