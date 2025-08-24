// src/ui.ts
import type { BCXApi, RuleId } from "./types";

export type UiRefs = {
  root: HTMLDivElement;
  status: HTMLDivElement;
  list: HTMLDivElement;
  targetInput: HTMLInputElement;
  btnLoad: HTMLButtonElement;
  btnRefresh: HTMLButtonElement;
};

export function buildUI(): UiRefs {
  const root = document.createElement("div");
  root.style.cssText = `
    position: fixed; right: 16px; bottom: 16px; z-index: 999999;
    background: rgba(0,0,0,.8); color: #fff; padding: 10px; border-radius: 8px;
    font: 13px/1.4 system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    width: 360px; box-shadow: 0 4px 24px rgba(0,0,0,.5);
  `;

  const title = document.createElement("div");
  title.textContent = "BCX TimeSaver — Règles";
  title.style.cssText = "font-weight: 600; margin-bottom: 8px;";

  const row = document.createElement("div");
  row.style.cssText = "display:flex; gap:6px; margin-bottom:6px;";

  const targetInput = document.createElement("input");
  targetInput.placeholder = "MemberNumber (vide = Player)";
  targetInput.style.cssText = `
    flex:1 1 auto; padding:4px 6px; border-radius:4px;
    border:1px solid #444; background:#111; color:#fff;
  `;

  const btnLoad = document.createElement("button");
  btnLoad.textContent = "Afficher";
  btnLoad.style.cssText = `
    flex:0 0 auto; padding:4px 8px; border-radius:4px;
    border:1px solid #666; background:#222; color:#fff; cursor:pointer;
  `;

  const btnRefresh = document.createElement("button");
  btnRefresh.textContent = "↻";
  btnRefresh.title = "Rafraîchir la liste des règles";
  btnRefresh.style.cssText = `
    flex:0 0 auto; padding:4px 8px; border-radius:4px;
    border:1px solid #666; background:#222; color:#fff; cursor:pointer;
  `;

  const status = document.createElement("div");
  status.textContent = "En attente de BCX…";
  status.style.cssText = "opacity:.85; margin-bottom:6px;";

  const legend = document.createElement("div");
  legend.innerHTML = `
    <span style="display:inline-block;width:10px;height:10px;background:#2ea043;border-radius:2px;margin-right:4px;vertical-align:middle;"></span>
    Enforced
    <span style="display:inline-block;width:10px;height:10px;background:#8b949e;border-radius:2px;margin:0 4px 0 12px;vertical-align:middle;"></span>
    In effect
    <span style="display:inline-block;width:10px;height:10px;background:#c69026;border-radius:2px;margin:0 4px 0 12px;vertical-align:middle;"></span>
    Logged
  `;
  legend.style.cssText = "opacity:.85; margin-bottom:6px;";

  const list = document.createElement("div");
  list.style.cssText = `
    max-height: 280px; overflow:auto; background: rgba(255,255,255,.06);
    padding:6px; border-radius:6px;
  `;

  row.appendChild(targetInput);
  row.appendChild(btnLoad);
  row.appendChild(btnRefresh);
  root.appendChild(title);
  root.appendChild(row);
  root.appendChild(status);
  root.appendChild(legend);
  root.appendChild(list);
  document.body.appendChild(root);

  return { root, status, list, targetInput, btnLoad, btnRefresh };
}

export function renderRules(listEl: HTMLDivElement, api: BCXApi, rules: RuleId[]) {
  const frag = document.createDocumentFragment();
  listEl.innerHTML = "";
  if (!rules.length) {
    const empty = document.createElement("div");
    empty.textContent = "Aucune règle détectée. Clique sur ↻ pour réessayer.";
    listEl.appendChild(empty);
    return;
  }
  for (const id of rules) {
    const st = api.getRuleState(id);

    const row = document.createElement("div");
    row.style.cssText = `
      display:flex; gap:8px; align-items:center; margin:4px 0; padding:4px 6px; border-radius:6px;
      ${st?.isEnforced ? "background:rgba(46,160,67,.25); outline:1px solid rgba(46,160,67,.6);" : ""}
    `;

    const name = document.createElement("code");
    name.textContent = id;
    name.style.cssText = `
      background:rgba(0,0,0,.3); padding:2px 4px; border-radius:4px;
      ${st?.isEnforced ? "border:1px solid rgba(46,160,67,.6);" : ""}
    `;

    const badges = document.createElement("div");
    badges.style.cssText = "margin-left:auto; display:flex; gap:6px;";

    const bEnf = pill("Enforced", "#2ea043", st?.isEnforced);
    const bEff = pill("In effect", "#8b949e", st?.inEffect);
    const bLog = pill("Logged", "#c69026", st?.isLogged);

    badges.appendChild(bEnf);
    badges.appendChild(bEff);
    badges.appendChild(bLog);

    row.appendChild(name);
    row.appendChild(badges);
    frag.appendChild(row);
  }
  listEl.appendChild(frag);
}

function pill(label: string, color: string, on?: boolean | null) {
  const el = document.createElement("span");
  el.textContent = label;
  el.style.cssText = `
    font-size:12px; padding:1px 6px; border-radius:999px;
    border:1px solid ${color}; color:${on ? "#fff" : color};
    background:${on ? color : "transparent"};
    opacity:${on ? "1" : ".7"};
  `;
  return el;
}
