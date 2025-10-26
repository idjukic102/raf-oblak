import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Dozvole } from '../model';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const path = route.routeConfig?.path;
  const user = JSON.parse(<string>localStorage.getItem('user'));
  if (!user && path !== 'login') {
    snackBar.open('Morate biti ulogovani', 'Zatvori', {
      duration: 4000,
      panelClass: ['error-snackbar'],
    });
    router.navigate(['/login']);
    return false;
  }
  if (user && path === 'login') {
    snackBar.open('Vec ste ulogovani', 'Zatvori', {
      duration: 4000,
      panelClass: ['error-snackbar'],
    });
    router.navigate(['users']);
  }
  if (path === 'users' && !user.permissions.includes(Dozvole.Read)) {
    console.log(123);
    snackBar.open('Nemate dozvolu za ovu akciju', 'Zatvori', {
      duration: 4000,
      panelClass: ['error-snackbar'],
    });

    return false;
  }
  if (path === 'user/create' && !user.permissions.includes(Dozvole.Create)) {
    snackBar.open('Nemate dozvolu za ovu akciju', 'Zatvori', {
      duration: 4000,
      panelClass: ['error-snackbar'],
    });
    return false;
  }
  if (path === 'users/:userId' && !user.permissions.includes(Dozvole.Update)) {
    snackBar.open('Nemate dozvolu za ovu akciju', 'Zatvori', {
      duration: 4000,
      panelClass: ['error-snackbar'],
    });
    return false;
  }
  if (path === 'users' && !user.permissions.includes(Dozvole.Delete)) {
    snackBar.open('Nemate dozvolu za ovu akciju', 'Zatvori', {
      duration: 4000,
      panelClass: ['error-snackbar'],
    });
    return false;
  }

  return true;
};
