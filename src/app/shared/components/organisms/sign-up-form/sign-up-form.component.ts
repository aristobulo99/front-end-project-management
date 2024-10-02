import { Component } from '@angular/core';
import { InputComponent } from '../../atom/input/input.component';
import { ButtonComponent } from '../../atom/button/button.component';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent {

}
