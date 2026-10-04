const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const home = read('index.html'), studio = read('ai-studio/index.html');
const context = { window: {} };
vm.runInNewContext(read('studio-content.js'), context);
test('Studio preview sits between About and Android catalog', () => {
  assert(home.indexOf('id="about"') < home.indexOf('id="ai-studio"'));
  assert(home.indexOf('id="ai-studio"') < home.indexOf('id="apps"'));
  assert.match(home, /href="\/ai-studio"/);
  assert.match(home, /Our Android apps/);
  for (const app of ['work-time-tracker.html', 'flow.html', 'focus-fox.html']) assert(home.includes(app));
});
test('All Studio strings have English and Russian translations', () => {
  for (const html of [home, studio]) {
    for (const [, key] of html.matchAll(/data-i18n="(studio_[^"]+)"/g)) {
      for (const lang of ['en', 'ru']) assert(context.window.MINIFOX_STUDIO[lang][key], `${lang}: ${key}`);
    }
  }
});
test('Local page assets and destination files exist', () => {
  for (const [file, html] of [['index.html', home], ['ai-studio/index.html', studio]]) {
    for (const [, url] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
      if (/^(#|https?:|mailto:)/.test(url)) continue;
      const clean = url.split(/[?#]/)[0];
      let target = clean.startsWith('/') ? path.join(root, clean) : path.resolve(root, path.dirname(file), clean);
      if (fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
      assert(fs.existsSync(target), `${file}: ${url}`);
    }
  }
});
test('Purchase control is a non-payment notice with accessible close', () => {
  assert.match(studio, /\$199/);
  assert.match(studio, /aria-controls="studioPurchaseDialog"/);
  assert.match(studio, /<dialog[^>]+aria-labelledby=/);
  assert.match(studio, /<form method="dialog">/);
  const js = read('ai-studio.js');
  assert.match(js, /showModal\(\)/);
  assert.match(js, /buy\.focus\(\)/);
  assert.doesNotMatch(js, /fetch\(|XMLHttpRequest|location\.(href|assign)|stripe|paypal/i);
});
test('Public additions contain no license keys or private endpoints', () => {
  for (const source of [studio, read('studio-content.js'), read('ai-studio.js')]) {
    assert.doesNotMatch(source, /MFL-AIST-[A-Z0-9-]+|localhost:3000|trycloudflare\.com|Bearer\s+[A-Za-z0-9]/);
  }
});
test('Nested page registers root worker and cache assets resolve', () => {
  assert.match(read('script.js'), /register\("\/sw\.js"\)/);
  for (const [, url] of read('sw.js').matchAll(/"\.\/([^"\n]*)"/g)) assert(fs.existsSync(path.join(root, url)), url);
  assert.match(read('sitemap.xml'), /https:\/\/minifoxlabs.com\/ai-studio\//);
});
