import { Router, Routes } from "@angular/router";
import { AperturaComponent } from "./pages/apertura/apertura.component";
import { CierreComponent } from "./pages/cierre/cierre.component";
import { JwtTokenService } from "../../core/services/jwt-token.service";
import { inject } from "@angular/core";
// import { AperturaComponent } from "./page/apertura/apertura.component";
// import { CierreComponent } from "./page/cierre/cierre.component";

export const CAJA_ROUTES: Routes = [
  {
    path: 'apertura',
    component: AperturaComponent,
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
    path: 'cierre', component: CierreComponent
  },
  {
    path: '', redirectTo: 'apertura', pathMatch: 'full'
  }
]
