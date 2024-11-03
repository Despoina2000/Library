import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../../../services/customer/customer.service';
import { Customer } from '../../../../../interfaces/api/customers-api';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-customer-platform',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf, MatButtonModule],
  templateUrl: './customer-platform.component.html',
  styleUrl: './customer-platform.component.css'
})
export class CustomerPlatformComponent {
  customerForm: FormGroup=new FormGroup({
    name: new FormControl(undefined,[Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    surname: new FormControl(undefined,[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
    phoneNumber: new FormControl(undefined,[Validators.required,Validators.minLength(8),Validators.pattern("^[0-9]{3}-[0-9]{3}-[0-9]{4}$")]),
    email: new FormControl(undefined,[Validators.required,Validators.email])
  });

  customerId: string | null = null;
  customer: Customer | null = null;
  isViewMode = false;


  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check the route to determine if we're adding, viewing, or editing
    this.route.paramMap.subscribe(params => {
      this.customerId = params.get('id');
      const path = this.route.snapshot.routeConfig?.path;

      if (path === 'customers/view/:id') {
        this.isViewMode = true;
        this.loadCustomerData(this.customerId);
        this.customerForm.controls['name'].disable();
        this.customerForm.controls['surname'].disable();
        this.customerForm.controls['phoneNumber'].disable();
        this.customerForm.controls['email'].disable();
        this.customerForm.disable(); // Disable the form in view mode
      } else if (path === 'customers/edit/:id') {
        this.loadCustomerData(this.customerId);
      }
    });
  }

  // Load customer data if we're in edit or view mode
  loadCustomerData(customerId: string | null): void {

    if (customerId) {
      this.customerService.getCustomer(customerId).subscribe(
        (customerData: Customer|null) => {
          if(customerData){
            this.customer= customerData;
            this.customerForm.patchValue({
              name: customerData.name,
              surname: customerData.surname,
              phoneNumber: customerData.phoneNumber,
              email: customerData.email
            });
          }
          else{
            this.customer=null
          }

        },
        (error) => {
          console.error('Error loading customer data', error);
        }
      );
    }
  }

  addCustomer() {
    if (this.customerForm.valid) {
      const customerData: Customer = {
        ...this.customerForm.value
      };

      this.customerService.addCustomer(customerData).subscribe(
        (response: Customer) => {
          console.log('Customer added successfully', response);
        },
        (error) => {
          console.error('Error adding customer', error);
        }
      );
      this.router.navigate(['customers']);
    } else {
      console.log('Form is invalid');
    }
  }

  updateCustomer() {
    if (this.customerForm.valid && this.customerId) {
      const customerData: Customer = {
        _id: this.customerId,
        ...this.customerForm.value
      };

      this.customerService.updateCustomer(customerData)?.subscribe(
        (response: Customer) => {
          console.log('Customer updated successfully', response);
          this.router.navigate(['/customers']);
        },
        (error) => {
          console.error('Error updating customer', error);
        }
      );
    } else {
      console.log('Form is invalid or customerId is missing');
    }
  }
}


