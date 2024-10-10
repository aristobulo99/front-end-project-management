import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectService } from '../../../../core/services/project/project.service';
import { IconComponent } from '../../../../shared/components/atom/icon/icon.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DateFormatPipe } from '../../../../shared/pipe/date-format/date-format.pipe';
import { Store } from '@ngrx/store';
import { getProjectsIdRequest } from '../../../../store/actions/project.actions';
import { selectProjectId } from '../../../../store/selectors/project.selectors';
import { Subject, takeUntil } from 'rxjs';
import { ProjectCreate } from '../../../../core/interfaces/project.interface';
import { AppState } from '../../../../store/app.state';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [
    IconComponent,
    DateFormatPipe
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit, OnDestroy{

  public unsubscribe$: Subject<void> = new Subject<void>();
  public dataProject: ProjectCreate | undefined = undefined;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
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

}
