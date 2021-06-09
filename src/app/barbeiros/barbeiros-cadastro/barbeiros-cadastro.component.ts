import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CpfValidator } from 'src/app/shared/cpf-validator';
import { Genero } from 'src/app/shared/genero.enum';
import { Barbeiro } from '../barbeiro.model';
import { BarbeiroService } from '../barbeiro.service';

@Component({
  selector: 'app-barbeiros-cadastro',
  templateUrl: './barbeiros-cadastro.component.html',
  styleUrls: ['./barbeiros-cadastro.component.scss'],
})
export class BarbeirosCadastroComponent implements OnInit {
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

  barbeiroId: number;
  barbeirosForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private barbeiroService: BarbeiroService,
    private router: Router
  ) {
    let barbeiro = {
      id: null,
      nome: '',
      cpf: '',
      salario: null,
      dataNascimento: null,
      genero: Genero.FEMININO,
      foto: '',
    };
    this.initializaFormulario(barbeiro);
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== undefined) {
      this.barbeiroId = parseInt(id);
      this.barbeiroService
        .getBarbeiro(this.barbeiroId)
        .subscribe((barbeiro) => {
          this.initializaFormulario(barbeiro);
        });
    }
  }

  initializaFormulario(barbeiro: Barbeiro) {
    this.barbeirosForm = new FormGroup({
      nome: new FormControl(barbeiro.nome, Validators.required),
      dataNascimento: new FormControl(barbeiro.dataNascimento),
      genero: new FormControl(barbeiro.genero, Validators.required),
      cpf: new FormControl(barbeiro.cpf, [
        CpfValidator.validCpf,
        Validators.required,
      ]),
      salario: new FormControl(barbeiro.salario, Validators.required),
      foto: new FormControl(barbeiro.foto, Validators.required),
    });
  }

  salvar() {
    const barbeiro: Barbeiro = {
      ...this.barbeirosForm.value,
      id: this.barbeiroId,
    };
    this.barbeiroService.salvar(barbeiro).subscribe(
      () => this.router.navigate(['barbeiros']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar o barbeiro ${barbeiro.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get nome() {
    return this.barbeirosForm.get('nome');
  }

  get cpf() {
    return this.barbeirosForm.get('cpf');
  }

  get salario() {
    return this.barbeirosForm.get('salario');
  }
  get foto() {
    return this.barbeirosForm.get('foto');
  }
}
