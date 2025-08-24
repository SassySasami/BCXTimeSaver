// rollup.config.js (ESM)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

// --- utils
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const readJSON = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const pkg = readJSON(path.join(__dirname, 'package.json'));

// Fallbacks to keep header robust even if fields are missing
const NAME = pkg.userscript?.name || pkg.displayName || pkg.name || 'MonModBC';
const NAMESPACE = pkg.userscript?.namespace || pkg.repository?.url || `https://github.com/${pkg.author || 'you'}/${pkg.name || 'repo'}`;
const VERSION = pkg.version || '0.0.0';
const DESCRIPTION = pkg.description || 'BCX mod/userscript';
const AUTHOR = (typeof pkg.author === 'string' ? pkg.author : pkg.author?.name) || 'Anonymous';

// Update/Download URLs: point to RAW by default (works with Tampermonkey auto-update)
const RAW_BASE = pkg.userscript?.rawBase
  || `https://raw.githubusercontent.com/SassySasami/BCXTimeSaver/main/dist/mon-mod-bc.user.js`;

const header = String.raw`
// ==UserScript==
// @name         ${NAME}
// @namespace    ${NAMESPACE}
// @version      ${VERSION}
// @description  ${DESCRIPTION}
// @author       ${AUTHOR}
// @match        https://*.bondageprojects.elementfx.com/R*/*
// @match        https://*.bondage-europe.com/R*/*
// @match        https://*.bondageprojects.com/R*/*
// @match        https://*.bondage-asia.com/Club/R*
// @match        http://localhost:*/*
// @grant        none
// @run-at       document-start
// @updateURL    ${RAW_BASE}
// @downloadURL  ${RAW_BASE}
// ==/UserScript==
`.trim(); // IMPORTANT: no leading whitespace/BOM before this in output

// Extra safety: ensure TS doesn’t emit BOM; enforce LF at source level via tsconfig.json
const tsPlugin = typescript({
  tsconfig: './tsconfig.json',
  sourceMap: false,
});

// Minimal plugin set
const basePlugins = [
  resolve({ browser: true }),
  commonjs(),
  tsPlugin,
  terser(),
];

/**
 * Two outputs:
 * 1) dist/mon-mod-bc.user.js → IIFE + Userscript header (install this in Tampermonkey)
 * 2) dist/mon-mod-bc.iife.js → IIFE only (no header), useful for embedding
 */
export default [
  // Userscript build (with header)
  {
    input: 'src/main.ts',
    output: {
      file: 'dist/mon-mod-bc.user.js',
      format: 'iife',
      name: 'MonModBCBundle',
      sourcemap: false,
      banner: header, // Rollup guarantees this is the first bytes of the file
      // No intro/outro to avoid anything before the banner
      intro: '',
      outro: '',
    },
    plugins: basePlugins,
    treeshake: true,
    onwarn(warning, warn) {
      // Hide "THIS_IS_UNDEFINED" noise; surface everything else
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      warn(warning);
    },
  },

  // Plain IIFE (no Userscript header)
  {
    input: 'src/main.ts',
    output: {
      file: 'dist/mon-mod-bc.iife.js',
      format: 'iife',
      name: 'MonModBCBundle',
      sourcemap: false,
      intro: '',
      outro: '',
    },
    plugins: basePlugins,
    treeshake: true,
    onwarn(warning, warn) {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      warn(warning);
    },
  },
];