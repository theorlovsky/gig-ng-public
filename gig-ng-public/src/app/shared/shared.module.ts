import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CodeComponent } from './components/code/code.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    CodeComponent,
  ],
  exports: [
    CodeComponent,
  ],
})
export class SharedModule {
}
