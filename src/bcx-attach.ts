// bcx-attach.ts
type BCXGlobal = {
    version?: string;
    getModApi?: (modName?: string) => any; // typera mieux si tu as la signature
  };
  
  type ModSDKGlobalAPI = import('bondage-club-mod-sdk').default;
  
  const MOD_ID = 'BCXTimeSaver';
  const FULL_NAME = 'BCX Time Saver';
  const VERSION = '0.1.4';
  
  const REG_FLAG = Symbol.for('__BCX_TS_REGISTERED__');
  const API_CACHE = Symbol.for('__BCX_TS_API__');
  
  let apiReady = false;
  let detachPolling: (() => void) | null = null;
  
  function setCachedApi(api: any) {
    (window as any)[API_CACHE] = api;
  }
  export function getBCXApiSync<T = any>(): T | null {
    return ((window as any)[API_CACHE] as T) ?? null;
  }
  
  function dispatchReady(api: any) {
    if (apiReady) return;
    apiReady = true;
    setCachedApi(api);
    window.dispatchEvent(new CustomEvent('BCX_MOD_READY', { detail: { api } }));
    console.debug('[%s] API BCX prête', MOD_ID);
  }
  
  function tryAttachBCX() {
    if (apiReady) return;
    const bcx = (window as any as { bcx?: BCXGlobal }).bcx;
    if (!bcx?.getModApi) return;
    try {
      const api = bcx.getModApi(MOD_ID) ?? bcx.getModApi();
      if (api) dispatchReady(api);
    } catch {
      // pas prêt, on réessaiera
    }
  }
  
  function waitForBCX(maxMs = 120_000, intervalMs = 200) {
    tryAttachBCX();
    if (apiReady) return;
  
    const start = Date.now();
    const it = setInterval(() => {
      tryAttachBCX();
      if (apiReady || Date.now() - start > maxMs) {
        clearInterval(it);
        detachPolling = null;
      }
    }, intervalMs);
    detachPolling = () => { clearInterval(it); detachPolling = null; };
  
    try {
      const desc = Object.getOwnPropertyDescriptor(window, 'bcx');
      if (!desc || desc.configurable) {
        let value = (window as any).bcx;
        Object.defineProperty(window, 'bcx', {
          configurable: true,
          enumerable: true,
          get() { return value; },
          set(v) { value = v; queueMicrotask(tryAttachBCX); },
        });
      }
    } catch { /* ignore */ }
  
    window.addEventListener('load', () => setTimeout(tryAttachBCX, 0), { once: true });
  }
  
  function findSdk(explicit?: ModSDKGlobalAPI) {
    if (explicit) return explicit;
    const pageSdk = (window as any).bcModSdk;
    if (pageSdk) return pageSdk;
    // sandbox fallback
    const uw = (typeof unsafeWindow !== 'undefined') ? (unsafeWindow as any) : undefined;
    return uw?.bcModSdk;
  }
  
  export function bootBCXMod(explicitSdk?: ModSDKGlobalAPI) {
    // évite double init
    if ((window as any)[REG_FLAG]) {
      waitForBCX();
      return;
    }
    (window as any)[REG_FLAG] = true;
  
    const sdk = findSdk(explicitSdk);
    if (!sdk) {
      console.warn('[%s] ModSDK introuvable pour le moment; tentative d’attente de BCX quand même.', MOD_ID);
      waitForBCX();
      return;
    }
  
    try {
      sdk.registerMod(
        { name: MOD_ID, fullName: FULL_NAME, version: VERSION },
        { allowReplace: true },
      );
      console.debug('[%s] enregistré via ModSDK (SDK v%s, api=%d)',
        MOD_ID, sdk.version, sdk.apiVersion);
    } catch (e) {
      console.warn('[%s] registerMod a échoué (clé déjà prise ?):', MOD_ID, e);
    }
  
    waitForBCX();
  }
  
  export function stopWaitingBCX() {
    detachPolling?.();
    detachPolling = null;
  }
  