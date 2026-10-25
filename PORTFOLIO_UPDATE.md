# Portrait, resume, and Bitulok access update

Updated on 26 October 2026 on the local `redesign` branch in `/private/tmp/ciao-portfolio-redesign`. The supplied `/CiaoMrnngstr/portfolio` path does not exist on this machine. The earlier redesign was still uncommitted, so this branch includes that work plus these updates. No push, Firebase deployment, or Vercel deployment was performed. `main` remains at `2768ff54877abc084d64a236c3e48b62a4b19f10`.

## Source files used

Both supplied files were found with the exact names requested:

- `~/Downloads/9F61131A-5AB4-4C2A-A325-74344007DC55.PNG` — original 1086×1448 portrait, copied to `src/assets/profile-portrait.png`.
- `~/Downloads/Jebzter_Catacutan_Internship_Resume (1).pdf` — 118,725 bytes, copied byte-for-byte to `public/cv.pdf`.

The optimized portrait is 800×1067: WebP **47,462 bytes**, JPEG fallback **72,863 bytes**. The circular hero uses `object-fit: cover` with `object-position: center 26%`, keeping white space above the hair, the gradient ring, and float animation. The OG image uses the same new portrait. The About section has no photo, and the favicon/app icons use the Ciao brand mark, so those did not need a portrait replacement. The two unused previous portrait assets were removed after checking references.

The CV URL is `/cv.pdf?v=6bd7cb9db426` and the browser download filename is `Jebzter_Catacutan_Resume.pdf`. Its SHA-256 is:

```text
6bd7cb9db4264997039d4a5bdbba144780f927debaa66b7673a655eaa5f9e3c6
```

The resume contains `cjebzter@gmail.com`. Following your explicit confirmation, the contact form, email/social links, no-JavaScript fallback, and related tests/docs now use that address. No other personal information changed.

## Verified web applications

Read from `~/Projects/bitulok-express/firebase.json` and `.firebaserc`; both respond to `curl -I` with **HTTP 200**, and their HTML titles identify the intended apps.

| Tile                 | Firebase target | Hosting site                 | Verified URL                               |
| -------------------- | --------------- | ---------------------------- | ------------------------------------------ |
| Admin Dashboard      | `admin`         | `bitulok-express-6aba0`      | https://bitulok-express-6aba0.web.app      |
| Restaurant Dashboard | `restaurant`    | `bitulok-express-restaurant` | https://bitulok-express-restaurant.web.app |

Titles: `Bitulok Express Admin` and `Bitulok Express Restaurant Partner`. Both applications already have deployments; no deploy command is required. The configured project is `bitulok-express-6aba0`.

If you later need to rebuild/redeploy either app, these commands match the actual repository configuration (they were **not run**):

```sh
cd ~/Projects/bitulok-express
npm --prefix admin run build
firebase deploy --only hosting:admin --project bitulok-express-6aba0
npm --prefix restaurant run build
firebase deploy --only hosting:restaurant --project bitulok-express-6aba0
```

## APKs found, deliberately not copied

No APKs remain under the current `mobile` or `rider` app build directories. The newest actual Customer and Rider builds are in the repository’s release artifacts:

| App      | Artifact                                                                             | Exact bytes |      Size | Verified Android identity                      |
| -------- | ------------------------------------------------------------------------------------ | ----------: | --------: | ---------------------------------------------- |
| Customer | `artifacts/Bitulok-Auth-2026-10-22-v6/Bitulok-Customer-1.0.5-v6-Auth-2026-10-22.apk` | 111,908,343 | 111.91 MB | `com.jebzter.bitulok`, version 1.0.5 (6)       |
| Rider    | `artifacts/Bitulok-Auth-2026-10-22-v6/Bitulok-Rider-1.0.5-v6-Auth-2026-10-22.apk`    | 120,813,080 | 120.81 MB | `com.jebzter.bitulok.rider`, version 1.0.5 (6) |

Paths are relative to `~/Projects/bitulok-express`. Sizes use decimal MB (1,000,000 bytes). Android package names and versions were checked with the installed Android build tools. Newer SMS diagnostic APKs were excluded because they are not the Customer or Rider applications.

Both real APKs exceed your **90 MB** limit. Neither was copied into this repository or staged. Their `url` values in `src/data/projects.js` remain `null`, and their tiles show **Coming soon**, with the real sizes. There are no fake download links. The existing PHINMA `public/myapp.apk` is byte-for-byte unchanged.

