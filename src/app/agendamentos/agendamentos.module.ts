import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendamentosPageRoutingModule } from './agendamentos-routing.module';

import { AgendamentosPage } from './agendamentos.page';
import { HttpClientModule } from '@angular/common/http';
import { AgendamentosCadastroComponent } from './agendamentos-cadastro/agendamentos-cadastro.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AgendamentosPageRoutingModule,
    HttpClientModule
  ],
  declarations: [AgendamentosPage, AgendamentosCadastroComponent]
})
export class AgendamentosPageModule {}
