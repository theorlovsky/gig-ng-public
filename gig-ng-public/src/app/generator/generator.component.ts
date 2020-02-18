import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GeneratorQuery, GeneratorService } from '@app/state/generator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { concatMap, distinctUntilChanged, map, mapTo, skip, startWith } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratorComponent implements OnInit {

  readonly characterWeight = 0.2;
  readonly character$: Observable<string>;
  readonly grid$ = this.generatorQuery.grid$;
  readonly buttonDisabled$: Observable<boolean>;
  readonly characterDisabled$: Observable<boolean>;

  private readonly characterSubject$ = new BehaviorSubject<string>('');
  private readonly characterChange$: Observable<string>;
  private readonly characterDebounceTime = 4000;

  constructor(private generatorQuery: GeneratorQuery, private generatorService: GeneratorService) {
    this.character$ = this.characterSubject$.asObservable();

    this.buttonDisabled$ = this.grid$.pipe(
      map((grid) => !!grid.length),
    );

    this.characterChange$ = this.character$.pipe(
      distinctUntilChanged(),
      untilDestroyed(this),
    );

    this.characterDisabled$ = this.characterChange$.pipe(
      skip(1),
      concatMap(() => (
        timer(this.characterDebounceTime).pipe(
          mapTo(false),
          startWith(true),
        )),
      ),
    );
  }

  ngOnInit(): void {
    this.subscribeToCharacterChanges();
  }

  generateGrid(): void {
    this.generatorService.activateGenerator();
  }

  setCharacter(character: string): void {
    this.characterSubject$.next(character);
  }

  subscribeToCharacterChanges(): void {
    this.characterChange$.subscribe((character) => {
      this.generatorService.setPrimaryCharacter(character, this.characterWeight);
    });
  }

}
