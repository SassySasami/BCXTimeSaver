import type { BCX_Events } from '../types/events';
import { TypedEventEmitter } from './TypedEventEmitter';

class BCXGlobalEventSystemClass extends TypedEventEmitter<BCX_Events> {
  public emitEvent<K extends keyof BCX_Events>(event: K, value: BCX_Events[K]) {
    this.emit(event, value);
  }
}

export const BCXGlobalEventSystem = new BCXGlobalEventSystemClass();