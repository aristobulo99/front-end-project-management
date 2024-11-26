import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ProjectRole } from '../../interfaces/user.interface';
import { RoleProject } from '../../interfaces/project.interface';

import {utility} from '../../../shared/utils/getKeyByValue/getKeyByValue';

@Injectable({
  providedIn: 'root'
})
export class ProjectUserService extends utility {

  private _roleProject: {[key in RoleProject]: string} = {
    DEVELOPER: 'Desarrollador',
    PROJECT_ADMIN: 'Admin Del Proyecto',
    PROJECT_OWNER: 'Propietario Del Proyecto',
    SCRUM_MASTER: 'Scrum Master'
  }
 
  constructor(
    private http: HttpClient
  ) { 
    super();
  }

  get roleProject(){
    return this._roleProject
  }

  getRoleProjectByValue(value: string): RoleProject | undefined {
    return this.getKeyByValue(this._roleProject, value);
  }

  getProjectRole(projectId: number){
    return lastValueFrom(
      this.http.get<ProjectRole>(`${environment.apiUrl}/share-project/project-role/${projectId}`)
    )
  }
}
