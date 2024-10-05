import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() name!: string;
  @Input() valid: boolean = true;
  @Output() selectButton: EventEmitter<void> = new EventEmitter();

  get styleButton(){
    return {
      'hover:bg-opacity-70 opacity-100': this.valid,
      'opacity-40': !this.valid
    }
  }

  clickButton() {
    if(this.valid){
      this.selectButton.emit();
    }
  }

}
