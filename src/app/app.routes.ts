import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadChildren: ()=> import('./core/public/public.routes').then(m=> m.PUBLIC_ROUTES)
    },
    {
        path:'auth',
        loadChildren: ()=> import('./core/auth/auth.routes').then(m=> m.AUTH_ROUTES)
    },
    {
        path: 'admin',
        loadChildren: ()=> import('./features/admin/admin.routes').then(m=> m.ADMIN_ROUTES)
    },
    {
        path: 'incio',
        loadChildren: ()=> import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
    }
];
