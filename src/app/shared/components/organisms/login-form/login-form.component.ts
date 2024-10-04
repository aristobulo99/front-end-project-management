import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InputComponent } from '../../atom/input/input.component';
import { ButtonComponent } from '../../atom/button/button.component';
import { InputControl } from '../../../../core/interfaces/input.interface';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControlPipe } from '../../../pipe/form-control/form-control.pipe';
import { Login } from '../../../../core/interfaces/login.interdace';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    InputComponent, 
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    FormControlPipe
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {

  @Output() loginEvent: EventEmitter<Login> = new EventEmitter();

  public formsInputs: InputControl[] = [
    {
      type: 'email',
      icon: 'mail',
      placeholder: 'Escriba el correo electronico',
      formInfo: {
        formName: 'email',
        validatorRequered: true,
        validatorEmail: false,
      }
    },
    {
      type: 'password',
      icon: 'lock',
      placeholder: 'Escriba la contraseña',
      formInfo: {
        formName: 'password',
        validatorRequered: true
      }
    }
  ];
  public formLogin: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.initFormLogin();
  }

  initFormLogin(){
    this.formLogin = this.fb.group(
      {
        email: new FormControl<string>('',[Validators.required, Validators.email]),
        password: new FormControl<string>('', [Validators.required])
      }
    )
  }

  fieldValidation(field: string): boolean {
    return (this.formLogin.get(field)?.valid || !this.formLogin.get(field)?.touched) as boolean;
  }

  fieldHasError(field: string, errorCode: string): boolean {
    return (this.formLogin.get(field)?.touched &&  this.formLogin.get(field)?.hasError(errorCode)) as boolean
  }

  loginUser(){
    const dataLogin: Login = {
      email: this.formLogin.get('email')?.value,
      password: this.formLogin.get('password')?.value
    }
    this.loginEvent.emit(dataLogin);
  }

}
