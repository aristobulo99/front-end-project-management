import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, LoginResponse } from '../../interfaces/login.interdace';
import { lastValueFrom } from 'rxjs';
import {environment} from '../../../../environments/environment';
import { ToastService } from '../toastr/toast.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private inactivityTimeout: any;
  private refreshTimeout: any;
  private INACTIVITY_LIMIT = 30 * 60 * 1000;

  constructor(
    private http: HttpClient,
    private toasService: ToastService,
    private router: Router
  ) { 
    const token = localStorage.getItem('access-token');
    if(token){
      this.INACTIVITY_LIMIT = this.getTokenExpirationTime(token);
    }
    this.startInactivityWatch();
  }


  async login(data: Login): Promise<LoginResponse>{
    return await lastValueFrom(
      this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, data)
    )
  }

  async refreshToken(): Promise<void> {
    try{
      const accessToken = localStorage.getItem('access-token')
      if(accessToken){
        const refreshResponse: LoginResponse = await lastValueFrom(
          this.http.post<LoginResponse>(
            `${environment.apiUrl}/refresh-token`, 
            {token: accessToken}
          )
        )
        localStorage.setItem('access-token', refreshResponse.token);
      }
    }catch(error){
      console.error('Error al renovar el token:', error);
    }
  }

  logout(): void {
    localStorage.removeItem('access-token')
    clearTimeout(this.inactivityTimeout);
    clearTimeout(this.refreshTimeout);
    this.router.navigate(['/login'])
  }

  private startInactivityWatch() {
    window.addEventListener('click', () => this.resetInactivityTimeout());
    window.addEventListener('keydown', () => this.resetInactivityTimeout());
    window.addEventListener('scroll', () => this.resetInactivityTimeout());
    window.addEventListener('input', () => this.resetInactivityTimeout());
    this.resetInactivityTimeout();
  }

  private resetInactivityTimeout() {
    clearTimeout(this.inactivityTimeout);
    this.inactivityTimeout = setTimeout(() => {
      this.logout();
      this.toasService.showInfo('Sesión cerrada por inactividad.')
    }, this.INACTIVITY_LIMIT);
  }

  public startTokenRefreshTimer() {
    const accessToken = localStorage.getItem('access-token')
    if(accessToken) {
      const timeToRefresh = this.getTokenExpirationTime(accessToken) - (60 * 1000);

      this.refreshTimeout = setTimeout(() => {
        this.refreshToken();
      }, timeToRefresh);
    }
  }

  private getTokenExpirationTime(token: string): number {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp / 1000;
  }
}
