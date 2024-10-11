import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IconComponent } from '../../../../../../shared/components/atom/icon/icon.component';
import { MatTooltip } from '@angular/material/tooltip';
import { TableComponent } from '../../../../../../shared/components/molecules/table/table.component';
import { DataSource } from '../../../../../../core/interfaces/table.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../store/app.state';
import { getSprintRequest } from '../../../../../../store/actions/sprint.actions';
import { Subject, takeUntil } from 'rxjs';
import { selectSprints } from '../../../../../../store/selectors/srpint.selectors';
import { Sprint, StatusSprint } from '../../../../../../core/interfaces/sprint.interface';
import { SprintService } from '../../../../../../core/services/sprint/sprint.service';

@Component({
  selector: 'app-sprint',
  standalone: true,
  imports: [
    IconComponent,
    TableComponent,
    MatTooltip,
  ],
  templateUrl: './sprint.component.html',
  styleUrl: './sprint.component.scss'
})
export class SprintComponent implements OnInit, OnDestroy {

  @Input() projectId: number | undefined = undefined;

  public displayedColumns: string[] = ['Nombre', 'Fecha de inicio', 'Fecha de finalizacion', 'Estado', 'actions'];
  public data: DataSource[] = [];
  public unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private sprintService: SprintService
  ){}

  ngOnInit(): void {
    this.initDataSprints();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initDataSprints(){
    if(this.projectId){
      this.store.dispatch(getSprintRequest({projectId: this.projectId}));
      this.store.select(selectSprints)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(sprints => {
        this.data = this.convertSprintToDataSource(sprints);
      })

    }
  }

  convertSprintToDataSource(sprints: Sprint[]): DataSource[]{
    return sprints.map(sp => (
      {
        'id': sp.id,
        'Nombre': sp.name,
        'Fecha de inicio': new Date(sp.startDate),
        'Fecha de finalizacion': new Date(sp.endDate),
        'Estado': this.sprintService.getStatusSprint(sp.statusSprint as StatusSprint),
        'aim': sp.aim,
        'statusDate': sp.statusDate,
        'actions': [{icon: 'delete', tooltip: 'Eliminar'}, {icon: 'edit', tooltip: 'Editar'}],
        'width': '10'
      }
    )) as DataSource[]
  }

  sprintSelection(sprint: DataSource){
    console.log(sprint)
  }



}
