import { Injectable } from '@angular/core';
import { ProjectRole } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _sidebarDeployment: boolean = true;
  private _projectRole: ProjectRole | undefined = undefined;

  constructor() { }

  set sidebarDeployment(value: boolean){
    this._sidebarDeployment = value;
  } 

  get sidebarDeployment() {
    return this._sidebarDeployment;
  }

  set projectRole(value: ProjectRole | undefined){
    this._projectRole = value;
  }

  get projectRole(){
    return this._projectRole;
  }
}
