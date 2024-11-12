import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { StompConfig, StompService } from '@stomp/ng2-stompjs';
import { Client } from '@stomp/stompjs';
import { Observable } from 'rxjs';
import { Task } from '../../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskWebSocketService {
  private socket = io(`${environment.socket}`,);

  constructor(){
    
  }

  onTasksBySprint(): Observable<Task[]> {
    return new Observable(observer => {
      this.socket.on('tasksBySprint', (tasks) => {
        observer.next(tasks);
      });
    });
  }

  getTaskByProject(sprintId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      
      if (this.socket.connected) {
        this.socket.emit('getTasksBySprint', sprintId, (response: any) => {
          resolve(response);
        });
      } else {
        this.socket.on('connect', () => {
          this.socket.emit('getTasksBySprint', sprintId, (response: any) => {          
            resolve(response);
          });
        });
  

        this.socket.on('connect_error', (error) => {
          reject(error);
        });
      }
    });
  }


}
