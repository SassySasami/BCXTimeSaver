// src/types/global-bcx.d.ts
import type { ModSDKGlobalAPI } from 'bondage-club-mod-sdk';

declare global {
  interface Window {
    bcModSDK?: ModSDKGlobalAPI;
    // BCX expose un objet "bcx" avec getModApi
    bcx?: {
      getModApi?: (modName: string) => any | Promise<any>;
    };
  }

  // Types "minimaux" pour ce qu'on utilise
  namespace BCX {
    interface Player { id: number; name?: string }
    interface Rule {
      id: string;
      name: string;
      description?: string;
      enforcedBy?: string;
      active?: boolean;
      category?: string;
    }
    interface RulesApi {
      getActiveRulesFor?: (characterId: number) => Promise<Rule[]>;
      getRulesFor?: (characterId: number) => Promise<Rule[]>;
    }
    interface Api {
      version?: string;
      player?: Player | (() => Player | Promise<Player>);
      getPlayer?: () => Player | Promise<Player>;
      rules?: RulesApi;
      // fallback possibles
      getActiveRulesFor?: (characterId: number) => Promise<Rule[]>;
      getRulesFor?: (characterId: number) => Promise<Rule[]>;
    }
  }
}

export {};
