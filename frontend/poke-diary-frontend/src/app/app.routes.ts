import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { 
        path: 'login',
        loadComponent: () =>
            import ('./pages/login/login.component').then((m) => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () =>
            import ('./pages/register/register.component').then((m) => m.RegisterComponent),
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import ('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    }
];
