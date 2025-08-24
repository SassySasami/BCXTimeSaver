// src/bcx.ts
import type { BCXApi } from "./types";
import { findWindow } from "./frames";

/** Détecte si une fenêtre contient un objet BCX utilisable */
function probeBCX(win: Window): BCXApi | undefined {
  const host = (win as any).BCX as { getModApi?: (n: string) => BCXApi; api?: BCXApi } | undefined;
  if (!host) return undefined;
  // Essais: prioriser getModApi si présent, sinon api directe
  const api = typeof host.getModApi === "function" ? host.getModApi("BCXTimeSaver") : host.api;
  return api;
}

/** Recherche synchrone d'une API BCX sur l'une des fenêtres same-origin */
export function getBCXSync(root: Window = window): BCXApi | undefined {
  const w = findWindow(w => !!probeBCX(w), root);
  return w ? probeBCX(w) : undefined;
}

/** Attend l'API BCX sur n'importe quelle fenêtre same-origin (polling) */
export async function waitForBCX(timeoutMs = 20000, root: Window = window): Promise<BCXApi> {
  const start = Date.now();
  // essai immédiat
  const now = getBCXSync(root);
  if (now) return now;

  // polling
  while (Date.now() - start < timeoutMs) {
    await new Promise(r => setTimeout(r, 200));
    const api = getBCXSync(root);
    if (api) return api;
  }
  throw new Error("BCX API introuvable (same-origin).");
}
