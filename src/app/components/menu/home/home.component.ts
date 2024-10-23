import { Component } from '@angular/core';
import {  DatePipe} from '@angular/common';
import { Book } from '../../../interfaces/books-api';
import { BookService } from '../../../services/book/book.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  books: Array<Book>|null= [];
  constructor(private bookServise:BookService){
    try{
      this.bookServise.getAllBooks().subscribe((data)=>{
        data?.forEach(element => {
          if(element.available==true){
            this.books?.push(element);
          }
          
        });
     });
    }
    catch( HttpErrorResponse){
      this.books=null;
    }
  }

}
