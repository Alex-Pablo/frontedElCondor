import { Routes } from "@angular/router";
import { MainLayoutComponent } from "../../core/layout/main-layout/main-layout.component";
import { UsersComponent } from "./pages/users/users.component";

export const ADMIN_ROUTES: Routes = [
    {
        path: '',  component: MainLayoutComponent, children: [
            {path: 'usuarios', component: UsersComponent}
        ]
    },
    
]