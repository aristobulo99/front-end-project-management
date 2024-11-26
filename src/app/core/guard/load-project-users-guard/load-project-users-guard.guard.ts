import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { HeaderService } from '../../services/header/header.service';
import { ProjectService } from '../../services/project/project.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { getProjectUsersRequest } from '../../../store/actions/project.actions';
import { ProjectUserService } from '../../services/project-user/project-user.service';
import { selectProjectUsers } from '../../../store/selectors/project.selectors';
import { Observable, Subject, takeUntil } from 'rxjs';


export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
}) export class loadProjectUsersGuard implements CanActivate, OnDestroy {

  public unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private headerService: HeaderService,
    private projectService: ProjectService,
    private projectUserService: ProjectUserService,
  ){}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    console.log("Se ejecuta?")
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>{
    
    if(this.projectService.projectUsers.length === 0){
      const projectId = route.paramMap.get('id');

      if(projectId){
        this.store.dispatch(getProjectUsersRequest({projectId: Number(projectId)}));
        this.headerService.projectRole = await this.projectUserService.getProjectRole( Number(projectId) );
  
        this.store.select(selectProjectUsers)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(projectUsers => {
            this.projectService.projectUsers = [...projectUsers]
          })
      }

    }
    return true;
  }

}

@Injectable({
  providedIn: 'root'
}) export class loadProjectUsersGuardDeactivate implements CanDeactivate<CanComponentDeactivate> {

  constructor(
    private headerService: HeaderService,
    private projectService: ProjectService,
    private projectUserService: ProjectUserService,
  ){}

  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean{

    const nextUrl = nextState?.url;

    const isAllowed =
      nextUrl?.startsWith('/project/details/') ||
      nextUrl?.startsWith('/project/details/:id/sprint/');

    if(!isAllowed){
      this.headerService.projectRole = undefined;
      this.projectService.projectUsers = [];
    }
    return true;

  }
  
}
