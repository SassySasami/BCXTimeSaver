// src/types.ts
export type RuleId = string;

export type RuleState<ID extends RuleId = RuleId> = {
  rule: ID;
  inEffect: boolean;
  isEnforced: boolean;
  isLogged: boolean;
  trigger(target?: number | null, dict?: Record<string, string>): void;
  triggerAttempt(target?: number | null, dict?: Record<string, string>): void;
} | null;

export type BCXApi = {
  modName?: string;
  getRuleState<ID extends RuleId>(rule: ID): RuleState<ID>;
  // facultatifs suivant versions de BCX
  listRules?: () => RuleId[] | Promise<RuleId[]>;
  sendQuery?: (type: string, data: any, target: number | "Player", timeout?: number) => Promise<any>;
  on?: (event: string, cb: (v: any) => void) => () => void;
  onAny?: (cb: (v: { event: string; data: any }) => void) => () => void;
};

export type BCXHost = {
  getModApi?: (name: string) => BCXApi | undefined;
  api?: BCXApi;
};

declare global {
  interface Window {
    BCX?: BCXHost;
  }
}
