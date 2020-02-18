import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '@app/shared/shared.module';
import { GeneratorComponent } from './generator.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    SharedModule,
  ],
  declarations: [
    GeneratorComponent,
  ],
})
export class GeneratorModule {
}
