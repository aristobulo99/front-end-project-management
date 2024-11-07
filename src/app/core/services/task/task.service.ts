import { Injectable } from '@angular/core';
import { CreateTask, DetailedTask, Priority, Status, Task, TransferStatus } from '../../interfaces/task.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _status: {[key in Status]: string} = {
    TO_DO: 'Por hacer',
    IN_PROGRESS: 'En curso',
    DONE: 'Terminado',
    BLOCKED: 'Bloqueado'
  }

  private _priority: {[key in Priority]: string} = {
    HIGH: 'Alto',
    MEDIUM: 'Medio',
    LOW: 'Bajo'
  }

  constructor(
    private http: HttpClient
  ) { }

  get status(){
    return this._status;
  }

  get priority(){
    return this._priority;
  }

  getStatusKeyByValue(value: string): Status | undefined {
    const entries = Object.entries(this._status) as [Status, string][];
    const foundEntry = entries.find(([key, val]) => val === value);
    return foundEntry ? foundEntry[0] : undefined;
  }

  getPriorityKeyByValue(value: string): Priority | undefined {
    const entries = Object.entries(this._priority) as [Priority, string][];
    const foundEntry = entries.find(([key, val]) => val === value);
    return foundEntry ? foundEntry[0] : undefined;
  }

  getTaskBySprintId(sprintId: number){
    return this.http.get<Task[]>(`${environment.apiUrl}/api/task/sprint/${sprintId}`)
  }

  getTaskByTaskId(taskId: number){
    return this.http.get<DetailedTask>(`${environment.apiUrl}/api/task/${taskId}`)
  }

  async getTaskByTaskIdAsyn(taskId: number){
    return await lastValueFrom(this.http.get<DetailedTask>(`${environment.apiUrl}/api/task/${taskId}`))
  }

  postTask(data: CreateTask){
    return this.http.post<Task>(`${environment.apiUrl}/api/task`, data)
  }

  patchTaskStatus(transfer: TransferStatus){
    const params = new HttpParams().set('status', transfer.status);
    return this.http.patch<DetailedTask>(`${environment.apiUrl}/api/task/status/${transfer.taskId}`, null, {params})
  }

}
