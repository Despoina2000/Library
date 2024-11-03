import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatButton, MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {NgForOf, NgIf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { SearchCustomerFilter } from '../../../../../interfaces/search-customer-filter';


@Component({
  selector: 'app-search-customer-pop-up',
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
  templateUrl: './search-customer-pop-up.component.html',
  styleUrl: './search-customer-pop-up.component.css'
})
export class SearchCustomerPopUpComponent {

  customerForm: FormGroup=new FormGroup({
    _id: new FormControl(undefined),
    name: new FormControl(undefined,[ Validators.minLength(3), Validators.maxLength(15)]),
    surname: new FormControl(undefined,[Validators.minLength(3),Validators.maxLength(15)]),
    phoneNumber: new FormControl(undefined,[Validators.minLength(8),Validators.pattern("^[0-9]{8}$")]),
    email: new FormControl(undefined,[Validators.email])
  });

  constructor(
    public dialogRef: MatDialogRef<SearchCustomerPopUpComponent>,
    
  ) {}

  onCancel(): void {
    this.dialogRef.close(null);
  }

  searchFilter(){
  const searchFilterData:  SearchCustomerFilter= {
      ...this.customerForm.value
    };
    this.dialogRef.close(searchFilterData);
  }

}
