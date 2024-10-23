import { Component, Input } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DragDropTask } from '../../../../core/interfaces/task.interface';
import { IconComponent } from '../../atom/icon/icon.component';

@Component({
  selector: 'app-drag-drop-task',
  standalone: true,
  imports: [
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    IconComponent
  ],
  templateUrl: './drag-drop-task.component.html',
  styleUrl: './drag-drop-task.component.scss'
})
export class DragDropTaskComponent {

  @Input() listDragDropTask: DragDropTask[] = [];

}
