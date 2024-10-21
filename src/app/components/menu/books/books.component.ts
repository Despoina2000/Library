import { Component } from '@angular/core';
import { Book } from '../../../interfaces/books-api';
import { BookService } from '../../../services/book/book.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  books: Array<Book>= [];
  constructor(private bookServise:BookService){
    this.bookServise.getAllBooks().subscribe((data)=>{
       this.books=data;
    });
  }
}
