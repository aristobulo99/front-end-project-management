import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button-icon',
  standalone: true,
  imports: [
    IconComponent,
    NgClass
  ],
  templateUrl: './button-icon.component.html',
  styleUrl: './button-icon.component.scss'
})
export class ButtonIconComponent {
  @Input() title!: string;
  @Input() nameIcon!: string;
  @Input() position: 'left' | 'center' | 'right' = 'center';
  @Output() clickEvent: EventEmitter<void> = new EventEmitter();

  click(){
    this.clickEvent.emit();
  }

}
