import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UserCreate } from '../../interfaces/user.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  async getUser(){
    return await lastValueFrom(
      this.http.get<UserCreate>(`${environment.apiUrl}/user-data`)
    );
  }
}
