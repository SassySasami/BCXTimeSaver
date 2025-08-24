// src/utils/probeBCX.ts
import type { BCXApi } from '../types';

export function probeBCX(win: Window, modName = 'BCXTimeSaver'): BCXApi | undefined {
  const host = (win as any).BCX as BCXHost | undefined;
  if (!host || typeof host.getModApi !== 'function') return undefined;
  try {
    const api = host.getModApi(modName);
    return api || undefined;
  } catch {
    return undefined;
  }
}
