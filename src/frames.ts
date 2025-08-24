// src/frames.ts
/**
 * Enumère toutes les fenêtres same-origin à partir d'une racine.
 * Corrige TS2345: on ne pousse dans la pile que des Window non-undefined et same-origin.
 */
export function enumerateSameOriginWindows(root: Window = window): Window[] {
    const result: Window[] = [];
    const stack: Window[] = [root];
  
    while (stack.length) {
      const w = stack.pop()!;
      result.push(w);
  
      // Parcours des frames de w
      const frames = w.frames;
      for (let i = 0; i < frames.length; i++) {
        const f = frames[i] as Window | undefined;
        if (!f) continue; // garde de type
  
        try {
          // Si cross-origin, l'accès à location.* lèvera une exception
          // On teste same-origin via la comparaison d'origin
          if (f.location && w.location && f.location.origin === w.location.origin) {
            stack.push(f); // ici f est assuré Window
          }
        } catch {
          // cross-origin -> ignore
        }
      }
    }
    return result;
  }
  
  /** Renvoie la première fenêtre avec le même origin qui contient predicate(win) === true */
  export function findWindow(predicate: (w: Window) => boolean, root: Window = window): Window | undefined {
    for (const w of enumerateSameOriginWindows(root)) {
      try {
        if (predicate(w)) return w;
      } catch {
        /* ignore */
      }
    }
    return undefined;
  }
  