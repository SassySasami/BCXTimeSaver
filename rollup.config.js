// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import fs from 'node:fs';
import path from 'node:path';

// Lis package.json pour alimenter la métadonnée
const pkg = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf8'));

// Utilise le nom lisible si disponible, sinon "MonModBC"
const NAME = pkg.userscriptName || 'MonModBC';
const AUTHOR = (pkg.author && (typeof pkg.author === 'string' ? pkg.author : pkg.author.name)) || 'Sassy';
const NAMESPACE = 'https://github.com/SassySasami/BCXTimeSaver';
const VERSION = pkg.version || '0.0.0';

// IMPORTANT: les URLs doivent pointer vers le .user.js final
const RAW = 'https://raw.githubusercontent.com/SassySasami/BCXTimeSaver/main/dist/mon-mod-bc.user.js';

// Astuce: vous pouvez aussi servir via jsDelivr (souvent des headers cache plus propres)
// const CDN = 'https://cdn.jsdelivr.net/gh/SassySasami/BCXTimeSaver@main/dist/mon-mod-bc.user.js';

const META_BLOCK = `
// ==UserScript==
// @name         ${NAME}
// @namespace    ${NAMESPACE}
// @version      ${VERSION}
// @description  Exemple de mod BC utilisant le Mod SDK
// @author       ${AUTHOR}
// @match        https://*.bondageprojects.elementfx.com/R*/*
// @match        https://*.bondage-europe.com/R*/*
// @match        https://*.bondageprojects.com/R*/*
// @match        https://*.bondage-asia.com/Club/R*
// @match        http://localhost:*/*
// @grant        none
// @run-at       document-start
// @updateURL    ${RAW}
// @downloadURL  ${RAW}
// @supportURL   ${NAMESPACE}/issues
// ==/UserScript==
`.trim() + '\n';

const basePlugins = [
  resolve({ browser: true }),
  commonjs(),
  // Assure qu'on n'émet pas de BOM en tête (BOM casserait la détection Userscript)
  typescript({ tsconfig: './tsconfig.json', sourceMap: false }),
  terser(),
];

/** Config commune: met la bannière en tout premier via output.banner */
const userscriptOutput = {
  file: 'dist/mon-mod-bc.user.js',
  format: 'iife',
  name: 'MonModBCBundle',
  sourcemap: false,
  banner: META_BLOCK,
};

const iifeOutput = {
  file: 'dist/mon-mod-bc.iife.js',
  format: 'iife',
  name: 'MonModBCBundle',
  sourcemap: false,
  // on peut aussi mettre la bannière ici si tu veux la même en-tête dans la version iife
  // banner: META_BLOCK,
};

export default [
  {
    input: 'src/main.ts',
    output: userscriptOutput,
    plugins: basePlugins,
    treeshake: true,
  },
  {
    input: 'src/main.ts',
    output: iifeOutput,
    plugins: basePlugins,
    treeshake: true,
  },
];
