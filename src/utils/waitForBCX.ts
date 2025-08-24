// src/utils/waitForBCX.ts
import type {} from '../types/global-bcx';

type HostLike = BCXHost;

function sameOriginFrames(): Window[] {
  const s = new Set<Window>();
  const add = (w: any) => { try { if (w && w.window === w) s.add(w); } catch {}
  };
  add(window);
  try { add(window.top!); } catch {}
  try { add(window.parent!); } catch {}
  try { for (const f of Array.from(window.frames)) add(f as any); } catch {}
  return [...s];
}

function findHostNow(): { host?: HostLike; owner?: Window; info: string } {
  for (const w of sameOriginFrames()) {
    try {
      const host = (w as any).bcx ?? (w as any).BCX;
      if (host && typeof host === 'object') {
        const hasGetter = typeof host.getModApi === 'function' || typeof host.getModuleApi === 'function';
        return {
          host,
          owner: w,
          info: hasGetter ? 'host OK (getModApi/getModuleApi présent)' : 'host présent sans getter',
        };
      }
    } catch {}
  }
  return { info: 'host introuvable dans window/top/parent/frames (same-origin)' };
}

export async function waitForBCX(timeoutMs = 30000, modName = 'BCXTimeSaver'): Promise<any> {
  const tryGet = (h: HostLike | undefined | null): any | undefined => {
    if (!h) return undefined;
    const getter = h.getModApi ?? h.getModuleApi;
    return typeof getter === 'function' ? getter.call(h, modName) ?? undefined : undefined;
  };

  // tentative immédiate
  let snap = findHostNow();
  let api = tryGet(snap.host);
  if (api) return api;

  // boucle d’attente
  const t0 = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      snap = findHostNow();
      api = tryGet(snap.host);
      if (api) return resolve(api);

      if (Date.now() - t0 > timeoutMs) {
        const keys = (() => {
          try {
            const h = (window as any).bcx ?? (window as any).BCX;
            return h ? Object.keys(h).join(', ') : 'n/a';
          } catch { return 'n/a'; }
        })();
        return reject(
          new Error(
            [
              'BCX non détecté: BCX API introuvable (same-origin).',
              `Diag: ${snap.info}`,
              `window.bcx/BCX keys: ${keys}`,
              `URL: ${location.href}`,
              `modName essayé: ${modName}`,
            ].join(' ')
          )
        );
      }
      setTimeout(tick, 250);
    };
    tick();
  });
}
