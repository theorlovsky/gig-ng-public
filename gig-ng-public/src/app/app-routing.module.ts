import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneratorComponent } from '@app/generator/generator.component';

const routes: Routes = [
  {
    path: 'generator',
    component: GeneratorComponent,
  },
  {
    path: 'payments',
    loadChildren: () => import('@app/payments/payments.module')
      .then((m) => m.PaymentsModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'generator',
  },
  {
    path: '**',
    redirectTo: 'generator',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
