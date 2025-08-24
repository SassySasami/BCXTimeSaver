# BCXTimeSaver

Userscript/Mod for Bondage Club.  
It detects the BCX API, enumerates available rules, and highlights those currently enforced.

## Install (Tampermonkey)

Prereqs:
- Desktop browser (Chrome, Firefox, Edge…)
- Tampermonkey (or Violentmonkey) extension

Steps:
1. Install/enable Tampermonkey in your browser.
2. Open the userscript URL (the `.user.js` file in `dist/`):
   - GitHub RAW:
     ```
     https://raw.githubusercontent.com/SassySasami/BCXTimeSaver/main/dist/mon-mod-bc.user.js
     ```
   - Optional: jsDelivr CDN (often less aggressive caching):
     ```
     https://cdn.jsdelivr.net/gh/SassySasami/BCXTimeSaver@main/dist/mon-mod-bc.user.js
     ```
3. Your browser should show Tampermonkey’s install page. Click “Install”.

The script runs on:
- `https://*.bondageprojects.elementfx.com/R*/*`
- `https://*.bondage-europe.com/R*/*`
- `https://*.bondageprojects.com/R*/*`
- `https://*.bondage-asia.com/Club/R*`
- and `http://localhost:*/*` (handy for local dev).

## Auto-updates

- Tampermonkey checks for updates periodically.
- An update is applied only if the `@version` in the userscript header changes.
- This repo generates the header from `package.json` (the `version` field) via Rollup.

Force an update:
1. In Tampermonkey: right‑click the script → “Check for updates”.
2. Or bump the version in the repo (see “Development”).

## Development

Install dependencies:
```bash
npm install
