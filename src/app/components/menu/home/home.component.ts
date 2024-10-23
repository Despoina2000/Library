import { Component,signal } from '@angular/core';
import {  DatePipe} from '@angular/common';
import { Book } from '../../../interfaces/books-api';
import { BookService } from '../../../services/book/book.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,DatePipe,MatButtonToggleModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  books: Array<Book>|null= [];
  categories: Array<string>=[];
  hideMultipleSelectionIndicator = signal(false);

  constructor(private bookServise:BookService){
    try{
      this.bookServise.getAllBooks().subscribe((data)=>{
        data?.forEach(element => {
          if(element.available==true){
            this.books?.push(element);
          }
          
        });
        this.categories=[...new Set(data?.map(item => item.type))];
     });
    }
    catch( HttpErrorResponse){
      this.books=null;
    }
  }

  toggleMultipleSelectionIndicator() {
    this.hideMultipleSelectionIndicator.update(value => !value);
  }
}
