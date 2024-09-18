import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule, } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { IResult } from '../../../shared/models/IResult';
import { IUser } from '../../../shared/models/IUser';
import { TitleService } from '../../services/title.service';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IMenuitem } from '../../../shared/models/IMenuItem';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatIconModule, RouterLinkActive],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})

export class MainLayoutComponent {
  nestedMenuOpen = signal(false);
  collapsed = signal(false);
  sidenavWidth = computed(() => this.collapsed() ? '65px' : 'auto')
  titlePage: any = '';

  logocondor: string = 'img/logo.png';
  constructor(private router: Router, public titleService: TitleService) { }
  userInfor: IUser | undefined;
  authService = inject(AuthService)

  logout() {
    this.router.navigate(['/'])
  }

  ngOnInit(): void {
    this.titlePage = this.titleService.getTitle()

    this.authService.getProfile().subscribe({
      next: (response: IResult<IUser>) => {
        this.userInfor = response.value
        console.log(this.userInfor);

      },
      error: (eror: any) => { }
    })

  }


  toggleNested(item: IMenuitem) {
    if (item.subItems) {
      this.nestedMenuOpen.set(!this.nestedMenuOpen())
      console.log(this.nestedMenuOpen());
    }
  }
  isItemExpanded(item: IMenuitem): boolean {
    const currentRoute = this.router.url;
    return currentRoute.startsWith(item.route);
  }


  menuItems = signal<IMenuitem[]>([
    {
      icon: 'house',
      label: 'Inicio',
      route: '/dashboard'
    },
    {
      icon: 'input',
      label: 'Inventario',
      route: 'inventario'
    },
    {
      icon: 'settings',
      label: "Administracion",
      route: '/admin',
      subItems: [
        {
          icon: 'supervisor_account',
          label: 'Usuarios',
          route: 'usuarios'
        },
        {
          icon: 'account_box',
          label: 'Roles',
          route: 'roles'
        },
        {
          icon: 'store',
          label: 'Negocio',
          route: 'Empresa'
        }
      ]
    },
    {
      icon: 'folder',
      label: 'Reportes',
      route: '/reports',
      subItems: [
        {
          icon: 'account_box',
          label: 'Usuarios',
          route: 'usuarios'
        }
      ]
    }
  ])


}
