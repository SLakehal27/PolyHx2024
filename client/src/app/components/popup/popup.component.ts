import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  // Additional properties for title and actions
  title: string;
  actions: { label: string; value: any; color?: string }[]; // color is optional

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { content: string; title?: string; actions?: { label: string; value: any; color?: string }[] },
    private dialogRef: MatDialogRef<PopupComponent>
  ) {
    this.title = data.title ? data.title : "Here's where you could throw your item"; // Default title if none provided
    this.actions = data.actions || []; // Default to no actions if none provided
  }


  closeDialog(value: any = null): void {
    this.dialogRef.close(value);
  }
}
