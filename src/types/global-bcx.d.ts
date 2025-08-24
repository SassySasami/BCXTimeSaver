// src/types/global.d.ts
export {};

declare global {
  interface BCXHost {
    getModApi?: (name: string) => any | null | undefined;
    getModuleApi?: (name: string) => any | null | undefined;
    [k: string]: any;
  }

  interface Window {
    bcx?: BCXHost; // minuscule
    BCX?: BCXHost; // majuscule (au cas où)
    unsafeWindow?: Window; // userscript environnements
    wrappedJSObject?: Window; // Firefox
  }
}
