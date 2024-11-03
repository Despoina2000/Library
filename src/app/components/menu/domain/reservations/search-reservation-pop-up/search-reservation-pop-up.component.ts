import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatButton, MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {NgForOf, NgIf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { SearchReservationFilter } from '../../../../../interfaces/search-filter/search-reservation-filter';

@Component({
  selector: 'app-search-reservation-pop-up',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatFabButton,
    MatIcon,
    MatButton,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './search-reservation-pop-up.component.html',
  styleUrl: './search-reservation-pop-up.component.css'
})
export class SearchReservationPopUpComponent {

  reservationForm: FormGroup=new FormGroup({
    bookId: new FormControl(undefined,[Validators.required]),
    customerId: new FormControl(undefined,[Validators.required]),
    returnBy: new FormControl(undefined,[Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<SearchReservationPopUpComponent>,

  ) {}

  onCancel(): void {
    this.dialogRef.close(null);
  }

  searchFilter(){
  const searchFilterData:  SearchReservationFilter= {
      ...this.reservationForm.value
    };
    this.dialogRef.close(searchFilterData);
  }

}
