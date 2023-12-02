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
export class NoAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean | Promise<boolean | UrlTree> {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      return this.router.navigate(['/dashboard/games']);
    }

    return true;
  }
}
