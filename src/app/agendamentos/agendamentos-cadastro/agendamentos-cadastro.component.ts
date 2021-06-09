import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Barbeiro } from 'src/app/barbeiros/barbeiro.model';
import { Cliente } from 'src/app/clientes/cliente.model';
import { Agendamento } from 'src/app/agendamentos/agendamento.model';
import { AgendamentoService } from 'src/app/agendamentos/agendamento.service';
import { BarbeiroService } from 'src/app/barbeiros/barbeiro.service';
import { ClienteService } from 'src/app/clientes/cliente.service';
import { TiposCabelo } from 'src/app/shared/tipos-cabelo.enum';

@Component({
  selector: 'app-agendamentos-cadastro',
  templateUrl: './agendamentos-cadastro.component.html',
  styleUrls: ['./agendamentos-cadastro.component.scss'],
})
export class AgendamentosCadastroComponent implements OnInit {

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

  types = Object.keys(TiposCabelo).map((key) => ({value: key, description: TiposCabelo[key]}));
  agendamentoId: number;
  agendamentosForm: FormGroup;
  barbeiros: Barbeiro[];
  clientes: Cliente[];

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private agendamentoService: AgendamentoService,
    private router: Router,
    private barbeiroService: BarbeiroService,
    private clienteService: ClienteService
  ) {
    let agendamento = {
      id: null,
      data: null,
      barba: false,
      cabelo: TiposCabelo.UNDERCUT,
      barbeiro: null,
      cliente: null,
      valor: 0
    };
    this.initializaFormulario(agendamento);
  }

  ngOnInit() {
    this.getClientes();
    this.getBarbeiros();

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== undefined) {
      this.agendamentoId = parseInt(id);
      this.agendamentoService.getAgendamento(this.agendamentoId).subscribe((agendamento) => {
        this.initializaFormulario(agendamento);
      });
    }
  }

  initializaFormulario(agendamento: Agendamento) {
    this.agendamentosForm = new FormGroup({
      data: new FormControl(agendamento.data, Validators.required),
      barba: new FormControl(agendamento.barba, Validators.required),
      cabelo: new FormControl(agendamento.cabelo, Validators.required),
      valor: new FormControl(agendamento.valor, Validators.required),
      barbeiro: new FormControl(agendamento.barbeiro, Validators.required),
      cliente: new FormControl(agendamento.cliente, Validators.required),
    });
  }

  salvar() {
    const agendamento: Agendamento = { ...this.agendamentosForm.value, id: this.agendamentoId };
    this.agendamentoService.salvar(agendamento).subscribe(
      () => this.router.navigate(['agendamentos']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar o agendamento ${agendamento.id}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  getBarbeiros() {
    this.barbeiroService.getBarbeiros().subscribe(
      (dados) => {
        this.barbeiros = dados;
      },
      (erro) => {
        console.error(erro);
      }
    );
  }

  getClientes() {
    this.clienteService.getClientes().subscribe(
      (dados) => {
        this.clientes = dados;
      },
      (erro) => {
        console.error(erro);
      }
    );
  }

}
