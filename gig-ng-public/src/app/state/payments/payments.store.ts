import { Injectable } from '@angular/core';
import { GeneratorState } from '@app/state/generator';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface Payment {
  readonly id: number;
  name: string;
  amount: number;
  code: GeneratorState['code'];
  grid: GeneratorState['grid'];
}

export interface PaymentsState extends EntityState<Payment, number> {
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'payments' })
export class PaymentsStore extends EntityStore<PaymentsState> {

  constructor() {
    super();
  }

}
