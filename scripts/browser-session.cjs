/* Local Chrome/CDP helper. No browser automation or animation dependencies shipped. */
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const http = require('node:http');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.json': 'application/json' };

async function startBrowser(root, output) {
  fs.mkdirSync(output, { recursive: true });
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'jebzter-browser-'));
  const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = path.resolve(root, '.' + pathname);
    if (pathname === '/' || ['/about', '/projects', '/project', '/contact'].includes(pathname)) file = path.join(root, 'index.html');
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      res.writeHead(404); res.end('Not found'); return;
    }
    res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    fs.createReadStream(file).pipe(res);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = 'http://127.0.0.1:' + server.address().port;
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--disable-background-networking', '--disable-component-update',
    '--remote-debugging-port=0', '--user-data-dir=' + profile, 'about:blank',
  ], { stdio: 'ignore' });
  let socket;
  try {
    let port;
    for (let attempt = 0; attempt < 100; attempt++) {
      const portFile = path.join(profile, 'DevToolsActivePort');
      if (fs.existsSync(portFile)) { port = fs.readFileSync(portFile, 'utf8').split('\n')[0]; break; }
      await delay(100);
    }
    if (!port) throw new Error('Chrome did not start');
    const tabs = await (await fetch('http://127.0.0.1:' + port + '/json')).json();
    socket = new WebSocket(tabs.find(tab => tab.type === 'page').webSocketDebuggerUrl);
    await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }); });
    let sequence = 0;
    const pending = new Map();
    const events = [];
    socket.addEventListener('message', event => {
      const data = JSON.parse(event.data);
      if (!data.id) { events.push(data); return; }
      const entry = pending.get(data.id);
      if (!entry) return;
      clearTimeout(entry.timer); pending.delete(data.id);
      data.error ? entry.reject(new Error(JSON.stringify(data.error))) : entry.resolve(data.result);
    });
    function command(method, params = {}) {
      const id = ++sequence;
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => { pending.delete(id); reject(new Error('CDP timeout: ' + method)); }, 45000);
        pending.set(id, { resolve, reject, timer });
        socket.send(JSON.stringify({ id, method, params }));
      });
    }
    async function evaluate(expression) {
      const result = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
      return result.result.value;
    }
    async function navigate(url) {
      await command('Page.navigate', { url });
      await delay(500);
      for (let attempt = 0; attempt < 80; attempt++) {
        if (await evaluate('document.readyState === "complete"')) break;
        await delay(100);
      }
      await evaluate('document.fonts.ready.then(() => true)');
    }
    async function screenshot(name, full = false) {
      const dimensions = await evaluate('({width: innerWidth, height: document.documentElement.scrollHeight})');
      const params = { format: 'png', captureBeyondViewport: full };
      if (full) params.clip = { x: 0, y: 0, width: dimensions.width, height: dimensions.height, scale: 1 };
      const shot = await command('Page.captureScreenshot', params);
      fs.writeFileSync(path.join(output, name + '.png'), Buffer.from(shot.data, 'base64'));
    }
    async function close() {
      try { await command('Browser.close'); } catch { chrome.kill(); }
      socket.close();
      server.closeAllConnections();
      await new Promise(resolve => server.close(resolve));
    }
    await command('Page.enable'); await command('Runtime.enable'); await command('Network.enable'); await command('Log.enable');
    return { origin, command, evaluate, navigate, screenshot, events, close, delay, output };
  } catch (error) {
    socket?.close(); chrome.kill(); server.closeAllConnections(); server.close(); throw error;
  }
}
module.exports = { startBrowser, delay };
