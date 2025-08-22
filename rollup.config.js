// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser'; // ok si déjà installé
import banner2 from 'rollup-plugin-banner2';

const meta = `
// ==UserScript==
// @name         MonModBC
// @namespace    https://github.com/SassySasami/BCTest/main
// @version      0.1.1
// @description  Exemple de mod BC utilisant le Mod SDK
// @author       Sassy
// @match https://*.bondageprojects.elementfx.com/R*/*
// @match https://*.bondage-europe.com/R*/*
// @match https://*.bondageprojects.com/R*/*
// @match https://*.bondage-asia.com/Club/R*
// @match http://localhost:*/*
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/SassySasami/BCTest/main/dist/mon-mod-bc.user.js
// @downloadURL  https://raw.githubusercontent.com/SassySasami/BCTest/main/dist/mon-mod-bc.user.js
// ==/UserScript==
`.trim();

export default [
    // Build Userscript (optionnel)
    {
      input: 'src/main.ts',
      output: {
        file: 'dist/mon-mod-bc.user.js',
        format: 'iife',
        name: 'MonModBCBundle', // nom global (sans importance ici)
        sourcemap: false,
      },
      plugins: [
        resolve({ browser: true }),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json', sourceMap: false }),
        terser(),
        banner2(() => meta + '\n'),
      ],
      treeshake: true,
    },
  
    // Build “pur” pour FUSAM
    {
      input: 'src/main.ts',
      output: {
        file: 'dist/mon-mod-bc.iife.js',
        format: 'iife',
        name: 'MonModBCBundle',
        sourcemap: false,
      },
      plugins: [
        resolve({ browser: true }),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json', sourceMap: false }),
        terser(),
      ],
      treeshake: true,
    },
  ];
