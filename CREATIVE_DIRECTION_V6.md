# MAISON KRIZSAN — Creative direction and commercial journey

## Underlying objective
Make a relevant hotel/resort/residential buyer see the quality of the work, instantly understand the offered services, and reach the commission form with minimum friction.

## Findings from source and reference research
- Framer Academy (Scroll Transforms/Scroll Speed): associate movement with an explicit scroll range and fixed clipping; review all start/end states at mobile breakpoints.
- Motion (scroll-linked animation): movement should map to element progress, not unbounded timers; default to hardware-accelerated transforms where possible.
- GSAP ScrollTrigger: can implement precise scrub ranges and matchMedia. Additional GSAP dependency was not required here; native CSS ViewTimeline met the simpler objective in a tested Chromium environment.
- Aman-inspired principle: authored photographic hierarchy and clarity of visitor pathway, not blanket animation of every tile.

## Editorial grammar
- Hero: original 10s MP4, photo fallback, no scroll transform.
- Signature landscape frames: fixed 1.105 scale, −2.4% to +2.4% vertical travel as the **frame** crosses viewport; mobile 1.07 scale, ±1.3% travel.
- First two paired collections: brief, restrained reveal in the entry window. No repeated animations in the long archive.
- No pins, horizontal scroll hijack, custom smooth-scroll engine, or third-party animation dependency.

## Commission journey
1. Home hero → directly to `/enquire` or Work.
2. Home services explains available scope.
3. Work hero → explicit, restrained commission invitation in the introduction.
4. Opening portfolio → warm commission bridge after eight photographic groupings.
5. Work archive remains complete, final enquiry still available.
6. `/enquire` asks for name, email, property, location, service, timeline and brief, with direct email alternative.
7. Server must acknowledge accepted email API delivery; otherwise honest error plus prefilled mailto.

## Further opportunities (not shipped without external proof)
- Published client/project details with verified property permissions and clear Maison role.
- One real film sample or reel; film offer currently has no verifiable video proof in photographic archive apart from hero animation based on a still.
- Actual conversion measurements: click-to-enquiry, sent enquiries, qualified replies, confirmed commissions. No claims of conversion lift until observed.
