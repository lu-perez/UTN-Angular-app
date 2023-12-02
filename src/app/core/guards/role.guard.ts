import { Injectable } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  Router,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { AuthService } from '../modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
  ): boolean | Promise<boolean | UrlTree> {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser && route.data['roles'].includes(currentUser.role)) {
      return true;
    }

    return this.router.navigate(['/']);
  }
}
