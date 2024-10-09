import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CardProjectComponent } from '../../../../shared/components/molecules/card-project/card-project.component';
import { IconComponent } from '../../../../shared/components/atom/icon/icon.component';
import { PatchFeature, Project, SectionProject } from '../../../../core/interfaces/project.interface';
import { mockProject } from '../../../../core/mocks/project.mock';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { getProjectsRequest, patchOutstandingProjectRequest, postFrequentProject, postFrequentProjectSuccess } from '../../../../store/actions/project.actions';
import { selectPostFrequentProject, selectProjects, selectProjectsFeatured } from '../../../../store/selectors/project.selectors';
import { LoadingService } from '../../../../core/services/loading/loading.service';
import { Router } from '@angular/router';
import { DialogService } from '../../../../core/services/dialog/dialog.service';
import { RegisterProjectFormComponent } from '../../../../shared/components/organisms/register-project-form/register-project-form.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CardProjectComponent,
    IconComponent,
    NgFor,
    NgIf,
    AsyncPipe,
    RegisterProjectFormComponent
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, OnDestroy, AfterViewInit  {

  @ViewChild('projectFomr') projectFormTemplate: TemplateRef<any> | undefined;

  public listProjects: SectionProject[] = [
    {
      icon: 'star',
      title: 'Proyectos destacados',
      project: []
    },
    {
      icon: 'schedule',
      title: 'Vistos recientemente',
      project: []
    },
    {
      title: 'TUS PROYECTOS',
      project: []
    }
    
  ];
  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private loading: LoadingService,
    private router: Router,
    private dialogService: DialogService
  ){}

  ngOnInit(): void {
    console.log(this.projectFormTemplate)
    this.startTheStore();
  }

  ngAfterViewInit(): void {
    console.log(this.projectFormTemplate);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  startTheStore(){
    this.loading.activeLoading = true;
    this.store.dispatch(getProjectsRequest());
    this.store.dispatch(postFrequentProjectSuccess({projectIds: localStorage.getItem('frequent-project')?.split(',') || []}));

    this.store.select(selectProjectsFeatured)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(projectsValue => {
        this.listProjects[0].project = projectsValue;
      });

    this.store.select(selectPostFrequentProject)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(projectsValue => {
        this.listProjects[1].project = projectsValue;
      });

    this.store.select(selectProjects)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(projectsValue => {
        this.listProjects[2].project = projectsValue;
      });

    this.loading.activeLoading = false;
  }

  updateFeaturedStatus(feature: boolean, projectId: number){
    const patchData: PatchFeature = {
      id: projectId,
      feature
    }
    this.store.dispatch(patchOutstandingProjectRequest({patchData}));
  }

  selectProject(project: Project){
    this.store.dispatch(postFrequentProject({projectId: `${project.id}`}));
  }

  createProject(){
    // this.router.navigate(['/home/register-project'])
    this.dialogService.openDialog(
      {
        title:'Crear Proyecto',
        width: '876px',
        templete: this.projectFormTemplate
      }
    )
  }

  cancelProject(){
    this.dialogService.closedAll();
  }

  

}
