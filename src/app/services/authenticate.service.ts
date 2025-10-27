import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor(private router: Router) {}
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
  getCurrentUser(): string {
      return JSON.parse(<string>localStorage.getItem('user')).email
  }
}
