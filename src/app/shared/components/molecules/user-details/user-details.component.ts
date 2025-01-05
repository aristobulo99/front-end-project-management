import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProfileIconComponent } from '../../atom/profile-icon/profile-icon.component';
import { ProjectUsers, RoleProject } from '../../../../core/interfaces/project.interface';
import { ProjectUserService } from '../../../../core/services/project-user/project-user.service';
import { HeaderService } from '../../../../core/services/header/header.service';
import { ProjectRole } from '../../../../core/interfaces/user.interface';
import { IconComponent } from '../../atom/icon/icon.component';
import { SelectComponent } from '../select/select.component';
import { ButtonComponent } from '../../atom/button/button.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControlPipe } from '../../../pipe/form-control/form-control.pipe';
import { EditDataRoleProject } from '../../../../core/interfaces/sharedProject.interface';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    ProfileIconComponent,
    IconComponent,
    FormControlPipe,
    SelectComponent,
    MatTooltipModule,
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {
[x: string]: any;

  @Input() projectUser!: ProjectUsers;
  @Output() eventDeleteUser: EventEmitter<number> = new EventEmitter();
  @Output() eventEditUser: EventEmitter<EditDataRoleProject> = new EventEmitter();

  public activeEdition: boolean = false;
  public options: string[] = [];
  public roleForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private projectUserService: ProjectUserService,
    private headerService: HeaderService,
  ){}

  
  ngOnInit(): void {
    this.formInt();
    this.options = Object.values(this.projectUserService.roleProject);
  }

  formInt(){
    this.roleForm = this.fb.group(
      {
        role: new FormControl<string>(this.getRole(this.projectUser.roleProject), [Validators.required])
      }
    )
  }

  fieldValidation(field: string): boolean {
    return (this.roleForm.get(field)?.valid || !this.roleForm.get(field)?.touched) as boolean;
  }

  fieldHasError(field: string, errorCode: string): boolean {
    return (this.roleForm.get(field)?.touched &&  this.roleForm.get(field)?.hasError(errorCode)) as boolean
  }

  getRole(value: RoleProject): string{
    return this.projectUserService.roleProject[value]
  }

  getUserRole(): ProjectRole | undefined{
    return this.headerService.projectRole
  }

  closeEdition(){
    this.activeEdition = false;
  }

  confirmEdition(){
    if(this.roleForm.valid && this.roleForm.get('role')?.value !== this.getRole(this.projectUser.roleProject)){
      this.eventEditUser.emit(
        {
          email: this.projectUser.email, 
          roleProject: this.projectUserService.getRoleProjectByValue(this.roleForm.get('role')?.value as string) as RoleProject 
        }
      );
      this.closeEdition();
    }
  }

  editUSer(){
    this.activeEdition = true;
  }

  deleteUser(id: number){
    this.eventDeleteUser.emit(id);
  }


}
