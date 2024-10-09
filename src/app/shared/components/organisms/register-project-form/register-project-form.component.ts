import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../atom/input/input.component';
import { TextAreaComponent } from '../../atom/text-area/text-area.component';
import { ButtonComponent } from '../../atom/button/button.component';
import { InputControl } from '../../../../core/interfaces/input.interface';
import { FormControlPipe } from '../../../pipe/form-control/form-control.pipe';
import { InputDateComponent } from '../../molecules/input-date/input-date.component';
import { ToastService } from '../../../../core/services/toastr/toast.service';
import { ProjectCreate } from '../../../../core/interfaces/project.interface';

@Component({
  selector: 'app-register-project-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    InputDateComponent,
    TextAreaComponent,
    ButtonComponent,
    FormControlPipe
  ],
  templateUrl: './register-project-form.component.html',
  styleUrl: './register-project-form.component.scss'
})
export class RegisterProjectFormComponent implements OnInit {

  @Output() createEvent: EventEmitter<ProjectCreate> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<void> = new EventEmitter(); 

  public fgProject: FormGroup = new FormGroup({});
  public formsInputs: InputControl[] = [
    {
      type: 'text',
      placeholder: 'Escriba nombre del proyecto',
      formInfo: {
        formName: 'name',
        validatorRequered: true
      }
    },
    {
      type: 'date',
      placeholder: 'Escriba la fecha de inicio',
      formInfo: {
        formName: 'startDate',
        validatorRequered: true
      }
    },
    {
      type: 'date',
      placeholder: 'Escriba la fecha de finalización',
      formInfo: {
        formName: 'endingDate',
        validatorRequered: true
      }
    },
    {
      type: 'text',
      textAre: true,
      placeholder: 'Escriba la descripción del proyecto',
      formInfo: {
        formName: 'description',
        validatorRequered: false
      }
    },
  ]

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService
  ){}

  ngOnInit(): void {
    this.initProjectForm();
    this.changesThroughoutTheForm()
  }

  initProjectForm(){
    this.fgProject = this.fb.group({
      name: new FormControl<string>('', [Validators.required]),
      description: new FormControl<string>(''),
      startDate: new FormControl<Date | string>('', [Validators.required]),
      endingDate: new FormControl<Date | string>('', [Validators.required]),
    })
  }

  changesThroughoutTheForm(){
    this.fgProject.valueChanges.subscribe(
      (value) => {
        if(value.startDate && value.endingDate){
          if(value.startDate > value.endingDate){
            this.toastService.showInfo(
              'La fecha de inicio debe ser inferior a la fecha de finalización', '', {timeOut: 10000}
            )
            this.fgProject.patchValue({
              endingDate: '',
              startDate: ''
            }, { emitEvent: false });
          }
        }
      }
    )
  }

  fieldValidation(field: string): boolean {
    return (this.fgProject.get(field)?.valid || !this.fgProject.get(field)?.touched) as boolean;
  }

  fieldHasError(field: string, errorCode: string): boolean {
    return (this.fgProject.get(field)?.touched &&  this.fgProject.get(field)?.hasError(errorCode)) as boolean
  }

  cancelProject(){
    this.cancelEvent.emit();
  }

  createProject(){
    const data: ProjectCreate = {
      name: this.fgProject.get('name')?.value,
      description: this.fgProject.get('description')?.value,
      startDate: this.fgProject.get('startDate')?.value,
      endingDate: this.fgProject.get('endingDate')?.value,
      outstanding: true,
    }
    this.createEvent.emit(data);
  }
}
