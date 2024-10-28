
import { Routes } from "@angular/router";
import { VentasComponent } from "./pages/ventas/ventas.component";
import { HistorialVentasComponent } from "./pages/historial-ventas/historial-ventas.component";


export const VENTA_ROUTES: Routes = [
  { path: 'venta', component: VentasComponent },
  {
    path: 'historial', component: HistorialVentasComponent
  }
]
