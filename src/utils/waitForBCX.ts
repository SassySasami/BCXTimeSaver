// src/utils/waitForBCX.ts
import type { BCXApi } from '../types';
import { probeBCX } from './probeBCX';

function candidateWindows(): Window[] {
  const s = new Set<Window>();
  const add = (w: any) => { if (w && w.window === w) s.add(w); };
  add(window);
  // @ts-ignore
  add(typeof unsafeWindow !== 'undefined' ? unsafeWindow : undefined);
  try { add(window.top!); } catch {}
  try { add(window.parent!); } catch {}
  return [...s];
}

export function waitForBCX(timeoutMs = 15000, modName = 'BCXTimeSaver'): Promise<BCXApi> {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      for (const w of candidateWindows()) {
        const api = probeBCX(w, modName);
        if (api) return resolve(api);
      }
      if (Date.now() - start > timeoutMs) {
        return reject(new Error('BCX.getModApi introuvable ou renvoie null/undefined'));
      }
      requestAnimationFrame(tick);
    };
    tick();
  });
}
