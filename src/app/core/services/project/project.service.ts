import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Outstanding, PatchDataOutstanding, Project, ProjectCreate } from '../../interfaces/project.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient
  ) { }

  getMyProjects(){
    return this.http.get<any[]>(`${environment.apiUrl}/project/my-project`)
  }

  postProject(data: ProjectCreate){
    return this.http.post<ProjectCreate>(`${environment.apiUrl}/project`, data);
  }

  patchProject(id: number,data: ProjectCreate | Outstanding){
    return this.http.patch<ProjectCreate>(`${environment.apiUrl}/project/${id}`, data);
  }

  deleteProject(id: number){
    return this.http.delete(`${environment.apiUrl}/project/${id}`);
  }
}
