import { DatePipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { BookService } from '../../../../services/book/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-platform',
  standalone: true,
  imports: [MatButtonModule,NgIf,ReactiveFormsModule],
  templateUrl: './reservation-platform.component.html',
  styleUrl: './reservation-platform.component.css'
})
export class ReservationPlatformComponent {

  reservationForm: FormGroup=new FormGroup({
    book_name: new FormControl(undefined,[Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    customer_name: new FormControl(undefined,[Validators.required]),
    returnBy: new FormControl(undefined,[Validators.required])
  });

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    // Check the route to determine if we're adding, viewing, or editing
    // this.route.paramMap.subscribe(params => {
    //   this.bookId = params.get('id');
    //   const path = this.route.snapshot.routeConfig?.path;

    //    if (path === 'books/edit/:id') {
    //     this.loadBookData(this.bookId);
    //   }
    // });
  }

  addReservation() {
    if (this.reservationForm.valid) {
      const book_title =this.reservationForm.get('book_name')?.value;
      if(!this.bookService.getBookByName(book_title)){

      }

      // const bookData: Book = {
      //   //...this.reservationForm.value,
      //       name: this.reservationForm.get('name')?.value,
      //       year: this.reservationForm.get('year')?.value,
      //       type: this.reservationForm.get('type')?.value,
      //       author: this.reservationForm.get('author')?.value,
      //       createdOn: new Date(this.reservationForm.get('createdOn')?.value).toISOString(),
      //       available:true
        
      // };

      // this.bookService.addBook(bookData).subscribe(
      //   (response: Book) => {
      //     console.log('Book added successfully', response);
      //   },
      //   (error) => {
      //     console.error('Error adding book', error);
      //   }
      // );
      this.router.navigate(['books']);
    } else {
      console.log('Form is invalid');
    }
  }
    

}
