import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { DialogComponent } from '../../../shared/components/molecules/dialog/dialog.component';
import { DialogData } from '../../interfaces/dialog.interface';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openDialog(data: DialogData){
    return this.dialog.open(DialogComponent, {
      minWidth: data.width,
      data
    });
  }

  closedAll(){
    this.dialog.closeAll();
  }
}
