import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { ProjectsComponent } from '../../../pages/home/components/projects/projects.component';
import { NavigationRoute } from '../../interfaces/navigation.interface';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private _routes: NavigationRoute[] = [
    {
      pathName: 'Proyectos',
      icon: 'folder-project',
      select: true,

      route: {
        path: '/home/project',
        component: ProjectsComponent
      }
    }
  ];

  constructor() { }

  get routes(){
    return this._routes;
  }
}
