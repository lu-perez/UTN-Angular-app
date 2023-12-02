import { Injectable } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthService } from '../modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean | Promise<boolean | UrlTree> {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      return true;
    }

    return this.router.navigate(['/auth/login']);
  }
}
