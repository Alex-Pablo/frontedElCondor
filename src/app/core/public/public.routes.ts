import { Router, Routes } from "@angular/router";
import { PublicLayoutComponent } from "../layout/public-layout/public-layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { LoginPageComponent } from "../auth/pages/login/login.component";
import { inject } from "@angular/core";
import { JwtTokenService } from "../services/jwt-token.service";

export const PUBLIC_ROUTES: Routes = [
  {
    path: '', component: PublicLayoutComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'contacto', component: ContactComponent },
      {
        path: 'iniciarSesion',
        component: LoginPageComponent,
        canActivate: [
          () => {
            const jwt = inject(JwtTokenService);
            if (jwt.isTokenExpired()) {
              return true
            }
            const router = inject(Router);
            router.navigate(['./admin/usuarios'])
            return false
          }
        ],
      }
    ]
  }
]
