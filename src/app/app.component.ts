import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public menus = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Barbeiro', url: '/barbeiros', icon: 'person' },
    { title: 'Clientes', url: '/clientes', icon: 'people' },
    { title: 'Agendamentos', url: '/agendamentos', icon: 'id-card' },
  ];
  constructor() {}
}
