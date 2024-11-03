import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Customer } from '../../../../interfaces/customers-api';
import { CustomerService } from '../../../../services/customer/customer.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { error } from 'console';
import { Router } from '@angular/router';
import { DeletePopUpComponent } from '../../../pop-up components/delete-pop-up/delete-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { SearchCustomerFilter } from '../../../../interfaces/search-customer-filter';
import { SearchCustomerPopUpComponent } from './search-customer-pop-up/search-customer-pop-up.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [MatTableModule,MatIconModule,MatButtonModule,NgIf],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'phone', 'actions'];
  customers: Array<Customer>=[];
  filteredCustomers: Array<Customer> = [];
  searchResults: SearchCustomerFilter = {};
  searchFilterFlag: boolean= false;

  constructor(private customerService: CustomerService,private router: Router, private dialog: MatDialog){
    this.loadCustomers();
      

  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe((data)=>{
      this.customers=data;
      this.filteredCustomers=[...this.customers];
   },(error)=>{
    console.log(error);
    this.customers=[];
    this.filteredCustomers=[]
   });
    
  }

  resetCustomers(){
    this.searchFilterFlag = false;
    this.loadCustomers();
  }

  searchFilter() {
    const dialogRef = this.dialog.open(SearchCustomerPopUpComponent);

    dialogRef.afterClosed().subscribe((results) => {

      this.searchFilterFlag = true;
      
      this.searchResults=results;
      
      this.applyAdditionalFilters();
      
  });
}

  applyAdditionalFilters() {
    this.filteredCustomers = this.filteredCustomers.filter((customer) => {

      const matchesId = this.searchResults._id
        ? customer._id.toLowerCase().includes(this.searchResults._id.toLowerCase())
        : true;

      const matchesName = this.searchResults.name
        ? customer.name.toLowerCase().includes(this.searchResults.name.toLowerCase())
        : true;

      const matchesSurname = this.searchResults.surname
        ? customer.surname.toLowerCase().includes(this.searchResults.surname.toLowerCase())
        : true;

      const matchesEmail = this.searchResults.email
        ? customer.email === this.searchResults.email
        : true;

      const matchesPhoneNumber = this.searchResults.phoneNumber
        ? customer.phoneNumber.includes(this.searchResults.phoneNumber)
        : true;



      return matchesId && matchesName && matchesSurname && matchesEmail && matchesPhoneNumber;
    });
  }

  confirmDelete(customerId:string): void {
    const dialogRef = this.dialog.open(DeletePopUpComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCustomer(customerId);
      }
    });
  }

  // Delete customer function
  deleteCustomer(customerId:string): void {
    if (customerId) {
      this.customerService.deleteCustomer(customerId)?.subscribe(
        () => {
          console.log('Customer deleted successfully');
          this.router.navigate(['/customers']);
        },
        (error) => {
          console.error('Error deleting customer', error);
        }
      );
    }
  }

  addCustomer(){
    this.router.navigate(['customers/add']);
  }
  viewCustomer(customerId:string){
    this.router.navigate(['customers/view/'+customerId]);
  }
  editCustomer(customerId:string){
    this.router.navigate(['customers/edit/'+customerId]);
  }


}
