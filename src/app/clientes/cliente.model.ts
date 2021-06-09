import { Genero } from "../shared/genero.enum";

export class Cliente {
    id?: number;
    nome: string;
    cpf: string;
    genero: Genero;
    dataNascimento: Date;
    endereco: string;
    foto: string;
}