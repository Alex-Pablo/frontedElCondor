
import { Routes } from "@angular/router";
import { VentasComponent } from "./pages/ventas/ventas.component";
import { HistorialVentasComponent } from "./pages/historial-ventas/historial-ventas.component";


export const VENTA_ROUTES: Routes = [
  { path: 'Venta', component: VentasComponent },
  {
    path: 'Historial', component: HistorialVentasComponent
  },

  {
    path: '', redirectTo: 'ventas', pathMatch: 'full'
  }
]
