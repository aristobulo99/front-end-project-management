import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { DetailedTask, Priority, Status, StatusHistory, TransferStatus } from '../../../../core/interfaces/task.interface';
import { IconComponent } from '../../../../shared/components/atom/icon/icon.component';
import { ProfileIconComponent } from '../../../../shared/components/atom/profile-icon/profile-icon.component';
import { ProjectUsers } from '../../../../core/interfaces/project.interface';
import { SelectComponent } from '../../../../shared/components/molecules/select/select.component';
import { TaskService } from '../../../../core/services/task/task.service';
import { FormControl } from '@angular/forms';
import { FormControlPipe } from '../../../../shared/pipe/form-control/form-control.pipe';
import { UserService } from '../../../../core/services/user/user.service';
import { NgClass } from '@angular/common';
import { DateFormatPipe } from '../../../../shared/pipe/date-format/date-format.pipe';
import { DescriptionActivityComponent } from '../../../../shared/components/molecules/description-activity/description-activity.component';
import { Tabs, TabsComponent } from '../../../../shared/components/organisms/tabs/tabs.component';
import { CommentsComponent } from '../../../../shared/components/organisms/comments/comments.component';
import { CommentCreate } from '../../../../core/interfaces/comment.interface';

@Component({
  selector: 'app-detailed-task',
  standalone: true,
  imports: [
    IconComponent,
    ProfileIconComponent,
    SelectComponent,
    NgClass,
    DateFormatPipe,
    TabsComponent,
    DescriptionActivityComponent,
    CommentsComponent
  ],
  templateUrl: './detailed-task.component.html',
  styleUrl: './detailed-task.component.scss'
})
export class DetailedTaskComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('activity') activity!: TemplateRef<any>;
  @ViewChild('comment') comment!: TemplateRef<any>;

  @Input() detailedTask!: DetailedTask;
  @Input() user!: ProjectUsers;
  @Output() transferStatusEvent: EventEmitter<TransferStatus> = new EventEmitter();
  @Output() commentEvent: EventEmitter<CommentCreate> = new EventEmitter();

  public optionsStatus: string[] = [];
  public statusControl: FormControl = new FormControl('');
  public assignedUser: boolean = true;
  public tabs: Tabs[] = [];

  high: Priority = Priority.HIGH;
  medium: Priority = Priority.MEDIUM;
  low: Priority = Priority.LOW;


  constructor(
    private taskService: TaskService,
    private userService: UserService
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['detailedTask']){
      this.statusControl.setValue(this.taskService.status[this.detailedTask.status]);
    }
  }

  ngOnInit(): void {
    this.optionsStatus = Object.values(this.taskService.status);
    this.assignedUser = this.userService.userData.id === this.detailedTask.assignedUser
  }

  ngAfterViewInit(): void {
    this.tabs = [
      {
        label: 'Actividad',
        icon: 'format-list',
        template: this.activity
      },
      {
        label: 'Comentarios',
        icon: 'comment',
        template: this.comment
      }
    ]
  }

  transferStatus(){
    const status: Status = this.taskService.getStatusKeyByValue(this.statusControl.value) as Status
    if(status != this.detailedTask.status){
      this.transferStatusEvent.emit(
        {
          taskId: this.detailedTask.id,
          status: status
        }
      )
    }
    
  }

  confoirmComment(comm: CommentCreate){
    this.commentEvent.emit(comm);
  }

  getPriority(priority: Priority): string {
    return this.taskService.priority[priority];
  }

}
