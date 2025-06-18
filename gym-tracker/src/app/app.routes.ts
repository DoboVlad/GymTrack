import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'history',
    loadComponent: () => import('./features/history-list/history-list.component').then((m) => m.HistoryListComponent),
  },
  {
    path: '',
    redirectTo: 'history',
    pathMatch: 'full',
  },
];
