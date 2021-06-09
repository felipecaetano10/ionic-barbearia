import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Cliente } from './cliente.model';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  clientes: Cliente[];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private clienteService: ClienteService
  ) { }

  ionViewWillEnter() {
    this.listar();
  }

  ngOnInit() {}

  listar() {
    this.clienteService
      .getClientes()
      .subscribe(
        (dados) => {
          this.clientes = dados;
        }, 
        (erro) => {
          console.error(erro);
        }
      );
  }

  confirmarExclusao(cliente: Cliente) {
    this.alertController.create({
      header: 'Confirmação de exclusão', 
      message: `Deseja excluir o cliente ${cliente.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.excluir(cliente)
        },
        {
          text: 'Não',
        }
      ]
    }).then(alerta => alerta.present());
  }

  private excluir(cliente: Cliente) {
    this.clienteService
      .excluir(cliente.id)
      .subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController.create({
            message: `Não foi possível excluir o cliente ${cliente.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger'
          }).then(t => t.present());
        }
      );
  }

}
