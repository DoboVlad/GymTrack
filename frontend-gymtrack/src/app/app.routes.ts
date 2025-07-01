import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((c) => c.Home),
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then((c) => c.Home),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/authentication/login/login').then((c) => c.Login),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/authentication/register/register').then(
        (c) => c.Register
      ),
  },
  {
    path: 'welcome',
    loadComponent: () =>
      import('./features/main/welcome/welcome').then(
        (c) => c.Welcome
      ),
    canActivate: [authGuard]
  },
  {
    path: 'user-profile',
    loadComponent: () => import('./features/user/user').then((c) => c.User),
    canActivate: [authGuard]
  },
  {
    path: 'workouts',
    loadComponent: () =>
      import('./features/main/workouts/workouts').then((c) => c.Workouts),
    canActivate: [authGuard]
  },
  {
    path: 'body-composition',
    loadComponent: () =>
      import(
        './features/main/body-composition/body-composition/body-composition'
      ).then((c) => c.BodyComposition),
    canActivate: [authGuard]
  },
  {
    path: 'progress',
    loadComponent: () =>
      import('./features/main/progress/progress').then((c) => c.Progress),
    canActivate: [authGuard]
  },
  {
    path: 'main',
    loadComponent: () =>
      import('./features/main/welcome/welcome').then((c) => c.Welcome),
    canActivate: [authGuard]
  },
];
