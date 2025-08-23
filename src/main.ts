// src/main.ts
import bcModSDK from 'bondage-club-mod-sdk';

(function () {
  'use strict';

  // =============================
  // Enregistrement SDK (optionnel)
  // =============================
  const MOD_NAME = 'MonModBC';
  try {
    const mod = bcModSDK.registerMod({
      name: MOD_NAME,
      fullName: 'Mon Mod Bondage Club',
      version: '0.3.0',
      repository: 'https://github.com/SassySasami/BCTest',
    });
    console.log('[MonModBC] Mod chargé via SDK:', mod);
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

  type RuleStateLite = {
    rule: string;
    ruleDefinition?: { name?: string; description?: string } | null;
    inEffect: boolean;
    isEnforced: boolean;
    isLogged: boolean;
    customData?: unknown;
    internalData?: unknown;
  };

  // État local
  let panelVisible = true;
  let bcxApi: any | null = null;
  let currentRuleId = '';

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
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
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
        width: 380px; user-select: none; display: none;
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
      .mmdbc-select, .mmdbc-input, .mmdbc-textarea {
        background: #11131a; color: #fff; border: 1px solid #3a3a4a; border-radius: 8px; padding: 6px 8px;
      }
      #mmdbc-rule-box { border: 1px solid #3a3a4a; border-radius: 8px; padding: 8px; background: #0d0f15; }
      .mmdbc-kv { display: grid; grid-template-columns: 120px 1fr; gap: 6px 10px; align-items: center; }
      .mmdbc-toast {
        position: fixed; bottom: 18px; left: 50%; transform: translate(-50%, 20px);
        background: #111; color: #fff; padding: 10px 14px; border-radius: 10px; opacity: 0;
        transition: opacity .2s ease, transform .2s ease; z-index: 2147483647;
      }
      #monmodbc-mini {
        position: fixed; top: 80px; right: 20px; z-index: 2147483647;
        background: #2a2a3a; color: #fff; border: 1px solid #555; border-radius: 999px; padding: 8px 10px; cursor: pointer;
        display: none;
      }
      code.mmdbc {
        display: block; white-space: pre-wrap; background: #0b0d13; border: 1px solid #33384d;
        padding: 8px; border-radius: 6px; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: 12px;
      }
    `;
    document.head.appendChild(style);
  }

  // ====================
  // BCX adapter (safe)
  // ====================
  function tryGetBCX(): any | null {
    const w = window as unknown as Record<string, any>;
    const bcx = w.bcx ?? w.BCX ?? w.game?.addons?.get?.('BCX');
    if (!bcx || typeof bcx.getModApi !== 'function') return null;
    try {
      // On demande un ModAPI “scopé” à notre mod
      const api = bcx.getModApi(MOD_NAME);
      return api ?? null;
    } catch {
      return null;
    }
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

    // Section BCX — getRuleState + trigger
    const ruleBox: HTMLDivElement = document.createElement('div');
    ruleBox.id = 'mmdbc-rule-box';
    body.appendChild(ruleBox);

    const ruleForm: HTMLDivElement = document.createElement('div');
    ruleForm.className = 'mmdbc-kv';

    const lblRule = document.createElement('label'); lblRule.textContent = 'Rule ID';
    const inpRule: HTMLInputElement = document.createElement('input');
    inpRule.className = 'mmdbc-input'; inpRule.placeholder = 'ex: no_outfit_removal'; inpRule.autocomplete = 'off';

    const lblTarget = document.createElement('label'); lblTarget.textContent = 'Target char (ID)';
    const inpTarget: HTMLInputElement = document.createElement('input');
    inpTarget.className = 'mmdbc-input'; inpTarget.placeholder = 'optionnel (nombre)'; inpTarget.type = 'number';

    const lblDict = document.createElement('label'); lblDict.textContent = 'Dictionnaire';
    const inpDict: HTMLTextAreaElement = document.createElement('textarea');
    inpDict.className = 'mmdbc-textarea'; inpDict.rows = 3;
    inpDict.placeholder = 'clé1=valeur1, clé2=valeur2';

    const actionsRow = document.createElement('div');
    actionsRow.className = 'mmdbc-row';
    const btnFetch: HTMLButtonElement = document.createElement('button'); btnFetch.className = 'mmdbc-btn'; btnFetch.textContent = 'Obtenir état';
    const btnTrigger: HTMLButtonElement = document.createElement('button'); btnTrigger.className = 'mmdbc-btn'; btnTrigger.textContent = 'Trigger';
    const btnAttempt: HTMLButtonElement = document.createElement('button'); btnAttempt.className = 'mmdbc-btn'; btnAttempt.textContent = 'Trigger attempt';
    actionsRow.append(btnFetch, btnTrigger, btnAttempt);

    const outPre = document.createElement('code'); outPre.className = 'mmdbc'; outPre.textContent = 'BCX: en attente...';

    ruleForm.append(
      lblRule, inpRule,
      lblTarget, inpTarget,
      lblDict, inpDict,
    );
    ruleBox.append(ruleForm, actionsRow, outPre);

    // Status simple
    function setOutput(obj: unknown): void {
      try {
        outPre.textContent = typeof obj === 'string' ? obj : JSON.stringify(obj, null, 2);
      } catch {
        outPre.textContent = String(obj);
      }
    }

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
      try { await navigator.clipboard.writeText(textArea.value); showToast('Copié'); }
      catch { showToast('Copie impossible'); }
    });
    btnReset.addEventListener('click', () => {
      titleInput.value = DEFAULT_TITLE;
      textArea.value = DEFAULT_RULES;
      save(STORAGE_TITLE, DEFAULT_TITLE);
      save(STORAGE_KEY, DEFAULT_RULES);
      showToast('Rétabli');
    });

    // =================
    // Intégration BCX
    // =================
    function parseDict(s: string): Record<string, string> {
      const dict: Record<string, string> = {};
      for (const part of s.split(',').map(p => p.trim()).filter(Boolean)) {
        const idx = part.indexOf('=');
        if (idx <= 0) continue;
        const k = part.slice(0, idx).trim();
        const v = part.slice(idx + 1).trim();
        if (k) dict[k] = v;
      }
      return dict;
    }

    function safeNumberOrNull(v: string): number | null {
      const n = Number(v);
      return Number.isFinite(n) ? n : null;
    }

    function getRuleStateLite(ruleId: string): RuleStateLite | string {
      if (!bcxApi) return 'BCX non détecté.';
      try {
        const stateApi = bcxApi.getRuleState(ruleId);
        if (!stateApi) return `Règle introuvable: "${ruleId}"`;
        // Les getters renvoient des copies (cloneDeep côté BCX)
        const data: RuleStateLite = {
          rule: String(stateApi.rule ?? ruleId),
          ruleDefinition: stateApi.ruleDefinition ?? null,
          inEffect: !!stateApi.inEffect,
          isEnforced: !!stateApi.isEnforced,
          isLogged: !!stateApi.isLogged,
          customData: stateApi.customData,
          internalData: stateApi.internalData,
        };
        return data;
      } catch (e) {
        console.warn('[MonModBC] getRuleState a échoué:', e);
        return 'Erreur lors de getRuleState (voir console).';
      }
    }

    async function doTrigger(attempt: boolean): Promise<void> {
      const ruleId = inpRule.value.trim();
      if (!ruleId) { setOutput('Indique un Rule ID.'); return; }
      if (!bcxApi) { setOutput('BCX non détecté.'); return; }

      const target = inpTarget.value.trim();
      const targetNum = target === '' ? null : safeNumberOrNull(target);
      if (target !== '' && targetNum === null) {
        setOutput('Target char doit être vide ou un nombre.');
        return;
      }
      const dict = parseDict(inpDict.value);

      try {
        const stateApi = bcxApi.getRuleState(ruleId);
        if (!stateApi) { setOutput(`Règle introuvable: "${ruleId}"`); return; }
        if (attempt) stateApi.triggerAttempt(targetNum, dict);
        else stateApi.trigger(targetNum, dict);
        setOutput(`OK: ${attempt ? 'triggerAttempt' : 'trigger'} envoyé pour "${ruleId}".`);
      } catch (e) {
        console.warn('[MonModBC] trigger/attempt a échoué:', e);
        setOutput('Erreur pendant trigger (voir console).');
      }
    }

    // Boutons BCX
    btnFetch.addEventListener('click', () => {
      currentRuleId = inpRule.value.trim();
      if (!currentRuleId) { setOutput('Indique un Rule ID.'); return; }
      const res = getRuleStateLite(currentRuleId);
      setOutput(res);
    });
    btnTrigger.addEventListener('click', async () => { await doTrigger(false); });
    btnAttempt.addEventListener('click', async () => { await doTrigger(true); });

    // Init BCX
    function initBCX(): void {
      bcxApi = tryGetBCX();
      if (!bcxApi) {
        setOutput('BCX non détecté. Ouvre le jeu avec BCX chargé.');
      } else {
        setOutput('BCX détecté. Saisis un Rule ID puis “Obtenir état”.');
      }
    }
    initBCX();

    // Raccourci Alt+G pour afficher/masquer
    window.addEventListener('keydown', (e) => {
      if (e.altKey && (e.key === 'g' || e.key === 'G')) {
        panelVisible = !panelVisible;
        updateVisibility();
        e.preventDefault();
      }
    });

    // Afficher au premier montage
    updateVisibility();

    console.log('[MonModBC] Panneau prêt.');
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
