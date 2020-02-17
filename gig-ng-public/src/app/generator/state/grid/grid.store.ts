import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface GridState {
  grid: string[][];
}

export function createInitialState(): GridState {
  return {
    grid: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'grid' })
export class GridStore extends Store<GridState> {

  constructor() {
    super(createInitialState());
  }

}
