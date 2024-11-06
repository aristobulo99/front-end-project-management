import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UserCreate } from '../../interfaces/user.interface';
import { environment } from '../../../../environments/environment';
import { ProjectUsers } from '../../interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userData!: UserCreate;
  private _listProjectUsers: ProjectUsers[] = [];

  constructor(
    private http: HttpClient
  ) { }

  set userData(value: UserCreate){
    this._userData = value;
  }

  get userData(){
    return this._userData;
  }

  set projectUsers(value: ProjectUsers[]){
    this._listProjectUsers = value;
  }

  get projectUsers(){
    return this._listProjectUsers;
  }

  async getUser(){
    return await lastValueFrom(
      this.http.get<UserCreate>(`${environment.apiUrl}/user-data`)
    );
  }
}
