import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, inject, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../../../core/interfaces/dialog.interface';
import { ButtonComponent } from '../../atom/button/button.component';
import { NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    NgClass,
    ButtonComponent,
    NgTemplateOutlet
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  public templateRef: TemplateRef<any> | undefined

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<DialogComponent>
  ){
    this.templateRef = data.templete;
  }

  acceptButton(){
    this.dialogRef.close({ action: 'accept' });
  }

  cancelButton(){
    this.dialogRef.close({ action: 'cancel' });
  }

}
