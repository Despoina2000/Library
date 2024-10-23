import { Component } from '@angular/core';
import {  DatePipe} from '@angular/common';
import { Book } from '../../../interfaces/books-api';
import { BookService } from '../../../services/book/book.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,DatePipe],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {
  books: Array<Book>|null= [];
  constructor(private bookServise:BookService){
    try{
      this.bookServise.getAllBooks().subscribe((data)=>{
        this.books=data;
     });
    }
    catch( HttpErrorResponse){
      this.books=null;
    }
    
  }
}
