import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Priority } from '../../../../core/interfaces/task.interface';
import { ProfileIconComponent } from '../../atom/profile-icon/profile-icon.component';

@Component({
  selector: 'app-card-task',
  standalone: true,
  imports: [
    NgClass,
    ProfileIconComponent
  ],
  templateUrl: './card-task.component.html',
  styleUrl: './card-task.component.scss'
})
export class CardTaskComponent {

  @Input() priority: Priority | undefined = undefined;
  @Input() title: string | undefined = undefined;
  @Input() nameUser: string | undefined = undefined;

  high: Priority = Priority.HIGH;
  medium: Priority = Priority.MEDIUM;
  low: Priority = Priority.LOW;

  

}
