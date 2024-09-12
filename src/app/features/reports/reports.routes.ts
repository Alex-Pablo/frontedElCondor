
import { Routes } from "@angular/router";
import { MainLayoutComponent } from "../../core/layout/main-layout/main-layout.component";
import { UserComponent } from "./pages/user/user.component"

export const REPORTS_ROUTES: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: 'usuarios', component: UserComponent }
    ]
  },

]
