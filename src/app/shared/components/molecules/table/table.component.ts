import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { DataSource } from '../../../../core/interfaces/table.interface';
import { IconComponent } from '../../atom/icon/icon.component';
import { Actions } from '@ngrx/effects';
import { NgClass } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DateFormatPipe } from '../../../pipe/date-format/date-format.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    IconComponent,
    NgClass,
    MatTooltipModule,
    DateFormatPipe
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  @Input() data: DataSource[] = [];
  @Input() displayedColumns: string[] = [];
  @Output() rowSelectEvent: EventEmitter<DataSource> = new EventEmitter();

  ngOnInit(): void {
    
  }

  objectKeys(obj: DataSource): string[] {
    return Object.keys(obj);
  }

  typeOfDate(value: string | number | Date | boolean | Actions[]): boolean {
    return value instanceof Date;
  }

  rowSelection(data: DataSource){
    this.rowSelectEvent.emit(data);
  }


}
