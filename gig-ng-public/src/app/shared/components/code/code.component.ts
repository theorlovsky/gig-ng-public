import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GeneratorQuery } from '@app/state/generator';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeComponent {

  readonly code$ = this.generatorQuery.code$;

  constructor(private generatorQuery: GeneratorQuery) {
  }

}
