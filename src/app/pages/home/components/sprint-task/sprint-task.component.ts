import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IconComponent } from '../../../../shared/components/atom/icon/icon.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Sprint, StatusSprint } from '../../../../core/interfaces/sprint.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { getSprintIdRequest, pacthSprintStatusRequest } from '../../../../store/actions/sprint.actions';
import { map, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { selectSprint } from '../../../../store/selectors/srpint.selectors';
import { SelectComponent } from '../../../../shared/components/molecules/select/select.component';
import { FormControl } from '@angular/forms';
import { SprintService } from '../../../../core/services/sprint/sprint.service';
import { DragDropTaskComponent } from '../../../../shared/components/organisms/drag-drop-task/drag-drop-task.component';
import { Comments, CreateTask, DetailedTask, DragDropTask, Status, Task, TransferStatus } from '../../../../core/interfaces/task.interface';
import { getTaskBySprintIdRequest, initializeDetailedTask, patchTaskRequest, patchTaskStatusRequest, postTaskCommentRequest, postTaskRequest } from '../../../../store/actions/task.actions';
import { selectDetailTask, selectTaskBlocked, selectTaskDone, selectTaskInProgress, selectTaskTodo } from '../../../../store/selectors/task.selectors';
import { TaskFormComponent } from '../../../../shared/components/organisms/task-form/task-form.component';
import { DialogService } from '../../../../core/services/dialog/dialog.service';
import { ProjectUsers } from '../../../../core/interfaces/project.interface';
import { DetailedTaskComponent } from '../detailed-task/detailed-task.component';
import { TaskService } from '../../../../core/services/task/task.service';
import { LoadingService } from '../../../../core/services/loading/loading.service';
import { UserService } from '../../../../core/services/user/user.service';
import { CommentCreate } from '../../../../core/interfaces/comment.interface';
import { TaskWebSocketService } from '../../../../core/services/task/task-web-socket.service';
import { ProjectService } from '../../../../core/services/project/project.service';
import { DateFormatPipe } from '../../../../shared/pipe/date-format/date-format.pipe';

@Component({
  selector: 'app-sprint-task',
  standalone: true,
  imports: [
    IconComponent,
    SelectComponent,
    DragDropTaskComponent,
    TaskFormComponent,
    DetailedTaskComponent,
    DateFormatPipe
  ],
  templateUrl: './sprint-task.component.html',
  styleUrl: './sprint-task.component.scss'
})
export class SprintTaskComponent implements OnInit, OnDestroy{

  @ViewChild('taskForm') taskFormTemplate: TemplateRef<any> | undefined;
  @ViewChild('detailedTask') detailedTaskTemplate: TemplateRef<any> | undefined;

  public sprintId: number | undefined = undefined;
  public projectId: number | undefined = undefined;
  public dataSprint: Sprint | undefined = undefined;
  public unsubscribe$: Subject<void> = new Subject<void>();
  public unsubscribeTask$: Subscription = new Subscription();
  public sprintState: FormControl = new FormControl('');
  public stateOptions: string[] = [];
  public listDragDropTask: DragDropTask[] = [
    {
      titleStatus: 'Por hacer',
      status: Status.TO_DO,
      tasks: []
    },
    {
      titleStatus: 'En curso',
      status: Status.IN_PROGRESS,
      tasks: []
    },
    {
      titleStatus: 'Bloqueado',
      status: Status.BLOCKED,
      tasks: []
    },
    {
      titleStatus: 'Terminado',
      status: Status.DONE,
      tasks: []
    }
  ];
  public taskStatus: Status | undefined = undefined;
  public listProjectUsers: ProjectUsers[] = [];
  public detailTask!: DetailedTask;
  public userTask!: ProjectUsers;
  public editingStatus: boolean = false;
  public dataTask: DetailedTask | undefined = undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private sprintService: SprintService,
    private dialogService: DialogService,
    private loadigService: LoadingService,
    private userService: UserService,
    private taskSocket: TaskWebSocketService,
    private projectService: ProjectService
  ){}

  async ngOnInit() {
    this.loadigService.activeLoading = true;
    this.listProjectUsers = [...this.projectService.projectUsers];
    this.stateOptions = Object.values(this.sprintService.statusSprint)
    await this.initSprintId();

    this.loadigService.activeLoading = false;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  async initSprintId(){
    const sprintId = this.route.snapshot.paramMap.get('sprintId')!
    const projectId = this.route.snapshot.paramMap.get('id')!
    if(sprintId && projectId){
      this.sprintId = Number(sprintId);
      this.projectId = Number(projectId);

      
      this.store.dispatch(getSprintIdRequest({sprintId: this.sprintId}));
      this.store.dispatch(getTaskBySprintIdRequest({sprintId: this.sprintId}));
      
      await this.taskSocket.getTaskByProject(this.sprintId);

      this.store.select(selectSprint)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          sprint => {
            this.dataSprint = sprint;
            this.sprintState.setValue(this.sprintService.getStatusSprint(sprint?.statusSprint as StatusSprint))
          }
        )
      
      this.store.select(selectTaskTodo)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(task => this.listDragDropTask[0].tasks = [...task])

      this.store.select(selectTaskInProgress)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(task => this.listDragDropTask[1].tasks = [...task])

      this.store.select(selectTaskBlocked)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(task => this.listDragDropTask[2].tasks = [...task])

      this.store.select(selectTaskDone)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(task => this.listDragDropTask[3].tasks = [...task])

      
      this.taskSocket.onTaskById()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          detailedTask => {
            this.detailTask = {
              ...detailedTask, 
              creatingDate: new Date(detailedTask.creatingDate),
              initDate: detailedTask?.initDate ? new Date(detailedTask?.initDate) : undefined,
              endDate: detailedTask?.endDate ? new Date(detailedTask?.endDate) : undefined,
              updateDate: new Date(detailedTask.updateDate),
              statusHistory: [...detailedTask.statusHistory.map(sh => ({...sh, dateChange: new Date(sh.dateChange)}))],
              comments: detailedTask.comments.map(cm => ({...cm, creationDate: new Date(cm.creationDate)}))
            };
            this.userTask = this.listProjectUsers.find(user => user.id == this.detailTask.assignedUser) as ProjectUsers;
          }
        );
    }
  }

  back(){
    this.router.navigate(['/project/details', this.projectId])
  }

  selectOption(){
    const status = this.sprintService.getStatusKeyByValue(this.sprintState.value);
    if(status){
      this.store.dispatch(pacthSprintStatusRequest({sprintId: this.sprintId as number, status: status}))
    }
  }

  updateStatus(transfer: TransferStatus){
    this.store.dispatch(patchTaskStatusRequest({transfer: transfer}));
  }

  getCommentTask(comment: CommentCreate){
    this.store.dispatch(postTaskCommentRequest({commentData: comment}));
  }

  async deployEditionTask(dataTask: DetailedTask){
    this.dialogService.closedAll();
    this.editingStatus = true;
    this.dataTask = dataTask;

    await this.deployTaskForm(dataTask.status);

    this.editingStatus = false;
    this.dataTask = undefined;
  }

  async deployTaskForm(status: Status){
    this.taskStatus = status;
    await this.dialogService.openDialog(
      {
        title: 'Crear tarea',
        width: '57.125rem',
        templete: this.taskFormTemplate
      }
    );
  }

  cancelTask(){
    this.dialogService.closedAll();
  }

  createTaskDispatch(data: CreateTask){
    this.store.dispatch(postTaskRequest({taskData: data}));
    this.cancelTask();
  }

  editTaskDispatch(data: Task){
    this.store.dispatch(patchTaskRequest({id: data.id, dataTask: {...data as DetailedTask}}));
    this.cancelTask();
  }

  async selectTask(taskId: number){
    try{
      this.loadigService.activeLoading = true;
      this.taskSocket.getTaskById(taskId);
      await new Promise(
        (resolve, reject) => {
          setTimeout(
            () => {
              this.userService.projectUsers = this.listProjectUsers;
              this.store.dispatch(initializeDetailedTask({ detailedTask: this.detailTask }));
              this.userTask = this.listProjectUsers.find(user => user.id == this.detailTask.assignedUser) as ProjectUsers;
              this.dialogService.openDialog(
                {
                  title: '',
                  width: '50.9rem',
                  templete: this.detailedTaskTemplate
                }
              )
    
              this.unsubscribeTask$.unsubscribe();
              resolve('');
            },500
          )
        }
      )

    }catch(error){
      console.error(error);
    }finally {
      this.loadigService.activeLoading = false;
    }

  }

}
