import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { GridQuery, GridService } from './state/grid';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratorComponent {

  readonly characterControl: FormControl;

  grid$ = this.gridQuery.grid$;

  constructor(private fb: FormBuilder, private gridQuery: GridQuery, private gridService: GridService) {
    this.characterControl = this.fb.control('');
  }

  generateGrid(): void {
    this.gridService.generateGrid();
  }

}
