# Portfolio update — 29 October 2026

This update completes the portfolio content refresh using `Jebzter_Catacutan_CV_final.docx` as the factual source. The existing project structure, profile photo, dark/light themes, Bitulok Express, Kicks, PHINMA AU Student Credential App, PMCCA Hospital Management System, live links, APK download, and project screenshots remain in place.

## Portfolio content

- Contact details now use `+63 956 189 6602` with `tel:+639561896602` and `cjebzter@gmail.com`.
- The hero, About section, and development toolkit describe an IT internship applicant and group the proven skills into Languages, Frontend, Backend & Databases, Tools, and APIs & Services.
- The project order is Bitulok Express (featured), Fitness Tracker App (October 2025), PHINMA AU Student Credential App (2024–2025), PMCCA Hospital Management System (2024), and Kicks Simple Responsive Website (first-year project).
- Fitness Tracker has no invented demo, repository, or APK link. Its technology list is limited to React Native, Node.js, Firebase, and Firestore.
- The configured Bitulok repository URL returned HTTP 404 during verification, so its public GitHub action is intentionally hidden until a working URL is available.

## Fitness gallery assets

The four source screenshots were reviewed from Downloads and optimized as WebP without altering the originals.

| Final public asset | Dimensions | Selected screen and reason |
| --- | ---: | --- |
| `public/images/fitness/home.webp` | 720 × 1561 | Clean dashboard showing weekly calories, quick actions, and recent activity. |
| `public/images/fitness/exercises.webp` | 720 × 1561 | Clear workout-library categories across the supported body areas. |
| `public/images/fitness/challenge.webp` | 720 × 1561 | Clean challenge generator showing difficulty and body-focus choices. It replaced a preview that displayed incomplete duration values. |
| `public/images/fitness/progress.webp` | 720 × 1561 | Progress screen with weight goal, workout totals, calories, streak, and recent workouts. |

The gallery supports touch scrolling, previous/next controls, keyboard image navigation, a zoom control, visible focus, Escape to close, focus restoration, lazy loading, and reduced-motion preferences.

## Certification assets and privacy

| Certification | Public presentation | Optimized public asset | Source used |
| --- | --- | --- | --- |
| Oracle Cloud Infrastructure 2025 Certified Networking Professional | Real certificate image | `oci-networking.webp` — 1800 × 1390 | Supplied Oracle Networking certificate PDF |
| Oracle Cloud Infrastructure 2025 Certified Foundations Associate | Real certificate image | `oci-foundations.webp` — 1800 × 1390 | Supplied Oracle Foundations certificate PDF |
| Oracle Data Platform 2025 Certified Foundations Associate | Real certificate image | `data-foundations.webp` — 1800 × 1390 | Supplied Oracle Data Platform certificate PDF |
| Linux Unhatched — Cisco Networking Academy | Real certificate image | `linux-unhatched.webp` — 1800 × 1219 | Supplied Cisco certificate PDF |
| TESDA NC II – Computer Systems Servicing | Text-only card: `TESDA · 2026` | None | The qualification title and year were verified from the private certificate; no file, image, preview, thumbnail, or download was copied into the repository. |

The public certification section contains four real certificate previews and a text-only TESDA card. A repository-wide privacy scan found no credential password, no private certificate PDF, and no TESDA-derived public image. No TESDA public asset existed to remove. The original private certificate was not modified.

## Verification

- `npm run build` completed successfully.
- `CI=true npm test -- --watchAll=false` passed: 14 tests across 3 suites.
- Headless Chrome checked 360, 390, 430, 768, 1024, and 1280 pixel widths in both themes: 12 layout combinations had no horizontal overflow, broken images, or targets smaller than 44px.
- Automated WCAG A/AA scans reported no violations in those 12 combinations.
- Interaction checks passed for theme persistence, mobile navigation and focus restoration, Fitness touch scrolling and lightbox, certificate preview behavior, filters, contact validation, phone destination, CV/APK downloads, reduced motion, and legacy `/projects` routing.
- Final QA screenshots are local review artifacts under `/private/tmp/portfolio-qa/screenshots`; they are not portfolio assets.

The existing public Kicks demo, PMCCA demo, and Kicks GitHub URL returned HTTP 200 during the final check.
