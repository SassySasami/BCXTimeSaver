// src/utils/waitForBCX.ts
function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export async function waitForBcxModApi(modName = 'BCX', timeoutMs = 20_000): Promise<BCX.Api> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const getter = window.bcx?.getModApi;
    if (typeof getter === 'function') {
      try {
        const api = await Promise.resolve(getter.call(window.bcx, modName));
        if (api) return api as BCX.Api;
      } catch { /* continue */ }
    }
    await sleep(250);
  }
  throw new Error(`BCX getModApi("${modName}") introuvable après ${timeoutMs} ms`);
}

// Alias de compat pour l’ancien import
export const waitForBCX = waitForBcxModApi;
export default waitForBcxModApi;