import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User, UserCreate } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(
    private http: HttpClient
  ) { }

  async postCreateUser(userData: User): Promise<UserCreate>{
    return await lastValueFrom(
      this.http.post<UserCreate>(`${environment.apiUrl}/auth/signup`, userData)
    );
  }
}
