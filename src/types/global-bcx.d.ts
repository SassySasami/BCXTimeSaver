// src/types/global-bcx.d.ts
export {};

// IMPORTANT: on réutilise le BCXApi défini dans src/types.ts
import type { BCXApi as LocalBCXApi } from '../types';

declare global {
  // Le BCXApi global EST le BCXApi local (src/types.ts)
  interface BCXApi extends LocalBCXApi {}

  interface BCXHost {
    getModApi(name: string): BCXApi | null | undefined;
  }

  interface Window {
    BCX?: BCXHost;
  }

  // Userscript (Tamper/Greasemonkey)
  const unsafeWindow: (Window & typeof globalThis) | undefined;
}
