// src/rules.ts
async function resolvePlayerId(api: BCX.Api): Promise<number> {
  // Plusieurs formes possibles: api.player (objet), api.player() (fn), api.getPlayer()
  const pLike = typeof api.player === 'function' ? await (api.player as any)()
            : api.player ?? (await api.getPlayer?.());
  const id = pLike?.id;
  if (typeof id !== 'number') throw new Error('BCX: Player ID introuvable');
  return id;
}

async function getRulesFor(api: BCX.Api, characterId: number): Promise<BCX.Rule[]> {
  // Priorité aux méthodes "actives"
  if (api.rules?.getActiveRulesFor) return (await api.rules.getActiveRulesFor(characterId)) ?? [];
  if (api.getActiveRulesFor)       return (await api.getActiveRulesFor(characterId)) ?? [];
  // Fallback: on récupère tout puis on filtre active===true
  const all =
    (api.rules?.getRulesFor && (await api.rules.getRulesFor(characterId))) ||
    (api.getRulesFor && (await api.getRulesFor(characterId))) || [];
  return all.filter(r => r.active !== false);
}

export async function getOwnActiveRules(api: BCX.Api): Promise<BCX.Rule[]> {
  const meId = await resolvePlayerId(api);
  return getRulesFor(api, meId);
}
