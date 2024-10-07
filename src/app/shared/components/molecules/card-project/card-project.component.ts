import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../../atom/icon/icon.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card-project',
  standalone: true,
  imports: [
    NgClass,
    IconComponent
  ],
  templateUrl: './card-project.component.html',
  styleUrl: './card-project.component.scss'
})
export class CardProjectComponent {

  @Input() nameCard: string | undefined = undefined;
  @Input() featured: boolean = false;
  @Input() fieldCreation: boolean = false;
  @Output() featureEvent: EventEmitter<boolean> = new EventEmitter();


  selectStar(){
    this.featureEvent.emit(!this.featured);
  }

}