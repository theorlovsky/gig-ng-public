import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneratorQuery, GeneratorState } from '@app/state/generator';
import { PaymentsQuery, PaymentsService } from '@app/state/payments';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsComponent implements OnInit {

  readonly paymentForm: FormGroup;
  readonly grid$ = this.generatorQuery.grid$;
  readonly code$ = this.generatorQuery.code$;
  readonly columns = ['name', 'amount', 'code', 'grid'];
  readonly payments$ = this.paymentsQuery.payments$;

  constructor(
    private fb: FormBuilder,
    private generatorQuery: GeneratorQuery,
    private paymentsService: PaymentsService,
    private paymentsQuery: PaymentsQuery,
  ) {
    this.paymentForm = this.fb.group({
      name: ['', Validators.required],
      amount: [null, Validators.required],
      code: ['', Validators.required],
      grid: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.subscribeToGridChange();
    this.subscribeToCodeChange();
  }

  addPayment(): void {
    if (this.paymentForm.invalid) {
      return;
    }

    this.paymentsService.add(this.paymentForm.value);
    this.paymentForm.reset();
  }

  stringifyGrid(grid: GeneratorState['grid']): string {
    return JSON.stringify(grid);
  }

  private subscribeToGridChange(): void {
    this.grid$
      .pipe(
        untilDestroyed(this),
      )
      .subscribe((grid) => {
        this.paymentForm.patchValue({ grid });
      });
  }

  private subscribeToCodeChange(): void {
    this.code$
      .pipe(
        untilDestroyed(this),
      )
      .subscribe((code) => {
        this.paymentForm.patchValue({ code });
      });
  }

}
