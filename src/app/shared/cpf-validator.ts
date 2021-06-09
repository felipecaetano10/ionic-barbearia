import { FormControl } from '@angular/forms';
export class CpfValidator {
  static validCpf(cpf: FormControl) {
    if (cpf.value == null) {
      return { validCpf: true };
    }
    if (cpf.value.length != 11) {
      return { validCpf: true };
    }
    if (
      cpf.value == '00000000000' ||
      cpf.value == '11111111111' ||
      cpf.value == '22222222222' ||
      cpf.value == '33333333333' ||
      cpf.value == '44444444444' ||
      cpf.value == '55555555555' ||
      cpf.value == '66666666666' ||
      cpf.value == '77777777777' ||
      cpf.value == '88888888888' ||
      cpf.value == '99999999999'
    ) {
      return { validCpf: true };
    }
    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = cpf.value.substring(0, 9);
    for (let i: number = 0; i < 9; i++) {
      caracter = cpfAux.charAt(i);
      if (numeros.search(caracter) == -1) {
        return { validCpf: true };
      }
      numero = Number(caracter);
      somatorio = somatorio + numero * j;
      j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
      digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
      caracter = cpfAux.charAt(i);
      numero = Number(caracter);
      somatorio = somatorio + numero * j;
      j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
      digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf.value != cpfAux) {
      return { validCpf: true };
    } else {
      return null;
    }
  }
}
