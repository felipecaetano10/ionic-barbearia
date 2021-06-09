import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientesPageRoutingModule } from './clientes-routing.module';

import { ClientesPage } from './clientes.page';
import { HttpClientModule } from '@angular/common/http';
import { ClientesCadastroComponent } from './clientes-cadastro/clientes-cadastro.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ClientesPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ClientesPage, ClientesCadastroComponent]
})
export class ClientesPageModule {}
