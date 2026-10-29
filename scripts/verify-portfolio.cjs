/* Browser QA for the production build. Uses installed Chrome and axe-core only. */
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { startBrowser } = require("./browser-session.cjs");

const root = path.resolve(__dirname, "..");
const output = process.env.PORTFOLIO_QA_DIR || "/private/tmp/jebzter-editorial-qa";
const widths = [360, 390, 430, 768, 1024, 1280, 1440];
const report = { viewports: [], interactions: [], browserErrors: [], externalRequests: [] };
const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
let browser;

async function main() {
  browser = await startBrowser(path.join(root, "build"), output);
  const { command, evaluate, navigate, screenshot, delay } = browser;
  await command("Page.addScriptToEvaluateOnNewDocument", { source: `
    window.__portfolioCLS = 0;
    new PerformanceObserver((list) => list.getEntries().forEach((entry) => {
      if (!entry.hadRecentInput) window.__portfolioCLS += entry.value;
    })).observe({ type: "layout-shift", buffered: true });
  ` });
  await command("Emulation.setDeviceMetricsOverride", {
    width: 1440, height: 1000, deviceScaleFactor: 2, mobile: false,
  });
  console.log("QA: opening production build");
  await navigate(browser.origin + "/");
  console.log("QA: injecting accessibility checks");
  await evaluate(fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8"));
  console.log("QA: preparing images and reveal states");
  await evaluate(`document.querySelectorAll("img").forEach((image) => { image.loading = "eager"; })`);
  await delay(1200);
  await evaluate(`document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"))`);
  await delay(250);
  report.initialLayoutShift = await evaluate("window.__portfolioCLS");

  const axe = () => evaluate(`axe.run(document, {
    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] }
  }).then((result) => result.violations.map((violation) => ({
    id: violation.id, impact: violation.impact, nodes: violation.nodes.map((node) => node.target)
  })))`);

  const pageState = () => evaluate(`(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    projectCount: document.querySelectorAll("#projects > article, #projects .work-archive > article").length,
    phoneLinks: document.querySelectorAll('a[href^="tel:"]').length,
    brokenImages: [...document.images].filter((image) => !image.naturalWidth).map((image) => image.src),
    noDimensions: [...document.images].filter((image) => !image.hasAttribute("width") || !image.hasAttribute("height")).map((image) => image.src),
    portrait: (() => {
      const image = document.querySelector(".portrait-photo-frame img");
      const frame = document.querySelector(".portrait-photo-frame");
      const panel = document.querySelector(".portrait-image");
      const caption = document.querySelector(".portrait-side");
      const availability = document.querySelector(".availability");
      if (!image || !frame || !panel || !caption || !availability) return { missing: true };
      const style = getComputedStyle(image);
      const rect = image.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      const captionRect = caption.getBoundingClientRect();
      const availabilityRect = availability.getBoundingClientRect();
      return {
        alt: image.alt,
        width: image.getAttribute("width"),
        height: image.getAttribute("height"),
        filter: style.filter,
        mixBlendMode: style.mixBlendMode,
        objectPosition: style.objectPosition,
        panelBackground: getComputedStyle(panel).backgroundImage,
        frameBackground: getComputedStyle(frame).backgroundColor,
        imageBackground: style.backgroundImage,
        beforeContent: getComputedStyle(panel, "::before").content,
        afterContent: getComputedStyle(panel, "::after").content,
        captionWritingMode: getComputedStyle(caption).writingMode,
        captionOverlapsPhoto: captionRect.left < rect.right && captionRect.right > rect.left && captionRect.top < rect.bottom && captionRect.bottom > rect.top,
        availabilityOverlapsPanel: availabilityRect.top < panelRect.bottom,
        renderedWidth: rect.width,
        naturalWidth: image.naturalWidth,
      };
    })(),
    smallTargets: [...document.querySelectorAll("button,a,summary,input,textarea")]
      .filter((element) => element.getClientRects().length && getComputedStyle(element).visibility !== "hidden" && !element.closest("dialog:not([open])") && !element.classList.contains("skip-link"))
      .filter((element) => { const rect = element.getBoundingClientRect(); return rect.width < 43.5 || rect.height < 43.5; })
      .map((element) => ({ label: element.getAttribute("aria-label") || element.textContent.trim(), width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height }))
  }))()`);

  for (const width of widths) {
    await command("Emulation.setDeviceMetricsOverride", {
      width, height: width < 700 ? 844 : 1000, deviceScaleFactor: 2, mobile: width < 700,
    });
    for (const theme of ["light", "dark"]) {
      console.log(`QA: ${width}px ${theme}`);
      await evaluate(`document.documentElement.dataset.theme = ${JSON.stringify(theme)}; window.scrollTo({top:0,behavior:"instant"})`);
      await delay(100);
      const state = await pageState();
      const shouldScanAccessibility = [360, 768, 1440].includes(width);
      if (shouldScanAccessibility) console.log(`QA: accessibility scan ${width}px ${theme}`);
      const violations = shouldScanAccessibility ? await axe() : [];
      report.viewports.push({ width, theme, ...state, accessibilityScanned: shouldScanAccessibility, violations });
      assert.equal(state.scrollWidth, width, `Horizontal overflow at ${width}px ${theme}`);
      assert.equal(state.projectCount, 5);
      assert.equal(state.phoneLinks, 0);
      assert.deepEqual(state.brokenImages, [], `Broken images at ${width}px ${theme}`);
      assert.deepEqual(state.noDimensions, [], `Images need dimensions at ${width}px ${theme}`);
      assert.deepEqual(state.smallTargets, [], `Small tap targets at ${width}px ${theme}`);
      assert.equal(state.portrait.missing, undefined, `Hero portrait missing at ${width}px ${theme}`);
      assert.match(state.portrait.alt, /Jebzter Catacutan.*white studio background/i);
      assert.equal(state.portrait.width, "640");
      assert.equal(state.portrait.height, "854");
      assert.equal(state.portrait.filter, "none", `Portrait filter present at ${width}px ${theme}`);
      assert.equal(state.portrait.mixBlendMode, "normal", `Portrait blend mode present at ${width}px ${theme}`);
      assert.match(state.portrait.panelBackground, /gradient/i, `Portrait panel missing at ${width}px ${theme}`);
      assert.equal(state.portrait.frameBackground, "rgb(255, 255, 255)");
      assert.equal(state.portrait.imageBackground, "none", `Portrait image has a background overlay at ${width}px ${theme}`);
      assert.equal(state.portrait.beforeContent, "none", `Portrait before overlay present at ${width}px ${theme}`);
      assert.equal(state.portrait.afterContent, "none", `Portrait after overlay present at ${width}px ${theme}`);
      assert.equal(state.portrait.captionWritingMode, "vertical-rl");
      assert.equal(state.portrait.captionOverlapsPhoto, false, `Portrait caption overlays photo at ${width}px ${theme}`);
      assert.equal(state.portrait.availabilityOverlapsPanel, true, `Next chapter card no longer overlaps at ${width}px ${theme}`);
      assert.ok(state.portrait.naturalWidth >= state.portrait.renderedWidth * 2, `Portrait is not retina-sharp at ${width}px ${theme}`);
      if (shouldScanAccessibility) assert.deepEqual(violations, [], `Accessibility violations at ${width}px ${theme}`);
      if ([360, 768, 1440].includes(width)) await screenshot(`${width}-${theme}-hero`);
      console.log(`PASS layout/a11y: ${width}px ${theme}`);
    }
  }

  async function key(key, modifiers = 0) {
    const codes = { Escape: 27, Tab: 9, Enter: 13, ArrowDown: 40, ArrowRight: 39, k: 75 };
    await command("Input.dispatchKeyEvent", { type: "keyDown", key, code: key === "k" ? "KeyK" : key, windowsVirtualKeyCode: codes[key], modifiers });
    await command("Input.dispatchKeyEvent", { type: "keyUp", key, code: key === "k" ? "KeyK" : key, windowsVirtualKeyCode: codes[key], modifiers });
    await delay(80);
  }
  async function click(selector) {
    await evaluate(`(() => {
      const element = document.querySelector(${JSON.stringify(selector)});
      if (!element) throw new Error("Missing selector: " + ${JSON.stringify(selector)});
      element.scrollIntoView({behavior:"instant",block:"center"}); element.focus(); element.click();
    })()`);
    await delay(120);
  }

  await command("Emulation.setDeviceMetricsOverride", {
    width: 390, height: 844, deviceScaleFactor: 1, mobile: true,
  });
  await click(".theme-toggle");
  const savedTheme = await evaluate(`localStorage.getItem("ciao-theme")`);
  await navigate(browser.origin + "/");
  await evaluate(fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8"));
  assert.equal(await evaluate(`document.documentElement.dataset.theme`), savedTheme);
  report.interactions.push("Theme preference persists after reload");

  await click(".menu-trigger");
  assert.equal(await evaluate(`!!document.querySelector(".navigation-modal[open]") && document.querySelector(".navigation-modal").contains(document.activeElement)`), true);
  await evaluate(`document.querySelector(".navigation-modal nav a:last-child").focus()`);
  await key("Tab");
  assert.equal(await evaluate(`document.activeElement.getAttribute("aria-label")`), "Close Navigation");
  await key("Escape");
  assert.equal(await evaluate(`!document.querySelector(".navigation-modal") && document.activeElement.classList.contains("menu-trigger")`), true);
  await click(".menu-trigger");
  await click('.navigation-modal a[href="#journey"]');
  assert.equal(await evaluate(`location.hash`), "#journey");
  report.interactions.push("Mobile menu focus trap, Escape, focus return, and navigation");

  for (const modifiers of [2, 4]) {
    await key("k", modifiers);
    assert.equal(await evaluate(`document.activeElement.getAttribute("role")`), "combobox");
    await key("Escape");
  }
  await click(".command-trigger");
  await command("Input.insertText", { text: "Fitness" });
  await key("Enter");
  assert.equal(await evaluate(`document.getElementById("case-fitness-tracker").open`), true);
  assert.equal(await evaluate(`location.hash`), "#project-fitness-tracker");
  await click(".command-trigger");
  await command("Input.insertText", { text: "does not exist" });
  assert.equal(await evaluate(`document.querySelectorAll('[role="option"]').length`), 0);
  await key("Escape");
  report.interactions.push("Ctrl/Cmd+K, search, keyboard selection, and empty state");

  for (const title of ["Admin", "Restaurant", "Customer", "Rider", "Firebase", "Google Maps", "Sender", "Hostinger"]) {
    await evaluate(`(() => {
      const node = [...document.querySelectorAll(".architecture-node")].find((button) => button.querySelector("strong")?.textContent === ${JSON.stringify(title)});
      if (!node) throw new Error("Missing architecture node");
      node.click();
    })()`);
    assert.equal(await evaluate(`document.querySelectorAll('.architecture-node[aria-pressed="true"]').length`), 1);
    assert.ok((await evaluate(`document.getElementById("architecture-detail").textContent.trim().length`)) > 50);
  }
  report.interactions.push("All eight Bitulok architecture nodes update their explanation");

  for (const id of ["bitulok-express", "fitness-tracker", "phinma", "pmcca", "kicks"]) {
    await evaluate(`document.getElementById(${JSON.stringify("case-" + id)}).open = true`);
  }
  await evaluate(`document.querySelectorAll("img").forEach((image) => { image.loading = "eager"; })`);
  await delay(1200);
  for (const width of [360, 768, 1440]) {
    await command("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 2, mobile: width < 700 });
    assert.equal(await evaluate(`document.documentElement.scrollWidth`), width);
    assert.deepEqual(await axe(), []);
  }
  await screenshot("1440-case-studies", true);
  report.interactions.push("All five case studies expand responsively");

  await command("Emulation.setDeviceMetricsOverride", {
    width: 390, height: 844, deviceScaleFactor: 1, mobile: true,
  });
  await click(".gallery-tabs button:nth-child(2)");
  await click(".phone-frame");
  assert.match(await evaluate(`document.querySelector(".image-viewport img").alt`), /exercise library/);
  await key("ArrowRight");
  assert.match(await evaluate(`document.querySelector(".image-viewport img").alt`), /challenge generator/);
  await click('[aria-label="Zoom image"]');
  assert.equal(await evaluate(`document.querySelector(".image-viewport").classList.contains("zoomed")`), true);
  await key("Escape");
  assert.equal(await evaluate(`document.activeElement.classList.contains("phone-frame") && document.body.style.overflow === ""`), true);
  report.interactions.push("Phone gallery selection, arrow navigation, zoom, Escape, and focus return");

  await click(".qualification .text-link");
  assert.ok(await evaluate(`document.querySelector(".image-viewport img").naturalWidth > 0`));
  await key("Escape");
  assert.equal(await evaluate(`document.querySelector(".tesda-qualification").querySelectorAll("img,a,button,iframe,embed,object").length`), 0);
  await click(".resume-preview");
  assert.ok(await evaluate(`document.querySelector(".image-viewport img").naturalWidth > 0`));
  await key("Escape");
  report.interactions.push("Certificate and CV previews work; TESDA remains text-only");

  const downloadDir = path.join(output, "downloads");
  fs.mkdirSync(downloadDir, { recursive: true });
  await command("Page.setDownloadBehavior", { behavior: "allow", downloadPath: downloadDir });
  await click(".resume-copy a[download]");
  const cv = path.join(downloadDir, "Jebzter_Catacutan_cv.pdf");
  for (let attempt = 0; attempt < 100 && !fs.existsSync(cv); attempt += 1) await delay(100);
  assert.ok(fs.existsSync(cv), "CV was not downloaded");
  assert.equal(sha256(cv), sha256(path.join(root, "public/cv.pdf")));
  assert.equal((await fetch(browser.origin + "/myapp.apk")).status, 200);
  report.cvDownload = { filename: path.basename(cv), bytes: fs.statSync(cv).size };
  report.interactions.push("CV filename and bytes match; Android APK returns HTTP 200");

  await click('.contact-form button[type="submit"]');
  assert.equal(await evaluate(`document.activeElement.id`), "contact-name");
  await evaluate(`(() => {
    [["contact-name","Browser QA"],["contact-email","qa@example.com"],["contact-message","A local test draft, never sent."]].forEach(([id,value]) => {
      const element = document.getElementById(id);
      Object.getOwnPropertyDescriptor(Object.getPrototypeOf(element), "value").set.call(element, value);
      element.dispatchEvent(new Event("input", {bubbles:true}));
    });
  })()`);
  await click('.contact-form button[type="submit"]');
  assert.match(await evaluate(`document.querySelector(".form-status a").href`), /^mailto:cjebzter@gmail\.com\?/);
  report.interactions.push("Contact validation and email draft work without sending a message");

  await command("Emulation.setEmulatedMedia", { features: [{name:"prefers-reduced-motion", value:"reduce"}] });
  assert.equal(await evaluate(`getComputedStyle(document.documentElement).scrollBehavior`), "auto");
  assert.equal(await evaluate(`getComputedStyle(document.querySelector(".phone-frame")).transitionDuration`), "0s");
  await navigate(browser.origin + "/projects");
  assert.equal(await evaluate(`location.hash`), "#projects");
  report.interactions.push("Reduced motion and legacy route behave correctly");

  report.externalRequests = browser.events.filter((event) => event.method === "Network.requestWillBeSent")
    .map((event) => event.params.request.url).filter((url) => /^https?:/.test(url) && !url.startsWith(browser.origin));
  report.browserErrors = browser.events.filter((event) =>
    event.method === "Runtime.exceptionThrown" ||
    (event.method === "Log.entryAdded" && event.params.entry.level === "error") ||
    (event.method === "Network.responseReceived" && event.params.response.status >= 400),
  ).map((event) => event.params);
  assert.deepEqual(report.externalRequests, [], "Unexpected external runtime request");
  assert.deepEqual(report.browserErrors, [], "Browser console or HTTP error");
  assert.ok(report.initialLayoutShift < 0.01, `Initial layout shift too high: ${report.initialLayoutShift}`);
  console.log(`PASS: ${report.viewports.length} viewport/theme checks and ${report.interactions.length} interaction groups. CLS: ${report.initialLayoutShift}`);
}

main().catch((error) => {
  report.failure = error.stack;
  console.error(error);
  process.exitCode = 1;
}).finally(async () => {
  fs.mkdirSync(output, { recursive: true });
  fs.writeFileSync(path.join(output, "report.json"), JSON.stringify(report, null, 2));
  if (browser) await browser.close();
});
