import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    NgIf, 
    NgClass,
    IconComponent,
    ReactiveFormsModule,
    MatDatepickerModule,

  ],
  providers:[
    {provide: DateAdapter, useClass: NativeDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS},
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
  @Input() datePiker?: MatDatepicker<any>;

  get styleDivInput(){
    return {
      'border-0 ': this.valid,
      'border-2 ': !this.valid,
    }
  }
}
