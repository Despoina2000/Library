import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatButton, MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {NgForOf, NgIf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SearchBookFilter} from '../../../interfaces/search-book-filter';

@Component({
  selector: 'app-search-book-pop-up',
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
  templateUrl: './search-book-pop-up.component.html',
  styleUrl: './search-book-pop-up.component.css'
})
export class SearchBookPopUpComponent {

  bookForm: FormGroup=new FormGroup({
    name: new FormControl(undefined,[Validators.minLength(3), Validators.maxLength(15)]),
    year: new FormControl(undefined,[Validators.min(1900),Validators.max(new Date().getFullYear())]),
    author: new FormControl(undefined,[Validators.minLength(3),Validators.maxLength(15)]),
    createdFrom: new FormControl(undefined),
    createdTo: new FormControl(undefined)
  });
  constructor(
    public dialogRef: MatDialogRef<SearchBookPopUpComponent>,
    
  ) {}
  onCancel(): void {
    this.dialogRef.close(null);
  }

  searchFilter(){
  const searchFilterData:  SearchBookFilter= {
      ...this.bookForm.value
    };
    this.dialogRef.close(searchFilterData);
  }

}
