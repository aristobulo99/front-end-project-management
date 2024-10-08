import { Component, Input, OnInit } from '@angular/core';
import { InputComponent } from '../../atom/input/input.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { IconComponent } from '../../atom/icon/icon.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { FormControlPipe } from '../../../pipe/form-control/form-control.pipe';
import { MY_DATE_FORMATS } from '../../../../core/interfaces/format-date';
import { DateFormatPipe } from '../../../pipe/date-format/date-format.pipe';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input-date',
  standalone: true,
  imports: [
    NgClass,
    InputComponent,
    IconComponent,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    FormControlPipe,
    DateFormatPipe
  ],
  providers:[
    {provide: DateAdapter, useClass: NativeDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS},
    DateFormatPipe,
    provideNativeDateAdapter()
  ],
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.scss'
})
export class InputDateComponent {

  @Input() placeholder: string | 'DD/MM/YYYY' = 'DD/MM/YYYY';
  @Input() control: FormControl = new FormControl('');
  @Input() valid: boolean = true;


}
