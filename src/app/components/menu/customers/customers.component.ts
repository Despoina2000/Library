import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Customer } from '../../../interfaces/customers-api';
import { CustomerService } from '../../../services/customer/customer.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [MatTableModule,MatIconModule,MatButtonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'phone', 'actions'];
  customers: Array<Customer>=[];

  constructor(private customerService: CustomerService){
    try{
      this.customerService.getAllCustomers().subscribe((data)=>{
        this.customers=data;
     });
    }
    catch( HttpErrorResponse){
      this.customers=[];
    }
    
  }



}
