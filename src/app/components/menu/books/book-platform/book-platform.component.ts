import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../../../../interfaces/books-api';
import { BookService } from '../../../../services/book/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-book-platform',
  standalone: true,
  imports: [NgIf,NgFor,ReactiveFormsModule],
  templateUrl: './book-platform.component.html',
  styleUrl: './book-platform.component.css'
})
export class BookPlatformComponent {
  bookTypes: string[] = ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Biography'];
  bookForm: FormGroup=new FormGroup({
    name: new FormControl(undefined,[Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    year: new FormControl(undefined,[Validators.required,Validators.min(1900),Validators.max(2024)]),
    type: new FormControl('', [Validators.required]),
    author: new FormControl(undefined,[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
    createdOn: new FormControl(new Date(), [Validators.required])
  });

  bookId: string | null = null;
  book: Book | null = null;
  

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check the route to determine if we're adding, viewing, or editing
    this.route.paramMap.subscribe(params => {
      this.bookId = params.get('id');
      const path = this.route.snapshot.routeConfig?.path;

       if (path === 'books/edit/:id') {
        this.loadBookData(this.bookId);
      }
    });
  }

  
  loadBookData(bookId: string | null): void {
    
    if (bookId) {
      this.bookService.getBook(bookId).subscribe(
        (bookData: Book|null) => {
          if(bookData){
            this.book= bookData;
            this.bookForm.patchValue({
              name: bookData.name,
             year: bookData.year,
              type: bookData.type,
              author: bookData.author,
              createdOn:bookData.createdOn
            });
          }
          else{
            this.book=null
          }
          
        },
        (error: any) => {
          console.error('Error loading book data', error);
        }
      );
    }
  }

  addBook() {
    if (this.bookForm.valid) {
      const bookData: Book = {
        ...this.bookForm.value,
        _id: Math.random().toString(16).slice(2, 14)
      };

      this.bookService.addBook(bookData).subscribe(
        (response: Book) => {
          console.log('Book added successfully', response);
        },
        (error) => {
          console.error('Error adding book', error);
        }
      );
      this.router.navigate(['books']);
    } else {
      console.log('Form is invalid');
    }
  }

  updateBook() {
    if (this.bookForm.valid && this.bookId) {
      const bookData: Book = {
        _id: this.bookId,
        ...this.bookForm.value
      };

      this.bookService.updateBook(bookData)?.subscribe(
        (response: Book) => {
          console.log('Book updated successfully', response);
          this.router.navigate(['/books']);
        },
        (error) => {
          console.error('Error updating book', error);
        }
      );
    } else {
      console.log('Form is invalid or bookId is missing');
    }
  }
}




