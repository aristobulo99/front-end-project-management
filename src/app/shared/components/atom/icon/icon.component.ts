import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [NgIf],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {

  @Input() name!: string;
  @Input() valid: boolean = true;
  @Input() select: boolean = false;
  @Input() opacity: boolean = false;
  @Output() clickEvent: EventEmitter<void> = new EventEmitter();

  selectIcon(event: MouseEvent){
    event.stopPropagation();
    this.clickEvent.emit();
  }

}
