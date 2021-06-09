import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController,  } from '@ionic/angular';
import { Barbeiro } from './barbeiro.model';
import { BarbeiroService } from './barbeiro.service';


@Component({
  selector: 'app-barbeiros',
  templateUrl: './barbeiros.page.html',
  styleUrls: ['./barbeiros.page.scss'],
})
export class BarbeirosPage implements OnInit {
  barbeiros: Barbeiro[];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private barbeiroService: BarbeiroService
  ) { }

  ionViewWillEnter() {
    this.listar();
  }

  ngOnInit() {}

  listar() {
    this.barbeiroService
      .getBarbeiros()
      .subscribe(
        (dados) => {
          this.barbeiros = dados;
        }, 
        (erro) => {
          console.error(erro);
        }
      );
  }

  confirmarExclusao(barbeiro: Barbeiro) {
    this.alertController.create({
      header: 'Confirmação de exclusão', 
      message: `Deseja excluir o barbeiro ${barbeiro.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.excluir(barbeiro)
        },
        {
          text: 'Não',
        }
      ]
    }).then(alerta => alerta.present());
  }

  private excluir(barbeiro: Barbeiro) {
    this.barbeiroService
      .excluir(barbeiro.id)
      .subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController.create({
            message: `Não foi possível excluir o barbeiro ${barbeiro.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger'
          }).then(t => t.present());
        }
      );
  }
}
