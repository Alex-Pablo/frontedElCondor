
import { Routes } from "@angular/router";
import { CierreDeCajaComponent } from "./page/cierre-de-caja/cierre-de-caja.component";


export const CIERRE_ROUTES: Routes = [
{ path: 'cierre', component: CierreDeCajaComponent },

{
    path: '', redirectTo: 'cierre', pathMatch: 'full'
}
]
