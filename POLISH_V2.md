# Portfolio polish v2

## Changes

- Updated the hero with the internship status, supplied introduction, proof cards, and one navbar Contact CTA. Preserved the projects/CV buttons, all sections, four projects, existing galleries, and PHINMA APK.
- Refined the circular portrait with a tighter crop and theme-aware edge shading. Retained the gradient ring, floating motion, and reduced-motion support.
- Centralized contact details: **Bongabon, Philippines**, **cjebzter@gmail.com**, **+63 956 189 6602**. Updated the role to **BSIT Student**, including the typing animation and social preview.
- Added absolute production OG/Twitter image URLs, canonical URL, and `og:url`. The refreshed `public/og-image.png` is **1200 × 630**. The existing production image also returned HTTP 200 and measured 1200 × 630 during verification; these local changes are not deployed.
- Added an expandable Bitulok case study using only supplied facts. The challenges/learning text is explicitly a placeholder; the empty screenshot array renders no gallery.
- Retained the mailto contact form as requested. It creates a draft addressed to the configured email; the visitor sends it in their email app. Service loading, success, error, and retained-input behavior are covered by tests.

## Resume

Used the exact requested source: `~/Downloads/Jebzter_Catacutan_Internship_Resume.pdf`. With your approval, corrected its phone number and location while preserving the layout and all other text. The Downloads original was not modified.

- Repository file: `public/cv.pdf` (**121,122 bytes**).
- Download URL: `/cv.pdf?v=983b3da0202d`.
- Download filename: `Jebzter_Catacutan_Resume.pdf`.
- SHA-256: `983b3da0202d74c7a874532bb64d017f4dc9303c1fab19ab14069dcff1fbad3e`.

`pdftotext` was unavailable, so macOS PDFKit extracted the text. It confirms the new phone, location, and email. Comparing extracted source/output text confirms that only the two approved contact values changed. A rendered page was visually checked. There is one resume PDF in the tracked working tree; the production build contains the same current PDF. Older commits retain their historical files.

## Links and remaining content

- Admin: <https://bitulok-express-6aba0.web.app>
- Restaurant: <https://bitulok-express-restaurant.web.app>
- Both dashboard URLs were verified against the Bitulok Firebase configuration and responded successfully. External portfolio links use `target="_blank"` and `rel="noopener noreferrer"`.
- Customer and Rider APK links remain null, displaying **Coming soon**, as requested. The previously found APKs exceed the 90 MB repository limit; no APK was added. Their paths and release/build guidance remain in [the access update report](PORTFOLIO_UPDATE.md).
- Fill in `caseStudy.learning` and optionally the featured project's `images` array in `src/data/projects.js`. [Screenshot candidates](docs/BITULOK_SCREENSHOTS.md) lists files found in the Bitulok repo; none were copied.
- Formspree is intentionally skipped. No endpoint or `.env.local` was added. To enable it later, set `REACT_APP_FORMSPREE_ENDPOINT` locally and in Vercel Project Settings → Environment Variables, then rebuild.
- Existing missing project GitHub URLs remain null. No URLs, credentials, or project claims were invented.

## Validation

- `npm run build`: passed, including the final CSS changes. CRA reported only the existing outdated Browserslist-data notice.
- `CI=true npm test -- --watch=false --runInBand`: 18 tests across 5 suites passed.
- Browser checks at 360, 768, and 1440 px in both themes passed: no horizontal overflow, circular photo, correct CV bytes/filename, mailto recipient, mobile navigation, external-link attributes, metadata, and hidden empty screenshot gallery.
- Dark-theme rendered-background contrast checks at 360 and 1440 px passed (sampled minimum 5.84:1). Floating-card secondary text was improved from approximately 4.28:1 to 6.88:1 over the lightest underlying photo area. Gradient/glass text required this additional check beyond automated accessibility auditing.
- No application dependencies were added or updated. `package.json`, `package-lock.json`, existing project assets, and `public/myapp.apk` remain unchanged.

## Files touched

- `src/data/profile.js`, `src/data/projects.js`
- `src/pages/Home.js`, `src/pages/Home.css`, `src/pages/About.js`, `src/pages/About.css`, `src/pages/Contact.js`
- `src/components/Navbar.js`, `src/components/Footer.js`, `src/components/ProjectCard.js`, new `src/components/ProjectCaseStudy.js` and `.css`
- `src/App.test.js`, `src/pages/Contact.test.js`, new `src/components/ProjectCaseStudy.test.js`
- `public/index.html`, `public/og-image.png`, `public/cv.pdf`
- `README.md`, `REDESIGN.md`, `PORTFOLIO_UPDATE.md`, this report, and `docs/BITULOK_SCREENSHOTS.md`

## Repository

Work is in `/private/tmp/ciao-portfolio-redesign`, whose origin is `https://github.com/CiaoMrnngstr/portfolio.git`. The supplied `/CiaoMrnngstr/portfolio` path was not present on this machine. The requested main pull was already up to date before creating `polish-v2`; main remains at `580fc008bcee9a6a1b31c134ecc160f140937c40`. Changes are committed only to `polish-v2`; nothing is pushed or deployed.

The development server runs with `npm start` on port 3001 because port 3000 was in use. Preview: <http://localhost:3001>. Phone on the same Wi-Fi: <http://192.168.100.193:3001>. The LAN address can change when networks change.
