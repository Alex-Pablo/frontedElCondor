
import { Routes } from "@angular/router";
import { UserComponent } from "./pages/user/user.component"
import { InventoryReportComponent } from "./pages/inventory/inventory.component";
import { OrderReportComponent } from "./pages/order/order.component";
import { SalesComponent } from "./pages/sales/sales.component";

export const REPORTS_ROUTES: Routes = [
  { path: 'usuarios', component: UserComponent },
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },

  { path: 'ventas', component: SalesComponent },
  { path: '', redirectTo: 'ventas', pathMatch: 'full' },

  { path: 'inventario', component: InventoryReportComponent },
  { path: '', redirectTo: 'inventario', pathMatch: 'full' },

  { path: 'compras', component: OrderReportComponent },
  { path: '', redirectTo: 'compras', pathMatch: 'full' }
]
