import { Component, Input } from '@angular/core';
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

  @Input() featured: boolean = false;
  @Input() fieldCreation: boolean = false;

  get styleSection(){
    return {
      'justify-between border-[0.063rem] ': !this.fieldCreation,
      'justify-center items-center border-dashed border-2 ': this.fieldCreation
    }
  }

}