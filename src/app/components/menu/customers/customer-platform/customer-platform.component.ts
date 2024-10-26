import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../../../services/customer/customer.service';
import { Customer } from '../../../../interfaces/customers-api';

@Component({
  selector: 'app-customer-platform',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './customer-platform.component.html',
  styleUrl: './customer-platform.component.css'
})
export class CustomerPlatformComponent {
  customerForm: FormGroup=new FormGroup({
    firstName: new FormControl(undefined,[Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    lastName: new FormControl(undefined,[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
    phonenumber: new FormControl(undefined,[Validators.required,Validators.minLength(8),Validators.pattern("^[0-9]{10}$")]),
    email: new FormControl(undefined,[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  });

  constructor(private customerService: CustomerService) {}

  addCustomer() {
    if (this.customerForm.valid) {
      const customerData: Customer = {
        ...this.customerForm.value,
        _id: Math.random().toString(16).slice(2, 14)
      };

      this.customerService.addCustomer(customerData).subscribe(
        (response: Customer) => {
          console.log('Customer added successfully', response);
        },
        (error) => {
          console.error('Error adding customer', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}

