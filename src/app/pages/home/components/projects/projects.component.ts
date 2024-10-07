import { Component, OnInit } from '@angular/core';
import { CardProjectComponent } from '../../../../shared/components/molecules/card-project/card-project.component';
import { IconComponent } from '../../../../shared/components/atom/icon/icon.component';
import { PatchDataOutstanding, Project, SectionProject } from '../../../../core/interfaces/project.interface';
import { mockProject } from '../../../../core/mocks/project.mock';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { getProjectsRequest, patchOutstandingProjectRequest } from '../../../../store/actions/project.actions';
import { selectProjects, selectProjectsFeatured } from '../../../../store/selectors/project.selectors';
import { LoadingService } from '../../../../core/services/loading/loading.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CardProjectComponent,
    IconComponent,
    NgFor,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {

  public listProjects: SectionProject[] = [
    {
      icon: 'star',
      title: 'Proyectos destacados',
      project: new Observable()
    },
    {
      icon: 'schedule',
      title: 'Vistos recientemente',
      project: new Observable()
    },
    {
      title: 'TUS PROYECTOS',
      project: new Observable()
    }
    
  ];
  public projects: Observable<Project[]> = new Observable();
  public projectsFeature: Observable<Project[]> = new Observable();
  public projectsRecent: Observable<Project[]> = new Observable();

  constructor(
    private store: Store<AppState>,
    private loading: LoadingService
  ){}

  ngOnInit(): void {
    this.startTheStore();
  }

  startTheStore(){
    this.store.dispatch(getProjectsRequest());
    this.listProjects[0].project = this.store.select(selectProjectsFeatured);
    this.listProjects[2].project = this.store.select(selectProjects);
  }

  updateFeaturedStatus(feature: boolean, projectId: number){
    this.loading.activeLoading = true;
    const patchData: PatchDataOutstanding = {
      id: projectId,
      outstanding: {outstanding: feature}
    }
    this.store.dispatch(patchOutstandingProjectRequest({patchData}));
    setTimeout(
      () => {
        this.startTheStore();
        this.loading.activeLoading = false;
      }, 500
    )
  }

  

}
