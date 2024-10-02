import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _activeLoading: boolean = false;

  constructor() { }

  get activeLoading(){
    return this._activeLoading;
  }

  set activeLoading(value: boolean){
    setTimeout(
      () =>{
        this._activeLoading = value;
      }, 5
    );
  }
}
