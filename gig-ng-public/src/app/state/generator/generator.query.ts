import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { GeneratorState, GeneratorStore } from './generator.store';

@Injectable({ providedIn: 'root' })
export class GeneratorQuery extends Query<GeneratorState> {

  readonly grid$ = this.select((state) => state.grid);

  constructor(protected store: GeneratorStore) {
    super(store);
  }

}
