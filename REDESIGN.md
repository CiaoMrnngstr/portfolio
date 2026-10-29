# Portfolio redesign — 26 October 2026

This is the historical redesign report. See [the October 29 update](PORTFOLIO_UPDATE.md) for current content, assets, and verification.

## Source and preservation

The supplied `/CiaoMrnngstr/portfolio` directory did not exist on this host. Work was completed in `/private/tmp/ciao-portfolio-redesign`, cloned from `https://github.com/CiaoMrnngstr/portfolio.git` at `2768ff54877abc084d64a236c3e48b62a4b19f10`. No GitHub push or Vercel deployment was performed.

The original production build passed before source edits. React, Create React App, the existing `src/pages` and `src/components` organization, all original assets, and all original dependencies were retained.

All three original projects remain, with their complete stories and all twelve previously displayed screenshots in expandable galleries:

1. **Kicks Simple Responsive Website** — existing live website preserved.
2. **PHINMA AU Student Credential App** — existing `/myapp.apk` download preserved.
3. **PMCCA Hospital Management System** — existing live website preserved.

**Bitulok Express** is now the first, larger featured project, showing Admin/Restaurant (Vite), Customer/Rider (Expo), and Firebase Firestore, Cloud Functions, and Hosting. Its illustration represents the architecture, not a fabricated product screenshot.

The existing name, tagline, profile photo (`src/assets/me1.jpeg`), About introduction, four timeline entries, Core Skills, email, phone number, location, Facebook/GitHub/LinkedIn links, and `/cv.pdf` are retained. All six original technologies remain, with Firebase, Node.js, Git, Expo, React Native, PHP, MySQL, and Vite added. Statistics are based on displayed projects/technologies; no learning dates or experience years were invented.

## What changed

- Indigo/cyan design tokens, locally hosted Inter and Space Grotesk, responsive type, glass panels, light and dark themes. The first visit respects system preference; explicit choices persist in localStorage. System preference changes remain effective until a choice is saved.
- Sticky shrinking navigation, active-section state, native mobile modal with focus containment and Escape dismissal, a skip link, and smooth anchors. Existing `/about`, `/project`, `/projects`, and `/contact` entry URLs still work through Vercel rewrites and section navigation.
- Balanced portrait/hero composition, gradient name, accessible typing tagline, three original hero actions, social links, and scroll cue.
- About timeline and data-derived stats, three tech groups, keyboard-accessible tooltips, full-color icons, and hover motion.
- A single project array, three/two/one-column layout, filter transitions, lazy thumbnails, expandable project stories and galleries, original APK link, and clear unavailable states for missing URLs.
- Contact validation, invalid-field focus, an email-draft workflow, optional Formspree sending, request timeout, success/error feedback, and retry without losing the message.
- Footer navigation/social links, exact 2026 copyright, and back-to-top link.
- Page title, description, Open Graph/Twitter metadata, 1200×630 social image, custom favicon, app icons, and web manifest.
- Local fonts and WebP image derivatives: 21 assets reduced from approximately 28.2 MB to 539 KB (98%). Originals remain untouched. Gallery images only mount when opened; below-the-fold thumbnails/icons are lazy-loaded. The hero image loads eagerly with high priority and all images reserve dimensions.
- CSS motion only; reduced-motion preferences disable animation and smooth scrolling.

## Files touched

| Area                       | Files                                                                                                                                                      |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| App and shared styles      | `src/App.js`, `src/App.css`, `src/index.css`                                                                                                               |
| Existing pages             | `src/pages/Home.js`, `About.js`, `Project.js`, `Contact.js`, and their existing CSS files                                                                  |
| Existing components        | `src/components/Navbar.js`, `Footer.js`, `Footer.css`                                                                                                      |
| New reusable components    | `SectionHeading.js`, `SocialLinks.js`, `TechStack.js`, `TechStack.css`, `ProjectCard.js`, `DeliveryPreview.js` in `src/components`                         |
| Data and contact logic     | `src/data/profile.js`, `projects.js`, `technologies.js`, `src/utils/contact.js`                                                                            |
| Assets and metadata        | `src/assets/optimized/`, `public/fonts/`, `public/index.html`, `favicon.svg`, `favicon.ico`, `og-image.png`, `logo192.png`, `logo512.png`, `manifest.json` |
| Hosting/configuration/docs | `vercel.json`, `.env.example`, `README.md`, `REDESIGN.md`                                                                                                  |
| Tests                      | `src/App.test.js`, `src/pages/Contact.test.js`, `src/utils/contact.test.js`                                                                                |

