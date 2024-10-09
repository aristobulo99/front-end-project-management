import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PatchProject, Project, ProjectCreate, ProjectCreateResponse } from '../../interfaces/project.interface';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient
  ) { }

  getMyProjects(){
    return this.http.get<Project[]>(`${environment.apiUrl}/project/my-project`)
  }

  postProject(data: ProjectCreate): Promise<ProjectCreateResponse>{
    return lastValueFrom(
      this.http.post<ProjectCreateResponse>(`${environment.apiUrl}/project`, data)
    );
  }

  patchProject(id: number,data: ProjectCreate){
    return this.http.patch<ProjectCreate>(`${environment.apiUrl}/project/${id}`, data);
  }

  patchFeatureProject(id: number, feature: boolean){
    const params = new HttpParams().set('feature', feature);
    return this.http.patch<PatchProject>(`${environment.apiUrl}/project/feature/${id}`, null, {params});
  }

  deleteProject(id: number){
    return this.http.delete(`${environment.apiUrl}/project/${id}`);
  }
}
