import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Barbeiro } from './barbeiro.model';

@Injectable({
  providedIn: 'root'
})
export class BarbeiroService {
  
  private url = 'http://localhost:3000/barbeiros';

  constructor(
    private httpClient: HttpClient
  ) {}
  
  getBarbeiros(): Observable<Barbeiro[]> {
    return this.httpClient.get<Barbeiro[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getBarbeiro(id: number): Observable<Barbeiro> {
    return this.httpClient.get<Barbeiro>(`${this.url}/${id}`);
  }

  private adicionar(barbeiro: Barbeiro)  {
    return this.httpClient.post(this.url, barbeiro);    
  }

  private atualizar(barbeiro: Barbeiro) {
    return this.httpClient.put(`${this.url}/${barbeiro.id}`, barbeiro);
  }

  salvar(barbeiro: Barbeiro) {
    if(barbeiro.id) {
      return this.atualizar(barbeiro);
    } else {
      return this.adicionar(barbeiro);
    }
  }
}