

import { Routes } from "@angular/router";
import { InventoryComponent } from "./pages/inventory/inventory.component";
import { PedidosComponent } from "./pages/pedidos/pedidos.component";

export const CATALOGO_ROUTES: Routes = [
  { path: 'inventario', component: InventoryComponent },
  {
    path: 'pedidos', component: PedidosComponent
  },
  {
    path: '', redirectTo: 'inventario', pathMatch: 'full'
  }
]
