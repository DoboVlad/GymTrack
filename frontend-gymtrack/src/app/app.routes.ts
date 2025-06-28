import { Routes } from '@angular/router';

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
  },
  {
    path: 'user-profile',
    loadComponent: () => import('./features/user/user').then((c) => c.User),
  },
  {
    path: 'workouts',
    loadComponent: () =>
      import('./features/main/workouts/workouts').then((c) => c.Workouts),
  },
  {
    path: 'body-composition',
    loadComponent: () =>
      import(
        './features/main/body-composition/body-composition/body-composition'
      ).then((c) => c.BodyComposition),
  },
  {
    path: 'progress',
    loadComponent: () =>
      import('./features/main/progress/progress').then((c) => c.Progress),
  },
  {
    path: 'main',
    loadComponent: () =>
      import('./features/main/welcome/welcome').then((c) => c.Welcome),
  },
];
