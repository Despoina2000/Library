import { Component } from '@angular/core';
import {  DatePipe} from '@angular/common';
import { Book } from '../../../interfaces/books-api';
import { BookService } from '../../../services/book/book.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ListOfBooksComponent } from '../list-of-books/list-of-books.component';
import { error } from 'console';


@Component({
  selector: 'app-books',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, DatePipe, ListOfBooksComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {
  books: Array<Book>= [];
  categories: Array<string>=[];
  constructor(private bookService:BookService){
    
      this.bookService.getAllBooks().subscribe((data)=>{
        this.books=data? data:[];
        this.categories=[...new Set(data?.map(item => item.type))];
     },(error)=>{
      console.log(error);
      this.books=[];
     });
    
  }
}
