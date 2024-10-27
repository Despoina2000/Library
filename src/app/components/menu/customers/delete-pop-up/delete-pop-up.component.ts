import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialogContent,MatDialogActions } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-pop-up',
  standalone: true,
  imports: [MatDialogContent,MatDialogActions],
  templateUrl: './delete-pop-up.component.html',
  styleUrl: './delete-pop-up.component.css'
})
export class DeletePopUpComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletePopUpComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
