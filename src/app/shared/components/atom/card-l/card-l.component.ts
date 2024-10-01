import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card-l',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './card-l.component.html',
  styleUrl: './card-l.component.scss'
})
export class CardLComponent {

  @Input() content!: TemplateRef<any>;

}
