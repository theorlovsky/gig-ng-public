import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PaymentsState, PaymentsStore } from './payments.store';

@Injectable({ providedIn: 'root' })
export class PaymentsQuery extends QueryEntity<PaymentsState> {

  readonly payments$ = this.selectAll();

  constructor(protected store: PaymentsStore) {
    super(store);
  }

}
