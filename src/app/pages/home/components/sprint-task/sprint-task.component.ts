import { Component, OnDestroy, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-sprint-task',
  standalone: true,
  imports: [
    IconComponent,
    SelectComponent
  ],
  templateUrl: './sprint-task.component.html',
  styleUrl: './sprint-task.component.scss'
})
export class SprintTaskComponent implements OnInit, OnDestroy{

  public sprintId: number | undefined = undefined;
  public projectId: number | undefined = undefined;
  public dataSprint: Sprint | undefined = undefined;
  public unsubscribe$: Subject<void> = new Subject<void>();
  public sprintState: FormControl = new FormControl('');
  public stateOptions: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private sprintService: SprintService
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

      this.store.select(selectSprint)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          sprint => {
            this.dataSprint = sprint;
            this.sprintState.setValue(this.sprintService.getStatusSprint(sprint?.statusSprint as StatusSprint))
          }
        )
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

}
