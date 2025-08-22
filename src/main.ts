// src/main.ts
import bcModSDK from 'bondage-club-mod-sdk';

(function () {
  'use strict';

  // =============================
  // Enregistrement SDK (optionnel)
  // =============================
  try {
    const mod = bcModSDK.registerMod({
      name: 'MonModBC',
      fullName: 'Mon Mod Bondage Club',
      version: '0.2.1',
      repository: 'https://github.com/SassySasami/BCTest',
    });
    console.log('[MonModBC] Mod chargé via SDK-1', mod);
  } catch (e) {
    console.warn('[MonModBC] SDK indisponible (non bloquant):', e);
  }

  // ==============
  // Const & types
  // ==============
  const STORAGE_KEY = 'MonModBC.rules';
  const STORAGE_TITLE = 'MonModBC.rules.title';

  const DEFAULT_TITLE = 'Règles BCX';
  const DEFAULT_RULES = [
    'Respect et consentement obligatoires. Pas de harcèlement.',
    'Pas de contenu NSFW explicite dans le chat public.',
    'Aucune triche, exploit ou outil perturbateur.',
    'Restez dans le thème RP si la salle l’indique.',
    'Langage correct, pas d’insultes ni de propos discriminants.',
    'Suivez les instructions des modérateurs/organisateurs.',
    'Pas de spam, flood ou publicité non autorisée.',
  ].join('\n');

  type RuleItem = { id: string; name: string; description?: string; enabled: boolean; tags?: string[] };
  type SubItem = { id: string; name: string };

  // =========================
  // État (mémoire du module)
  // =========================
  let panelVisible = true;
  let allRules: RuleItem[] = [];
  let ruleApi: any | null = null; // injecté par BCX si dispo
  let presenceApi: any | null = null;

  // =====================
  // Helpers de persistance
  // =====================
  function load(key: string, fallback: string): string {
    try {
      const v = localStorage.getItem(key);
      return v == null ? fallback : v;
    } catch {
      return fallback;
    }
  }
  function save(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      // ignore
    }
  }

  // ===========
  // DOM helpers
  // ===========
  function onReady(cb: () => void): void {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', cb, { once: true });
    else cb();
  }

  function escapeHtml(s: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return s.replace(/[&<>"']/g, (m) => map[m] ?? m);
  }

  function makeDraggable(container: HTMLElement, handle: HTMLElement): void {
    let dragging = false;
    let startX = 0, startY = 0, startLeft = 0, startTop = 0;

    handle.addEventListener('mousedown', (e) => {
      dragging = true;
      startX = e.clientX; startY = e.clientY;
      const rect = container.getBoundingClientRect();
      startLeft = rect.left; startTop = rect.top;
      container.style.left = `${startLeft}px`;
      container.style.top = `${startTop}px`;
      container.style.right = 'auto';
      container.style.bottom = 'auto';
      e.preventDefault();
    });
    window.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      container.style.left = `${startLeft + dx}px`;
      container.style.top = `${startTop + dy}px`;
    });
    window.addEventListener('mouseup', () => { dragging = false; });
  }

  function showToast(message: string, ms = 1400): void {
    let toast = document.getElementById('mmdbc-toast') as HTMLDivElement | null;
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'mmdbc-toast';
      toast.className = 'mmdbc-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translate(-50%, 0)';
    window.setTimeout(() => {
      toast!.style.opacity = '0';
      toast!.style.transform = 'translate(-50%, 20px)';
    }, ms);
  }

  // =========
  // Style tag
  // =========
  function injectStyles(): void {
    if (document.getElementById('monmodbc-style')) return;
    const style = document.createElement('style');
    style.id = 'monmodbc-style';
    style.textContent = `
      #monmodbc-panel {
        position: fixed; top: 80px; right: 20px; z-index: 2147483647;
        background: rgba(20,20,28,0.96); color: #fff;
        font: 13px/1.4 system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
        border: 1px solid #3a3a4a; border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.35);
        width: 360px; user-select: none; display: none;
      }
      #monmodbc-panel header {
        display: flex; align-items: center; gap: 8px; justify-content: space-between;
        padding: 10px 12px; background: #2a2a3a; border-radius: 10px 10px 0 0; cursor: move;
      }
      #monmodbc-title-input {
        flex: 1 1 auto; max-width: 100%; min-width: 0;
        background: transparent; border: none; color: #fff; font-weight: 600; outline: none;
      }
      #monmodbc-close {
        width: 22px; height: 22px; border-radius: 6px; border: 1px solid #555; background: #3a3a4a; color: #fff;
      }
      #monmodbc-body { display: flex; flex-direction: column; gap: 10px; padding: 10px 12px; }
      #monmodbc-text { width: 100%; height: 140px; resize: vertical; background: #11131a; color: #fff;
        border: 1px solid #3a3a4a; border-radius: 8px; padding: 8px; }
      .mmdbc-row { display: flex; gap: 8px; align-items: center; }
      .mmdbc-row.right { justify-content: flex-end; }
      .mmdbc-btn {
        background: #3a3a4a; color: #fff; border: 1px solid #555; border-radius: 8px; padding: 6px 10px; cursor: pointer;
      }
      .mmdbc-select, .mmdbc-input {
        background: #11131a; color: #fff; border: 1px solid #3a3a4a; border-radius: 8px; padding: 6px 8px;
      }
      #mmdbc-rules { max-height: 200px; overflow: auto; border: 1px solid #3a3a4a; border-radius: 8px; padding: 6px; background: #0d0f15; }
      .mmdbc-rule { display: flex; align-items: center; gap: 8px; padding: 4px 2px; }
      .mmdbc-rule .name { font-weight: 600; }
      .mmdbc-rule .desc { opacity: .8; font-size: 12px; }
      .mmdbc-status { font-size: 12px; opacity: .9; }
      #monmodbc-mini {
        position: fixed; top: 80px; right: 20px; z-index: 2147483647;
        background: #2a2a3a; color: #fff; border: 1px solid #555; border-radius: 999px; padding: 8px 10px; cursor: pointer;
        display: none;
      }
      .mmdbc-toast {
        position: fixed; bottom: 18px; left: 50%; transform: translate(-50%, 20px);
        background: #111; color: #fff; padding: 10px 14px; border-radius: 10px; opacity: 0;
        transition: opacity .2s ease, transform .2s ease; z-index: 2147483647;
      }
      .mmdbc-switch { position: relative; width: 38px; height: 20px; display: inline-block; }
      .mmdbc-switch input { display: none; }
      .mmdbc-slider {
        position: absolute; inset: 0; background: #444; border-radius: 20px; transition: .2s;
      }
      .mmdbc-slider:before {
        content: ''; position: absolute; width: 16px; height: 16px; left: 2px; top: 2px;
        background: #fff; border-radius: 50%; transition: .2s;
      }
      input:checked + .mmdbc-slider { background: #4f46e5; }
      input:checked + .mmdbc-slider:before { transform: translateX(18px); }
    `;
    document.head.appendChild(style);
  }

  // ====================
  // BCX adapter (safe)
  // ====================
  function tryGetBCX(): { rule: any | null; presence: any | null } {
    const w = window as unknown as Record<string, any>;
    const bcx = w.bcx ?? w.BCX ?? w.game?.addons?.get?.('BCX');
    if (!bcx || typeof bcx.getModApi !== 'function') return { rule: null, presence: null };
    const rule = bcx.getModApi('rule-manager');
    const presence = bcx.getModApi('presence') ?? null;
    return { rule: rule ?? null, presence };
  }

  // ===================
  // Construction panneau
  // ===================
  function ensurePanel(): void {
    if (document.getElementById('monmodbc-panel')) return;

    injectStyles();

    // Mini bouton
    const miniBtn: HTMLButtonElement = document.createElement('button');
    miniBtn.id = 'monmodbc-mini';
    miniBtn.textContent = 'Règles';
    document.body.appendChild(miniBtn);

    // Panel
    const panel: HTMLDivElement = document.createElement('div');
    panel.id = 'monmodbc-panel';
    panel.style.display = panelVisible ? 'block' : 'none';
    document.body.appendChild(panel);

    // Header
    const header: HTMLElement = document.createElement('header');
    const titleInput: HTMLInputElement = document.createElement('input');
    titleInput.id = 'monmodbc-title-input';
    titleInput.type = 'text';
    titleInput.value = load(STORAGE_TITLE, DEFAULT_TITLE);
    const closeBtn: HTMLButtonElement = document.createElement('button');
    closeBtn.id = 'monmodbc-close';
    closeBtn.className = 'mmdbc-btn';
    closeBtn.textContent = '–';

    header.appendChild(titleInput);
    header.appendChild(closeBtn);
    panel.appendChild(header);

    // Corps
    const body: HTMLDivElement = document.createElement('div');
    body.id = 'monmodbc-body';
    panel.appendChild(body);

    // Zone texte
    const textArea: HTMLTextAreaElement = document.createElement('textarea');
    textArea.id = 'monmodbc-text';
    textArea.value = load(STORAGE_KEY, DEFAULT_RULES);
    body.appendChild(textArea);

    // Boutons texte
    const rowBtns: HTMLDivElement = document.createElement('div');
    rowBtns.className = 'mmdbc-row right';
    const btnSave: HTMLButtonElement = document.createElement('button');
    btnSave.className = 'mmdbc-btn'; btnSave.textContent = 'Enregistrer';
    const btnCopy: HTMLButtonElement = document.createElement('button');
    btnCopy.className = 'mmdbc-btn'; btnCopy.textContent = 'Copier';
    const btnReset: HTMLButtonElement = document.createElement('button');
    btnReset.className = 'mmdbc-btn'; btnReset.textContent = 'Réinitialiser';
    rowBtns.append(btnSave, btnCopy, btnReset);
    body.appendChild(rowBtns);

    // Ligne BCX (sélecteur subs + refresh + importer)
    const rowSubs: HTMLDivElement = document.createElement('div');
    rowSubs.className = 'mmdbc-row';
    const selSubs: HTMLSelectElement = document.createElement('select');
    selSubs.className = 'mmdbc-select'; selSubs.style.flex = '1 1 auto';
    const btnRefresh: HTMLButtonElement = document.createElement('button');
    btnRefresh.className = 'mmdbc-btn'; btnRefresh.textContent = 'Actualiser';
    const btnImport: HTMLButtonElement = document.createElement('button');
    btnImport.className = 'mmdbc-btn'; btnImport.textContent = 'Importer depuis ce sub';
    rowSubs.append(selSubs, btnRefresh, btnImport);
    body.appendChild(rowSubs);

    // Recherche
    const rowSearch: HTMLDivElement = document.createElement('div');
    rowSearch.className = 'mmdbc-row';
    const txtSearch: HTMLInputElement = document.createElement('input');
    txtSearch.className = 'mmdbc-input'; txtSearch.placeholder = 'Rechercher une règle...';
    txtSearch.style.flex = '1 1 auto';
    rowSearch.appendChild(txtSearch);
    body.appendChild(rowSearch);

    // Liste des règles
    const rulesBox: HTMLDivElement = document.createElement('div');
    rulesBox.id = 'mmdbc-rules';
    body.appendChild(rulesBox);

    // Status
    const rowStatus: HTMLDivElement = document.createElement('div');
    rowStatus.className = 'mmdbc-row';
    const statusLabel: HTMLSpanElement = document.createElement('span');
    statusLabel.className = 'mmdbc-status';
    statusLabel.textContent = 'BCX: en attente...';
    rowStatus.appendChild(statusLabel);
    body.appendChild(rowStatus);

    // Drag + mini toggle
    makeDraggable(panel, header);
    function updateVisibility(): void {
      panel.style.display = panelVisible ? 'block' : 'none';
      miniBtn.style.display = panelVisible ? 'none' : 'block';
    }
    closeBtn.addEventListener('click', () => { panelVisible = false; updateVisibility(); });
    miniBtn.addEventListener('click', () => { panelVisible = true; updateVisibility(); });

    // Actions texte
    titleInput.addEventListener('input', () => save(STORAGE_TITLE, titleInput.value));
    btnSave.addEventListener('click', () => {
      save(STORAGE_KEY, textArea.value);
      showToast('Règles sauvegardées');
    });
    btnCopy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(textArea.value);
        showToast('Copié dans le presse-papiers');
      } catch {
        showToast('Copie impossible (permissions)');
      }
    });
    btnReset.addEventListener('click', () => {
      titleInput.value = DEFAULT_TITLE;
      textArea.value = DEFAULT_RULES;
      save(STORAGE_TITLE, DEFAULT_TITLE);
      save(STORAGE_KEY, DEFAULT_RULES);
      showToast('Rétabli');
    });

    // ============
    // BCX features
    // ============
    let busy = false;
    function setBusy(b: boolean): void {
      busy = b;
      selSubs.disabled = b;
      btnRefresh.disabled = b;
      btnImport.disabled = b;
      txtSearch.disabled = b;
    }
    function setStatus(msg: string, color = '#ccc'): void {
      statusLabel.textContent = msg;
      statusLabel.style.color = color;
    }

    function renderRules(rules: RuleItem[], filter: string): void {
      rulesBox.innerHTML = '';
      const f = filter.trim().toLowerCase();
      const view = f
        ? rules.filter(r =>
            r.name.toLowerCase().includes(f) ||
            (r.description ?? '').toLowerCase().includes(f) ||
            (r.tags ?? []).some(t => t.toLowerCase().includes(f)))
        : rules;

      if (view.length === 0) {
        const p = document.createElement('div');
        p.style.opacity = '0.7';
        p.textContent = f ? 'Aucune règle ne correspond.' : 'Aucune règle à afficher.';
        rulesBox.appendChild(p);
        return;
      }

      for (const r of view) {
        const row = document.createElement('div');
        row.className = 'mmdbc-rule';
        const label = document.createElement('label');
        label.className = 'mmdbc-switch';
        const input = document.createElement('input');
        input.type = 'checkbox'; input.checked = !!r.enabled;
        const slider = document.createElement('span');
        slider.className = 'mmdbc-slider';
        label.append(input, slider);

        const meta = document.createElement('div');
        const name = document.createElement('div');
        name.className = 'name'; name.textContent = r.name || r.id;
        const desc = document.createElement('div');
        desc.className = 'desc';
        desc.innerHTML = escapeHtml(r.description ?? '');
        meta.append(name, desc);

        row.append(label, meta);
        rulesBox.appendChild(row);

        input.addEventListener('change', async () => {
          if (!ruleApi) { input.checked = !input.checked; return; }
          setBusy(true);
          try {
            // API name fallback
            const fn = ruleApi.setEnabled ?? ruleApi.setRuleEnabled ?? ruleApi.enableRule;
            if (typeof fn !== 'function') throw new Error('Méthode setEnabled absente');
            await Promise.resolve(fn.call(ruleApi, r.id, input.checked));
            r.enabled = input.checked;
            setStatus(`Règle ${r.name} ${input.checked ? 'activée' : 'désactivée'}.`, '#9fe89f');
          } catch (err) {
            console.warn('[MonModBC] setEnabled a échoué', err);
            input.checked = !input.checked;
            setStatus('Impossible de changer cette règle (droits ?).', '#f2a3a3');
          } finally {
            setBusy(false);
          }
        });
      }
    }

    async function populateSubs(): Promise<void> {
      selSubs.innerHTML = '';
      const opt = document.createElement('option');
      opt.value = ''; opt.textContent = ruleApi ? 'Choisir un sub...' : 'BCX non détecté';
      selSubs.appendChild(opt);

      const subs: SubItem[] = [];
      try {
        const list = presenceApi?.listSubs?.() ?? presenceApi?.getSubs?.() ?? [];
        const result = Array.isArray(list) ? list : await Promise.resolve(list);
        for (const s of result as any[]) {
          if (!s) continue;
          const id = String(s.id ?? s.ID ?? s.name ?? '');
          const name = String(s.name ?? s.id ?? s.ID ?? '');
          if (!id) continue;
          subs.push({ id, name });
        }
      } catch (e) {
        console.warn('[MonModBC] Récupération subs a échoué', e);
      }
      for (const s of subs) {
        const o = document.createElement('option');
        o.value = s.id; o.textContent = s.name || s.id;
        selSubs.appendChild(o);
      }
      setStatus(ruleApi ? `BCX OK — ${subs.length} sub(s) détecté(s).` : 'BCX non détecté.', ruleApi ? '#9fe89f' : '#f2a3a3');
    }

    async function refreshRules(): Promise<void> {
      if (!ruleApi) { allRules = []; renderRules(allRules, txtSearch.value); return; }
      setBusy(true);
      try {
        const fnList = ruleApi.listRules ?? ruleApi.getAll ?? ruleApi.getRules;
        if (typeof fnList !== 'function') throw new Error('Méthode listRules absente');
        const list = await Promise.resolve(fnList.call(ruleApi));
        // normaliser
        allRules = (Array.isArray(list) ? list : []).map((r: any) => ({
          id: String(r.id ?? r.ID ?? r.key ?? r.name ?? ''),
          name: String(r.name ?? r.id ?? r.ID ?? r.key ?? ''),
          description: r.description ?? r.desc ?? '',
          enabled: !!(r.enabled ?? r.active ?? r.on),
          tags: Array.isArray(r.tags) ? r.tags : [],
        })).filter(r => r.id);
        renderRules(allRules, txtSearch.value);
        setStatus(`${allRules.length} règle(s) chargée(s).`, '#9fe89f');
      } catch (e) {
        console.warn('[MonModBC] listRules a échoué', e);
        setStatus('Impossible de lister les règles.', '#f2a3a3');
      } finally {
        setBusy(false);
      }
    }

    async function importFromSelectedSub(): Promise<void> {
      if (!ruleApi) { setStatus('BCX non détecté.', '#f2a3a3'); return; }
      const subId = selSubs.value;
      if (!subId) { setStatus('Choisis d’abord un sub.', '#f2a3a3'); return; }
      setBusy(true);
      try {
        const fnImport = ruleApi.importFromSub ?? ruleApi.import ?? ruleApi.pullFromSub;
        if (typeof fnImport !== 'function') throw new Error('Méthode importFromSub absente');
        await Promise.resolve(fnImport.call(ruleApi, subId));
        setStatus(`Import depuis « ${selSubs.options[selSubs.selectedIndex]?.textContent ?? subId} » réussi.`, '#9fe89f');
        await refreshRules();
      } catch (e) {
        console.warn('[MonModBC] importFromSub a échoué', e);
        setStatus('Échec de l’import (droits ?).', '#f2a3a3');
      } finally {
        setBusy(false);
      }
    }

    async function initBCX(): Promise<void> {
      const { rule, presence } = tryGetBCX();
      ruleApi = rule;
      presenceApi = presence;

      if (!ruleApi) {
        setStatus('BCX non détecté. Ouvre le jeu avec BCX chargé.', '#f2a3a3');
        return;
      }
      setStatus('BCX détecté. Chargement des règles...', '#9fe89f');
      await populateSubs();
      await refreshRules();
    }

    // Events BCX
    btnRefresh.addEventListener('click', async () => { await populateSubs(); });
    btnImport.addEventListener('click', async () => { await importFromSelectedSub(); });
    txtSearch.addEventListener('input', () => renderRules(allRules, txtSearch.value.trim()));

    // Premier init (non bloquant pour la partie texte)
    initBCX();

    // Alt+G pour toggle
    window.addEventListener('keydown', (e) => {
      if (e.altKey && (e.key === 'g' || e.key === 'G')) {
        panelVisible = !panelVisible;
        updateVisibility();
        e.preventDefault();
      }
    });

    // Afficher au premier montage
    updateVisibility();

    console.log('[MonModBC] Panneau Règles BCX prêt.');
  }

  // Monter le panneau quand le DOM est prêt
  onReady(() => {
    if (!document.body) {
      const obs = new MutationObserver(() => {
        if (document.body) { obs.disconnect(); ensurePanel(); }
      });
      obs.observe(document.documentElement, { childList: true, subtree: true });
    } else {
      ensurePanel();
    }
  });
})();
