import { Component } from '@angular/core';
import {  DatePipe} from '@angular/common';
import { Book } from '../../../interfaces/books-api';
import { BookService } from '../../../services/book/book.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ListOfBooksComponent } from '../list-of-books/list-of-books.component';
import { error } from 'console';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-books',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, DatePipe, ListOfBooksComponent,MatIconModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {
  books: Array<Book>= [];
  categories: Array<string>=[];
  constructor(private bookService:BookService,private router: Router, private activeRoute: ActivatedRoute){
    
      this.bookService.getAllBooks().subscribe((data)=>{
        this.books=data? data:[];
        this.categories=[...new Set(data?.map(item => item.type))];
     },(error)=>{
      console.log(error);
      this.books=[];
     });
    
  }

  

  addBook(){
    this.router.navigate(['books/add']);
  }
}
