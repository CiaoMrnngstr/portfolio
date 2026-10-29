/* Local production-build checks using Chrome's DevTools Protocol, with no added dependencies. */
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const output = process.env.PORTFOLIO_QA_DIR || '/private/tmp/portfolio-qa';
fs.mkdirSync(path.join(output, 'screenshots'), { recursive: true });
const mime = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.pdf': 'application/pdf' };
const server = http.createServer((req, res) => {
  const relative = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  let file = path.resolve(root, 'build', '.' + relative);
  if (!file.startsWith(path.join(root, 'build') + path.sep)) file = path.join(root, 'build/index.html');
  if (['/about', '/project', '/projects', '/contact'].includes(relative)) file = path.join(root, 'build/index.html');
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end('Not found'); return; }
  res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let chrome, socket, sequence = 0;
const pending = new Map();
const errors = [];
const interactionsOnly = process.env.PORTFOLIO_QA_INTERACTIONS === '1';
const priorViewports = interactionsOnly && fs.existsSync(path.join(output, 'report.json')) ? JSON.parse(fs.readFileSync(path.join(output, 'report.json'))).viewports : [];
const report = { viewports: priorViewports, interactions: [], errors };
async function command(method, params = {}) {
  const id = ++sequence;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => { pending.delete(id); reject(new Error('CDP timeout: ' + method)); }, 15000);
    pending.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const result = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text + ': ' + result.exceptionDetails.exception?.description);
  return result.result.value;
}
async function key(key, code = key) {
  await command('Input.dispatchKeyEvent', { type: 'keyDown', key, code, windowsVirtualKeyCode: { Escape: 27, Tab: 9, ArrowRight: 39 }[key] });
  await command('Input.dispatchKeyEvent', { type: 'keyUp', key, code });
  await delay(80);
}
async function screenshot(name, selector) {
  await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({behavior:'instant',block:'start'})`);
  await delay(750);
  await evaluate(`Promise.all([...document.querySelectorAll(${JSON.stringify(selector + ' img')})].map(i => i.decode().catch(() => {})))`);
  const clip = await evaluate(`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return {x:0,y:Math.max(0,r.top+scrollY),width:innerWidth,height:r.height,scale:1}})()`);
  const result = await command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip });
  fs.writeFileSync(path.join(output, 'screenshots', name + '.png'), Buffer.from(result.data, 'base64'));
}
async function main() {
  await new Promise(resolve => server.listen(4173, '127.0.0.1', resolve));
  chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=9229', '--user-data-dir=' + path.join(output, 'chrome-profile'), 'about:blank'], { stdio: 'ignore' });
  let tabs;
  for (let attempt = 0; attempt < 80; attempt++) {
    try { tabs = await (await fetch('http://127.0.0.1:9229/json')).json(); break; } catch { await delay(150); }
  }
  if (!tabs) throw new Error('Chrome did not start');
  socket = new WebSocket(tabs.find(tab => tab.type === 'page').webSocketDebuggerUrl);
  await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
  socket.addEventListener('message', event => {
    const data = JSON.parse(event.data);
    if (data.id) {
      const waiting = pending.get(data.id);
      if (!waiting) return;
      clearTimeout(waiting.timer); pending.delete(data.id);
      data.error ? waiting.reject(new Error(JSON.stringify(data.error))) : waiting.resolve(data.result);
    } else if (data.method === 'Runtime.exceptionThrown') errors.push(data.params.exceptionDetails.text);
    else if (data.method === 'Log.entryAdded' && data.params.entry.level === 'error') errors.push(data.params.entry.text);
    else if (data.method === 'Network.responseReceived' && data.params.response.status >= 400) errors.push(`${data.params.response.status}: ${data.params.response.url}`);
  });
  await command('Page.enable'); await command('Runtime.enable'); await command('Log.enable'); await command('Network.enable');
  await command('Page.navigate', { url: 'http://127.0.0.1:4173/' });
  await delay(1800);
  await evaluate(fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8'));
  for (const width of interactionsOnly ? [] : [360, 390, 430, 768, 1024, 1280]) {
    await command('Emulation.setDeviceMetricsOverride', { width, height: width < 600 ? 844 : 900, deviceScaleFactor: 1, mobile: width < 600 });
    for (const theme of ['dark', 'light']) {
      await evaluate(`document.documentElement.dataset.theme=${JSON.stringify(theme)}`);
      for (const section of ['home', 'about', 'tech-stack', 'projects', 'certifications', 'contact']) {
        await evaluate(`document.getElementById(${JSON.stringify(section)}).scrollIntoView({behavior:'instant'})`);
        await delay(160);
      }
      await evaluate(`Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{})}))`);
      const state = await evaluate(`({ width:innerWidth, scrollWidth:document.documentElement.scrollWidth, brokenImages:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src), projects:[...document.querySelectorAll('.project-card h3')].map(e=>e.textContent), certificateCount:document.querySelectorAll('.certificate-card').length, tesdaMedia:document.querySelector('.certificate-text-only').querySelectorAll('img,a,button,iframe,embed,object').length, smallTargets:[...document.querySelectorAll('button,a,summary,input')].filter(e=>e.getClientRects().length && getComputedStyle(e).visibility!=='hidden' && !e.classList.contains('skip-link')).filter(e=>e.getBoundingClientRect().height<43.5).map(e=>({label:e.getAttribute('aria-label')||e.textContent.trim(),height:e.getBoundingClientRect().height})) })`);
      assert.equal(state.width, state.scrollWidth, `Horizontal overflow at ${width} ${theme}`);
      assert.deepEqual(state.brokenImages, []);
      assert.equal(state.projects.length, 5); assert.equal(state.certificateCount, 5); assert.equal(state.tesdaMedia, 0);
      assert.deepEqual(state.smallTargets, [], `Small targets at ${width} ${theme}`);
      const accessibility = await evaluate(`axe.run(document, {runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}}).then(r=>r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})))`);
      assert.deepEqual(accessibility, [], `Accessibility violations at ${width} ${theme}`);
      state.accessibilityViolations = accessibility;
      report.viewports.push({ width, theme, ...state });
      if ([390, 768, 1280].includes(width)) {
        for (const [section, selector] of Object.entries({ home: '#home', projects: '#projects', fitness: '.fitness-project', certifications: '#certifications', contact: '#contact' })) {
          await screenshot(`${width}-${theme}-${section}`, selector);
        }
      }
      console.log(`Layout OK: ${width}px ${theme}`);
    }
  }
  await command('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await evaluate(`document.querySelector('.theme-toggle').click()`);
  const savedTheme = await evaluate(`localStorage.getItem('ciao-theme')`);
  await command('Page.reload'); await delay(800);
  assert.equal(await evaluate(`document.documentElement.dataset.theme`), savedTheme);
  report.interactions.push('Theme preference persists after reload');
  await evaluate(`document.querySelector('.menu-toggle').focus();document.querySelector('.menu-toggle').click()`);
  assert.equal(await evaluate(`document.querySelector('#mobile-menu').open && document.querySelector('#mobile-menu').contains(document.activeElement)`), true);
  await key('Escape');
  assert.equal(await evaluate(`!document.querySelector('#mobile-menu').open && document.activeElement.classList.contains('menu-toggle')`), true);
  await evaluate(`document.querySelector('.menu-toggle').click();document.querySelector('.mobile-menu a[href="#certifications"]').click()`);
  for (let attempt=0;attempt<40;attempt++) {
    if (await evaluate(`document.querySelector('.desktop-nav a[aria-current="location"]').getAttribute('href')==='#certifications'`)) break;
    await delay(100);
  }
  assert.equal(await evaluate(`document.querySelector('.desktop-nav a[aria-current="location"]').getAttribute('href')`), '#certifications');
  report.interactions.push('Mobile menu opens, contains focus, closes on Escape, restores focus, and navigates to Certifications');
  await evaluate(`document.querySelector('.phone-shot').scrollIntoView({behavior:'instant'});document.querySelector('.phone-shot').focus();document.querySelector('.phone-shot').click()`);
  await delay(150);
  assert.equal(await evaluate(`document.querySelector('.image-lightbox').open && document.body.style.overflow==='hidden'`), true);
  await key('ArrowRight');
  assert.match(await evaluate(`document.querySelector('.image-lightbox img').alt`), /exercise library/);
  await evaluate(`document.querySelector('[aria-label="Zoom image"]').click()`);
  assert.equal(await evaluate(`!!document.querySelector('.lightbox-image.is-zoomed')`), true);
  await evaluate(`document.querySelector('[aria-label="Next image"]').focus()`);
  await key('Tab');
  assert.equal(await evaluate(`document.activeElement.getAttribute('aria-label')`), 'Fit image to screen');
  await key('Escape');
  assert.equal(await evaluate(`!document.querySelector('.image-lightbox') && document.activeElement.classList.contains('phone-shot') && document.body.style.overflow===''`), true);
  report.interactions.push('Image viewer opens, changes images by arrow key, zooms, traps focus, closes on Escape, and restores focus/scroll');
  await evaluate(`document.querySelector('[aria-label="Scroll screenshots right"]').click()`); await delay(650);
  assert.ok(await evaluate(`document.querySelector('.phone-track').scrollLeft>0`));
  await evaluate(`document.querySelector('[aria-label="Scroll screenshots left"]').click()`); await delay(650);
  await command('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 1 });
  await evaluate(`document.querySelector('.phone-track').scrollIntoView({behavior:'instant',block:'center'})`);
  const point = await evaluate(`(()=>{const r=document.querySelector('.phone-track').getBoundingClientRect();return {x:Math.min(330,r.right-20),y:Math.max(130,Math.min(600,r.top+150))}})()`);
  await command('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [point] });
  for (let step=1;step<=8;step++) { await command('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{x:point.x-step*25,y:point.y}] }); await delay(25); }
  await command('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await delay(650);
  assert.ok(await evaluate(`document.querySelector('.phone-track').scrollLeft>0`));
  report.interactions.push('Fitness gallery scroll controls and emulated touch swipe work');
  await evaluate(`document.querySelector('.certificate-preview').click()`);
  assert.equal(await evaluate(`document.querySelector('.image-lightbox img').getAttribute('src')`), '/images/certificates/oci-networking.webp');
  await key('Escape');
  report.interactions.push('Oracle certificate opens in image viewer; TESDA has no media or actions');
  await evaluate(`document.querySelectorAll('.filter-button')[2].click()`);
  assert.equal(await evaluate(`document.querySelectorAll('.project-card').length`), 3);
  await evaluate(`document.querySelector('.filter-button').click()`);
  assert.equal(await evaluate(`document.querySelectorAll('.project-card').length`), 5);
  await evaluate(`document.querySelector('.submit-button').click()`);
  assert.equal(await evaluate(`document.activeElement.id`), 'contact-name');
  assert.equal(await evaluate(`document.querySelector('a[href^="tel:"]').getAttribute('href')`), 'tel:+639561896602');
  report.interactions.push('Project filtering, invalid contact focus, and telephone destination work');
  for (const file of ['/cv.pdf', '/myapp.apk']) assert.equal((await fetch('http://127.0.0.1:4173' + file)).status, 200);
  report.interactions.push('CV and original PHINMA APK downloads return HTTP 200');
  await command('Emulation.setEmulatedMedia', { features: [{name:'prefers-reduced-motion',value:'reduce'}] });
  assert.equal(await evaluate(`getComputedStyle(document.documentElement).scrollBehavior`), 'auto');
  assert.equal(await evaluate(`getComputedStyle(document.querySelector('.project-card')).animationName`), 'none');
  report.interactions.push('Reduced motion disables smooth scrolling and card animations');
  await command('Page.navigate', { url: 'http://127.0.0.1:4173/projects' }); await delay(800);
  assert.equal(await evaluate(`location.hash`), '#projects');
  report.interactions.push('Legacy /projects route redirects to its section');
  assert.deepEqual(errors, []);
  fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
  console.log(`PASS: ${report.viewports.length} viewport/theme combinations; ${report.interactions.length} interaction checks. Screenshots: ${output}/screenshots`);
}
main().catch(error => { console.error(error); fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify({...report, failure:error.message}, null, 2)); process.exitCode=1; }).finally(async () => {
  socket?.close();
  chrome?.kill('SIGKILL');
  server.closeAllConnections?.();
  await new Promise(resolve => server.close(resolve));
  process.exit(process.exitCode || 0);
});
