/// <reference path="./types/bcxExternalInterface.d.ts" />

type Any = any;
const ROOT: Any = typeof unsafeWindow !== "undefined" ? unsafeWindow : window;

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }
async function waitFor<T>(fn: () => T | undefined, timeout = 15000, step = 100): Promise<T> {
  const t0 = performance.now();
  let v: T | undefined;
  try { v = fn(); if (v) return v; } catch {}
  while (performance.now() - t0 < timeout) {
    await sleep(step);
    try { v = fn(); if (v) return v; } catch {}
  }
  throw new Error("Timeout");
}

async function connectBCX() {
  // 1) Attendre l’hôte BCX tel que tapé dans le .d.ts
  const bcx = await waitFor(() => (ROOT as { BCX?: BCXExternalInterface }).BCX);
  // 2) Priorité au chemin “officiel” recommandé par l’interface: registerMod
  if (typeof bcx.registerMod === "function") {
    return bcx.registerMod({
      name: "BCXTimeSaver",
      fullName: "BCX Time Saver",
      version: "0.1.0",
      // repository: "https://…", // optionnel
    });
  }
  // 3) Compat: si ton mod est déjà connu ou si BCX supporte getModApi
  if (typeof bcx.getModApi === "function") {
    const api = bcx.getModApi("BCXTimeSaver");
    if (api) return api;
  }
  // 4) Dernier recours: propriété directe
  if (bcx.api) return bcx.api;

  // Aide de debug pour voir ce que l’hôte expose réellement
  console.log("[BCX] Clés BCX =", Object.keys(bcx as object));
  throw new Error("BCX présent mais aucun point d’entrée utilisable (selon le .d.ts).");
}

(async () => {
  try {
    const api = await connectBCX();
    console.log("[BCX] Connecté ✅", api);
    // … ton code …
  } catch (e) {
    console.warn("[BCX] Échec connexion:", e);
  }
})();
