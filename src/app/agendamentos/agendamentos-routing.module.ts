import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamentosCadastroComponent } from './agendamentos-cadastro/agendamentos-cadastro.component';

import { AgendamentosPage } from './agendamentos.page';

const routes: Routes = [
  {
    path: '',
    component: AgendamentosPage
  },
  {
    path: 'cadastro',
    component: AgendamentosCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: AgendamentosCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendamentosPageRoutingModule {}
