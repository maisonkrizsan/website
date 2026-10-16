# Release QA · Maison Krizsan / October 2026

## Verified in the available environment

| Gate | Result | Method |
| --- | --- | --- |
| Site pages + HTML | PASS | Parsed static outputs; `index.html` / `work.html` each have one `h1` |
| 74 images in continuous work archive | PASS | Counted 74 distinct `data-image-id` entries, 4 visual chapters (22 / 20 / 17 / 15) |
| WebP conversions | PASS | Every source-derived asset decoded, actual dimensions checked against manifest (222 files) |
| Responsive image references | PASS | Local paths and all three WebP width descriptors mapped from **actual** dimensions |
| Responsive overflow | PASS | Chromium measured scroll-width == viewport width at 320, 390, 768, 1024, 1440, 1920 for both pages |
| Browser script | PASS | Chromium pageerror capture: none in 12 page/viewport combinations; Node syntax checked |
| Mobile navigation | PASS | Opens, marks aria-expanded, closes on Escape |
| Image dialog | PASS | Opens from photograph, advances by Right Arrow, closes on Escape |
| Reduced motion | PASS | Media query feature test and CSS override confirmed |
| Actual image display | PASS | Loaded all 74 image elements in Chromium test; no unresolved/corrupt assets |
| SEO scaffolding | PASS | title, meta description, canonical URLs, social photo, sitemap and robots generated |
| Email delivery | **NOT VERIFIED** | Real email mailbox round trip not possible here. Buttons use mailto with known address from previous site, not a pretend submission. |
| Live host, TLS and redirects | **NOT VERIFIED** | No real deployment executed. The sandbox blocks direct browser navigation to localhost; Chromium test used `setContent` with real CSS/JS and request interception serving exact local image bytes. |
| External Google Fonts | **NOT VERIFIED** | Test browser cannot load Google Fonts; verified rendering uses serif/sans system fallback. The hosted page requests Marcellus + Manrope from Google Fonts. |
| Physical Safari/iOS/Android | **NOT VERIFIED** | Desktop Chromium tested via responsive viewports, not real mobile hardware. |
| Publication rights / property attribution | **NOT VERIFIED** | Photographer supplied all photographs for use; no documentary licensing check. Property names, clients, awards and testimonials are not invented. |

## Critique and fixes

1. **Overflow at 320 px:** chapter title extended 6 px past viewport; adjusted small-screen chapter headline size. Retested 12 responsive page/viewport combinations, all clean.
2. **Incorrect srcset widths on portrait images:** initially used the target maximum dimension as the responsive width; corrected to use each actual output file's pixel width. Retested.
3. **Work archive first impression:** an interior with visible EXIT lettering was too utilitarian for the first image. Reordered the strongest neutral-toned entrance/lobby study to the first archive position. Kept all 74 originals represented.
4. **Lazy-load screenshot fidelity:** full-page Chromium captures taken without scrolling show blank below-fold placeholders even when files are valid. Verified actual rendering by scrolling into real viewport and by forcing eager decoding of all images. In production, native lazy loading fetches images as visitors approach them.

## Performance design

- Large image: 2560 px maximum dimension; medium: 1600; small: 960. Browser automatically chooses responsive source from actual width-labeled srcsets.
- Native lazy loading and `decoding=async` on below-fold images. Hero uses high-priority request and eager load.
- No runtime libraries, SPA hydration, trackers, scroll hijacking or WebGL.
- Approx. 90 MB of images exists in the deployable repo because it contains all **three** formats for 74 photographs, but no individual visitor should download all of them on initial load. Loading all 74 through the entire archive still downloads substantive images by design; consider a much smaller curated selection later if traffic/network performance indicates it.

## Release decision

**Deployable staging build; production acceptance conditional on live host, email-inbox and property-rights checks.** No known critical defect in tested local functionality. Do not confuse static QA with verified production traffic behavior.
