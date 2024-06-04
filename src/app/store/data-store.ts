import { Injectable, Signal, computed, signal } from '@angular/core';

@Injectable()
export abstract class DataService<T> {
  protected state = signal({} as { [key: string]: T });

  public getState(): Signal<{ [key: string]: T }> {
    return computed(() => this.state());
  }

  public setState(key: string, data: T): void {
    this.state.update((currentValue) => ({ ...currentValue, [key]: data }));
  }

  public hasData(key: string): boolean {
    return this.state()[key] !== undefined;
  }

  abstract loadData(key: string): void;
}
