import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IconComponent } from '../../../../shared/components/atom/icon/icon.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Sprint, StatusSprint } from '../../../../core/interfaces/sprint.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { getSprintIdRequest, pacthSprintStatusRequest } from '../../../../store/actions/sprint.actions';
import { Subject, takeUntil } from 'rxjs';
import { selectSprint } from '../../../../store/selectors/srpint.selectors';
import { SelectComponent } from '../../../../shared/components/molecules/select/select.component';
import { FormControl } from '@angular/forms';
import { SprintService } from '../../../../core/services/sprint/sprint.service';
import { DragDropTaskComponent } from '../../../../shared/components/organisms/drag-drop-task/drag-drop-task.component';
import { CreateTask, DragDropTask, Status, TransferStatus } from '../../../../core/interfaces/task.interface';
import { getTaskBySprintIdRequest, patchTaskStatusRequest, postTaskRequest } from '../../../../store/actions/task.actions';
import { selectTaskBlocked, selectTaskDone, selectTaskInProgress, selectTaskTodo } from '../../../../store/selectors/task.selectors';
import { TaskFormComponent } from '../../../../shared/components/organisms/task-form/task-form.component';
import { DialogService } from '../../../../core/services/dialog/dialog.service';
import { getProjectUsersRequest } from '../../../../store/actions/project.actions';
import { selectProjectUsers } from '../../../../store/selectors/project.selectors';
import { ProjectUsers } from '../../../../core/interfaces/project.interface';

@Component({
  selector: 'app-sprint-task',
  standalone: true,
  imports: [
    IconComponent,
    SelectComponent,
    DragDropTaskComponent,
    TaskFormComponent
  ],
  templateUrl: './sprint-task.component.html',
  styleUrl: './sprint-task.component.scss'
})
export class SprintTaskComponent implements OnInit, OnDestroy{

  @ViewChild('taskForm') taskFormTemplate: TemplateRef<any> | undefined;

  public sprintId: number | undefined = undefined;
  public projectId: number | undefined = undefined;
  public dataSprint: Sprint | undefined = undefined;
  public unsubscribe$: Subject<void> = new Subject<void>();
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private sprintService: SprintService,
    private dialogService: DialogService
  ){}

  ngOnInit(): void {
    this.stateOptions = Object.values(this.sprintService.statusSprint)
    this.initSprintId();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initSprintId(){
    const sprintId = this.route.snapshot.paramMap.get('sprintId')!
    const projectId = this.route.snapshot.paramMap.get('id')!
    if(sprintId && projectId){
      this.sprintId = Number(sprintId);
      this.projectId = Number(projectId);

      this.store.dispatch(getSprintIdRequest({sprintId: this.sprintId}));
      this.store.dispatch(getTaskBySprintIdRequest({sprintId: this.sprintId}));
      this.store.dispatch(getProjectUsersRequest({projectId: this.projectId}));

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

      this.store.select(selectProjectUsers)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(projectUsers => this.listProjectUsers = [...projectUsers])
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

  deployTaskForm(status: Status){
    this.taskStatus = status;
    this.dialogService.openDialog(
      {
        title: 'Crear tarea',
        width: '57.125rem',
        templete: this.taskFormTemplate
      }
    )
  }

  cancelTask(){
    this.dialogService.closedAll();
  }

  createTaskDispatch(data: CreateTask){
    this.store.dispatch(postTaskRequest({taskData: data}));
    this.cancelTask();
  }

}
