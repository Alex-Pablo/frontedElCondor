import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule, } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { IResult } from '../../../shared/models/IResult';
import { IUser } from '../../../shared/models/IUser';
import { TitleService } from '../../services/title.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IMenuitem } from '../../../shared/models/IMenuItem';
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
  sidenavWidth = computed(() => this.collapsed() ? '60px' : 'auto')
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
      },
      error: (eror: any) => { }
    })
  }


  toggleNested(item: IMenuitem) {
    if (item.subItems) {
      this.nestedMenuOpen.set(!this.nestedMenuOpen())
      item.isExpanded = !item.isExpanded;
    }
  }

  menuItems = signal<IMenuitem[]>([
    {
      icon: 'home', // Icono para 'Inicio'
      label: 'Inicio',
      route: '/dashboard'
    },
    {
      icon: 'home', // Icono para 'Inicio'
      label: 'Cierre',
      route: '/cierre'
    },
    {
      icon: 'home', // Icono para 'Inicio'
      label: 'venta',
      route: '/venta'
    },
    {
      icon: 'inventory_2', // Icono más específico para 'Inventario'
      label: 'Inventario',
      route: '/inventario',
      subItems: [
        {
          icon: 'shopping_bag',
          label: 'Stock',
          route: 'inventario'
        },
        {
          icon: 'shopping_cart',
          label: 'Pedidos',
          route: 'pedidos'
        }
      ],
      isExpanded: false
    },
    {
      icon: 'list', // Icono más general para 'Catálogo'
      label: 'Catálogo',
      route: '/catalogo',
      subItems: [
        {
          icon: 'shopping_bag', // Icono para 'Productos'
          label: 'Productos',
          route: 'producto'
        },
        {
          icon: 'local_shipping', // Icono para 'Proveedores'
          label: 'Proveedores',
          route: 'proveedores'
        },
        {
          icon: 'category', // Icono específico para 'Categorías'
          label: 'Categorías',
          route: 'categorias'
        },
        {
          icon: 'straighten', // Icono para 'Unidades de Medida'
          label: 'Unidades de Medida',
          route: 'unidades'
        }
      ],
      isExpanded: false
    },
    {
      icon: 'settings', // Icono para 'Administración'
      label: 'Administración',
      route: '/admin',
      subItems: [
        {
          icon: 'people', // Icono para 'Usuarios'
          label: 'Usuarios',
          route: 'usuarios'
        },
        // {
        //   icon: 'security', // Icono para 'Roles'
        //   label: 'Roles',
        //   route: 'roles'
        // },
        {
          icon: 'store', // Icono para 'Negocio'
          label: 'Negocio',
          route: 'empresa'
        }
      ],
      isExpanded: false
    },
    {
      icon: 'bar_chart', // Icono para 'Reportes'
      label: 'Reportes',
      route: '/reportes',
      subItems: [
        {
          icon: 'people',
          label: 'Usuarios',
          route: 'usuarios'
        },
        {
          icon: 'insights', // Icono para 'Ventas'
          label: 'Ventas',
          route: 'ventas'
        },
        {
          icon: 'inventory', // Icono para 'Inventario'
          label: 'Inventario',
          route: 'inventario'
        },
        {
          icon: 'shopping_cart', // Icono para 'Compras'
          label: 'Compras',
          route: 'compras'
        }
      ],
      isExpanded: false
    }
  ]);

}
