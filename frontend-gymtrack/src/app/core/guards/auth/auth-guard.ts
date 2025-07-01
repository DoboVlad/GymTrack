import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let auth = inject(AuthService);
  let router = inject(Router);

  if (auth.getIsLoggedIn()) {
    // User is logged in, allow access
    return true;
  } 
  // User is not logged in, redirect to login page
  router.navigate(['/login']);
  return false;
};
