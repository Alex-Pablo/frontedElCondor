import { Routes } from "@angular/router";
import { PublicLayoutComponent } from "../layout/public-layout/public-layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { ContactComponent } from "./pages/contact/contact.component";

export const PUBLIC_ROUTES: Routes = [
    {
        path: '',  component: PublicLayoutComponent, children: [
            {path: '', component: HomeComponent},
            {path: 'contacto', component: ContactComponent}
        ]
    }
]