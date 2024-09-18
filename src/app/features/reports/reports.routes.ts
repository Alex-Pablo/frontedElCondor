
import { Routes } from "@angular/router";
import { UserComponent } from "./pages/user/user.component"

export const REPORTS_ROUTES: Routes = [
  { path: 'usuarios', component: UserComponent },
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' }
]
