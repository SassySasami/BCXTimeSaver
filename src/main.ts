// src/main.ts
import { waitForBCX } from "./bcx";
import { buildUI, renderRules } from "./ui";
import { enumerateAllRules } from "./rules";

async function bootstrap() {
  const ui = buildUI();

  try {
    const api = await waitForBCX(20000, 'BCXTimeSaver');
    ui.status.textContent = "BCX détecté. Récupération de toutes les règles…";

    let allRules = await enumerateAllRules(api);
    if (!allRules.length) {
      ui.status.textContent = "Impossible d’énumérer les règles (essaye ↻).";
    } else {
      ui.status.textContent = `Règles détectées: ${allRules.length}.`;
    }
    renderRules(ui.list, api, allRules);

    // Bouton Afficher: recharge l’état pour Player ou un member précis (affichage local des états)
    ui.btnLoad.addEventListener("click", async () => {
      const raw = ui.targetInput.value.trim();
      if (!raw) {
        renderRules(ui.list, api, allRules);
        return;
      }
      const member = Number(raw);
      if (!Number.isFinite(member)) {
        ui.status.textContent = "MemberNumber invalide.";
        return;
      }
      if (!api.sendQuery) {
        ui.status.textContent = "api.sendQuery indisponible (affichage local uniquement).";
        renderRules(ui.list, api, allRules);
        return;
      }
      // Si tu veux réellement récupérer l’état d’un autre membre, il faudra connaître le message exact.
      // Ici, on envoie une requête “douce” pour inciter BCX à matérialiser/rafraîchir l’état côté local si applicable.
      try {
        await api.sendQuery("rules:pulse", { rules: allRules.slice(0, 1) }, member, 3000).catch(() => {});
      } catch {}
      renderRules(ui.list, api, allRules);
      ui.status.textContent = `États affichés (local). Requête envoyée à #${member} si supportée.`;
    });

    // Bouton ↻: réénumère les règles (utile si un mod charge des règles après-coup)
    ui.btnRefresh.addEventListener("click", async () => {
      ui.status.textContent = "Récupération de toutes les règles…";
      allRules = await enumerateAllRules(api);
      ui.status.textContent = allRules.length
        ? `Règles détectées: ${allRules.length}.`
        : "Aucune règle détectée.";
      renderRules(ui.list, api, allRules);
    });
  } catch (err: any) {
    ui.status.textContent = `BCX non détecté: ${err?.message ?? err}`;
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap, { once: true });
} else {
  bootstrap();
}
