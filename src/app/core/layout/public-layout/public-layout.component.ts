import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [ RouterOutlet],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.scss'
})

export class PublicLayoutComponent {
  logocondor: string = 'img/logo.png'
  iconcontacto: string = 'icon/contacto.png'
  iconlogin: string = 'icon/login.png'
  iconuser: string = 'icon/user.png'
}
