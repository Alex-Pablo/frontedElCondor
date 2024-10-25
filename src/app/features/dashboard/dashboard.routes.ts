

import { Routes } from "@angular/router";
import { MainLayoutComponent } from "../../core/layout/main-layout/main-layout.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";

export const DASHBOARD_ROUTES: Routes = [
  { path: '', component: DashboardComponent },

]
