import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { OptionsKey } from '../select/select.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgClass } from '@angular/common';
import { IconComponent } from '../../atom/icon/icon.component';

@Component({
  selector: 'app-select-multiple',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    NgClass,
    IconComponent
  ],
  templateUrl: './select-multiple.component.html',
  styleUrl: './select-multiple.component.scss'
})
export class SelectMultipleComponent implements OnChanges {
  @Input() options: string[] | number[] = [];
  @Input() optionsKey: OptionsKey[] = []
  @Input() label!: string | undefined;
  @Input() placeholder!: string;
  @Input() control: FormControl = new FormControl([]);
  @Input() valid: boolean = true;
  @Input() backgroundColor: 'light' | 'medio' | 'none' = 'light';
  @Input() size: 'x-small' | 'small' | 'big' = 'big';
  @Input() selectAll: boolean = false;

  @Output() selectOptionEvent: EventEmitter<void> = new EventEmitter();

  @ViewChild('selectElement') selectElement!: ElementRef;

  public dropdownOpen: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['options']){
      if(this.selectAll){
        this.control.setValue(this.options);
      }
    }

    if(changes['optionsKey']){
      if(this.selectAll){
        this.control.setValue(this.optionsKey.map(ok => ok.value));
      }
    }
  }
  
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    if(!this.dropdownOpen){
      this.selectOption()
    }
  }

  selectOption() {
    this.selectOptionEvent.emit();
  }

}
