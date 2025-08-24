import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

// En‑tête Userscript minimal (modifie @name/@match/@version si besoin)
const meta = `// ==UserScript==
// @name        BCX Time Saver
// @namespace   bcx
// @version     0.1.0
// @description Helpers pour Bondage Club
// @match       https://bondageprojects.*/*
// @match       https://www.bondageprojects.*/*
// @grant       none
// @updateURL   https://cdn.jsdelivr.net/gh/SassySasami/BCXTimeSaver@main/dist/mon-mod-bc.user.js
// @downloadURL https://cdn.jsdelivr.net/gh/SassySasami/BCXTimeSaver@main/dist/mon-mod-bc.user.js
// ==/UserScript==`;

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/mon-mod-bc.user.js',
    format: 'iife',          // Tampermonkey-friendly
    sourcemap: false,
    banner: meta.trim(),     // Assure que le fichier commence par // ==UserScript==
  },
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }), // ton tsconfig actuel convient
  ],
  treeshake: true,
};