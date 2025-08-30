// src/sdk.ts
const MOD_ID = 'BCXTimeSaver';        // identifiant sans espace (obligatoire côté SDK)
const FULL_NAME = 'BCX Time Saver';   // label humain
const VERSION = '0.1.2';

function waitFor(cond: () => any, interval = 150, timeout = 15000) {
  return new Promise<void>((resolve, reject) => {
    const t0 = Date.now();
    const it = setInterval(() => {
      try {
        if (cond()) { clearInterval(it); resolve(); return; }
      } catch {}
      if (Date.now() - t0 > timeout) { clearInterval(it); reject(new Error('timeout')); }
    }, interval);
  });
}

export async function initSDK() {
  await waitFor(() => (window as any).ModSDK && (window as any).bcx);
  const sdk = (window as any).ModSDK;
  const bcx = (window as any).bcx;

  const already = Array.isArray(sdk.getModsInfo?.()) && sdk.getModsInfo().some((m: any) => m?.name === MOD_ID);
  if (!already) {
    sdk.registerMod?.({
      name: MOD_ID,           // ← doit rester identique à MOD_ID
      fullName: FULL_NAME,
      version: VERSION,
      repository: 'https://github.com/SassySasami/BCXTimeSaver',
    });
  }

  // Obtenir l’API BCX au nom du mod
  let api: any;
  try { api = bcx.getModApi?.(MOD_ID); } catch { api = bcx.getModApi?.(); }
  if (!api) {
    await waitFor(() => {
      try { return bcx.getModApi?.(MOD_ID); } catch { return false; }
    }, 200, 5000);
    try { api = bcx.getModApi?.(MOD_ID); } catch { api = bcx.getModApi?.(); }
  }
  if (!api) {
    console.warn('[%s] BCX API non disponible. Le mod restera inactif.', MOD_ID);
    return null;
  }
  return { sdk, bcx, api, MOD_ID, FULL_NAME, VERSION };
}
