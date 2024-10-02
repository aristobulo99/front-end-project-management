import { Component } from '@angular/core';
import { CardLComponent } from '../../shared/components/atom/card-l/card-l.component';
import { SignUpFormComponent } from '../../shared/components/organisms/sign-up-form/sign-up-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CardLComponent, SignUpFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(
    private router: Router
  ){}

  goToLogin(){
    this.router.navigate(['/login']);
  }

}
