import { waitForBCX } from "../utils/waitForBCX";

type BcxRule = {
  id?: string | number;
  key?: string;
  name?: string;
  category?: string;
  description?: string;
  desc?: string;
  enabled?: boolean;
  active?: boolean;
  state?: boolean;
};

function escapeHtml(s: unknown): string {
  return String(s ?? "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;").replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// Essaie plusieurs chemins de BCX pour trouver la liste des règles
function getBcxRulesArray(): BcxRule[] | null {
  const w = window as any;
  const paths: string[][] = [
    ["BCX", "Modules", "Rules", "rules"],
    ["BCX", "Rules", "rules"],
    ["BCX", "data", "Rules", "rules"],
    ["BCX", "State", "Rules", "rules"],
    ["bcx", "Modules", "Rules", "rules"],
    ["BCX", "modules", "rules"],
    ["BCX", "config", "rules"],
  ];
  for (const p of paths) {
    let cur: any = w;
    let ok = true;
    for (const seg of p) {
      if (cur && seg in cur) cur = cur[seg];
      else { ok = false; break; }
    }
    if (ok && Array.isArray(cur) && cur.length >= 0) return cur as BcxRule[];
  }
  return null;
}

// Normalise chaque règle pour l’affichage
function normalizeRule(r: any): Required<Pick<BcxRule, "id" | "name" | "category">> & {
  desc?: string; enabled: boolean;
} {
  const id = r.id ?? r.key ?? r.ruleId ?? r.name ?? "unknown";
  const name = r.name ?? r.title ?? String(id);
  const category = r.category ?? r.group ?? "Divers";
  const desc = r.description ?? r.desc ?? r.text ?? undefined;
  const enabled = Boolean(r.enabled ?? r.active ?? r.state ?? r.on ?? r.value);
  return { id, name, category, desc, enabled };
}

function makeStyles(): HTMLStyleElement {
  const style = document.createElement("style");
  style.textContent = `
:root { --rp-bg:#14161a; --rp-panel:#1d2229; --rp-accent:#6aa2ff; --rp-text:#e8eefc; --rp-dim:#a9b3c7; --rp-border:#2b3440; }
.rp-btn {
  position: fixed; right: 16px; bottom: 16px; z-index: 2147483000;
  background: var(--rp-accent); color:#081019; border:none; border-radius:10px;
  padding:10px 14px; font: 600 13px/1.2 ui-sans-serif, system-ui, -apple-system, Segoe UI;
  box-shadow:0 6px 16px rgba(0,0,0,.35); cursor:pointer;
}
.rp-btn:hover { filter: brightness(1.05); }
.rp-root {
  position: fixed; right: 16px; bottom: 60px; width: 520px; max-height: 70vh; z-index: 2147483000;
  background: var(--rp-panel); color: var(--rp-text); border:1px solid var(--rp-border); border-radius:12px;
  box-shadow:0 10px 30px rgba(0,0,0,.5); display:none; flex-direction:column; overflow:hidden;
}
.rp-root.open { display:flex; }
.rp-header { display:flex; gap:8px; align-items:center; padding:10px 12px; border-bottom:1px solid var(--rp-border); }
.rp-title { font-weight:700; font-size:14px; flex:1;}
.rp-search { flex: 2; }
.rp-search input {
  width:100%; padding:8px 10px; border-radius:8px; border:1px solid var(--rp-border); background:#0e1116; color:var(--rp-text);
}
.rp-content { overflow:auto; padding: 8px 12px; display:flex; flex-direction:column; gap:8px; }
.rp-row { display:flex; align-items:center; gap:12px; padding:8px; border:1px solid var(--rp-border); border-radius:10px; background:#0f1319; }
.rp-name { font-weight:600; }
.rp-pill { margin-left:6px; background:#0a0f16; border:1px solid var(--rp-border); color: var(--rp-dim); border-radius:999px; padding:1px 6px; font-size:11px; }
.rp-desc { color: var(--rp-dim); font-size:12px; margin-top:2px; }
.rp-toggle { width:18px; height:18px; }
.rp-close { background:transparent; border:none; color:var(--rp-dim); cursor:pointer; padding:6px; font-size:18px; }
.rp-empty { color: var(--rp-dim); font-size:13px; padding: 12px; text-align:center; }
`;
  return style;
}

export class RulesPanel {
  private root: HTMLDivElement;
  private btn: HTMLButtonElement;
  private searchInput!: HTMLInputElement;
  private list!: HTMLDivElement;

  constructor() {
    this.root = document.createElement("div");
    this.root.className = "rp-root";
    const header = document.createElement("div");
    header.className = "rp-header";
    const title = document.createElement("div");
    title.className = "rp-title";
    title.textContent = "Règles BCX";
    const search = document.createElement("div");
    search.className = "rp-search";
    this.searchInput = document.createElement("input");
    this.searchInput.type = "search";
    this.searchInput.placeholder = "Rechercher par nom ou catégorie…";
    search.appendChild(this.searchInput);
    const close = document.createElement("button");
    close.className = "rp-close";
    close.textContent = "×";
    close.title = "Fermer";
    close.onclick = () => this.toggle(false);
    header.append(title, search, close);

    this.list = document.createElement("div");
    this.list.className = "rp-content";

    this.root.append(header, this.list);

    this.btn = document.createElement("button");
    this.btn.className = "rp-btn";
    this.btn.textContent = "Règles BCX";
    this.btn.onclick = () => this.toggle();

    // styles globaux (une seule fois)
    if (!document.getElementById("rules-panel-styles")) {
      const st = makeStyles();
      st.id = "rules-panel-styles";
      document.head.appendChild(st);
    }

    document.body.append(this.btn, this.root);
    this.searchInput.addEventListener("input", () => this.refresh());
  }

  open() { this.toggle(true); }
  close() { this.toggle(false); }
  toggle(force?: boolean) {
    const willOpen = force ?? !this.root.classList.contains("open");
    this.root.classList.toggle("open", willOpen);
    if (willOpen) this.refresh();
  }

  refresh() {
    const rules = getBcxRulesArray();
    this.list.innerHTML = "";
    const filter = this.searchInput.value.trim().toLowerCase();

    if (!rules || rules.length === 0) {
      const empty = document.createElement("div");
      empty.className = "rp-empty";
      empty.textContent = "Aucune règle trouvée. BCX est-il chargé ?";
      this.list.appendChild(empty);
      return;
    }

    const normalized = rules.map(normalizeRule);
    let count = 0;
    for (const r of normalized) {
      if (filter && !(r.name.toLowerCase().includes(filter) || r.category.toLowerCase().includes(filter))) continue;
      const row = document.createElement("div");
      row.className = "rp-row";
      const left = document.createElement("div");
      left.style.flex = "1";
      const name = document.createElement("div");
      name.className = "rp-name";
      name.innerHTML = `${escapeHtml(r.name)} <span class="rp-pill">${escapeHtml(r.category)}</span>`;
      const desc = document.createElement("div");
      desc.className = "rp-desc";
      desc.textContent = r.desc ?? "";
      left.append(name, desc);

      const right = document.createElement("div");
      const chk = document.createElement("input");
      chk.type = "checkbox";
      chk.className = "rp-toggle";
      chk.checked = r.enabled;
      chk.disabled = true; // lecture seule tant qu’on ne branche pas l’API écriture BCX
      chk.title = "Lecture seule";
      right.appendChild(chk);

      row.append(left, right);
      this.list.appendChild(row);
      count++;
    }

    if (count === 0) {
      const empty = document.createElement("div");
      empty.className = "rp-empty";
      empty.textContent = "Aucune règle ne correspond à votre recherche.";
      this.list.appendChild(empty);
    }
  }
}

export async function bootRulesPanelWhenReady() {
  // 1) Attendre que le canvas/DOM du jeu existe
  await waitFor(() => !!(document.body && document.querySelector("canvas")));
  // 2) Attendre que BCX soit (probablement) chargé, sans bloquer définitivement
  try {
    await waitForBCX(45000);
  } catch {
    // pas grave: le panneau fonctionnera en "aucune règle" tant que BCX n’est pas prêt
  }
  // 3) Monter l’UI
  new RulesPanel();
}
