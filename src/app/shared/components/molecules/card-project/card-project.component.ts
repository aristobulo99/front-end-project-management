import { Component, Input } from '@angular/core';
import { IconComponent } from '../../atom/icon/icon.component';

@Component({
  selector: 'app-card-project',
  standalone: true,
  imports: [
    IconComponent
  ],
  templateUrl: './card-project.component.html',
  styleUrl: './card-project.component.scss'
})
export class CardProjectComponent {

  @Input() featured: boolean = false;

}
