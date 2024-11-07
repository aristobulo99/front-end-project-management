import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    NgIf, 
    NgClass,
    IconComponent,
    ReactiveFormsModule,

  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() type: 'text' | 'number' | 'date' |'email' | 'password' | 'select' | 'text-area' = 'text';
  @Input() label!: string | undefined;
  @Input() icon!: string | undefined;
  @Input() placeholder!: string | undefined;
  @Input() control: FormControl = new FormControl('');
  @Input() valid: boolean = true;
  @Input() backgroundColor: 'light' | 'medio' = 'light'
  @Input() size: 'big' | 'small' = 'big';

  get styleDivInput(){
    return {
      'border-0 ': this.valid,
      'border-2 ': !this.valid,
    }
  }
}
