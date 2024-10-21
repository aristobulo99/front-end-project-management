import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateSprint, Sprint, StatusSprint } from '../../interfaces/sprint.interface';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private _statusSprint: {[key in StatusSprint]: string} = {
     [StatusSprint.PLANNED]: 'Planificado' ,
     [StatusSprint.IN_PROGRESS]: 'En curso' ,
     [StatusSprint.BLOCKED]: 'Bloqueado' ,
     [StatusSprint.COMPLETE]: 'Completado' ,
     [StatusSprint.CANCELLED]: 'Cancelado' ,
     [StatusSprint.FAILED]: 'Fallido' ,
     [StatusSprint.REVIEW]: 'Revisado' ,
     [StatusSprint.RETROSPECTIVE]: 'Retrospectivas' ,
     [StatusSprint.PENDING_APPROVAL]: 'Pendiente de aprobación' ,
  }

  constructor(
    private http: HttpClient
  ) { }

  getStatusSprint(key: StatusSprint): string{
    return this._statusSprint[key]
  }

  getAllProjectSprint(projectId: number): Observable<Sprint[]>{
    return this.http.get<Sprint[]>(`${environment.apiUrl}/api/sprint/all/${projectId}`);
  }

  postSprint(data: CreateSprint){
    return this.http.post<Sprint>(`${environment.apiUrl}/api/sprint/create`, data);
  }

  patchSprint(projectId: number, data: CreateSprint){
    return this.http.patch<Sprint>(`${environment.apiUrl}/api/sprint/edit/${projectId}`, data);
  }

  deleteSprintRequest(projectId: number){
    return this.http.delete(`${environment.apiUrl}/api/sprint/delete/${projectId}`);
  }
}
