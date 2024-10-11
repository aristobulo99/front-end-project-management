import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProjectService } from '../../../../core/services/project/project.service';
import { IconComponent } from '../../../../shared/components/atom/icon/icon.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DateFormatPipe } from '../../../../shared/pipe/date-format/date-format.pipe';
import { Store } from '@ngrx/store';
import { getProjectsIdRequest, patchDataProject } from '../../../../store/actions/project.actions';
import { selectProjectId } from '../../../../store/selectors/project.selectors';
import { Subject, takeUntil } from 'rxjs';
import { ProjectCreate } from '../../../../core/interfaces/project.interface';
import { AppState } from '../../../../store/app.state';
import { RegisterProjectFormComponent } from '../../../../shared/components/organisms/register-project-form/register-project-form.component';
import { DialogService } from '../../../../core/services/dialog/dialog.service';
import { SprintComponent } from './components/sprint/sprint.component';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [
    IconComponent,
    DateFormatPipe,
    RegisterProjectFormComponent,
    SprintComponent
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit, OnDestroy{

  @ViewChild('projectForm') projectFormTemplate: TemplateRef<any> | undefined;

  public unsubscribe$: Subject<void> = new Subject<void>();
  public dataProject: ProjectCreate | undefined = undefined;
  public projectId: number | undefined = undefined;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private dialogService: DialogService,
  ){}


  ngOnInit(): void {
    this.initProjectId();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initProjectId(){
    const projectId = this.route.snapshot.paramMap.get('id')!;
    if(projectId){
      this.projectId = Number(projectId);
      this.store.dispatch(getProjectsIdRequest({projectId: Number(projectId)}));

      this.store.select(selectProjectId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(project => {
          this.dataProject = project;
        })
    }
    

  }

  back(){
    this.projectService.dataProject = undefined;
    this.router.navigate(['/project']);
  }

  projectFormDeploy(){
    this.dialogService.openDialog(
      {
        title:'Editar Proyecto',
        width: '876px',
        templete: this.projectFormTemplate
      }
    )
  }

  cancelEditProject(){
    this.dialogService.closedAll();
  }

  editDataProject(data: ProjectCreate){
    const projectId = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(patchDataProject({projectId: Number(projectId), project:data}));
    this.cancelEditProject();
  }

}
