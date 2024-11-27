import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InputComponent } from '../../atom/input/input.component';
import { ButtonComponent } from '../../atom/button/button.component';
import { SelectComponent } from '../../molecules/select/select.component';
import { InputControl } from '../../../../core/interfaces/input.interface';
import { ProjectUserService } from '../../../../core/services/project-user/project-user.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControlPipe } from '../../../pipe/form-control/form-control.pipe';
import { UserDetailsComponent } from '../../molecules/user-details/user-details.component';
import { ProjectService } from '../../../../core/services/project/project.service';
import { ProjectUsers, RoleProject, shareProject } from '../../../../core/interfaces/project.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-user-management',
  standalone: true,
  imports: [
    InputComponent,
    SelectComponent,
    ButtonComponent,
    ReactiveFormsModule,
    FormControlPipe,
    UserDetailsComponent
  ],
  templateUrl: './project-user-management.component.html',
  styleUrl: './project-user-management.component.scss'
})
export class ProjectUserManagementComponent implements OnInit {

  @Output() sharedProjectEvent: EventEmitter<shareProject> = new EventEmitter();

  public sharedForm: FormGroup = new FormGroup({});
  public formInputs: InputControl[] = [
    {
      type: 'text',
      placeholder: 'Dirección de correo electrónico',
      formInfo: {
        formName: 'email',
        validatorRequered: true
      }
    },
    {
      type: 'select',
      placeholder: 'Desarrollador',
      formInfo: {
        formName: 'role',
        validatorRequered: true
      }
    }
  ];
  public projectUsers: ProjectUsers[] = []; 

  constructor(
    private fb: FormBuilder,
    private projectUserService: ProjectUserService,
    private projectService: ProjectService,
  ){}

  ngOnInit(): void {
    this.projectUsers = [...this.projectService.projectUsers.filter(pu => pu.projectEnable)]
    this.formInputs[1].options = Object.values(this.projectUserService.roleProject);
    this.formInt();
  }

  getProjectUsers(): ProjectUsers[] {
    return this.projectService.projectUsers.filter(pu => pu.projectEnable)
  }

  formInt(){
    this.sharedForm = this.fb.group(
      {
        email: new FormControl<string>('', [Validators.email, Validators.required]),
        role: new FormControl<string>('Desarrollador', [Validators.required])
      }
    )
  }

  fieldValidation(field: string): boolean {
    return (this.sharedForm.get(field)?.valid || !this.sharedForm.get(field)?.touched) as boolean;
  }

  fieldHasError(field: string, errorCode: string): boolean {
    return (this.sharedForm.get(field)?.touched &&  this.sharedForm.get(field)?.hasError(errorCode)) as boolean
  }

  shareProject(){
  
    console.log(this.projectService.projectId)
    if(this.projectService.projectId){
      const share: shareProject = {
        idProject: this.projectService.projectId,
        email: this.sharedForm.get('email')?.value,
        roleProject: this.projectUserService.getRoleProjectByValue(this.sharedForm.get('role')?.value as string) as RoleProject 
      }
      this.sharedProjectEvent.emit(share);
    }
  }



}
