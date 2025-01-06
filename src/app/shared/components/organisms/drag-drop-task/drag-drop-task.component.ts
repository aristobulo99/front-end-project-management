import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DragDropTask, Status, Task, TransferStatus } from '../../../../core/interfaces/task.interface';
import { IconComponent } from '../../atom/icon/icon.component';
import { CardTaskComponent } from '../../molecules/card-task/card-task.component';
import { ProjectService } from '../../../../core/services/project/project.service';

@Component({
  selector: 'app-drag-drop-task',
  standalone: true,
  imports: [
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    IconComponent,
    CardTaskComponent,
  ],
  templateUrl: './drag-drop-task.component.html',
  styleUrl: './drag-drop-task.component.scss'
})
export class DragDropTaskComponent {

  @Input() listDragDropTask: DragDropTask[] = [];
  @Output() transferStatusEvent: EventEmitter<TransferStatus> = new EventEmitter();
  @Output() taskStatusEvent: EventEmitter<Status> = new EventEmitter();
  @Output() detailedTask: EventEmitter<number> = new EventEmitter();

  constructor(
    private cdr: ChangeDetectorRef,
    private projectService: ProjectService
  ) {}

  getUser(idUser: number): string{
    return this.projectService.projectUsers.filter(pu => pu.id === idUser)[0].name
  }

  drop(event: CdkDragDrop<Task[]>, status: Status) {
    const prevIndex = event.previousIndex;
    const currIndex = event.currentIndex;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, prevIndex, currIndex);
    }else {
      this.transferStatusEvent.emit(
        {
          taskId: event.previousContainer.data[prevIndex].id,
          status: status
        }
      )

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        prevIndex,
        currIndex
      )
      this.cdr.detectChanges();
    }
  }

  createTaskByStatus(status: Status){
    this.taskStatusEvent.emit(status);
  }

  selectDetailedTask(taksId: number){
    this.detailedTask.emit(taksId);
  }
}
