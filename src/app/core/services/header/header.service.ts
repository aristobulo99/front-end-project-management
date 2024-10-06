import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _sidebarDeployment: boolean = true;

  constructor() { }

  set sidebarDeployment(value: boolean){
    this._sidebarDeployment = value;
  } 

  get sidebarDeployment() {
    return this._sidebarDeployment;
  }
}
