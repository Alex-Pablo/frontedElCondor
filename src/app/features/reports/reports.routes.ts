
import { Router, Routes } from "@angular/router";
import { UserComponent } from "./pages/user/user.component"
import { InventoryReportComponent } from "./pages/inventory/inventory.component";
import { OrderReportComponent } from "./pages/order/order.component";
import { SalesComponent } from "./pages/sales/sales.component";
import { JwtTokenService } from "../../core/services/jwt-token.service";
import { inject } from "@angular/core";

export const REPORTS_ROUTES: Routes = [
  {
    path: 'usuarios',
    component: UserComponent,
    canActivate: [
      () => {
        const jwt = inject(JwtTokenService);
        if (!jwt.isTokenExpired()) {
          return true
        }
        const router = inject(Router);
        router.navigate(['/iniciarSesion'])
        return false
      }
    ],
  },

  {
    path: 'ventas',
    component: SalesComponent,

    canActivate: [
      () => {
        const jwt = inject(JwtTokenService);
        if (!jwt.isTokenExpired()) {
          return true
        }
        const router = inject(Router);
        router.navigate(['/iniciarSesion'])
        return false
      }
    ],
  },

  {
    path: 'inventario',
    component: InventoryReportComponent,
    canActivate: [
      () => {
        const jwt = inject(JwtTokenService);
        if (!jwt.isTokenExpired()) {
          return true
        }
        const router = inject(Router);
        router.navigate(['/iniciarSesion'])
        return false
      }
    ],
  },

  {
    path: 'compras',
    component: OrderReportComponent,
    canActivate: [
      () => {
        const jwt = inject(JwtTokenService);
        if (!jwt.isTokenExpired()) {
          return true
        }
        const router = inject(Router);
        router.navigate(['/iniciarSesion'])
        return false
      }
    ],
  },

  {
    path: '', redirectTo: 'usuarios', pathMatch: 'full'
  }
]
