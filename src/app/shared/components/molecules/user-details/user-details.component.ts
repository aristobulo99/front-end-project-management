import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileIconComponent } from '../../atom/profile-icon/profile-icon.component';
import { ProjectUsers, RoleProject } from '../../../../core/interfaces/project.interface';
import { ProjectUserService } from '../../../../core/services/project-user/project-user.service';
import { HeaderService } from '../../../../core/services/header/header.service';
import { ProjectRole } from '../../../../core/interfaces/user.interface';
import { IconComponent } from '../../atom/icon/icon.component';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    ProfileIconComponent,
    IconComponent
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {

  @Input() projectUser!: ProjectUsers;
  @Output() eventDeleteUser: EventEmitter<number> = new EventEmitter();
  @Output() eventEditUser: EventEmitter<string> = new EventEmitter();

  constructor(
    private projectUserService: ProjectUserService,
    private headerService: HeaderService,
  ){}

  getRole(value: RoleProject): string{
    return this.projectUserService.roleProject[value]
  }

  getUserRole(): ProjectRole | undefined{
    return this.headerService.projectRole
  }

  editUSer(email: string){
    this.eventEditUser.emit(email);
  }

  deleteUser(id: number){
    this.eventDeleteUser.emit(id);
  }


}
