import { Injectable } from '@angular/core';
import { getRandomString } from '@app/utils';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { interval, Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GeneratorState, GeneratorStore } from './generator.store';

@UntilDestroy({ checkProperties: true })
@Injectable({ providedIn: 'root' })
export class GeneratorService {

  private readonly gridSize = 10;
  private readonly validCharRegex = /[a-z]/;
  private readonly generateInterval = 2000;
  private readonly gridGenerator$: Observable<GeneratorState['grid']>;

  private subscription: Subscription | null = null;

  constructor(private gridStore: GeneratorStore) {
    this.gridGenerator$ = interval(this.generateInterval).pipe(
      map(() => this.generateGrid()),
      startWith(this.generateGrid()),
      untilDestroyed(this),
    );
  }

  activateGenerator(): void {
    if (this.subscription) {
      return;
    }

    this.subscription = this.gridGenerator$.subscribe((grid) => {
      this.gridStore.update({ grid });
    });
  }

  private generateGrid(): GeneratorState['grid'] {
    return [...Array(this.gridSize)].map(() => {
      return [...Array(this.gridSize)].map(() => {
        let validChar = '';

        while (!validChar) {
          const randomString = getRandomString();
          const match = this.validCharRegex.exec(randomString);

          validChar = match ? match[0] : '';
        }

        return validChar;
      });
    });
  }

}
