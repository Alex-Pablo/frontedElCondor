import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
    empresael: string = 'EL';
    empresac: string = 'CONDOR';
    direccion: string = 'Sololá. 6ta ave 4-55 zona 2 Barrio El Calvario';
    tel: string = '+502 31588772';
    correo: string = 'nosenosenosenose@gmail.com';
}
