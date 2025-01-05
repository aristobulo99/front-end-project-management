import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProfileIconComponent } from '../../atom/profile-icon/profile-icon.component';
import { Comments, Status, StatusHistory } from '../../../../core/interfaces/task.interface';
import { UserService } from '../../../../core/services/user/user.service';
import { ProjectUsers } from '../../../../core/interfaces/project.interface';
import { DateFormatPipe } from '../../../pipe/date-format/date-format.pipe';
import { TaskService } from '../../../../core/services/task/task.service';

@Component({
  selector: 'app-description-activity',
  standalone: true,
  imports: [
    ProfileIconComponent,
    DateFormatPipe
  ],
  templateUrl: './description-activity.component.html',
  styleUrl: './description-activity.component.scss'
})
export class DescriptionActivityComponent implements OnChanges {
  
  @Input() statusHistory!: StatusHistory;
  @Input() comments: Comments | undefined;

  public projectUser: ProjectUsers | undefined;

  constructor(
    private userService: UserService,
    private taskService: TaskService
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.projectUser = this.getProjectUSer();
  }

  getProjectUSer(){
    if(this.comments !== undefined){
      const userAuthor: number = this.comments.userAuthor
      return this.userService.projectUsers.find(user => user.id == userAuthor)
    }
    return this.userService.projectUsers.find(user => user.id == this.statusHistory.responsibleUser)
  }

  getStatus(status: Status){
    return this.taskService.status[status];
  }

}
