import { Injectable } from '@angular/core';
import { chunk, getRandomString } from '@app/utils';
import { UntilDestroy } from '@ngneat/until-destroy';
import moment from 'moment';
import { interval, Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GeneratorState, GeneratorStore } from './generator.store';

@UntilDestroy({ arrayName: 'subscriptions' })
@Injectable({ providedIn: 'root' })
export class GeneratorService {

  private readonly gridSize = 10;
  private readonly validCharRegex = /[a-z]/;
  private readonly generateInterval = 2000;
  private readonly gridGenerator$: Observable<GeneratorState['grid']>;
  private readonly codeGenerator$: Observable<GeneratorState['code']>;
  private readonly subscriptions: Subscription[] = [];

  private primaryCharacter = '';
  private primaryCharacterWeight = 0;

  constructor(private gridStore: GeneratorStore) {
    this.gridGenerator$ = interval(this.generateInterval).pipe(
      map(() => this.generateGrid()),
      startWith(this.generateGrid()),
    );

    this.codeGenerator$ = this.gridGenerator$.pipe(
      map((grid) => this.generateCode(grid)),
    );
  }

  activateGenerator(): void {
    if (this.subscriptions.length) {
      return;
    }

    const gridSubscription = this.gridGenerator$.subscribe((grid) => {
      this.gridStore.update({ grid });
    });
    const codeSubscription = this.codeGenerator$.subscribe((code) => {
      this.gridStore.update({ code });
    });

    this.subscriptions.push(gridSubscription);
    this.subscriptions.push(codeSubscription);
  }

  setPrimaryCharacter(character: string, primaryCharacterWeight: number): void {
    this.primaryCharacter = character;
    this.primaryCharacterWeight = primaryCharacterWeight;
  }

  private generateGrid(): GeneratorState['grid'] {
    const charCount = Math.pow(this.gridSize, 2);
    const primaryCharacters = this.getPrimaryCharacters(charCount);
    const randomCharacters = this.generateCharactersForGrid(charCount - primaryCharacters.length);
    const charactersForGrid = primaryCharacters + randomCharacters;
    const shuffledCharacters = [...charactersForGrid.split('')].sort(() => Math.random() - 0.5);

    return chunk(shuffledCharacters, this.gridSize);
  }

  private generateCode(grid: GeneratorState['grid']): GeneratorState['code'] {
    const seconds = moment().format('ss');

    const coordinate1 = +seconds[0];
    const coordinate2 = +seconds[1];

    const value1 = this.getGridValue(grid, coordinate1, coordinate2);
    const value2 = this.getGridValue(grid, coordinate2, coordinate1);

    const occurrences1 = this.countOccurrences(grid, value1);
    const occurrences2 = this.countOccurrences(grid, value2);

    return `${ occurrences1 }${ occurrences2 }`;
  }

  private getGridValue(grid: GeneratorState['grid'], x: number, y: number): string {
    return grid[x][y];
  }

  private countOccurrences(grid: GeneratorState['grid'], value: string): number {
    let counter = 0;
    let divideInteger = 2;

    grid
      .flatMap((row) => row)
      .forEach((cell) => {
        if (cell === value) {
          counter++;
        }
      });

    while (counter > 9) {
      counter = Math.ceil(counter / divideInteger);
      divideInteger++;
    }

    return counter;
  }

  private getPrimaryCharacters(charCount: number): string {
    if (!this.primaryCharacter) {
      return '';
    }

    const primaryCharacterCount = Math.round(charCount * this.primaryCharacterWeight);

    // tslint:disable-next-line no-assign-mutated-array
    return new Array(primaryCharacterCount).fill(this.primaryCharacter).join('');
  }

  private generateCharactersForGrid(targetCount: number): string {
    return new Array(targetCount)
      // tslint:disable-next-line no-assign-mutated-array
      .fill(0)
      .map(() => {
        let validChar = '';

        while (!validChar) {
          const randomString = getRandomString();
          const match = this.validCharRegex.exec(randomString);

          validChar = match ? match[0] : '';
        }

        return validChar;
      })
      .join('');
  }

}