## Dependencies and commands

**No application or development dependencies were added to package.json.** Existing Lucide and React Icons provide icons; CSS handles animation. Font files are bundled locally with their SIL Open Font Licenses. Install and run using the existing npm toolchain:

```sh
npm ci
npm start
npm run build
CI=true npm test -- --watchAll=false --runInBand
```

Playwright, axe-core, Lighthouse, and Sharp were used in a separate temporary QA directory. They are not runtime requirements and are not added to this repository.

## Fill in manually

### Projects

Edit `src/data/projects.js`. Every project object contains its title, categories (`Web`, `Mobile`, `Full-Stack`), description, full story, technologies, links, and images. Add a new object to add a card. A missing image gets a gradient placeholder.

- **Bitulok Express:** add `liveUrl`, `githubUrl`, and optional real screenshots to `images`. The architecture illustration works until screenshots are provided.
- **All four projects:** add their exact `githubUrl` values; none were supplied in the original code.
- **PHINMA:** optionally provide `liveUrl` if a web demo is public. The original Android download already works.
- Existing Kicks and PMCCA demo URLs are preserved verbatim. Their external hosting availability was not part of the local checks.
- Do not use `#` for missing destinations. Keep a URL `null` until it is available; the UI shows the action as unavailable with an explanatory tooltip.

### Contact

The default form works without configuration: it validates the fields and creates an encoded email draft using the current address in `src/data/profile.js`. The visitor must click **Open email draft**, review it, and send it in their email app. Draft creation never claims that a message was delivered. A direct email fallback remains available.

For direct sending, create a form in Formspree and copy its public endpoint. Add this environment variable to Vercel and redeploy (or put it in `.env.local` and restart locally):

```dotenv
REACT_APP_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

This is a public form URL, not a secret API key. Success appears only after an HTTP success response. Error and timeout states retain the visitor’s message. No real messages were sent during testing. See [Formspree’s AJAX guidance](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax).

### CV, identity, and SEO

- The real CV already exists at `public/cv.pdf`, linked through `profile.cv`. Replace that PDF only when you have an updated CV.
- Existing social links, email, location, and phone are already configured in `src/data/profile.js`. No replacement is required unless those details change.
- Existing screenshots and photo are included; Bitulok screenshots are optional.
- Once you choose the final production domain, make `og:image` and `twitter:image` absolute URLs in `public/index.html` (e.g. your domain plus `/og-image.png`) and add matching `og:url` and canonical URL tags. A domain was not invented.
- Vercel should retain the Create React App framework preset, `npm run build`, and `build` output directory. Existing assets and downloads are not intercepted by the explicit page rewrites.

## Verification

- Baseline and final production builds pass.
- All **12 tests in 3 suites** pass. Unit/integration tests cover content preservation, filters, saved theme preference, field validation, draft encoding, contact-service success, failure, retry, and timeout behavior.
- Chromium checks pass at **360px, 768px, and 1440px**, in **both light and dark themes**, without horizontal overflow, broken images, or browser errors.
- axe-core reported **zero WCAG A/AA violations** across the six viewport/theme combinations. Native keyboard navigation, mobile focus containment, Escape, focus return, project filters/galleries, legacy routes, reduced-motion rendering, theme persistence, and local downloads were checked.
- Local Lighthouse mobile audit of the production build: **Performance 93 / Accessibility 100 / Best Practices 100 / SEO 100**. FCP 1.1s, LCP 3.1s, total blocking time 10ms, CLS 0.004. These are local lab results, not a guarantee for the deployed site or a substitute for assistive-technology testing. The local server used no text compression.
- Desktop and mobile screenshots were visually reviewed. Safari and Firefox were not run in this environment.

The original Create React App dependency set emits its existing Browserslist age notice; it does not block the build.
