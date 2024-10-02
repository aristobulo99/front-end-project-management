import { Component } from '@angular/core';
import { CardLComponent } from '../../shared/components/atom/card-l/card-l.component';
import { LoginFormComponent } from '../../shared/components/organisms/login-form/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardLComponent, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
