import { Component, Input, TemplateRef } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { IconComponent } from '../../atom/icon/icon.component';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    MatTabsModule,
    IconComponent,
    NgTemplateOutlet
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {

  @Input() contentTabs: Tabs[] = [];

}

export interface Tabs {
  label: string;
  icon?: string;
  template: TemplateRef<any>
}
