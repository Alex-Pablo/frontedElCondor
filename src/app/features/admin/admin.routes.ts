import { Routes } from "@angular/router";
import { MainLayoutComponent } from "../../core/layout/main-layout/main-layout.component";
import { UsersComponent } from "./pages/users/users.component";
import { EmpresaComponent } from "./pages/empresa/empresa.component";

export const ADMIN_ROUTES: Routes = [
  { path: 'usuarios', component: UsersComponent },
  {
    path: 'empresa', component: EmpresaComponent
  },
  {
    path: '', redirectTo: 'usuarios', pathMatch: 'full'
  }
]
