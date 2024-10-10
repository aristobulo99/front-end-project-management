import { Component, Input, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { DataSource } from '../../../../core/interfaces/table.interface';
import { IconComponent } from '../../atom/icon/icon.component';
import { Actions } from '@ngrx/effects';
import { NgClass } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    IconComponent,
    NgClass,
    MatTooltipModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  @Input() data: DataSource[] = [];
  @Input() displayedColumns: string[] = [];

  ngOnInit(): void {
    
  }

  objectKeys(obj: DataSource): string[] {
    return Object.keys(obj);
  }

  styleTd(width: string){
    return{
      'w-[14.75rem]': width == '14' 
    }
  }


}
