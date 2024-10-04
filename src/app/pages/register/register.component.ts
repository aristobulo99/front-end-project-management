import { Component } from '@angular/core';
import { CardLComponent } from '../../shared/components/atom/card-l/card-l.component';
import { SignUpFormComponent } from '../../shared/components/organisms/sign-up-form/sign-up-form.component';
import { Router } from '@angular/router';
import { SignUpService } from '../../core/services/sign-up/sign-up.service';
import { User, UserCreate } from '../../core/interfaces/user.interface';
import { LoadingService } from '../../core/services/loading/loading.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../core/services/toastr/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CardLComponent, SignUpFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(
    private router: Router,
    private loading: LoadingService,
    private singUpService: SignUpService,
    private toastService: ToastService
  ){}

  goToLogin(){
    this.router.navigate(['/login']);
  }

  async createUserData(data: User) {
    this.loading.activeLoading = true;
    try{
      const resp: UserCreate = await this.singUpService.postCreateUser(data);
      this.toastService.showSuccess(`Bienvenido, ${resp.name}.`, '¡Registro exitoso!');
      this.goToLogin();
    }catch(e:any){
      if (e instanceof HttpErrorResponse) {
        this.handleHttpError(e.error);
      } else {
        console.error('Error inesperado:', e);
        this.toastService.showError('Ocurrió un error inesperado. Intenta nuevamente.');
      }
    }finally {
      this.loading.activeLoading = false;
    }
  }

  private handleHttpError(error: string) {
    switch (error) {
      case 'User already exists with email':
        this.toastService.showInfo('Ya hay un usuario registrado con ese correo');
        break;
      case 'The email is not valid':
        this.toastService.showInfo('El correo no es válido');
        break;
      default:
        this.toastService.showError('Ocurrió un error inesperado.');
        break;
    }
  }

}
