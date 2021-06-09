import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarbeirosPageRoutingModule } from './barbeiros-routing.module';

import { BarbeirosPage } from './barbeiros.page';
import { HttpClientModule } from '@angular/common/http';
import { BarbeirosCadastroComponent } from './barbeiros-cadastro/barbeiros-cadastro.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BarbeirosPageRoutingModule,
    HttpClientModule
  ],
  declarations: [BarbeirosPage, BarbeirosCadastroComponent]
})
export class BarbeirosPageModule {}