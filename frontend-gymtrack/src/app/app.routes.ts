import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home').then(c => c.Home)
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home').then(c => c.Home)
    },
    {
        path: 'login',
        loadComponent: () => import('./features/authentication/login/login').then(c => c.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./features/authentication/register/register').then(c => c.Register)
    },
    {
        path: 'main',
        loadComponent: () => import('./features/main/welcome/welcome').then(c => c.Welcome)
    }
    
];
