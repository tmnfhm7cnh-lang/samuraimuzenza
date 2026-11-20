/*
 * Static server for checking the app in a real browser.
 *
 *   node tools/serve.mjs [port]     default 8110
 *
 * No dependencies and no build step: the files served are the files shipped.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const ROOT = path.dirname(path.dirname(url.fileURLToPath(import.meta.url)));
const PORT = Number(process.argv[2]) || 8110;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.css': 'text/css; charset=utf-8', '.pdf': 'application/pdf',
};

http
  .createServer((req, res) => {
    const rel = decodeURIComponent(req.url.split('?')[0]);
    // Folders serve their index.html, like GitHub Pages does.
    const file = path.resolve(ROOT, '.' + (rel.endsWith('/') ? rel + 'index.html' : rel));
    // path.resolve normalises the separators, so this also stops ../ escaping the folder.
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 ' + rel);
    }
    res.writeHead(200, {
      'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, () => console.log(`samuraimuzenza at http://localhost:${PORT}`));
