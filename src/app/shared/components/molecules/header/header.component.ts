import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IconComponent } from '../../atom/icon/icon.component';
import { ProfileIconComponent } from '../../atom/profile-icon/profile-icon.component';
import { UserService } from '../../../../core/services/user/user.service';
import { ProjectRole, UserCreate } from '../../../../core/interfaces/user.interface';
import { HeaderService } from '../../../../core/services/header/header.service';
import { ButtonComponent } from '../../atom/button/button.component';
import { RoleProject, shareProject } from '../../../../core/interfaces/project.interface';
import { ProjectUserManagementComponent } from '../../template/project-user-management/project-user-management.component';
import { DialogService } from '../../../../core/services/dialog/dialog.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { deleteShareProjectRequest, editShareProjectRequest, postShareProjectRequest } from '../../../../store/actions/project.actions';
import { DeleteSahredProject, EditRoleProject } from '../../../../core/interfaces/sharedProject.interface';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ButtonIconComponent } from '../../atom/button-icon/button-icon.component';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    IconComponent,
    ProfileIconComponent,
    ButtonComponent,
    ProjectUserManagementComponent,
    MatMenuModule,
    MatButtonModule,
    ButtonIconComponent
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
    private dialogService: DialogService,
    private store: Store<AppState>,
    private authService: AuthService
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

  shareProject(share: shareProject){
    this.store.dispatch(postShareProjectRequest({shared: share}));
  }

  deleteProjectUser(data: DeleteSahredProject){
    this.store.dispatch(deleteShareProjectRequest({deleteShared: data}));
  }

  editProjectUser(data: EditRoleProject){
    this.store.dispatch(editShareProjectRequest({editShared: data}));
  }

  async logout(){
    const resp = await this.dialogService.openDialog(
      {
        title: 'Cerrar sesión',
        text: 'Estás a punto de cerrar sesión. Si quieres volver, solo inicia sesión nuevamente.',
        width: '28.125rem',
        flexDirectionButton: 'row',
        nameAcceptButton: 'Aceptar',
        nameCancelButton: 'Cancelar'
      }
    );

    if(resp.action === 'accept'){
      this.authService.logout();
    }
  }



}
