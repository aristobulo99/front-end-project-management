import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-icon',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './profile-icon.component.html',
  styleUrl: './profile-icon.component.scss'
})
export class ProfileIconComponent {

  @Input() nameUser: string | undefined = undefined;
  @Input() color: 'yellow' | 'none' = 'yellow'

  getNameIcon(): string{
    if (this.nameUser) {
      const listName: string[] = this.nameUser.trim().split(' ').filter(Boolean);
      const initials = listName.slice(0, 2).map(name => name[0]).join('');
      return initials.toUpperCase();
    }
    return ''; 
  }

}