Use **GitHub Releases** for these existing files in `CiaoMrnngstr/bitulok-express`, then copy the returned, publicly accessible release-asset URLs into the Customer/Rider entries in `projects[0].links`. No release was created, no credentials were read/copied, and no release URLs were invented. The existing builds do not need to be rebuilt merely to host them.

For a future APK rebuild, the checked-in `preview` EAS profiles explicitly produce APKs. These commands match those profiles (not run):

```sh
cd ~/Projects/bitulok-express/mobile
npx --package eas-cli eas build --platform android --profile preview
cd ~/Projects/bitulok-express/rider
npx --package eas-cli eas build --platform android --profile preview
```

The `production` profiles generate AABs instead. Check any newly built file’s real size before considering a repo-local download.

## UI and hosting

`src/components/ProjectAccess.js` renders the links array on the featured card and inside its expanded details. It provides four responsive tiles, accessible action labels, real file sizes, disabled null links, secure new-tab web links, and the requested Android installation note. There is no demo-login line. Future configured APKs receive `download` filenames from their data entries.

`vercel.json` now adds APK MIME and attachment headers for `/downloads/*.apk` while preserving existing rewrites. The header configuration follows [Vercel’s header rules](https://vercel.com/docs/project-configuration/vercel-json#headers). CRA’s dev server does not apply Vercel-specific response headers; production headers can be verified after a future deployment. The download directory contains only a `.gitkeep` until suitably sized files are supplied.

## Files changed in this update

- `src/pages/Home.js`, `Home.css`: picture/fallback, crop, accessible alt text, CV filename.
- `src/assets/profile-portrait.png`, `src/assets/optimized/profile-portrait.webp`, `profile-portrait.jpg`: new portrait assets; two unused old portraits removed.
- `public/cv.pdf`, `public/og-image.png`, `public/index.html`: resume, refreshed social preview/cache version, fallback email.
- `src/data/profile.js`, `src/data/projects.js`: approved email, CV version/filename, verified web links and APK metadata.
- `src/components/ProjectCard.js`, `ProjectAccess.js`, `ProjectAccess.css`: four-tile panel on the card and expanded details.
- `public/downloads/.gitkeep`, `vercel.json`: download directory and headers.
- `src/App.test.js`, `src/utils/contact.test.js`, `src/components/ProjectAccess.test.js`: updated resume/email assertions and access-panel coverage.
- `REDESIGN.md`, `README.md`, `PORTFOLIO_UPDATE.md`: current configuration and handoff notes.

All other existing project data, screenshot assets, sections, content, and PHINMA download are preserved. No dependencies were added; installed dependencies already matched the unchanged package/lock files, so `npm ci` was not necessary.

## Running locally

The development server is left running with:

```sh
HOST=0.0.0.0 PORT=3001 BROWSER=none npm start
```

- Local: http://localhost:3001
- LAN / same-Wi-Fi phone: http://192.168.100.193:3001

Port 3000 belongs to a different project and was left alone. The LAN address is the real `en0` IPv4 address reported on this machine; the phone must be on the same network and the Mac must allow incoming connections.

## Checks

- `npm run build` passes.
- `CI=true npm test -- --watchAll=false --runInBand`: **15 tests in 4 suites pass**.
- Preserved `public/myapp.apk`, package files, all other existing assets, and non-Bitulok project data were verified against their previous bytes.
- The new PDF was compared with its source using SHA-256, not just its filename.
- Chromium browser checks pass at 360, 768, and 1440px in both themes; no horizontal overflow, browser errors, or automated WCAG A/AA findings.
- The hero stays circular at all widths; the 800×1067 WebP and JPEG fallback load correctly. The portrait and OG crop were visually reviewed.
- Clicking Download CV yields the exact source PDF with the requested filename; the browser-downloaded bytes match the SHA-256 above.
- Both dashboard tiles open new tabs at the verified app URLs and titles. APK tiles are disabled without dead links; the correct real APK files were identified by package name/version and size, but cannot be downloaded from the portfolio until hosted.
- Expanded project details also include the four tiles. The existing PHINMA APK still downloads byte-for-byte unchanged.
- The contact draft targets `cjebzter@gmail.com`; no email was sent.
- Both the local and LAN HTTP endpoints returned 200 from this machine. A physical phone was not connected during validation.
