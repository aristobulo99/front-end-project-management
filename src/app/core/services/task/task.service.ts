import { Injectable } from '@angular/core';
import { Status, Task } from '../../interfaces/task.interface';
import { HttpClient } from '@angular/common/http';
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

}
