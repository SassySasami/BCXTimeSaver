// sdk.ts
const MOD_ID = 'BCXTimeSaver';
const FULL_NAME = 'BCX Time Saver';
const VERSION = '0.1.4';

let registered = false;
let gotSDK = false;
let gotBCX = false;

function tryRegister() {
  const w = window as any;
  if (registered) return;
  const sdk = w.ModSDK;
  const bcx = w.bcx;
  gotSDK = !!sdk;
  gotBCX = !!bcx;
  if (!sdk || !bcx) return;

  // S’enregistrer si besoin
  try {
    const list = Array.isArray(sdk.getModsInfo?.()) ? sdk.getModsInfo() : [];
    const has = list.some((m: any) => m?.name === MOD_ID);
    if (!has) sdk.registerMod?.({ name: MOD_ID, fullName: FULL_NAME, version: VERSION });
  } catch (e) {
    // silencieux: on réessaiera
  }

  // Récupérer l’API (peut throw si trop tôt)
  try {
    const api = bcx.getModApi?.(MOD_ID) ?? bcx.getModApi?.();
    if (api) {
      registered = true;
      console.debug('[%s] enregistré sur ModSDK/BCX', MOD_ID);
      // Optionnel: notifier le reste du code
      window.dispatchEvent(new CustomEvent('BCX_MOD_READY', { detail: { MOD_ID, api } }));
    }
  } catch {
    // pas prêt: réessaiera
  }
}

// Hook “apparition tardive” d’une propriété globale (si possible)
function hookGlobal(prop: 'ModSDK' | 'bcx') {
  const w = window as any;
  try {
    const desc = Object.getOwnPropertyDescriptor(w, prop);
    if (!desc || desc.configurable) {
      let value: any = w[prop];
      Object.defineProperty(w, prop, {
        configurable: true,
        enumerable: true,
        get() { return value; },
        set(v) { value = v; setTimeout(tryRegister, 0); },
      });
    }
  } catch {
    // Certains defineProperty échouent: pas grave, le polling couvrira le cas
  }
}

export function registerModSyncish(options?: { quiet?: boolean; maxMs?: number }) {
  const { quiet = true, maxMs = 120000 } = options || {};

  // 1) tentative immédiate
  tryRegister();

  if (registered) return;

  // 2) hooks + polling léger
  hookGlobal('ModSDK');
  hookGlobal('bcx');

  const start = Date.now();
  const it = setInterval(() => {
    tryRegister();
    if (registered || Date.now() - start > maxMs) {
      clearInterval(it);
      if (!quiet && !registered) console.warn('[%s] ModSDK/BCX indisponible après %d ms', MOD_ID, maxMs);
    }
  }, 200);

  // 3) fallback: à la fin du chargement de la page, retenter
  window.addEventListener('load', () => setTimeout(tryRegister, 0));
}
