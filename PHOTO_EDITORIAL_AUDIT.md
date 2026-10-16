# Maison Krizsan V3 | Editorial red-team and first-frame decisions

## Objective
Present the strongest real photography first, establishing instant desire **and** evidence of work across architecture, hospitality, residences and destinations. The correct output is not simply the warmest palette or most symmetrical image. It is a photographic argument: wonder → recognizable place → architectural craft → lived experience → commissioning.

## Why the previous edit failed

**BLOCKER: wrong photographic hierarchy.** The earlier homepage led with an ordinary firelit seating arrangement and the Work cover used a generic sunlit window composition. Those aren't necessarily bad photographs, but neither proves a distinctive photographic eye in the opening three seconds. The photo library's remarkable architectural compositions, especially Batch 1, were hidden below them.

**HIGH: wrong definition of luxury.** We optimized for beige warmth, symmetry and conventional hotel imagery. Aman imagery is not uniform beige: iconic identity is expressed through distinctive architecture, singular setting, careful light and cultural individuality. A theatrical chandelier, a monumental white coastal colonnade or a modern architectural sculpture can carry more visual authority than a perfectly warm hotel lobby.

**HIGH: no role assignment.** Detail photographs (table shadows, pathways, undistinctive seating), which make excellent transitional frames, were presented as marquee proof. Supporting frames should create rhythm, not take the place of iconic establishing images.

**HIGH: sequence did not tell a story.** A gallery is not a shuffled inventory. Lead with a portfolio statement, then demonstrate range and control across a coherent chain of scale, light, geometry and location. Avoid repeating similar fireplace/lounge shots within the first several images.

**HIGH: visual QA was insufficient.** Technical page checks were misrepresented as aesthetic confidence. Layouts and the final edit must be evaluated at 390px and 1440px, with the first viewport and first ~20 images receiving the most attention. A reference mood image never counts as actual photographic proof.

**CRITICAL DEPLOYMENT ISSUE:** The user's screenshots also showed beige unloaded image regions and a Work redirect loop. The source package keeps root-relative WebP references and removes the inverse `/work` redirect. The live host must still be deployed with the entire assets directory and verified separately.

## Research grounding, not visual copying

- Aman art director **Colville-Walker** documents comprehensive page-by-page film and photography art direction and the preservation of each property's individuality: https://colville-walker.com/work/aman-branding-identity-development-and-expansion
- **Matter Of Form** describes Aman's content strategy as bringing the detail and specificity of individual destinations into a unified site, rather than showing an unedited photo library: https://www.matterofform.com/work/aman
- The **Amanzoe gallery** opens with recognizable arrival/architecture, water, landscape, living spaces and details in a coherent destination narrative: https://www.aman.com/resorts/amanzoe/gallery?page=1

These examples concern hotel marketing, not a photographer portfolio. Maison must translate the principles while demonstrating its *own* capabilities. We do not claim Aman endorsed any individual photograph or that the selections are empirically conversion-optimized.

## New first impressions

**HOME HERO | Batch 1 image 20, destination-20.jpg.** Sunbeams through the monumental round interior and a multi-tiered chandelier: extraordinary light, shape, depth, and an emotional signature. Successfully tested in real Chromium screenshots at 390px and 1440px. *Trade-off:* intense flare/overexposure on the left, somewhat abstract; the commercial service descriptor must remain clearly visible.

**WORK COVER | Batch 1 image 7, destination-07.jpg.** Large sculptural chandelier against matched towering arched windows. Iconic architecture and highly graphic symmetry, sharply differentiating the new first impression from the previous ordinary window. Tested at 390px and 1440px. *Trade-off:* home and Work are both warm chandelier/architecture subjects. The next full-width seaside colonnade expands range immediately.

**FIRST WORK IMAGE | Batch 1 image 15, destination-15.jpg.** Grand white arcaded coastal building, ocean, planted pathway, palms. Strong proof that Maison photographs **place**, not just interior textures. Bright daytime conditions prevent it from winning the more emotional hero contest.

**THE NEXT HIGH-VALUE IMAGES | Batch 1 IDs 10, 22, 8, 19, 21; plus 33, 54, 56, 63.** Dusk arrival, futuristic sculptural architecture, formal topiary, classical rotunda, architectural oculus, strong window symmetry, ceiling sculpture, staircase geometry and contemporary glass curve. These communicate a much broader architectural vocabulary.

## What was demoted and why

- `IMG_1250` (fireplace): warm, inviting and useful later, but familiar and largely decor-focused for a hero.
- `IMG_1494` (arched-window dining): competent and luminous, but not astonishing enough as a Work cover.
- `krizsan-standard-bg` (warm lobby): grand arrival, but visual distractions and generic room perspective keep it below stronger architectural events.
- `IMG_0816` (seating/window): cozy but exit signage weakens first-tier luxury and does not establish a place.
- `IMG_1581` (table shadows) and `IMG_1533` (walkway): useful transitions, not hero material.
- Generic bright surf and repeated coastal views: retain in later archive for variety, not as top proof of premium architecture commissions.

## Photo sequencing contract

- Homepage: 1 monumental photographic hero + 11 deliberately selected examples arranged spread / diptych / spread / pause / diptych / spread / diptych / spread / diptych.
- Work page: 1 architectural cover + an opening edit of 18 photographs selected for scale, composition, light and variety, followed by quieter interiors, locations and studies on the **same continuous page**.
- No visitor-facing image numbers or inflated captions. All 74 originals and their responsive variants remain. No invented property names or implied commissioned clients.
- `PHOTO_ORDER.json` provides the traceable current ordering, which future editors or build agents can use to recut the site. The deployed site is generated static HTML: editing this JSON alone does not automatically publish a new order.

## Unresolved creative and commercial evidence

The available library is weighted toward classical coastal hospitality and interiors, with some contemporary architecture. A premium hotel photo-commission portfolio would become stronger with verified **hero-grade twilight property exteriors, true rooms with clean styling, human-scale lifestyle moments and a genuine hospitality film reel**, if Maison owns publishable material of that caliber. We cannot invent or silently source replacement photographs from unrelated hotels. Image rights, hotel attribution and client provenance remain unverified.
