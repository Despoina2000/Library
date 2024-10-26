import { Component,signal } from '@angular/core';
import { Book } from '../../../interfaces/books-api';
import { BookService } from '../../../services/book/book.service';
import { ListOfBooksComponent } from '../list-of-books/list-of-books.component';
import { error } from 'console';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListOfBooksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  books: Array<Book>= [];
  categories: Array<string>=[];

  constructor(private bookServise:BookService){
    
      this.bookServise.getAllBooks().subscribe((data)=>{
        data?.forEach(element => {
          if(element.available==true){
            this.books?.push(element);
          }
          
        });
        this.categories=[...new Set(data?.map(item => item.type))];
     },(error)=>{
      console.log(error);
      this.books=[];
     });
  }

  ngOnChange(){
    
  }

  
}
