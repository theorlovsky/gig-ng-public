import { Injectable } from '@angular/core';
import { Payment, PaymentsStore } from './payments.store';

export type NewPayment = Omit<Payment, 'id'>;

@Injectable({ providedIn: 'root' })
export class PaymentsService {

  constructor(private paymentsStore: PaymentsStore) {
  }

  add(payment: NewPayment): void {
    const ids = this.paymentsStore.getValue().ids || [];
    const lastId = ids.length ? ids[ids.length - 1] : -1;

    this.paymentsStore.add(
      {
        ...payment,
        id: lastId + 1,
      },
      { prepend: true },
    );
  }

}
