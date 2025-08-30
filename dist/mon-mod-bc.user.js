// ==UserScript==
// @name         BCXTimeSaver
// @namespace    bcx
// @version      0.1.1
// @description  Helpers pour Bondage Clubbbbbb
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
// @downloadURL  https://raw.githubusercontent.com/SassySasami/BCXTimeSaver/main/dist/mon-mod-bc.user.js
// @homepageURL  https://github.com/SassySasami/BCXTimeSaver
// @supportURL   https://github.com/SassySasami/BCXTimeSaver/issues
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';

    const MOD_INFO = {
        name: 'BCXTimeSaver',
        fullName: 'BCX Time Saver',
        version: '0.1.0',
    };
    function findModSDK() {
        return globalThis.window?.bcModSDK;
    }
    function registerWithSDK(sdk) {
        if (!sdk)
            return;
        try {
            sdk.registerMod(MOD_INFO, { allowReplace: true });
            console.debug('[BCX TS] Mod enregistré via ModSDK:', MOD_INFO, 'SDK v', sdk.version);
        }
        catch (e) {
            console.warn('[BCX TS] registerMod a échoué (déjà pris ?):', e);
        }
    }

    // src/utils/waitForBCX.ts
    function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
    async function waitForBcxModApi(modName = 'BCX', timeoutMs = 20_000) {
        const start = Date.now();
        while (Date.now() - start < timeoutMs) {
            const getter = window.bcx?.getModApi;
            if (typeof getter === 'function') {
                try {
                    const api = await Promise.resolve(getter.call(window.bcx, modName));
                    if (api)
                        return api;
                }
                catch { /* continue */ }
            }
            await sleep(250);
        }
        throw new Error(`BCX getModApi("${modName}") introuvable après ${timeoutMs} ms`);
    }

    // src/rules.ts
    async function resolvePlayerId(api) {
        // Plusieurs formes possibles: api.player (objet), api.player() (fn), api.getPlayer()
        const pLike = typeof api.player === 'function' ? await api.player()
            : api.player ?? (await api.getPlayer?.());
        const id = pLike?.id;
        if (typeof id !== 'number')
            throw new Error('BCX: Player ID introuvable');
        return id;
    }
    async function getRulesFor(api, characterId) {
        // Priorité aux méthodes "actives"
        if (api.rules?.getActiveRulesFor)
            return (await api.rules.getActiveRulesFor(characterId)) ?? [];
        if (api.getActiveRulesFor)
            return (await api.getActiveRulesFor(characterId)) ?? [];
        // Fallback: on récupère tout puis on filtre active===true
        const all = (api.rules?.getRulesFor && (await api.rules.getRulesFor(characterId))) ||
            (api.getRulesFor && (await api.getRulesFor(characterId))) || [];
        return all.filter(r => r.active !== false);
    }
    async function getOwnActiveRules(api) {
        const meId = await resolvePlayerId(api);
        return getRulesFor(api, meId);
    }

    // src/main.ts
    async function boot() {
        try {
            const api = await waitForBcxModApi('BCX'); // <= clé: utilise window.bcx.getModApi('BCX')
            console.debug('[BCX TS] API récupérée via getModApi:', api?.version ?? '(sans version)');
            const panel = document.createElement('bcx-ts-panel');
            document.documentElement.appendChild(panel);
            panel.setStatus('Chargement des règles actives…');
            const rules = await getOwnActiveRules(api);
            panel.setData(rules);
            panel.setStatus(`${rules.length} règle(s) active(s)`);
            panel.addEventListener('bcx-ts-refresh', async () => {
                panel.setStatus('Rafraîchissement…');
                const fresh = await getOwnActiveRules(api);
                panel.setData(fresh);
                panel.setStatus(`${fresh.length} règle(s) active(s)`);
            });
        }
        catch (e) {
            console.error('[BCX TS] Erreur de boot:', e);
            alert('BCX Time Saver: impossible de démarrer (voir console).');
        }
    }
    registerWithSDK(findModSDK());
    if (document.readyState === 'loading')
        document.addEventListener('DOMContentLoaded', boot);
    else
        boot();

})();
