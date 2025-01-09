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
  private INACTIVITY_LIMIT = 20 * 60 * 1000;
  private isRefreshing = false;

  constructor(
    private http: HttpClient,
    private toasService: ToastService,
    private router: Router
  ) { 
    this.startTokenRefreshTimer();
    this.startInactivityWatch();
  }


  async login(data: Login): Promise<LoginResponse> {
    const response: LoginResponse = await lastValueFrom(
      this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, data)
    );
    localStorage.setItem('access-token', response.token);
    this.startTokenRefreshTimer();
    this.startInactivityWatch();
    return response;
  }

  async refreshToken(): Promise<void> {
    if (this.isRefreshing) return;
    this.isRefreshing = true;
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
        this.startTokenRefreshTimer();
      }
    }catch (error) {
      console.error('Error al renovar el token:', error);
      this.toasService.showError('Sesión expirada, por favor inicia sesión de nuevo.');
      this.logout();
    } finally {
      this.isRefreshing = false;
    }
  }

  logout(): void {
    localStorage.removeItem('access-token')
    clearTimeout(this.inactivityTimeout);
    clearTimeout(this.refreshTimeout);
    this.removeInactivityWatch();
    this.router.navigate(['/login'])
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access-token');
    return !!token;
  }

  private startInactivityWatch() {
    window.addEventListener('click', () => this.resetInactivityTimeout());
    window.addEventListener('keydown', () => this.resetInactivityTimeout());
    window.addEventListener('scroll', () => this.resetInactivityTimeout());
    window.addEventListener('input', () => this.resetInactivityTimeout());
    this.resetInactivityTimeout();
  }

  private removeInactivityWatch() {
    window.removeEventListener('click', this.resetInactivityTimeout);
    window.removeEventListener('keydown', this.resetInactivityTimeout);
    window.removeEventListener('scroll', this.resetInactivityTimeout);
    window.removeEventListener('input', this.resetInactivityTimeout);
  }

  private resetInactivityTimeout() {
    const accessToken = localStorage.getItem('access-token')
    if(accessToken) {
      clearTimeout(this.inactivityTimeout);
      this.inactivityTimeout = setTimeout(() => {
        this.logout();
        this.toasService.showInfo('Sesión cerrada por inactividad.')
      }, this.INACTIVITY_LIMIT);
    }
    
  }

  public startTokenRefreshTimer() {
    const accessToken = localStorage.getItem('access-token')
    if(accessToken) {
      clearTimeout(this.refreshTimeout);
      const tokenExpirationTime = this.getTokenExpirationTime(accessToken);

      this.refreshTimeout = setTimeout(() => {
        this.refreshToken();
      }, (tokenExpirationTime - (60 * 2000)) );
    }
  }

  private getTokenExpirationTime(token: string): number {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return ((payload.exp* 1000) - (Date.now()));
  }
}
