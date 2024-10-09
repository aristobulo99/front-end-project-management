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
  @Input() color: 'blueCustom' | 'pinkCustom' = 'blueCustom'
  @Output() selectButton: EventEmitter<void> = new EventEmitter();

  clickButton() {
    if(this.valid){
      this.selectButton.emit();
    }
  }

}
