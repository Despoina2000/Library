import { KeyValuePipe, NgFor, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { BookService } from '../../../../services/book/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../../../interfaces/customers-api';
import { CustomerService } from '../../../../services/customer/customer.service';
import { ReservationService } from '../../../../services/reservation/reservation.service';
import { ReservationData } from '../../../../interfaces/reservation-data-api';

@Component({
  selector: 'app-reservation-platform',
  standalone: true,
  imports: [MatButtonModule,NgIf,NgFor,ReactiveFormsModule,KeyValuePipe],
  templateUrl: './reservation-platform.component.html',
  styleUrl: './reservation-platform.component.css'
})
export class ReservationPlatformComponent {
// Hash map to store [book._id => book.name]
bookMap: Map<string, string> = new Map();

// Hash map to store [customer._id => customer.name+''+customer.surname]
customerMap: Map<string, string> = new Map();

bookId: string | null = null;


  reservationForm: FormGroup=new FormGroup({
    bookId: new FormControl(undefined,[Validators.required]),
    customerId: new FormControl(undefined,[Validators.required]),
    returnBy: new FormControl(undefined,[Validators.required])
  });

  constructor(
    private bookService: BookService,
    private customerService: CustomerService,
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchBooks();
    this.fetchCustomers();
    this.route.queryParams.subscribe(params => { 
      this.reservationForm.patchValue({
        bookId: params['bookId']
      });
    });
  }

  fetchBooks(): void {
    this.bookService.getAllBooks().subscribe((books) => {
      if (books) {
        // Populate the bookMap with [book._id => book.name] entries
        books.forEach((book) => {
          if (book._id && book.available==true) {  // Ensure _id is defined and the book is available
            this.bookMap.set(book._id, book.name);
            
          }
        });
      }
    });
  }

  fetchCustomers(): void {
    this.customerService.getAllCustomers().subscribe((customers: Customer[]) => {
      if (customers) {
        // Populate the customerMap with [customer._id => customer.fullname] entries
        customers.forEach((customer) => {
          const fullName = `${customer.name} ${customer.surname}`;
          this.customerMap.set(customer._id, fullName);
        });
      }
    });
  }



  addReservation() {
    if (this.reservationForm.valid) {
      
      const reservationData: ReservationData = {
        customerId: this.reservationForm.get('customerId')?.value,
        bookId:this.reservationForm.get('bookId')?.value,
        returnBy: new Date(this.reservationForm.get('returnBy')?.value).toISOString(),
           
        
      };

      this.reservationService.addReservation(reservationData).subscribe(
        (response: ReservationData) => {
          console.log('Reservation added successfully', response);
        },
        (error: any) => {
          console.error('Error adding reservation', error);
        }
      );
      this.router.navigate(['reservations']);
    } else {
      console.log('Form is invalid');
    }
  }
    

}
