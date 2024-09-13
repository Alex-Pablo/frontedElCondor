import { Component, inject, OnInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { IResult } from '../../../shared/models/IResult';
import { IUser } from '../../../shared/models/IUser';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})

export class MainLayoutComponent implements OnInit {
  logocondor: string = 'img/logo.png';
  iconotificacion: string = 'icon/notificacion.png'
  icologout: string = 'icon/logout.png'
  icoarrow: string = 'icon/arrow.png'
  icoinventario: string = 'icon/inventario.png'
  icoinventarioActive: string = 'icon/inventarioActive.png'
  icoventas: string = 'icon/ventas.png'
  icoventasActive: string = 'icon/ventasActive.png'
  icoreportes: string = 'icon/reportes.png'
  icoreportesActive: string = 'icon/reportesActive.png'
  icoconfig: string = 'icon/configuracion.png'
  icoconfigActive: string = 'icon/configuracionActive.png'
  isCollapsed = false; // Estado para el sidebar
  
  isConfigOpen = false;
  isConfigOpen2 = false;
  
  activeItem: string = ''; // Elemento activo
  isDropdownVisible = false;
  isDropdownVisible2 = false;
  userInfor: IUser | undefined;
  authService = inject(AuthService)

  toggleConfig() {
    this.isConfigOpen = !this.isConfigOpen;
    this.isConfigOpen2 = false;
  }

  toggleConfig2() {
    this.isConfigOpen2 = !this.isConfigOpen2;
    this.isConfigOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const configButton = document.querySelector('.submenu');

    // Cierra el menú si el clic es fuera del botón
    if (configButton && !configButton.contains(target)) {
      this.isConfigOpen = false;
      this.isConfigOpen2 = false;
      this.isDropdownVisible = false;
    }
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
  
  // toggleDropdown2() {
  //   this.isDropdownVisible2 = !this.isDropdownVisible2;
  // }

  logout() {
    console.log('Cerrar sesión');
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  setActive(item: string) {
    this.activeItem = item;
  }

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (response: IResult<IUser>) => {
        this.userInfor = response.value
      },
      error: (eror: any) => { }
    })
  }
}
