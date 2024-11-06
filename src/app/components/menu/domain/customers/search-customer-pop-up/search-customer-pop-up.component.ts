import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatButton, MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {NgForOf, NgIf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { SearchCustomerFilter } from '../../../../../interfaces/search-filter/search-customer-filter';


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

  customerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SearchCustomerPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { existingFilters: SearchCustomerFilter }
  ) {

    this.customerForm=new FormGroup({
      _id: new FormControl(this.data?.existingFilters._id),
      name: new FormControl(this.data?.existingFilters.name,[ Validators.minLength(3), Validators.maxLength(15)]),
      surname: new FormControl(this.data?.existingFilters.surname,[Validators.minLength(3),Validators.maxLength(15)]),
      phoneNumber: new FormControl(this.data?.existingFilters.phoneNumber,[Validators.minLength(8),Validators.pattern("^[0-9]{8}$")]),
      email: new FormControl(this.data?.existingFilters.email,[Validators.email])
    });
  }

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
