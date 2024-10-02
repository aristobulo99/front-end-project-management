import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastr: ToastrService
  ) { }

  showSuccess(message: string, title?: string, options?: any) {
    this.toastr.success(message, title, options);
  }

  showError(message: string, title?: string, options?: any) {
    this.toastr.error(message, title, options);
  }

  showInfo(message: string, title?: string, options?: any) {
    this.toastr.info(message, title, options);
  }

  showWarning(message: string, title?: string, options?: any) {
    this.toastr.warning(message, title, options);
  }

}
