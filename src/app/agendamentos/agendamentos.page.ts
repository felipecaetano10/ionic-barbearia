import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Agendamento } from './agendamento.model';
import { AgendamentoService } from './agendamento.service';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.page.html',
  styleUrls: ['./agendamentos.page.scss'],
})
export class AgendamentosPage implements OnInit {
  agendamentos: Agendamento[];

  agendamentoConcluido(agendamento: Agendamento){
    var dataHoje =  new Date(); 
    var dataAgendamento =  new Date(agendamento.data); 

    if (dataAgendamento > dataHoje){
      return true;
    } else {
      return false;
    }
  }

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private agendamentoService: AgendamentoService
  ) {}

  ionViewWillEnter() {
    this.listar();
  }

  ngOnInit() {      
  }

  listar() {
    this.agendamentoService
      .getAgendamentos()
      .subscribe(
        (dados) => {
          this.agendamentos = dados;
        }, 
        (erro) => {
          console.error(erro);
        }
      );
  }

  confirmarExclusao(agendamento: Agendamento) {
    this.alertController.create({
      header: 'Confirmação de exclusão', 
      message: `Deseja excluir o agendamento ${agendamento.id}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.excluir(agendamento)
        },
        {
          text: 'Não',
        }
      ]
    }).then(alerta => alerta.present());
  }

  private excluir(agendamento: Agendamento) {
    this.agendamentoService
      .excluir(agendamento.id)
      .subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController.create({
            message: `Não foi possível excluir o agendamento ${agendamento.id}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger'
          }).then(t => t.present());
        }
      );
  }
}
