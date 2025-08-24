// src/utils/TypedEventEmitter.ts
import type { BCXAnyEvent, BCXEventEmitter } from '../types/events';

export abstract class TypedEventEmitter<T extends Record<string, any>>
  implements BCXEventEmitter<T> {

  private readonly _listeners = new Map<keyof T, Set<(value: T[keyof T]) => void>>();
  private readonly _allListeners = new Set<(value: BCXAnyEvent<T>) => void>();

  public onAny(listener: (value: BCXAnyEvent<T>) => void): () => void {
    this._allListeners.add(listener);
    return () => this._allListeners.delete(listener);
  }

  public on<K extends keyof T>(event: K, listener: (value: T[K]) => void): () => void {
    let listeners = this._listeners.get(event) as Set<(value: T[K]) => void> | undefined;
    if (!listeners) {
      listeners = new Set<(value: T[K]) => void>();
      this._listeners.set(event, listeners as any);
    }
    listeners.add(listener);
    return () => {
      listeners!.delete(listener);
      if (listeners!.size === 0) this._listeners.delete(event);
    };
  }

  protected emit<K extends keyof T>(event: K, value: T[K]): void {
    this._listeners.get(event as any)?.forEach((cb: any) => cb(value));
    const eventData = { event, data: value } as unknown as BCXAnyEvent<T>;
    this._allListeners.forEach((cb) => cb(eventData));
  }
}
