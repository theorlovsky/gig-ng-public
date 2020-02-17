import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeneratorModule } from '@app/generator/generator.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GeneratorModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
