import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { DialogComponent } from '../../../shared/components/molecules/dialog/dialog.component';
import { DialogData } from '../../interfaces/dialog.interface';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openDialog(data: DialogData): Promise<{ action: string }>{
    const dialogRef = this.dialog.open(DialogComponent, {
      minWidth: data.width,
      data
    });

    return firstValueFrom(dialogRef.afterClosed());
  }

  closedAll(){
    this.dialog.closeAll();
  }
}
