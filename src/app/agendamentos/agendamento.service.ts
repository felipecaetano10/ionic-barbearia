import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agendamento } from './agendamento.model';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  
  private url = 'http://localhost:3000/agendamentos';

  constructor(
    private httpClient: HttpClient
  ) {}
  
  getAgendamentos(): Observable<Agendamento[]> {
    return this.httpClient.get<Agendamento[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getAgendamento(id: number): Observable<Agendamento> {
    return this.httpClient.get<Agendamento>(`${this.url}/${id}`);
  }

  private adicionar(agendamento: Agendamento)  {
    return this.httpClient.post(this.url, agendamento);
  }

  private atualizar(agendamento: Agendamento) {
    return this.httpClient.put(`${this.url}/${agendamento.id}`, agendamento);
  }

  salvar(agendamento: Agendamento) {
    if(agendamento.id) {
      return this.atualizar(agendamento);
    } else {
      return this.adicionar(agendamento);
    }
  }
}
