import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { InputSearchComponent } from '../../../shared/components/input-search/input-search.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, InputSearchComponent],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.scss'
})

export class PublicLayoutComponent {
  logocondor: string = 'img/logo.png'
  iconcontacto: string = 'icon/contacto.png'
  iconlogin: string = 'icon/login.png'
  iconuser: string = 'icon/user.png';

  searchMessage = 'Buscar productos';


  onSearch(searchTerm: string) {
    console.log(searchTerm);

  }
}
