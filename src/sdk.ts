// src/sdk.ts
import type { ModSDKGlobalAPI } from 'bondage-club-mod-sdk';

export const MOD_INFO = {
  name: 'BCXTimeSaver',
  fullName: 'BCX Time Saver',
  version: '0.1.0',
};

export function findModSDK(): ModSDKGlobalAPI | undefined {
  return globalThis.window?.bcModSDK;
}

export function registerWithSDK(sdk?: ModSDKGlobalAPI): void {
  if (!sdk) return;
  try {
    sdk.registerMod(MOD_INFO, { allowReplace: true });
    console.debug('[BCX TS] Mod enregistré via ModSDK:', MOD_INFO, 'SDK v', sdk.version);
  } catch (e) {
    console.warn('[BCX TS] registerMod a échoué (déjà pris ?):', e);
  }
}
