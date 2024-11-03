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

  constructor(private customerService: CustomerService,private router: Router, private dialog: MatDialog){

      this.customerService.getAllCustomers().subscribe((data)=>{
        this.customers=data;
     },(error)=>{
      console.log(error);
      this.customers=[];
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
