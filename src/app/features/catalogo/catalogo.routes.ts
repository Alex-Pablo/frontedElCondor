
import { Routes } from "@angular/router";
import { ProveedoreComponent } from "./pages/proveedore/proveedore.component";
import { ProductComponent } from "./pages/product/product.component";
import { CategoriaComponent } from "./pages/categoria/categoria.component";
import { UnitofmeasurementsComponent } from "./pages/unitofmeasurements/unitofmeasurements.component";

export const CATALOGO_ROUTES: Routes = [
  { path: 'producto', component: ProductComponent },
  {
    path: 'proveedores', component: ProveedoreComponent
  },
  {
    path: 'categorias', component: CategoriaComponent
  },
  {
    path: 'unidades', component: UnitofmeasurementsComponent
  },
  {
    path: '', redirectTo: 'producto', pathMatch: 'full'
  }
]
