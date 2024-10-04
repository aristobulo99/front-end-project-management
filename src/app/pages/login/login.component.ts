import { Component } from '@angular/core';
import { CardLComponent } from '../../shared/components/atom/card-l/card-l.component';
import { LoginFormComponent } from '../../shared/components/organisms/login-form/login-form.component';
import { Router } from '@angular/router';
import { LoadingService } from '../../core/services/loading/loading.service';
import { ToastService } from '../../core/services/toastr/toast.service';
import { Login, LoginResponse } from '../../core/interfaces/login.interdace';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardLComponent, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private router: Router,
    private loading: LoadingService,
    private toastService: ToastService,
    private authService: AuthService
  ){}

  goToRegisterUser(){
    this.loading.activeLoading = true;
    setTimeout(
      () => {
        this.router.navigate(['/register']);
        this.loading.activeLoading = false;
      }, 1000
    );
  }

  async loginUser(data: Login){
    this.loading.activeLoading = true;
    try{
      const loginResponse: LoginResponse = await this.authService.login(data);
      this.authService.loginResponse = loginResponse;
      this.toastService.showSuccess('¡Bienvenido!');
    }catch(e: any){
      if(e instanceof HttpErrorResponse){
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
    switch(error){
      case 'The email is not valid':
        this.toastService.showInfo('El correo no es válido')
        break;
      case 'Invalid email or password ':
        this.toastService.showInfo('El correo o la contraseña son incorrectos. Intenta nuevamente.')
        break;
      default:
        this.toastService.showError('Ocurrió un error inesperado.');
        break;
    }
  }
}
