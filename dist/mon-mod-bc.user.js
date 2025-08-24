// ==UserScript==
// @name        BCX Time Saver
// @namespace   bcx
// @version     0.1.0
// @description Helpers pour Bondage Club
// @match       https://bondageprojects.*/*
// @match       https://www.bondageprojects.*/*
// @grant       none
// @updateURL   https://cdn.jsdelivr.net/gh/SassySasami/BCXTimeSaver@main/dist/mon-mod-bc.user.js
// @downloadURL https://cdn.jsdelivr.net/gh/SassySasami/BCXTimeSaver@main/dist/mon-mod-bc.user.js
// ==/UserScript==
(function () {
    'use strict';

    // src/frames.ts
    /**
     * Enumère toutes les fenêtres same-origin à partir d'une racine.
     * Corrige TS2345: on ne pousse dans la pile que des Window non-undefined et same-origin.
     */
    function enumerateSameOriginWindows(root = window) {
        const result = [];
        const stack = [root];
        while (stack.length) {
            const w = stack.pop();
            result.push(w);
            // Parcours des frames de w
            const frames = w.frames;
            for (let i = 0; i < frames.length; i++) {
                const f = frames[i];
                if (!f)
                    continue; // garde de type
                try {
                    // Si cross-origin, l'accès à location.* lèvera une exception
                    // On teste same-origin via la comparaison d'origin
                    if (f.location && w.location && f.location.origin === w.location.origin) {
                        stack.push(f); // ici f est assuré Window
                    }
                }
                catch {
                    // cross-origin -> ignore
                }
            }
        }
        return result;
    }
    /** Renvoie la première fenêtre avec le même origin qui contient predicate(win) === true */
    function findWindow(predicate, root = window) {
        for (const w of enumerateSameOriginWindows(root)) {
            try {
                if (predicate(w))
                    return w;
            }
            catch {
                /* ignore */
            }
        }
        return undefined;
    }

    /** Détecte si une fenêtre contient un objet BCX utilisable */
    function probeBCX(win) {
        const host = win.BCX;
        if (!host)
            return undefined;
        // Essais: prioriser getModApi si présent, sinon api directe
        const api = typeof host.getModApi === "function" ? host.getModApi("BCXTimeSaver") : host.api;
        return api;
    }
    /** Recherche synchrone d'une API BCX sur l'une des fenêtres same-origin */
    function getBCXSync(root = window) {
        const w = findWindow(w => !!probeBCX(w), root);
        return w ? probeBCX(w) : undefined;
    }
    /** Attend l'API BCX sur n'importe quelle fenêtre same-origin (polling) */
    async function waitForBCX(timeoutMs = 20000, root = window) {
        const start = Date.now();
        // essai immédiat
        const now = getBCXSync(root);
        if (now)
            return now;
        // polling
        while (Date.now() - start < timeoutMs) {
            await new Promise(r => setTimeout(r, 200));
            const api = getBCXSync(root);
            if (api)
                return api;
        }
        throw new Error("BCX API introuvable (same-origin).");
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

    // src/main.ts
    async function bootstrap() {
        const ui = buildUI();
        try {
            const api = await waitForBCX(20000, window);
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
