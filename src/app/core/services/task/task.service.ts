import { Injectable } from '@angular/core';
import { CreateTask, Status, Task, TransferStatus } from '../../interfaces/task.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

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

  constructor(
    private http: HttpClient
  ) { }

  get status(){
    return this._status;
  }

  getStatusKeyByValue(value: string): Status | undefined {
    const entries = Object.entries(this._status) as [Status, string][];
    const foundEntry = entries.find(([key, val]) => val === value);
    return foundEntry ? foundEntry[0] : undefined;
  }

  getTaskBySprintId(sprintId: number){
    return this.http.get<Task[]>(`${environment.apiUrl}/api/task/sprint/${sprintId}`)
  }

  patchTaskStatus(transfer: TransferStatus){
    const params = new HttpParams().set('status', transfer.status);
    return this.http.patch<Task>(`${environment.apiUrl}/api/task/status/${transfer.taskId}`, null, {params})
  }

}
