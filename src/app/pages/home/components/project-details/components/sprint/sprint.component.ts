import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { IconComponent } from '../../../../../../shared/components/atom/icon/icon.component';
import { MatTooltip } from '@angular/material/tooltip';
import { TableComponent } from '../../../../../../shared/components/molecules/table/table.component';
import { DataSource } from '../../../../../../core/interfaces/table.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../store/app.state';
import { deleteSprintRequest, getSprintRequest, pacthSprintRequest, postSprintRequest } from '../../../../../../store/actions/sprint.actions';
import { Subject, takeUntil } from 'rxjs';
import { selectSprints } from '../../../../../../store/selectors/srpint.selectors';
import { CreateSprint, Sprint, StatusSprint } from '../../../../../../core/interfaces/sprint.interface';
import { SprintService } from '../../../../../../core/services/sprint/sprint.service';
import { SprintFormComponent } from '../../../../../../shared/components/organisms/sprint-form/sprint-form.component';
import { DialogService } from '../../../../../../core/services/dialog/dialog.service';

@Component({
  selector: 'app-sprint',
  standalone: true,
  imports: [
    IconComponent,
    TableComponent,
    MatTooltip,
    SprintFormComponent
  ],
  templateUrl: './sprint.component.html',
  styleUrl: './sprint.component.scss'
})
export class SprintComponent implements OnInit, OnDestroy {

  @Input() projectId: number | undefined = undefined;
  @Output() selectSprint: EventEmitter<number> = new EventEmitter();
  @ViewChild('sprintForm') sprintFormTemplate: TemplateRef<any> | undefined;

  public displayedColumns: string[] = ['Nombre', 'Fecha de inicio', 'Fecha de finalizacion', 'Estado', 'actions'];
  public data: DataSource[] = [];
  public unsubscribe$: Subject<void> = new Subject<void>();
  public editSprint: DataSource | undefined = undefined

  constructor(
    private store: Store<AppState>,
    private sprintService: SprintService,
    private dialogService: DialogService
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
    this.selectSprint.emit(sprint['id'] as number)
  }

  actionSprintSelection(actionSelection: {action: string, data: DataSource}){
    switch(actionSelection.action){
      case 'edit':
        this.editSprint = actionSelection.data;
        this.sprintFormDeploy('Editar Sprint');
        break;
      case 'delete':
        this.deleteSprint(actionSelection.data['id'] as number);
        break;
    }
  }

  sprintFormDeploy(title: string = 'Crear Sprint'){
    this.dialogService.openDialog(
      {
        title: title,
        width: '54.75rem',
        templete: this.sprintFormTemplate
      }
    )
  }

  deleteSprint(sprintId: number){
    const resp = this.dialogService.openDialog(
      {
        title:'Confirmar eliminación del Sprint',
        text: '¿Estás seguro de que deseas eliminar este Sprint? Esta acción no se puede deshacer y todos los datos relacionados con el Sprint serán eliminados permanentemente.',
        width: '25rem',
        nameAcceptButton: 'Acceptar',
        nameCancelButton: 'Cancelar',
        flexDirectionButton: 'row'
      }
    )

    resp.afterClosed().subscribe(
      (result) => {
        if (result?.action === 'accept') {
          this.store.dispatch(deleteSprintRequest({sprintId}))
        } 
      }
    )
  }

  cancelSprint(){
    this.dialogService.closedAll();
    this.editSprint = undefined;
  }

  createSprint(dataSprint: CreateSprint){
    dataSprint.projectId = this.projectId as number;
    this.store.dispatch(postSprintRequest({sprint: dataSprint}))
    this.cancelSprint();
  }

  editDataSprint(dataSprint: CreateSprint){
    dataSprint.projectId = this.projectId as number;
    this.store.dispatch(pacthSprintRequest({sprintId: this.editSprint!['id'] as number, sprint: dataSprint }))
    this.cancelSprint();
  }





}
