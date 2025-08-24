// src/types/events.d.ts
export type BCX_Events = {
    'bcx:ready': { api: BCXApi; version?: string };
  };
  
  export type BCXAnyEvent<T extends Record<string, any>> = {
    [K in keyof T]: { event: K; data: T[K] }
  }[keyof T];
  
  export interface BCXEventEmitter<T extends Record<string, any>> {
    onAny(listener: (value: BCXAnyEvent<T>) => void): () => void;
    on<K extends keyof T>(event: K, listener: (value: T[K]) => void): () => void;
  }
  