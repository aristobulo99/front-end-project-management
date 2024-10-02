import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [NgIf, IconComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() type: 'text' | 'number' | 'date' |'email' | 'password' = 'text';
  @Input() label!: string;
  @Input() icon!: string;
  @Input() placeholder!: string;
}
