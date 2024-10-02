import { Component } from '@angular/core';
import { CardLComponent } from '../../shared/components/atom/card-l/card-l.component';
import { InputComponent } from '../../shared/components/atom/input/input.component';
import { ButtonComponent } from '../../shared/components/atom/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardLComponent, InputComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
