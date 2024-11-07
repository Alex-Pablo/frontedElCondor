
import { Router, Routes } from "@angular/router";
import { ProveedoreComponent } from "./pages/proveedore/proveedore.component";
import { ProductComponent } from "./pages/product/product.component";
import { CategoriaComponent } from "./pages/categoria/categoria.component";
import { UnitofmeasurementsComponent } from "./pages/unitofmeasurements/unitofmeasurements.component";
import { JwtTokenService } from "../../core/services/jwt-token.service";
import { inject } from "@angular/core";

export const CATALOGO_ROUTES: Routes = [
  {
    path: 'producto',
    component: ProductComponent,
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
    path: 'proveedores',
    component: ProveedoreComponent,
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
    path: 'categorias',
    component: CategoriaComponent,
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
    path: 'unidades',
    component: UnitofmeasurementsComponent,
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
    path: '', redirectTo: 'producto', pathMatch: 'full'
  }
]
