# samuraimuzenza.com

Landing page of the root domain. Static HTML and CSS, no scripts, no build step, served by GitHub Pages.

- `index.html`, `styles.css`, `favicon.svg`: the page. `entrenamiento-personal/`: services and prices.
- `img/`: photos, resized and stripped of metadata (ffmpeg `-map_metadata -1`).
- `fonts/archivo-latin.woff2`: Archivo (SIL Open Font License), variable width and weight, latin subset, self-hosted so no request goes to Google.
- `CNAME`: the custom domain (required by GitHub Pages).
- `tools/serve.mjs`: local static server, `node tools/serve.mjs` serves it on http://localhost:8110.

Subdomains are separate repositories (for example `anglelab.samuraimuzenza.com`). DNS lives in Cloudflare.
