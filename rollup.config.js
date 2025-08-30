import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

const meta = `// ==UserScript==
// @name         BCXTimeSaver
// @namespace    bcx
// @version      0.1.1
// @description  Helpers pour Bondage Club
// @match        https://*.bondageprojects.elementfx.com/R*/*
// @match        https://*.bondage-europe.com/R*/*
// @match        https://*.bondageprojects.com/R*/*
// @match        https://*.bondage-asia.com/Club/R*
// @exclude      https://raw.githubusercontent.com/*
// @exclude      https://cdn.jsdelivr.net/*
// @run-at       document-start
// @inject-into  page
// @grant        none
// @updateURL    https://raw.githubusercontent.com/SassySasami/BCXTimeSaver/main/dist/mon-mod-bc.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/SassySasami/BCXTimeSaver@main/dist/mon-mod-bc.user.js
// @homepageURL  https://github.com/SassySasami/BCXTimeSaver
// @supportURL   https://github.com/SassySasami/BCXTimeSaver/issues
// @license      MIT
// ==/UserScript==
`; // noter le \n final

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/mon-mod-bc.user.js',
    format: 'iife',
    sourcemap: false,
    banner: () => meta, // pas de trim; garde le header au 1er octet + newline final
  },
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
  ],
  treeshake: true,
};
