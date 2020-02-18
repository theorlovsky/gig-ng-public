import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { GeneratorQuery, GeneratorService } from '@app/state/generator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratorComponent {

  readonly characterControl: FormControl;
  readonly grid$ = this.generatorQuery.grid$;
  readonly code$ = this.generatorQuery.code$;
  readonly buttonDisabled$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private generatorQuery: GeneratorQuery,
    private generatorService: GeneratorService,
  ) {
    this.characterControl = this.fb.control('');

    this.buttonDisabled$ = this.grid$.pipe(
      map((grid) => !!grid.length),
      untilDestroyed(this),
    );
  }

  generateGrid(): void {
    this.generatorService.activateGenerator();
  }

}
