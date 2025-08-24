// src/rules.ts
import type { BCXApi, RuleId } from "./types";

/**
 * Tente plusieurs chemins connus pour obtenir la liste des RuleId.
 * - API directe: api.listRules()
 * - Requêtes: api.sendQuery() avec quelques types usuels
 * - Fallback: exploration d’objets courants (si exposés)
 */
export async function enumerateAllRules(api: BCXApi): Promise<RuleId[]> {
  // 1) API directe
  try {
    if (typeof api.listRules === "function") {
      const res = await Promise.resolve(api.listRules());
      if (Array.isArray(res) && res.every(r => typeof r === "string")) {
        return unique(res);
      }
    }
  } catch {
    /* ignore */
  }

  // 2) Messages possibles via sendQuery
  if (typeof api.sendQuery === "function") {
    const candidates = [
      { type: "rules:listAll", data: {} },
      { type: "rules:list", data: {} },
      { type: "bcx:rules/list", data: {} },
      { type: "bcx:rules/all", data: {} },
    ];
    for (const c of candidates) {
      try {
        const r = await api.sendQuery!(c.type, c.data, "Player", 5000);
        // Cas 2.a: r est un simple tableau de strings
        if (Array.isArray(r) && r.every(x => typeof x === "string")) {
          return unique(r as string[]);
        }
        // Cas 2.b: r.rules ou r.ids
        if (r && Array.isArray(r.rules) && r.rules.every((x: any) => typeof x === "string")) {
          return unique(r.rules as string[]);
        }
        if (r && Array.isArray(r.ids) && r.ids.every((x: any) => typeof x === "string")) {
          return unique(r.ids as string[]);
        }
      } catch {
        // on essaie la suivante
      }
    }
  }

  // 3) Fallback best-effort: introspection d’objets connus si présents
  // NOTE: ceci ne cassera rien si absent; c’est purement opportuniste
  try {
    const anyWin = window as any;
    // Ex: anyWin.BCX?.api?.Rules?.ids ou .all
    const maybe = anyWin?.BCX?.api?.Rules;
    const fromObj = tryExtractIds(maybe);
    if (fromObj.length) return unique(fromObj);
  } catch {
    /* ignore */
  }

  // 4) Échec: renvoyer vide (UI affichera un message)
  return [];
}

function tryExtractIds(obj: any): RuleId[] {
  const out: RuleId[] = [];
  if (!obj) return out;
  if (Array.isArray(obj)) {
    for (const x of obj) if (typeof x === "string") out.push(x);
  } else if (typeof obj === "object") {
    // heuristiques: ids, all, list, rules
    const keys = ["ids", "all", "list", "rules"];
    for (const k of keys) {
      const v = obj[k];
      if (Array.isArray(v) && v.every((x: any) => typeof x === "string")) {
        out.push(...v);
      }
    }
  }
  return out;
}

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}
