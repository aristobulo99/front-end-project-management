import { NgClass, NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../atom/icon/icon.component';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    IconComponent,
    ReactiveFormsModule
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {

  @Input() options: string[] | number[] = [];
  @Input() label!: string | undefined;
  @Input() control: FormControl = new FormControl('');
  @Input() valid: boolean = true;
  @Input() backgroundColor: 'light' | 'medio' = 'light';
  @Input() size: 'small' | 'big' = 'big';

  @Output() selectOptionEvent: EventEmitter<void> = new EventEmitter();

  @ViewChild('selectElement') selectElement!: ElementRef;

  public dropdownOpen: boolean = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    if(!this.dropdownOpen){
      this.selectOption()
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const clickedInside = this.selectElement?.nativeElement.contains(event.target);
    if (!clickedInside && this.dropdownOpen) {
      this.dropdownOpen = false;
    }
  }
  
  selectOption() {
    this.selectOptionEvent.emit();
  }

}
