import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    NgIf, 
    NgClass,
    IconComponent,
    ReactiveFormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() type: 'text' | 'number' | 'date' |'email' | 'password' = 'text';
  @Input() label!: string | undefined;
  @Input() icon!: string | undefined;
  @Input() placeholder!: string | undefined;
  @Input() control: FormControl = new FormControl('');
  @Input() valid: boolean = true;

  get styleDivInput(){
    return {
      'border-0 ': this.valid,
      'border-2 ': !this.valid,
    }
  }

  get styleInput(){
    console.log(this.valid)
    let colorPlaceholder = this.valid ? 'placeholder:text-white' : 'placeholder:text-red-700'
    return colorPlaceholder
  }
}
