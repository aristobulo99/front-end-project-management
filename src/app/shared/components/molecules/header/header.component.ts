import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IconComponent } from '../../atom/icon/icon.component';
import { ProfileIconComponent } from '../../atom/profile-icon/profile-icon.component';
import { UserService } from '../../../../core/services/user/user.service';
import { ProjectRole, UserCreate } from '../../../../core/interfaces/user.interface';
import { HeaderService } from '../../../../core/services/header/header.service';
import { ButtonComponent } from '../../atom/button/button.component';
import { RoleProject } from '../../../../core/interfaces/project.interface';
import { ProjectUserManagementComponent } from '../../template/project-user-management/project-user-management.component';
import { DialogService } from '../../../../core/services/dialog/dialog.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    IconComponent,
    ProfileIconComponent,
    ButtonComponent,
    ProjectUserManagementComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  @ViewChild('sharedForm') sharedTemplate: TemplateRef<any> | undefined;

  public userData: UserCreate | undefined = undefined;
  projectId: string | null = null;

  constructor(
    private userService: UserService,
    private headerService: HeaderService,
    private dialogService: DialogService
  ){}

  ngOnInit(): void {
    this.getUserData();
  }

  async getUserData(){
    this.userData = await this.userService.getUser();
    this.userService.userData = this.userData;
  }


  selectMenu(){
    this.headerService.sidebarDeployment = !this.headerService.sidebarDeployment; 
  }

  myRole(): boolean{
    const projectRole: ProjectRole | undefined = this.headerService.projectRole;
    return projectRole ?  projectRole.roleProject !== RoleProject.DEVELOPER : false;
  }

  selectShare(){
    this.dialogService.openDialog(
      {
        title: '',
        width: '36.5rem',
        templete: this.sharedTemplate
      }
    )
  }



}
