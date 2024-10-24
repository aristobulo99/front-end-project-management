import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Priority } from '../../../../core/interfaces/task.interface';

@Component({
  selector: 'app-card-task',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './card-task.component.html',
  styleUrl: './card-task.component.scss'
})
export class CardTaskComponent {

  @Input() priority: Priority | undefined = undefined;
  @Input() title: string | undefined = undefined;

  high: Priority = Priority.HIGH;
  medium: Priority = Priority.MEDIUM;
  low: Priority = Priority.LOW;

  

}
