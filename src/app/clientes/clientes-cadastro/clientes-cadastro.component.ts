import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Genero } from 'src/app/shared/genero.enum';
import { CpfValidator } from 'src/app/shared/cpf-validator';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-clientes-cadastro',
  templateUrl: './clientes-cadastro.component.html',
  styleUrls: ['./clientes-cadastro.component.scss'],
})
export class ClientesCadastroComponent implements OnInit {
  mesesAbreviados = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  clienteId: number;
  clientesForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private router: Router
  ) {
    let cliente = {
      id: null,
      nome: '',
      cpf: '',
      endereco: null,
      dataNascimento: null,
      genero: Genero.FEMININO,
      foto: '',
    };
    this.initializaFormulario(cliente);
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== undefined) {
      this.clienteId = parseInt(id);
      this.clienteService.getCliente(this.clienteId).subscribe((cliente) => {
        this.initializaFormulario(cliente);
      });
    }
  }

  initializaFormulario(cliente: Cliente) {
    this.clientesForm = new FormGroup({
      nome: new FormControl(cliente.nome, [Validators.required]),
      dataNascimento: new FormControl(cliente.dataNascimento),
      genero: new FormControl(cliente.genero, Validators.required),
      cpf: new FormControl(
        cliente.cpf,
        Validators.compose([
          CpfValidator.validCpf,
          Validators.required,
        ])
      ),
      endereco: new FormControl(cliente.endereco, Validators.required),
      foto: new FormControl(cliente.foto, Validators.required),
    });
  }

  salvar() {
    const cliente: Cliente = { ...this.clientesForm.value, id: this.clienteId };
    this.clienteService.salvar(cliente).subscribe(
      () => this.router.navigate(['clientes']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar o cliente ${cliente.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get nome() {
    return this.clientesForm.get('nome');
  }

  get cpf() {
    return this.clientesForm.get('cpf');
  }

  get endereco() {
    return this.clientesForm.get('endereco');
  }
  get foto() {
    return this.clientesForm.get('foto');
  }
}
