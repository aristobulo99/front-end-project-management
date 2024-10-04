import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, LoginResponse } from '../../interfaces/login.interdace';
import { lastValueFrom } from 'rxjs';
import {environment} from '../../../../environments/environment';
import { ToastService } from '../toastr/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginResponse: LoginResponse | undefined = undefined;
  private inactivityTimeout: any;
  private refreshTimeout: any;
  private INACTIVITY_LIMIT = 30 * 60 * 1000;

  constructor(
    private http: HttpClient,
    private toasService: ToastService
  ) { 
    this.startInactivityWatch();
  }

  set loginResponse(value: LoginResponse | undefined){
    this._loginResponse = value;
    if(value){
      this.INACTIVITY_LIMIT = value.expiresIn;
      this.startTokenRefreshTimer();
    }
  }

  get loginResponse(){
    return this._loginResponse;
  }

  async login(data: Login): Promise<LoginResponse>{
    return await lastValueFrom(
      this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, data)
    )
  }

  async refreshToken(): Promise<void> {
    try{
      if(this._loginResponse){
        const refreshResponse: LoginResponse = await lastValueFrom(
          this.http.post<LoginResponse>(
            `${environment.apiUrl}/refresh-token`, 
            {token: this._loginResponse.token}
          )
        )
        this.loginResponse = refreshResponse;
      }
    }catch(error){
      console.error('Error al renovar el token:', error);
    }
  }

  logout(): void {
    this._loginResponse = undefined;
    clearTimeout(this.inactivityTimeout);
    clearTimeout(this.refreshTimeout);
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

  private startTokenRefreshTimer() {
    if(this._loginResponse) {
      const timeToRefresh = this._loginResponse.expiresIn - (60 * 1000);

      this.refreshTimeout = setTimeout(() => {
        this.refreshToken();
      }, timeToRefresh);
    }
  }
}
