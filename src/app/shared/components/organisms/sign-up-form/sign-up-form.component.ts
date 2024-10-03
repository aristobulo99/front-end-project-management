import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../atom/input/input.component';
import { ButtonComponent } from '../../atom/button/button.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputControl } from '../../../../core/interfaces/input.interface';
import { FormControlPipe } from '../../../pipe/form-control/form-control.pipe';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    FormControlPipe
  ],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent implements OnInit {

  public formsInputs: InputControl[] = [
    {
      type: 'text',
      icon: 'user',
      placeholder: 'Escriba el nombre completo',
      formInfo: {
        formName: 'name',
        validatorRequered: true
      }
    },
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
    },
    {
      type: 'password',
      icon: 'lock',
      placeholder: 'Escriba la confirmacion de la contraseña',
      formInfo: {
        formName: 'confirmPassword',
        validatorRequered: true
      }
    },
  ];
  public formsSignUp: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initFormsSigbUp()
  }

  initFormsSigbUp() {
    this.formsSignUp = this.fb.group(
      {
        name: new FormControl<string>('', [Validators.required]),
        email: new FormControl<string>('', [Validators.required, Validators.email]),
        password: new FormControl<string>('', [Validators.required]),
        confirmPassword: new FormControl<string>('', [Validators.required])
      }
    )
  }

  fieldValidation(field: string): boolean {
    return (this.formsSignUp.get(field)?.valid || !this.formsSignUp.get(field)?.touched) as boolean;
  }

  fieldHasError(field: string, errorCode: string): boolean {
    return (this.formsSignUp.get(field)?.touched &&  this.formsSignUp.get(field)?.hasError(errorCode)) as boolean
  }

}
