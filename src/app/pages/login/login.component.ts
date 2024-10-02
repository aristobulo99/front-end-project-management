import { Component } from '@angular/core';
import { CardLComponent } from '../../shared/components/atom/card-l/card-l.component';
import { LoginFormComponent } from '../../shared/components/organisms/login-form/login-form.component';
import { Router } from '@angular/router';
import { LoadingService } from '../../core/services/loading/loading.service';

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
    private loading: LoadingService
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
}
