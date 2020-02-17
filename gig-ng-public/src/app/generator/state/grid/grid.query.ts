import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { GridState, GridStore } from './grid.store';

@Injectable({ providedIn: 'root' })
export class GridQuery extends Query<GridState> {

  readonly grid$ = this.select((state) => state.grid);

  constructor(protected store: GridStore) {
    super(store);
  }

}
