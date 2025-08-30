// sdk.ts
const MOD_ID = 'BCXTimeSaver';
const FULL_NAME = 'BCX Time Saver';
const VERSION = '0.1.3';

type Ctx = { sdk: any; bcx: any; api: any; MOD_ID: string; FULL_NAME: string; VERSION: string } | null;

function whenGlobal<T = any>(prop: string, timeout = 60000): Promise<T> {
  return new Promise((resolve, reject) => {
    const w = window as any;
    if (w[prop]) return resolve(w[prop]);

    let done = false;
    const t0 = Date.now();

    // Poll doux
    const it = setInterval(() => {
      if (w[prop]) finish(w[prop]);
      else if (Date.now() - t0 > timeout) finish(null, new Error(`timeout waiting for ${prop}`));
    }, 200);

    // Hook: si la propriété est définie plus tard
    try {
      const desc = Object.getOwnPropertyDescriptor(w, prop);
      if (!desc || desc.configurable) {
        let value: any = undefined;
        Object.defineProperty(w, prop, {
          configurable: true,
          enumerable: true,
          get() { return value; },
          set(v) { value = v; finish(v); },
        });
      }
    } catch { /* silencieux */ }

    function finish(val: any, err?: Error) {
      if (done) return;
      done = true;
      clearInterval(it);
      if (err) reject(err);
      else resolve(val);
    }
  });
}

async function getBCXApi(modId: string, max = 60000) {
  const w = window as any;
  const start = Date.now();

  // Attends que ModSDK et bcx existent (sans échouer l’app au premier timeout)
  try { await whenGlobal('ModSDK', max); } catch (e) { console.warn('[%s] %s', modId, (e as Error).message); }
  try { await whenGlobal('bcx', Math.max(0, max - (Date.now() - start))); } catch (e) { console.warn('[%s] %s', modId, (e as Error).message); }

  const sdk = w.ModSDK;
  const bcx = w.bcx;
  if (!sdk || !bcx) return null;

  // Enregistre le mod si absent
  const has = Array.isArray(sdk.getModsInfo?.()) && sdk.getModsInfo().some((m: any) => m?.name === modId);
  if (!has) {
    sdk.registerMod?.({
      name: modId,
      fullName: FULL_NAME,
      version: VERSION,
      repository: 'https://github.com/SassySasami/BCXTimeSaver',
    });
  }

  // Récupère l’API BCX au nom du mod (certains BCX acceptent sans arg, on tente les deux)
  try {
    return { sdk, bcx, api: bcx.getModApi?.(modId) ?? bcx.getModApi?.(), MOD_ID, FULL_NAME, VERSION };
  } catch {
    // Si l’appel jette alors que bcx vient juste d’arriver, on réessaie un peu
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 200));
      try { return { sdk, bcx, api: bcx.getModApi?.(modId) ?? bcx.getModApi?.(), MOD_ID, FULL_NAME, VERSION }; }
      catch { /* retry */ }
    }
    return null;
  }
}

export async function initSDK(): Promise<Ctx> {
  const ctx = await getBCXApi(MOD_ID, 60000);
  if (!ctx || !ctx.api) {
    console.warn('[%s] BCX API non disponible pour l’instant. Le mod restera en veille et réessaiera quand bcx/modsdk apparaîtront.', MOD_ID);

    // Fallback: retente automatiquement dès que l’un des globals est défini
    setTimeout(() => initSDK().catch(() => {}), 2000);
    return null;
  }
  return ctx;
}
