import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarbeirosCadastroComponent } from './barbeiros-cadastro/barbeiros-cadastro.component';

import { BarbeirosPage } from './barbeiros.page';

const routes: Routes = [
  {
    path: '',
    component: BarbeirosPage
  },
  {
    path: 'cadastro',
    component: BarbeirosCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: BarbeirosCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarbeirosPageRoutingModule {}
