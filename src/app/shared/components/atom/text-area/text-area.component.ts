import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss'
})
export class TextAreaComponent {

  @Input() valid: boolean = true;
  @Input() label!: string | undefined;
  @Input() placeholder!: string | undefined;
  @Input() control: FormControl = new FormControl('');
  @Input() backgroundColor: 'light' | 'medio' = 'light'

  get styleDivInput(){
    return {
      'border-0 ': this.valid,
      'border-2 ': !this.valid,
    }
  }

}
