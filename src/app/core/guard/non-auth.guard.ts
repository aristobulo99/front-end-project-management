import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NonAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService, 
    private router: Router
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean {
      const token = localStorage.getItem('access-token');
      if (!token) {
        return true;
      } else {
        this.router.navigate(['/project']);
        return false;
      }
  }

}
