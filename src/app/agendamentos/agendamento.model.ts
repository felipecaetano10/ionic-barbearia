import { Barbeiro } from "../barbeiros/barbeiro.model";
import { Cliente } from "../clientes/cliente.model";
import { TiposCabelo } from "../shared/tipos-cabelo.enum";

export class Agendamento {
    id?: number;
    data: Date;
    barba: boolean;
    cabelo: TiposCabelo;
    barbeiro: Barbeiro;
    cliente: Cliente;
    valor: number;
}
