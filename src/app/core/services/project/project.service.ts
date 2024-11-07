import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PatchProject, Project, ProjectCreate, ProjectCreateResponse, ProjectUsers } from '../../interfaces/project.interface';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private _dataProject: Project | undefined = undefined;

  constructor(
    private http: HttpClient
  ) { }

  get dataProject(){
    return this._dataProject;
  }

  set dataProject(value: Project | undefined){
    this._dataProject = value;
  }

  getMyProjects(){
    return this.http.get<Project[]>(`${environment.apiUrl}/project/my-project`)
  }

  getProjectId(id: number){
    return this.http.get<ProjectCreate>(`${environment.apiUrl}/project/${id}`);
  }

  getProjectUsers(projectId: number){
    return this.http.get<ProjectUsers[]>(`${environment.apiUrl}/project/project-users/${projectId}`)
  }

  postProject(data: ProjectCreate){
    return this.http.post<ProjectCreateResponse>(`${environment.apiUrl}/project`, data)
  }

  patchProject(id: number,data: ProjectCreate){
    return this.http.patch<ProjectCreateResponse>(`${environment.apiUrl}/project/${id}`, data);
  }

  patchFeatureProject(id: number, feature: boolean){
    const params = new HttpParams().set('feature', feature);
    return this.http.patch<PatchProject>(`${environment.apiUrl}/project/feature/${id}`, null, {params});
  }

  deleteProject(id: number){
    return this.http.delete(`${environment.apiUrl}/project/${id}`);
  }
}
