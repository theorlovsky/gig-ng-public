import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface GeneratorState {
  grid: string[][];
}

export function createInitialState(): GeneratorState {
  return {
    grid: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'generator' })
export class GeneratorStore extends Store<GeneratorState> {

  constructor() {
    super(createInitialState());
  }

}
