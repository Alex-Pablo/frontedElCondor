import { Routes } from "@angular/router";
import { PublicLayoutComponent } from "../layout/public-layout/public-layout.component";
import { LoginPageComponent } from './pages/login/login.component';
import { RegisteruserComponent } from "./pages/registeruser/registeruser.component";

export const AUTH_ROUTES : Routes= [
    {
        path: 'IniciarSesion', component: PublicLayoutComponent, children:[
            {
                path: '', component: LoginPageComponent
            }
        ]
    },
    {
        path: 'RegistrarUsuario',
        component: RegisteruserComponent
    },
    {
        path:'', pathMatch: 'full',redirectTo: 'IniciarSesion'
    }
]