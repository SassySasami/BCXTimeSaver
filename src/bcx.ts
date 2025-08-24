// bcx.ts

type Host = {
    getModApi?: (name: string) => any;
    getModuleApi?: (name: string) => any;
    [k: string]: any;
  };
  
  function sameOriginWindows(): Window[] {
    const set = new Set<Window>();
    const add = (w: any) => { try { if (w && w.window === w) set.add(w); } catch {} };
    add(window);
    try { add(window.top!); } catch {}
    try { add(window.parent!); } catch {}
    try { for (const f of Array.from(window.frames)) add(f as any); } catch {}
    return [...set];
  }
  
  function findHostNow(): { host?: Host; owner?: Window } {
    for (const w of sameOriginWindows()) {
      try {
        const host = (w as any).bcx ?? (w as any).BCX;
        if (host && typeof host === 'object') return { host, owner: w };
      } catch {}
    }
    return {};
  }
  
  /**
   * Version synchrone: tente tout de suite.
   * @param addonName Nom exact de TON add‑on tel qu’attendu par BCX.
   */
  export function tryBCXApi(addonName: string) {
    const { host } = findHostNow();
    const getter = host?.getModApi ?? host?.getModuleApi;
    return typeof getter === 'function' ? getter.call(host, addonName) ?? undefined : undefined;
  }
  
  /**
   * Version async: attend que l’hôte soit prêt puis demande l’API de TON add‑on.
   * @param addonName Nom exact de ton add‑on (ex: 'BCX Time Saver').
   * @param timeoutMs Délai max en ms (par défaut 30s).
   */
  export async function getBCXApi(addonName: string, timeoutMs = 30000): Promise<any> {
    const start = Date.now();
  
    const attempt = () => {
      const { host } = findHostNow();
      const getter = host?.getModApi ?? host?.getModuleApi;
      return typeof getter === 'function' ? getter.call(host, addonName) ?? undefined : undefined;
    };
  
    // essai immédiat
    const now = attempt();
    if (now) return now;
  
    // boucle d'attente
    return new Promise((resolve, reject) => {
      const tick = () => {
        const api = attempt();
        if (api) return resolve(api);
        if (Date.now() - start > timeoutMs) {
          const h = findHostNow().host as any;
          const keys = h ? Object.keys(h).join(', ') : 'n/a';
          return reject(
            new Error(
              `BCX non détecté: BCX API introuvable (same-origin). Diag: host=${!!h}, keys=${keys}, url=${location.href}`
            )
          );
        }
        setTimeout(tick, 250);
      };
      tick();
    });
  }
  