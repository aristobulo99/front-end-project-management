import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, LoginResponse, Refresh } from '../../interfaces/login.interdace';
import { lastValueFrom } from 'rxjs';
import {environment} from '../../../../environments/environment';
import { ToastService } from '../toastr/toast.service';
import { Router } from '@angular/router';
import { ValidToken } from '../../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private inactivityTimeout: any;
  private refreshTimeout: any;
  private INACTIVITY_LIMIT = 20 * 60 * 1000;
  private isRefreshing = false;
  private isValidToken: boolean = false;

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
      await this.logout();
      this.toasService.showError('Sesión expirada, por favor inicia sesión de nuevo.');
      console.error('Error al renovar el token:', error);
    } finally {
      this.isRefreshing = false;
    }
  }

  async deauthenticate(){
    await this.http.post(`${environment.apiUrl}/auth/logout`,null);
  }

  async validToken(){
    const token = localStorage.getItem('access-token');
    if(token){
      const data: Refresh = {
        token: token
      }
      const valid: ValidToken = await lastValueFrom(this.http.post<ValidToken>(`${environment.apiUrl}/auth/valid-token`, data));
      this.isValidToken = valid.valid;
      if(!valid.valid)
        this.logout();
      return
    }
    this.isValidToken = false;
  }

  async logout(): Promise<void> {
    await this.deauthenticate();
    localStorage.removeItem('access-token')
    clearTimeout(this.inactivityTimeout);
    clearTimeout(this.refreshTimeout);
    this.removeInactivityWatch();
    this.router.navigate(['/login']);
    this.isValidToken = false;
  }

  isAuthenticated(): boolean {
    return this.isValidToken;
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
      this.inactivityTimeout = setTimeout(async () => {
        await this.logout();
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
