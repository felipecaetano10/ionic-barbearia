import { Genero } from "../shared/genero.enum";

export class Barbeiro {
    id?: number;
    nome: string;
    cpf: string;
    genero: Genero;
    dataNascimento: Date;
    salario: number;
    foto: string;
}
