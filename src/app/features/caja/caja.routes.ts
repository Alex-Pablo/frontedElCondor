import { Routes } from "@angular/router";
import { AperturaComponent } from "./pages/apertura/apertura.component";
import { CierreComponent } from "./pages/cierre/cierre.component";
// import { AperturaComponent } from "./page/apertura/apertura.component";
// import { CierreComponent } from "./page/cierre/cierre.component";

export const CAJA_ROUTES: Routes = [
  { path: 'apertura', component: AperturaComponent },
  {
    path: 'cierre', component: CierreComponent
  },
  {
    path: '', redirectTo: 'apertura', pathMatch: 'full'
  }
]
