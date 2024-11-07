import { Router, RouterEvent, Routes } from "@angular/router";
import { MainLayoutComponent } from "../../core/layout/main-layout/main-layout.component";
import { UsersComponent } from "./pages/users/users.component";
import { EmpresaComponent } from "./pages/empresa/empresa.component";
import { inject } from "@angular/core";
import { JwtTokenService } from "../../core/services/jwt-token.service";

export const ADMIN_ROUTES: Routes = [
  {
    path: 'usuarios',
    component: UsersComponent,

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
    path: 'empresa', component: EmpresaComponent
  },
  {
    path: '', redirectTo: 'usuarios', pathMatch: 'full'
  }
]
