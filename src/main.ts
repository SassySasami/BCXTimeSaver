// src/main.ts
import { findModSDK, registerWithSDK } from './sdk';
import { waitForBcxModApi } from './utils/waitForBCX';
import { getOwnActiveRules } from './rules';
import './panels/RulesPanels';

async function boot() {
  try {
    registerWithSDK(findModSDK());

    const api = await waitForBcxModApi('BCXTimeSaver'); // <= clé: utilise window.bcx.getModApi('BCX')
    console.debug('[BCX TS] API récupérée via getModApi:', api?.version ?? '(sans version)');

    const panel = document.createElement('bcx-ts-panel') as any;
    document.documentElement.appendChild(panel);

    panel.setStatus('Chargement des règles actives…');
    const rules = await getOwnActiveRules(api);
    panel.setData(rules);
    panel.setStatus(`${rules.length} règle(s) active(s)`);

    panel.addEventListener('bcx-ts-refresh', async () => {
      panel.setStatus('Rafraîchissement…');
      const fresh = await getOwnActiveRules(api);
      panel.setData(fresh);
      panel.setStatus(`${fresh.length} règle(s) active(s)`);
    });
  } catch (e) {
    console.error('[BCX TS] Erreur de boot:', e);
    alert('BCX Time Saver: impossible de démarrer (voir console).');
  }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
