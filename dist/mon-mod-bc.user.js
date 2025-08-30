// ==UserScript==
// @name         BCX Time SaverRRR
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

(function () {
    'use strict';

    // bcx.ts
    function sameOriginWindows() {
        const set = new Set();
        const add = (w) => { try {
            if (w && w.window === w)
                set.add(w);
        }
        catch { } };
        add(window);
        try {
            add(window.top);
        }
        catch { }
        try {
            add(window.parent);
        }
        catch { }
        try {
            for (const f of Array.from(window.frames))
                add(f);
        }
        catch { }
        return [...set];
    }
    function findHostNow() {
        for (const w of sameOriginWindows()) {
            try {
                const host = w.bcx ?? w.BCX;
                if (host && typeof host === 'object')
                    return { host, owner: w };
            }
            catch { }
        }
        return {};
    }
    /**
     * Version async: attend que l’hôte soit prêt puis demande l’API de TON add‑on.
     * @param addonName Nom exact de ton add‑on (ex: 'BCX Time Saver').
     * @param timeoutMs Délai max en ms (par défaut 30s).
     */
    async function getBCXApi(addonName, timeoutMs = 30000) {
        const start = Date.now();
        const attempt = () => {
            const { host } = findHostNow();
            const getter = host?.getModApi ?? host?.getModuleApi;
            return typeof getter === 'function' ? getter.call(host, addonName) ?? undefined : undefined;
        };
        // essai immédiat
        const now = attempt();
        if (now)
            return now;
        // boucle d'attente
        return new Promise((resolve, reject) => {
            const tick = () => {
                const api = attempt();
                if (api)
                    return resolve(api);
                if (Date.now() - start > timeoutMs) {
                    const h = findHostNow().host;
                    const keys = h ? Object.keys(h).join(', ') : 'n/a';
                    return reject(new Error(`BCX non détecté: BCX API introuvable (same-origin). Diag: host=${!!h}, keys=${keys}, url=${location.href}`));
                }
                setTimeout(tick, 250);
            };
            tick();
        });
    }

    function buildUI() {
        const root = document.createElement("div");
        root.style.cssText = `
    position: fixed; right: 16px; bottom: 16px; z-index: 999999;
    background: rgba(0,0,0,.8); color: #fff; padding: 10px; border-radius: 8px;
    font: 13px/1.4 system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    width: 360px; box-shadow: 0 4px 24px rgba(0,0,0,.5);
  `;
        const title = document.createElement("div");
        title.textContent = "BCX TimeSaver — Règles";
        title.style.cssText = "font-weight: 600; margin-bottom: 8px;";
        const row = document.createElement("div");
        row.style.cssText = "display:flex; gap:6px; margin-bottom:6px;";
        const targetInput = document.createElement("input");
        targetInput.placeholder = "MemberNumber (vide = Player)";
        targetInput.style.cssText = `
    flex:1 1 auto; padding:4px 6px; border-radius:4px;
    border:1px solid #444; background:#111; color:#fff;
  `;
        const btnLoad = document.createElement("button");
        btnLoad.textContent = "Afficher";
        btnLoad.style.cssText = `
    flex:0 0 auto; padding:4px 8px; border-radius:4px;
    border:1px solid #666; background:#222; color:#fff; cursor:pointer;
  `;
        const btnRefresh = document.createElement("button");
        btnRefresh.textContent = "↻";
        btnRefresh.title = "Rafraîchir la liste des règles";
        btnRefresh.style.cssText = `
    flex:0 0 auto; padding:4px 8px; border-radius:4px;
    border:1px solid #666; background:#222; color:#fff; cursor:pointer;
  `;
        const status = document.createElement("div");
        status.textContent = "En attente de BCX…";
        status.style.cssText = "opacity:.85; margin-bottom:6px;";
        const legend = document.createElement("div");
        legend.innerHTML = `
    <span style="display:inline-block;width:10px;height:10px;background:#2ea043;border-radius:2px;margin-right:4px;vertical-align:middle;"></span>
    Enforced
    <span style="display:inline-block;width:10px;height:10px;background:#8b949e;border-radius:2px;margin:0 4px 0 12px;vertical-align:middle;"></span>
    In effect
    <span style="display:inline-block;width:10px;height:10px;background:#c69026;border-radius:2px;margin:0 4px 0 12px;vertical-align:middle;"></span>
    Logged
  `;
        legend.style.cssText = "opacity:.85; margin-bottom:6px;";
        const list = document.createElement("div");
        list.style.cssText = `
    max-height: 280px; overflow:auto; background: rgba(255,255,255,.06);
    padding:6px; border-radius:6px;
  `;
        row.appendChild(targetInput);
        row.appendChild(btnLoad);
        row.appendChild(btnRefresh);
        root.appendChild(title);
        root.appendChild(row);
        root.appendChild(status);
        root.appendChild(legend);
        root.appendChild(list);
        document.body.appendChild(root);
        return { root, status, list, targetInput, btnLoad, btnRefresh };
    }
    function renderRules(listEl, api, rules) {
        const frag = document.createDocumentFragment();
        listEl.innerHTML = "";
        if (!rules.length) {
            const empty = document.createElement("div");
            empty.textContent = "Aucune règle détectée. Clique sur ↻ pour réessayer.";
            listEl.appendChild(empty);
            return;
        }
        for (const id of rules) {
            const st = api.getRuleState(id);
            const row = document.createElement("div");
            row.style.cssText = `
      display:flex; gap:8px; align-items:center; margin:4px 0; padding:4px 6px; border-radius:6px;
      ${st?.isEnforced ? "background:rgba(46,160,67,.25); outline:1px solid rgba(46,160,67,.6);" : ""}
    `;
            const name = document.createElement("code");
            name.textContent = id;
            name.style.cssText = `
      background:rgba(0,0,0,.3); padding:2px 4px; border-radius:4px;
      ${st?.isEnforced ? "border:1px solid rgba(46,160,67,.6);" : ""}
    `;
            const badges = document.createElement("div");
            badges.style.cssText = "margin-left:auto; display:flex; gap:6px;";
            const bEnf = pill("Enforced", "#2ea043", st?.isEnforced);
            const bEff = pill("In effect", "#8b949e", st?.inEffect);
            const bLog = pill("Logged", "#c69026", st?.isLogged);
            badges.appendChild(bEnf);
            badges.appendChild(bEff);
            badges.appendChild(bLog);
            row.appendChild(name);
            row.appendChild(badges);
            frag.appendChild(row);
        }
        listEl.appendChild(frag);
    }
    function pill(label, color, on) {
        const el = document.createElement("span");
        el.textContent = label;
        el.style.cssText = `
    font-size:12px; padding:1px 6px; border-radius:999px;
    border:1px solid ${color}; color:${on ? "#fff" : color};
    background:${on ? color : "transparent"};
    opacity:${on ? "1" : ".7"};
  `;
        return el;
    }

    /**
     * Tente plusieurs chemins connus pour obtenir la liste des RuleId.
     * - API directe: api.listRules()
     * - Requêtes: api.sendQuery() avec quelques types usuels
     * - Fallback: exploration d’objets courants (si exposés)
     */
    async function enumerateAllRules(api) {
        // 1) API directe
        try {
            if (typeof api.listRules === "function") {
                const res = await Promise.resolve(api.listRules());
                if (Array.isArray(res) && res.every(r => typeof r === "string")) {
                    return unique(res);
                }
            }
        }
        catch {
            /* ignore */
        }
        // 2) Messages possibles via sendQuery
        if (typeof api.sendQuery === "function") {
            const candidates = [
                { type: "rules:listAll", data: {} },
                { type: "rules:list", data: {} },
                { type: "bcx:rules/list", data: {} },
                { type: "bcx:rules/all", data: {} },
            ];
            for (const c of candidates) {
                try {
                    const r = await api.sendQuery(c.type, c.data, "Player", 5000);
                    // Cas 2.a: r est un simple tableau de strings
                    if (Array.isArray(r) && r.every(x => typeof x === "string")) {
                        return unique(r);
                    }
                    // Cas 2.b: r.rules ou r.ids
                    if (r && Array.isArray(r.rules) && r.rules.every((x) => typeof x === "string")) {
                        return unique(r.rules);
                    }
                    if (r && Array.isArray(r.ids) && r.ids.every((x) => typeof x === "string")) {
                        return unique(r.ids);
                    }
                }
                catch {
                    // on essaie la suivante
                }
            }
        }
        // 3) Fallback best-effort: introspection d’objets connus si présents
        // NOTE: ceci ne cassera rien si absent; c’est purement opportuniste
        try {
            const anyWin = window;
            // Ex: anyWin.BCX?.api?.Rules?.ids ou .all
            const maybe = anyWin?.BCX?.api?.Rules;
            const fromObj = tryExtractIds(maybe);
            if (fromObj.length)
                return unique(fromObj);
        }
        catch {
            /* ignore */
        }
        // 4) Échec: renvoyer vide (UI affichera un message)
        return [];
    }
    function tryExtractIds(obj) {
        const out = [];
        if (!obj)
            return out;
        if (Array.isArray(obj)) {
            for (const x of obj)
                if (typeof x === "string")
                    out.push(x);
        }
        else if (typeof obj === "object") {
            // heuristiques: ids, all, list, rules
            const keys = ["ids", "all", "list", "rules"];
            for (const k of keys) {
                const v = obj[k];
                if (Array.isArray(v) && v.every((x) => typeof x === "string")) {
                    out.push(...v);
                }
            }
        }
        return out;
    }
    function unique(arr) {
        return Array.from(new Set(arr));
    }

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    var bcmodsdk = {};

    var hasRequiredBcmodsdk;

    function requireBcmodsdk () {
    	if (hasRequiredBcmodsdk) return bcmodsdk;
    	hasRequiredBcmodsdk = 1;
    	(function (exports) {
    		// Bondage Club Mod Development Kit (1.2.0)
    		// For more info see: https://github.com/Jomshir98/bondage-club-mod-sdk
    		/** @type {ModSDKGlobalAPI} */
    		(function(){const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return !!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o));}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name);}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return (0, eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c};}return {hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=!1){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else {let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o;}return ((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router;}return r}function d(){for(const o of i.values())o.precomputed=s(o);}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=!1,d();}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=void 0),void 0!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=!0===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||void 0===a?void 0:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d());}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d();})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d();})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:!0,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return (Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y})(); 
    	} (bcmodsdk));
    	return bcmodsdk;
    }

    var bcmodsdkExports = requireBcmodsdk();
    var bcModSDK = /*@__PURE__*/getDefaultExportFromCjs(bcmodsdkExports);

    // src/main.ts
    async function bootstrap() {
        const ui = buildUI();
        const MOD_NAME = 'BCXTimeSaver';
        try {
            const mod = bcModSDK.registerMod({
                name: MOD_NAME,
                fullName: 'Mon Mod Bondage Club',
                version: '0.3.0',
                repository: 'https://github.com/SassySasami/BCTest',
            });
            console.log('[MonModBC] Mod chargé via SDK:', mod);
        }
        catch (e) {
            console.warn('[MonModBC] SDK indisponible (non bloquant):', e);
        }
        try {
            const api = await getBCXApi('MOD_NAME', 30000); // mets le nom réel de ton add‑on
            ui.status.textContent = "BCX détecté. Récupération de toutes les règles…";
            let allRules = await enumerateAllRules(api);
            if (!allRules.length) {
                ui.status.textContent = "Impossible d’énumérer les règles (essaye ↻).";
            }
            else {
                ui.status.textContent = `Règles détectées: ${allRules.length}.`;
            }
            renderRules(ui.list, api, allRules);
            // Bouton Afficher: recharge l’état pour Player ou un member précis (affichage local des états)
            ui.btnLoad.addEventListener("click", async () => {
                const raw = ui.targetInput.value.trim();
                if (!raw) {
                    renderRules(ui.list, api, allRules);
                    return;
                }
                const member = Number(raw);
                if (!Number.isFinite(member)) {
                    ui.status.textContent = "MemberNumber invalide.";
                    return;
                }
                if (!api.sendQuery) {
                    ui.status.textContent = "api.sendQuery indisponible (affichage local uniquement).";
                    renderRules(ui.list, api, allRules);
                    return;
                }
                // Si tu veux réellement récupérer l’état d’un autre membre, il faudra connaître le message exact.
                // Ici, on envoie une requête “douce” pour inciter BCX à matérialiser/rafraîchir l’état côté local si applicable.
                try {
                    await api.sendQuery("rules:pulse", { rules: allRules.slice(0, 1) }, member, 3000).catch(() => { });
                }
                catch { }
                renderRules(ui.list, api, allRules);
                ui.status.textContent = `États affichés (local). Requête envoyée à #${member} si supportée.`;
            });
            // Bouton ↻: réénumère les règles (utile si un mod charge des règles après-coup)
            ui.btnRefresh.addEventListener("click", async () => {
                ui.status.textContent = "Récupération de toutes les règles…";
                allRules = await enumerateAllRules(api);
                ui.status.textContent = allRules.length
                    ? `Règles détectées: ${allRules.length}.`
                    : "Aucune règle détectée.";
                renderRules(ui.list, api, allRules);
            });
        }
        catch (err) {
            ui.status.textContent = `BCX non détecté: ${err?.message ?? err}`;
        }
    }
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", bootstrap, { once: true });
    }
    else {
        bootstrap();
    }

})();
