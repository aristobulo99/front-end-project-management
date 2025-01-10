import { CanActivateFn, CanActivate, ActivatedRouteSnapshot, GuardResult, MaybeAsync, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService, 
    private router: Router
  ){

  }

  async canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Promise<boolean> {
      await this.authService.validToken();
      const authenticated: boolean = this.authService.isAuthenticated();
      console.log(authenticated)
      if (authenticated) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }

}
